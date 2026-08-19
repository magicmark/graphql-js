/** @category Validation Rules */
import type { ASTVisitor } from "../../language/visitor.js";
import type { ValidationContext } from "../ValidationContext.js";
/**
 * Defer and stream directive labels are unique
 *
 * A GraphQL document is only valid if defer and stream directives' label argument is static and unique.
 * @param context - The validation context used while checking the document.
 * @returns A visitor that reports validation errors for this rule.
 * @example
 * ```ts
 * import { parse } from 'graphql/language';
 * import { buildSchema } from 'graphql/utilities';
 * import { validate, DeferStreamDirectiveLabelRule } from 'graphql/validation';
 *
 * const schema = buildSchema(`
 *   type Query {
 *     friends: [String]
 *   }
 * `);
 * const invalidDocument = parse(`
 *   {
 *     friends @stream(label: "friends")
 *     other: friends @stream(label: "friends")
 *   }
 * `);
 * const validDocument = parse(`
 *   {
 *     friends @stream(label: "friends")
 *     other: friends @stream(label: "otherFriends")
 *   }
 * `);
 *
 * validate(schema, invalidDocument, [DeferStreamDirectiveLabelRule]).length; // => 1
 * validate(schema, validDocument, [DeferStreamDirectiveLabelRule]); // => []
 * ```
 */
export declare function DeferStreamDirectiveLabelRule(context: ValidationContext): ASTVisitor;
