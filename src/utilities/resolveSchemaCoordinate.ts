import { inspect } from '../jsutils/inspect.js';

import type {
  ArgumentCoordinateNode,
  DirectiveArgumentCoordinateNode,
  DirectiveCoordinateNode,
  MemberCoordinateNode,
  SchemaCoordinateNode,
  TypeCoordinateNode,
} from '../language/ast.js';
import { Kind } from '../language/kinds.js';
import { parseSchemaCoordinate } from '../language/parser.js';
import type { Source } from '../language/source.js';

import type {
  GraphQLArgument,
  GraphQLEnumValue,
  GraphQLField,
  GraphQLInputField,
  GraphQLNamedType,
} from '../type/definition.js';
import {
  isEnumType,
  isInputObjectType,
  isInterfaceType,
  isObjectType,
} from '../type/definition.js';
import type { GraphQLDirective } from '../type/directives.js';
import type { GraphQLSchema } from '../type/schema.js';

/**
 * A resolved schema element may be one of the following kinds:
 */
export interface ResolvedNamedType {
  readonly kind: 'NamedType';
  readonly type: GraphQLNamedType;
}

export interface ResolvedField {
  readonly kind: 'Field';
  readonly type: GraphQLNamedType;
  readonly field: GraphQLField<unknown, unknown>;
}

export interface ResolvedInputField {
  readonly kind: 'InputField';
  readonly type: GraphQLNamedType;
  readonly inputField: GraphQLInputField;
}

export interface ResolvedEnumValue {
  readonly kind: 'EnumValue';
  readonly type: GraphQLNamedType;
  readonly enumValue: GraphQLEnumValue;
}

export interface ResolvedFieldArgument {
  readonly kind: 'FieldArgument';
  readonly type: GraphQLNamedType;
  readonly field: GraphQLField<unknown, unknown>;
  readonly fieldArgument: GraphQLArgument;
}

export interface ResolvedDirective {
  readonly kind: 'Directive';
  readonly directive: GraphQLDirective;
}

export interface ResolvedDirectiveArgument {
  readonly kind: 'DirectiveArgument';
  readonly directive: GraphQLDirective;
  readonly directiveArgument: GraphQLArgument;
}

export type ResolvedSchemaElement =
  | ResolvedNamedType
  | ResolvedField
  | ResolvedInputField
  | ResolvedEnumValue
  | ResolvedFieldArgument
  | ResolvedDirective
  | ResolvedDirectiveArgument;

/**
 * A schema coordinate is resolved in the context of a GraphQL schema to
 * uniquely identifies a schema element. It returns undefined if the schema
 * coordinate does not resolve to a schema element.
 *
 * https://spec.graphql.org/draft/#sec-Schema-Coordinates.Semantics
 */
export function resolveSchemaCoordinate(
  schema: GraphQLSchema,
  schemaCoordinate: string | Source,
): ResolvedSchemaElement | undefined {
  return resolveASTSchemaCoordinate(
    schema,
    parseSchemaCoordinate(schemaCoordinate),
  );
}

/**
 * SchemaCoordinate : @ Name
 */
function resolveDirectiveCoordinate(
  schema: GraphQLSchema,
  schemaCoordinate: DirectiveCoordinateNode,
): ResolvedDirective | undefined {
  // Let {directiveName} be the value of the first {Name}.
  const directiveName = schemaCoordinate.name.value;

  // Let {directive} be the directive in the {schema} named {directiveName}.
  const directive = schema.getDirective(directiveName);

  // If {directive} does not exist, return undefined.
  if (!directive) {
    return;
  }

  // Otherwise return the directive in the {schema} named {directiveName}.
  return { kind: 'Directive', directive };
}

/**
 * SchemaCoordinate : @ Name ( Name : )
 */
function resolveDirectiveArgumentCoordinate(
  schema: GraphQLSchema,
  schemaCoordinate: DirectiveArgumentCoordinateNode,
): ResolvedDirectiveArgument | undefined {
  // Let {directiveName} be the value of the first {Name}.
  const directiveName = schemaCoordinate.name.value;

  // Let {directive} be the directive in the {schema} named {directiveName}.
  const directive = schema.getDirective(directiveName);

  // Assert that {directive} exists.
  if (!directive) {
    throw new Error(
      `Expected ${inspect(directiveName)} to be defined as a directive in the schema.`,
    );
  }

  // Let {directiveArgumentName} be the value of the second {Name}.
  const {
    argumentName: { value: directiveArgumentName },
  } = schemaCoordinate;
  const directiveArgument = directive.args.find(
    (arg) => arg.name === directiveArgumentName,
  );

  // If {directiveArgumentName} does not exist, return undefined.
  if (!directiveArgument) {
    return;
  }

  // Return the argument of {directive} named {directiveArgumentName}.
  return { kind: 'DirectiveArgument', directive, directiveArgument };
}

/**
 * SchemaCoordinate : Name
 */
function resolveTypeCoordinate(
  schema: GraphQLSchema,
  schemaCoordinate: TypeCoordinateNode,
): ResolvedNamedType | undefined {
  // Let {typeName} be the value of the first {Name}.
  const typeName = schemaCoordinate.name.value;

  // Let {type} be the type in the {schema} named {typeName}.
  const type = schema.getType(typeName);

  // If {type} does not exist, return undefined.
  if (!type) {
    return;
  }

  // Return the type in the {schema} named {typeName}.
  return { kind: 'NamedType', type };
}

/**
 * SchemaCoordinate : Name . Name
 */
function resolveMemberCoordinate(
  schema: GraphQLSchema,
  schemaCoordinate: MemberCoordinateNode,
): ResolvedField | ResolvedInputField | ResolvedEnumValue | undefined {
  // Let {typeName} be the value of the first {Name}.
  const typeName = schemaCoordinate.name.value;

  // Let {type} be the type in the {schema} named {typeName}.
  const type = schema.getType(typeName);

  // Assert that {type} exists.
  if (!type) {
    throw new Error(
      `Expected ${inspect(typeName)} to be defined as a type in the schema.`,
    );
  }

  const memberName = schemaCoordinate.memberName.value;

  // If {type} is an Enum type:
  if (isEnumType(type)) {
    // Let {enumValueName} be the value of the second {Name}.
    const enumValue = type.getValue(memberName);

    // TODO: Add a spec line about returning undefined if the member name does not exist.
    if (enumValue == null) {
      return;
    }

    // Return the enum value of {type} named {enumValueName}.
    return { kind: 'EnumValue', type, enumValue };
  }

  // Otherwise if {type} is an Input Object type:
  if (isInputObjectType(type)) {
    // Let {inputFieldName} be the value of the second {Name}.
    const inputField = type.getFields()[memberName];

    // TODO: Add a spec line about returning undefined if the member name does not exist.
    if (inputField == null) {
      return;
    }

    // Return the input field of {type} named {inputFieldName}.
    return { kind: 'InputField', type, inputField };
  }

  // Otherwise:
  // Assert {type} must be an Object or Interface type.
  if (!isObjectType(type) && !isInterfaceType(type)) {
    throw new Error(
      `Expected ${inspect(typeName)} to be an object type, interface type, input object type, or enum type.`,
    );
  }

  // Let {fieldName} be the value of the second {Name}.
  const field = type.getFields()[memberName];

  // TODO: Add a spec line about returning undefined if the member name does not exist.
  if (field == null) {
    return;
  }

  // Return the field of {type} named {fieldName}.
  return { kind: 'Field', type, field };
}

/**
 * SchemaCoordinate : Name . Name ( Name : )
 */
function resolveArgumentCoordinate(
  schema: GraphQLSchema,
  schemaCoordinate: ArgumentCoordinateNode,
): ResolvedFieldArgument | undefined {
  // Let {typeName} be the value of the first {Name}.
  const typeName = schemaCoordinate.name.value;

  // Let {type} be the type in the {schema} named {typeName}.
  const type = schema.getType(typeName);

  // Assert that {type} exists.
  if (!type) {
    throw new Error(
      `Expected ${inspect(typeName)} to be defined as a type in the schema.`,
    );
  }

  const fieldName = schemaCoordinate.fieldName.value;

  // Assert {type} must be an Object or Interface type.
  if (!isObjectType(type) && !isInterfaceType(type)) {
    throw new Error(
      `Expected ${inspect(typeName)} to be an object type or interface type.`,
    );
  }

  // Let {fieldName} be the value of the second {Name}.
  // Let {field} be the field of {type} named {fieldName}.
  const field = type.getFields()[fieldName];

  // Assert {field} must exist.
  if (field == null) {
    throw new Error(
      `Expected ${inspect(fieldName)} to exist as an argument of type ${inspect(typeName)} in the schema.`,
    );
  }

  // Let {fieldArgumentName} be the value of the third {Name}.
  const fieldArgumentName = schemaCoordinate.argumentName.value;
  const fieldArgument = field.args.find(
    (arg) => arg.name === fieldArgumentName,
  );

  // TODO: Add a spec line about returning undefined if the argument does not exist.
  if (fieldArgument == null) {
    return;
  }

  // Return the argument of {field} named {fieldArgumentName}.
  return { kind: 'FieldArgument', type, field, fieldArgument };
}

/**
 * Resolves schema coordinate from a parsed SchemaCoordinate node.
 */
export function resolveASTSchemaCoordinate(
  schema: GraphQLSchema,
  schemaCoordinate: SchemaCoordinateNode,
): ResolvedSchemaElement | undefined {
  switch (schemaCoordinate.kind) {
    case Kind.DIRECTIVE_COORDINATE:
      return resolveDirectiveCoordinate(schema, schemaCoordinate);
    case Kind.DIRECTIVE_ARGUMENT_COORDINATE:
      return resolveDirectiveArgumentCoordinate(schema, schemaCoordinate);
    case Kind.TYPE_COORDINATE:
      return resolveTypeCoordinate(schema, schemaCoordinate);
    case Kind.MEMBER_COORDINATE:
      return resolveMemberCoordinate(schema, schemaCoordinate);
    case Kind.ARGUMENT_COORDINATE:
      return resolveArgumentCoordinate(schema, schemaCoordinate);
  }
}
