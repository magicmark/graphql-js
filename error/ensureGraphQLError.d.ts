import { GraphQLError } from "./GraphQLError.js";
/**
 * Ensure an unknown thrown value is represented as a GraphQLError.
 *
 * @internal
 */
export declare function ensureGraphQLError(rawError: unknown): GraphQLError;
