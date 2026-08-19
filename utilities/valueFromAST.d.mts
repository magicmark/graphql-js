/** @category Values */
import type { Maybe } from "../jsutils/Maybe.mjs";
import type { ObjMap } from "../jsutils/ObjMap.mjs";
import type { ValueNode } from "../language/ast.mjs";
import type { GraphQLInputType } from "../type/definition.mjs";
/**
 * Produces a JavaScript value given a GraphQL Value AST.
 *
 * A GraphQL type must be provided, which will be used to interpret different
 * GraphQL Value literals.
 *
 * Returns `undefined` when the value could not be validly coerced according to
 * the provided type.
 *
 * This deprecated function will be removed in v18. Use `coerceInputLiteral()`
 * instead.
 *
 * | GraphQL Value        | JSON Value    |
 * | -------------------- | ------------- |
 * | Input Object         | Object        |
 * | List                 | Array         |
 * | Boolean              | Boolean       |
 * | String               | String        |
 * | Int / Float          | Number        |
 * | Enum Value           | Unknown       |
 * | NullValue            | null          |
 * @param valueNode - GraphQL value AST node to convert.
 * @param type - The GraphQL type to inspect.
 * @param variables - Optional runtime variable values keyed by variable name.
 * @returns The coerced JavaScript value, or undefined if the AST value cannot be coerced to the type.
 * @example
 * ```ts
 * // Coerce literal values without variables.
 * import { parseValue } from 'graphql/language';
 * import {
 *   GraphQLInputObjectType,
 *   GraphQLInt,
 *   GraphQLList,
 *   GraphQLNonNull,
 *   GraphQLString,
 * } from 'graphql/type';
 * import { valueFromAST } from 'graphql/utilities';
 *
 * const ReviewInput = new GraphQLInputObjectType({
 *   name: 'ReviewInput',
 *   fields: {
 *     stars: { type: new GraphQLNonNull(GraphQLInt) },
 *     tags: { type: new GraphQLList(GraphQLString) },
 *   },
 * });
 *
 * valueFromAST(parseValue('{ stars: 5, tags: ["featured"] }'), ReviewInput); // => { stars: 5, tags: ['featured'] }
 * valueFromAST(parseValue('{ stars: "bad" }'), ReviewInput); // => undefined
 * ```
 * @example
 * ```ts
 * // This variant resolves variable references from runtime values.
 * import { parseValue } from 'graphql/language';
 * import { GraphQLInt } from 'graphql/type';
 * import { valueFromAST } from 'graphql/utilities';
 *
 * valueFromAST(parseValue('$stars'), GraphQLInt, { stars: 5 }); // => 5
 * valueFromAST(parseValue('$stars'), GraphQLInt, {}); // => undefined
 * ```
 * @deprecated use `coerceInputLiteral()` instead - will be removed in v18
 */
export declare function valueFromAST(valueNode: Maybe<ValueNode>, type: GraphQLInputType, variables?: Maybe<ObjMap<unknown>>): unknown;
