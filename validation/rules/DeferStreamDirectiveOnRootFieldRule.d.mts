/** @category Validation Rules */
import type { ASTVisitor } from "../../language/visitor.mjs";
import type { ValidationContext } from "../ValidationContext.mjs";
/**
 * Defer and stream directives are used on valid root field
 *
 * A GraphQL document is only valid if defer directives are not used on root mutation or subscription types.
 * @param context - The validation context used while checking the document.
 * @returns A visitor that reports validation errors for this rule.
 * @example
 * ```ts
 * import { parse } from 'graphql/language';
 * import { buildSchema } from 'graphql/utilities';
 * import {
 *   validate,
 *   DeferStreamDirectiveOnRootFieldRule,
 * } from 'graphql/validation';
 *
 * const schema = buildSchema(`
 *   type Query {
 *     message: String
 *   }
 *
 *   type Mutation {
 *     updateMessage: String
 *   }
 * `);
 * const invalidDocument = parse(`
 *   mutation { ... @defer { updateMessage } }
 * `);
 * const validDocument = parse(`
 *   { ... @defer { message } }
 * `);
 *
 * validate(schema, invalidDocument, [DeferStreamDirectiveOnRootFieldRule]).length; // => 1
 * validate(schema, validDocument, [DeferStreamDirectiveOnRootFieldRule]); // => []
 * ```
 */
export declare function DeferStreamDirectiveOnRootFieldRule(context: ValidationContext): ASTVisitor;
