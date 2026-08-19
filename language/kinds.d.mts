/** @category Kinds */
import type * as Kind_ from "./kinds_.mjs";
/** The namespace containing all AST node kind constants. */
export * as Kind from "./kinds_.mjs";
/** The set of allowed kind values for AST nodes. */
export type Kind = (typeof Kind_)[keyof typeof Kind_];
