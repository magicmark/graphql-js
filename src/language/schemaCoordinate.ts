import { isSource, Source } from './source.js';
import { GraphQLError } from '../error/GraphQLError.js';
import { readName as _readName, printCodePointAt, Lexer } from './lexer.js';
import { Token } from './ast.js';
import { Kind } from './kinds.js';

import type {
  SchemaCoordinateNode,
} from './ast.js';

function syntaxError(
  source: Source,
  description: string,
): GraphQLError {
  return new GraphQLError(`Syntax Error: ${description}`, {
    source,
  });
}

function readName(body: string): Token {
  const lexer = new Lexer(new Source(body));
  const token = _readName(lexer, 0);
  return token;
}

function readNameOnly(body: string): Token {
  const source = new Source(body);
  const lexer = new Lexer(source);
  const token = _readName(lexer, 0);
  if (body.length > token.end) {
    throw syntaxError(source, `Invalid character: ${printCodePointAt(lexer, token.end)}`);
  }
  return token;
}

/**
 * SchemaCoordinate :
 *   - Name
 *   - Name . Name
 *   - Name . Name ( Name : )
 *   - @ Name
 *   - @ Name ( Name : )
 */
export function parseSchemaCoordinate(source: string | Source): SchemaCoordinateNode {
  const sourceObj = isSource(source) ? source : new Source(source);

  const names = sourceObj.body.split('.');

  if (names.length === 1) {
    if (names[0].startsWith('@')) {
      const name = readName(names[0].slice(1));
      const argument = names[0].slice(1 + name.end);

      // - @ Name
      if (argument.length === 0) {
        return {
          kind: Kind.DIRECTIVE_COORDINATE,
          name: { kind: Kind.NAME, value: name.value },
        }
      }

      // - @ Name ( Name : )
      if (!(argument.startsWith('(') && argument.endsWith(':)'))) {
        throw syntaxError(sourceObj, 'Unexpected characters');
      }
      const argumentValue = readNameOnly(argument.slice(1, -2)).value;
      return {
        kind: Kind.DIRECTIVE_ARGUMENT_COORDINATE,
        argumentName: { kind: Kind.NAME, value: argumentValue },
        name: { kind: Kind.NAME, value: name.value },
      }
    }

    // - Name
    const name = readNameOnly(names[0]);
    return {
      kind: Kind.TYPE_COORDINATE,
      name: { kind: Kind.NAME, value: name.value },
    }
  }

  if (names.length === 2) {
    const typeName = readNameOnly(names[0]);
    const fieldName = readName(names[1]);
    const argument = names[1].slice(fieldName.end);

    // - @ Name . Name
    if (argument.length === 0) {
      return {
        kind: Kind.MEMBER_COORDINATE,
        memberName: { kind: Kind.NAME, value: fieldName.value },
        name: { kind: Kind.NAME, value: typeName.value },
      }
    }

    // - Name . Name ( Name : )
    if (!(argument.startsWith('(') && argument.endsWith(':)'))) {
      throw syntaxError(sourceObj, 'Unexpected characters');
    }
    const argumentValue = readNameOnly(argument.slice(1, -2)).value;
    return {
      kind: Kind.ARGUMENT_COORDINATE,
      name: { kind: Kind.NAME, value: typeName.value },
      fieldName: { kind: Kind.NAME, value: fieldName.value },
      argumentName: { kind: Kind.NAME, value: argumentValue },
    }
  }

  throw syntaxError(sourceObj, 'Expected <EOF>, found ..');
}