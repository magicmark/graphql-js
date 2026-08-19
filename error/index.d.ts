/**
 * Create, format, and locate GraphQL errors.
 *
 * These exports are also available from the root `graphql` package.
 * @packageDocumentation
 */
export { GraphQLError } from "./GraphQLError.js";
export type { GraphQLErrorOptions, GraphQLFormattedError, GraphQLErrorExtensions, GraphQLFormattedErrorExtensions, } from "./GraphQLError.js";
export { syntaxError } from "./syntaxError.js";
export { locatedError } from "./locatedError.js";
