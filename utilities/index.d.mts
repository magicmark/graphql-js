/**
 * Utilities for building schemas, working with introspection, transforming ASTs,
 * and comparing GraphQL types.
 *
 * These exports are also available from the root `graphql` package.
 * @packageDocumentation
 */
export { getIntrospectionQuery } from "./getIntrospectionQuery.mjs";
export type { IntrospectionOptions, IntrospectionQuery, IntrospectionSchema, IntrospectionType, IntrospectionInputType, IntrospectionOutputType, IntrospectionScalarType, IntrospectionObjectType, IntrospectionInterfaceType, IntrospectionUnionType, IntrospectionEnumType, IntrospectionInputObjectType, IntrospectionTypeRef, IntrospectionInputTypeRef, IntrospectionOutputTypeRef, IntrospectionNamedTypeRef, IntrospectionListTypeRef, IntrospectionNonNullTypeRef, IntrospectionField, IntrospectionInputValue, IntrospectionEnumValue, IntrospectionDirective, } from "./getIntrospectionQuery.mjs";
export { getOperationAST } from "./getOperationAST.mjs";
export { introspectionFromSchema } from "./introspectionFromSchema.mjs";
export { buildClientSchema } from "./buildClientSchema.mjs";
export { buildASTSchema, buildSchema } from "./buildASTSchema.mjs";
export type { BuildSchemaOptions } from "./buildASTSchema.mjs";
export { extendSchema } from "./extendSchema.mjs";
export { lexicographicSortSchema } from "./lexicographicSortSchema.mjs";
export { printSchema, printType, printDirective, printIntrospectionSchema, } from "./printSchema.mjs";
export { typeFromAST } from "./typeFromAST.mjs";
export { 
/**
 * Deprecated export retained for compatibility. Use `coerceInputLiteral()`
 * instead.
 * @deprecated use `coerceInputLiteral()` instead - will be removed in v18
 */
valueFromAST, } from "./valueFromAST.mjs";
export { valueFromASTUntyped } from "./valueFromASTUntyped.mjs";
export { 
/**
 * Deprecated export retained for compatibility. Use `valueToLiteral()`
 * instead, and take care to operate on external values.
 * @deprecated use `valueToLiteral()` instead with care to operate on external values - `astFromValue()` will be removed in v18
 */
astFromValue, } from "./astFromValue.mjs";
export { TypeInfo, visitWithTypeInfo } from "./TypeInfo.mjs";
export { replaceVariables } from "./replaceVariables.mjs";
export { valueToLiteral } from "./valueToLiteral.mjs";
export { coerceInputValue, coerceInputLiteral, } from "./coerceInputValue.mjs";
export { validateInputValue, validateInputLiteral, } from "./validateInputValue.mjs";
export { concatAST } from "./concatAST.mjs";
export { separateOperations } from "./separateOperations.mjs";
export { stripIgnoredCharacters } from "./stripIgnoredCharacters.mjs";
export { isEqualType, isTypeSubTypeOf, doTypesOverlap, } from "./typeComparators.mjs";
export { BreakingChangeType, DangerousChangeType, SafeChangeType, findBreakingChanges, findDangerousChanges, findSchemaChanges, } from "./findSchemaChanges.mjs";
export type { BreakingChange, DangerousChange, SafeChange, SchemaChange, } from "./findSchemaChanges.mjs";
export type { TypedQueryDocumentNode } from "./typedQueryDocumentNode.mjs";
export { resolveSchemaCoordinate, resolveASTSchemaCoordinate, } from "./resolveSchemaCoordinate.mjs";
export type { ResolvedSchemaElement } from "./resolveSchemaCoordinate.mjs";
