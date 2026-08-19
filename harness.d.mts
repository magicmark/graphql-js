/** @category Harness */
import type { PromiseOrValue } from "./jsutils/PromiseOrValue.mjs";
import { parse } from "./language/parser.mjs";
import { validate } from "./validation/validate.mjs";
import { execute, subscribe } from "./execution/execute.mjs";
/** Function used by a GraphQL harness to parse GraphQL source text. */
export type GraphQLParseFn = (...args: Parameters<typeof parse>) => PromiseOrValue<ReturnType<typeof parse>>;
/** Function used by a GraphQL harness to validate a parsed document. */
export type GraphQLValidateFn = (...args: Parameters<typeof validate>) => PromiseOrValue<ReturnType<typeof validate>>;
/** Function used by a GraphQL harness to execute a valid operation. */
export type GraphQLExecuteFn = (...args: Parameters<typeof execute>) => ReturnType<typeof execute>;
/** Function used by a GraphQL harness to create a subscription response stream. */
export type GraphQLSubscribeFn = (...args: Parameters<typeof subscribe>) => ReturnType<typeof subscribe>;
/**
 * Overrides for the parse, validate, execute, and subscribe stages used by the
 * high-level `graphql` and `graphqlSync` request pipeline.
 */
export interface GraphQLHarness {
    /** Parses GraphQL source text into a document AST. */
    parse: GraphQLParseFn;
    /** Validates a document AST against a schema. */
    validate: GraphQLValidateFn;
    /** Executes a valid operation. */
    execute: GraphQLExecuteFn;
    /** Creates a response stream for a subscription operation. */
    subscribe: GraphQLSubscribeFn;
}
/**
 * Default harness backed by GraphQL.js parse, validate, execute, and subscribe
 * implementations.
 */
export declare const defaultHarness: GraphQLHarness;
