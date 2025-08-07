import { syntaxError } from '../error/syntaxError.js';

import { Token } from './ast.js';
import { isNameStart } from './characterClasses.js';
import type { LexerInterface } from './lexer.js';
import { createToken, printCodePointAt, readName } from './lexer.js';
import type { Source } from './source.js';
import { TokenKind } from './tokenKind.js';

/**
 * Given a Source schema coordinate, creates a Lexer for that source.
 * A SchemaCoordinateLexer is a stateful stream generator in that every time
 * it is advanced, it returns the next token in the Source. Assuming the
 * source lexes, the final Token emitted by the lexer will be of kind
 * EOF, after which the lexer will repeatedly return the same EOF token
 * whenever called.
 */
export class SchemaCoordinateLexer implements LexerInterface {
  source: Source;

  /**
   * The previously focused non-ignored token.
   */
  lastToken: Token;

  /**
   * The currently focused non-ignored token.
   */
  token: Token;

  /**
   * The (1-indexed) line containing the current token.
   * Since a schema coordinate may not contain newline, this value is always 1.
   */
  line: 1 = 1 as const;

  /**
   * The character offset at which the current line begins.
   * Since a schema coordinate may not contain newline, this value is always 0.
   */
  lineStart: 0 = 0 as const;

  constructor(source: Source) {
    const startOfFileToken = new Token(TokenKind.SOF, 0, 0, 0, 0);

    this.source = source;
    this.lastToken = startOfFileToken;
    this.token = startOfFileToken;
  }

  get [Symbol.toStringTag]() {
    return 'SchemaCoordinateLexer';
  }

  /**
   * Advances the token stream to the next non-ignored token.
   */
  advance(): Token {
    this.lastToken = this.token;
    const token = (this.token = this.lookahead());
    return token;
  }

  /**
   * Looks ahead and returns the next non-ignored token, but does not change
   * the current Lexer token.
   */
  lookahead(): Token {
    let token = this.token;
    if (token.kind !== TokenKind.EOF) {
      // Read the next token and form a link in the token linked-list.
      const nextToken = readNextToken(this, token.end);
      // @ts-expect-error next is only mutable during parsing.
      token.next = nextToken;
      // @ts-expect-error prev is only mutable during parsing.
      nextToken.prev = token;
      token = nextToken;
    }
    return token;
  }
}

/**
 * Gets the next token from the source starting at the given position.
 *
 * This skips over whitespace until it finds the next lexable token, then lexes
 * punctuators immediately or calls the appropriate helper function for more
 * complicated tokens.
 */
function readNextToken(lexer: SchemaCoordinateLexer, start: number): Token {
  const body = lexer.source.body;
  const bodyLength = body.length;
  const position = start;

  if (position < bodyLength) {
    const code = body.charCodeAt(position);

    switch (code) {
      case 0x002e: // .
        return createToken(lexer, TokenKind.DOT, position, position + 1);
      case 0x0028: // (
        return createToken(lexer, TokenKind.PAREN_L, position, position + 1);
      case 0x0029: // )
        return createToken(lexer, TokenKind.PAREN_R, position, position + 1);
      case 0x003a: // :
        return createToken(lexer, TokenKind.COLON, position, position + 1);
      case 0x0040: // @
        return createToken(lexer, TokenKind.AT, position, position + 1);
    }

    // Name
    if (isNameStart(code)) {
      return readName(lexer, position);
    }

    throw syntaxError(
      lexer.source,
      position,
      `Invalid character: ${printCodePointAt(lexer, position)}.`,
    );
  }

  return createToken(lexer, TokenKind.EOF, bodyLength, bodyLength);
}
