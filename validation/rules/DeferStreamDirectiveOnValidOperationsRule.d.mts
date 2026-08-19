/** @category Validation Rules */
import type { ASTVisitor } from "../../language/visitor.mjs";
import type { ValidationContext } from "../ValidationContext.mjs";
/**
 * Defer And Stream Directives Are Used On Valid Operations
 *
 * A GraphQL document is only valid if defer and stream directives are not used on root mutation or subscription types.
 * @param context - The validation context used while checking the document.
 * @returns A visitor that reports validation errors for this rule.
 * @example
 * ```ts
 * import { parse } from 'graphql/language';
 * import { buildSchema } from 'graphql/utilities';
 * import {
 *   validate,
 *   DeferStreamDirectiveOnValidOperationsRule,
 * } from 'graphql/validation';
 *
 * const schema = buildSchema(`
 *   type Query {
 *     message: Message
 *   }
 *
 *   type Subscription {
 *     message: Message
 *   }
 *
 *   type Message {
 *     body: String
 *   }
 * `);
 * const invalidDocument = parse(`
 *   subscription {
 *     message {
 *       ...MessageBody @defer
 *     }
 *   }
 *
 *   fragment MessageBody on Message {
 *     body
 *   }
 * `);
 * const validDocument = parse(`
 *   subscription {
 *     message {
 *       ...MessageBody @defer(if: false)
 *     }
 *   }
 *
 *   fragment MessageBody on Message {
 *     body
 *   }
 * `);
 *
 * validate(schema, invalidDocument, [DeferStreamDirectiveOnValidOperationsRule])
 *   .length; // => 1
 * validate(schema, validDocument, [DeferStreamDirectiveOnValidOperationsRule]); // => []
 * ```
 */
export declare function DeferStreamDirectiveOnValidOperationsRule(context: ValidationContext): ASTVisitor;
