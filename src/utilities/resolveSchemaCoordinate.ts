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
 * SchemaCoordinate : Name
 */
function resolveTypeCoordinate(
  schema: GraphQLSchema,
  schemaCoordinate: TypeCoordinateNode,
): ResolvedNamedType | undefined {
  // 1. Let {typeName} be the value of the first {Name}.
  // 2. Let {type} be the type in the {schema} named {typeName}.
  const typeName = schemaCoordinate.name.value;
  const type = schema.getType(typeName);

  // 3. If {type} does not exist, return {void}.
  if (!type) {
    return;
  }

  // 4. {type}
  return { kind: 'NamedType', type };
}

/**
 * SchemaCoordinate : Name . Name
 */
function resolveMemberCoordinate(
  schema: GraphQLSchema,
  schemaCoordinate: MemberCoordinateNode,
): ResolvedField | ResolvedInputField | ResolvedEnumValue | undefined {
  // 1. Let {typeName} be the value of the first {Name}.
  // 2. Let {type} be the type in the {schema} named {typeName}.
  const typeName = schemaCoordinate.name.value;
  const type = schema.getType(typeName);

  // 3. Assert that {type} exists.
  if (!type) {
    throw new Error(
      `Expected ${inspect(typeName)} to be defined as a type in the schema.`,
    );
  }

  // 4. If {type} is an Enum type:
  if (isEnumType(type)) {
    // 5. Let {enumValueName} be the value of the second {Name}.
    // 6. Let {enumValue} be the enum value of {type} named {enumValueName}.
    const enumValueName = schemaCoordinate.memberName.value;
    const enumValue = type.getValue(enumValueName);

    // 7. If {enumValue} does not exist, return {void}.
    if (enumValue == null) {
      return;
    }

    // 8. Return {enumValue}
    return { kind: 'EnumValue', type, enumValue };
  }

  // 9. Otherwise if {type} is an Input Object type:
  if (isInputObjectType(type)) {
    // 10. Let {inputFieldName} be the value of the second {Name}.
    // 11. Let {inputField} be the input field of {type} named {inputFieldName}.
    const inputFieldName = schemaCoordinate.memberName.value;
    const inputField = type.getFields()[inputFieldName];

    // 12. If {inputField} does not exist, return {void}.
    if (inputField == null) {
      return;
    }

    // 13. Return {inputField}
    return { kind: 'InputField', type, inputField };
  }

  // 14. Otherwise:
  // 15. Assert {type} must be an Object or Interface type.
  if (!isObjectType(type) && !isInterfaceType(type)) {
    throw new Error(
      `Expected ${inspect(typeName)} to be an object type, interface type, input object type, or enum type.`,
    );
  }

  // 16. Let {fieldName} be the value of the second {Name}.
  // 17. Let {field} be the field of {type} named {fieldName}.
  const fieldName = schemaCoordinate.memberName.value;
  const field = type.getFields()[fieldName];

  // 18. If {field} does not exist, return {void}.
  if (field == null) {
    return;
  }

  // 19. Return {field}
  return { kind: 'Field', type, field };
}

/**
 * SchemaCoordinate : Name . Name ( Name : )
 */
function resolveArgumentCoordinate(
  schema: GraphQLSchema,
  schemaCoordinate: ArgumentCoordinateNode,
): ResolvedFieldArgument | undefined {
  // 1. Let {typeName} be the value of the first {Name}.
  // 2. Let {type} be the type in the {schema} named {typeName}.
  const typeName = schemaCoordinate.name.value;
  const type = schema.getType(typeName);

  // 3. Assert that {type} exists.
  if (type == null) {
    throw new Error(
      `Expected ${inspect(typeName)} to be defined as a type in the schema.`,
    );
  }

  // 4. Assert {type} must be an Object or Interface type.
  if (!isObjectType(type) && !isInterfaceType(type)) {
    throw new Error(
      `Expected ${inspect(typeName)} to be an object type or interface type.`,
    );
  }

  // 5. Let {fieldName} be the value of the second {Name}.
  // 6. Let {field} be the field of {type} named {fieldName}.
  const fieldName = schemaCoordinate.fieldName.value;
  const field = type.getFields()[fieldName];

  // 7. Assert {field} must exist.
  if (field == null) {
    throw new Error(
      `Expected ${inspect(fieldName)} to exist as a field of type ${inspect(typeName)} in the schema.`,
    );
  }

  // 8. Let {fieldArgumentName} be the value of the third {Name}.
  // 9. Let {fieldArgument} be the argument of {field} named {fieldArgumentName}.
  const fieldArgumentName = schemaCoordinate.argumentName.value;
  const fieldArgument = field.args.find(
    (arg) => arg.name === fieldArgumentName,
  );

  // 10. If {fieldArgument} does not exist, return {void}.
  if (fieldArgument == null) {
    return;
  }

  // 11. Return {fieldArgument}.
  return { kind: 'FieldArgument', type, field, fieldArgument };
}

/**
 * SchemaCoordinate : @ Name
 */
function resolveDirectiveCoordinate(
  schema: GraphQLSchema,
  schemaCoordinate: DirectiveCoordinateNode,
): ResolvedDirective | undefined {
  // 1. Let {directiveName} be the value of the first {Name}.
  // 2. Let {directive} be the directive in the {schema} named {directiveName}.
  const directiveName = schemaCoordinate.name.value;
  const directive = schema.getDirective(directiveName);

  // 3. If {directive} does not exist, return {void}.
  if (!directive) {
    return;
  }

  // 4. Otherwise return {directive}.
  return { kind: 'Directive', directive };
}

/**
 * SchemaCoordinate : @ Name ( Name : )
 */
function resolveDirectiveArgumentCoordinate(
  schema: GraphQLSchema,
  schemaCoordinate: DirectiveArgumentCoordinateNode,
): ResolvedDirectiveArgument | undefined {
  // 1. Let {directiveName} be the value of the first {Name}.
  // 2. Let {directive} be the directive in the {schema} named {directiveName}.
  const directiveName = schemaCoordinate.name.value;
  const directive = schema.getDirective(directiveName);

  // 3. Assert {directive} must exist.
  if (!directive) {
    throw new Error(
      `Expected ${inspect(directiveName)} to be defined as a directive in the schema.`,
    );
  }

  // 4. Let {directiveArgumentName} be the value of the second {Name}.
  // 5. Let {directiveArgument} be the argument of {directive} named {directiveArgumentName}.
  const {
    argumentName: { value: directiveArgumentName },
  } = schemaCoordinate;
  const directiveArgument = directive.args.find(
    (arg) => arg.name === directiveArgumentName,
  );

  // 6. If {directiveArgument} does not exist, return {void}.
  if (!directiveArgument) {
    return;
  }

  // 7. Return {directiveArgument}.
  return { kind: 'DirectiveArgument', directive, directiveArgument };
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
