import { expect } from 'chai';
import { describe, it } from 'mocha';

import { expectToThrowJSON } from '../../__testUtils__/expectJSON.js';

import { SchemaCoordinateLexer } from '../schemaCoordinateLexer.js';
import { Source } from '../source.js';
import { TokenKind } from '../tokenKind.js';

function lexOne(str: string) {
  const lexer = new SchemaCoordinateLexer(new Source(str));
  return lexer.advance();
}

function lexSecond(str: string) {
  const lexer = new SchemaCoordinateLexer(new Source(str));
  lexer.advance();
  return lexer.advance();
}

function expectSyntaxError(text: string) {
  return expectToThrowJSON(() => lexSecond(text));
}

describe('SchemaCoordinateLexer', () => {
  it('can be stringified', () => {
    const lexer = new SchemaCoordinateLexer(new Source('Name.field'));
    expect(Object.prototype.toString.call(lexer)).to.equal(
      '[object SchemaCoordinateLexer]',
    );
  });

  it('tracks a schema coordinate', () => {
    const lexer = new SchemaCoordinateLexer(new Source('Name.field'));
    expect(lexer.advance()).to.contain({
      kind: TokenKind.NAME,
      start: 0,
      end: 4,
      value: 'Name',
    });
  });

  it('forbids ignored tokens', () => {
    const lexer = new SchemaCoordinateLexer(new Source('\nName.field'));
    expectToThrowJSON(() => lexer.advance()).to.deep.equal({
      message: 'Syntax Error: Invalid character: U+000A.',
      locations: [{ line: 1, column: 1 }],
    });
  });

  it('ignores BOM header', () => {
    expect(lexOne('\uFEFFfoo')).to.contain({
      kind: TokenKind.NAME,
      start: 1,
      end: 4,
      value: 'foo',
    });
  });

  it('lex reports a useful syntax errors', () => {
    expectSyntaxError('Foo .bar').to.deep.equal({
      message: 'Syntax Error: Invalid character: " ".',
      locations: [{ line: 1, column: 4 }],
    });
  });
});
