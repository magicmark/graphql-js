import { expect } from 'chai';
import { it } from 'mocha';
import { parseSchemaCoordinate } from '../schemaCoordinate.js'
import {
  expectJSON,
} from '../../__testUtils__/expectJSON.js';
import { Kind } from '../kinds.js';
import { Source } from '../source.js';

it('parses Name', () => {
    const result = parseSchemaCoordinate('@@MyType');
    expectJSON(result).toDeepEqual({
        kind: Kind.TYPE_COORDINATE,
        name: {
            kind: Kind.NAME,
            value: 'MyType',
        },
    });
});

it('parses Name . Name', () => {
    const result = parseSchemaCoordinate('MyType.field');
    expectJSON(result).toDeepEqual({
        kind: Kind.MEMBER_COORDINATE,
        name: {
            kind: Kind.NAME,
            value: 'MyType',
        },
        memberName: {
            kind: Kind.NAME,
            value: 'field',
        },
    });
});

it('rejects Name . Name . Name', () => {
    expect(() => parseSchemaCoordinate('MyType.field.deep'))
        .to.throw()
        .to.deep.include({
            message: 'Syntax Error: Expected <EOF>, found ..',
        });
});

it('parses Name . Name ( Name : )', () => {
    const result = parseSchemaCoordinate('MyType.field(arg:)');
    expectJSON(result).toDeepEqual({
        kind: Kind.ARGUMENT_COORDINATE,
        name: {
            kind: Kind.NAME,
            value: 'MyType',
        },
        fieldName: {
            kind: Kind.NAME,
            value: 'field',
        },
        argumentName: {
            kind: Kind.NAME,
            value: 'arg',
        },
    });
});

it('rejects Name . Name ( Name : Name )', () => {
    expect(() => parseSchemaCoordinate('MyType.field(arg: value)'))
        .to.throw()
        .to.deep.include({
            message: 'Syntax Error: Invalid character: " ".',
        });
});

it('parses @ Name', () => {
    const result = parseSchemaCoordinate('@myDirective');
    expectJSON(result).toDeepEqual({
        kind: Kind.DIRECTIVE_COORDINATE,
        name: {
            kind: Kind.NAME,
            value: 'myDirective',
        },
    });
});

it('parses @ Name ( Name : )', () => {
    const result = parseSchemaCoordinate('@myDirective(arg:)');
    expectJSON(result).toDeepEqual({
        kind: Kind.DIRECTIVE_ARGUMENT_COORDINATE,
        name: {
            kind: Kind.NAME,
            value: 'myDirective',
        },
        argumentName: {
            kind: Kind.NAME,
            value: 'arg',
        },
    });
});

it('rejects @ Name . Name', () => {
    expect(() => parseSchemaCoordinate('@myDirective.field'))
        .to.throw()
        .to.deep.include({
            message: 'Syntax Error: Expected <EOF>, found ..',
        });
});

it('accepts a Source object', () => {
    expect(parseSchemaCoordinate('MyType')).to.deep.equal(
        parseSchemaCoordinate(new Source('MyType')),
    );
});
