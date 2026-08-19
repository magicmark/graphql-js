/** @category Validation Rules */
import type { ASTVisitor } from "../../language/visitor.js";
import type { ValidationContext } from "../ValidationContext.js";
/**
 * Stream directives are used on list fields
 *
 * A GraphQL document is only valid if stream directives are used on list fields.
 * @param context - The validation context used while checking the document.
 * @returns A visitor that reports validation errors for this rule.
 * @example
 * ```ts
 * import { parse } from 'graphql/language';
 * import { buildSchema } from 'graphql/utilities';
 * import { validate, StreamDirectiveOnListFieldRule } from 'graphql/validation';
 *
 * const schema = buildSchema(`
 *   type Query {
 *     name: String
 *     friends: [String]
 *   }
 * `);
 * const invalidDocument = parse('{ name @stream(initialCount: 0) }');
 * const validDocument = parse('{ friends @stream(initialCount: 0) }');
 *
 * validate(schema, invalidDocument, [StreamDirectiveOnListFieldRule]).length; // => 1
 * validate(schema, validDocument, [StreamDirectiveOnListFieldRule]); // => []
 * ```
 */
export declare function StreamDirectiveOnListFieldRule(context: ValidationContext): ASTVisitor;
