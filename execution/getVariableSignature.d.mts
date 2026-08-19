import { GraphQLError } from "../error/GraphQLError.mjs";
import type { ConstValueNode, VariableDefinitionNode } from "../language/ast.mjs";
import type { GraphQLInputType, GraphQLSchema } from "../type/index.mjs";
/**
 * A GraphQLVariableSignature is required to coerce a variable value.
 *
 * Designed to have comparable interface to GraphQLArgument so that
 * getArgumentValues() can be reused for fragment arguments.
 *
 * @internal
 */
export interface GraphQLVariableSignature {
    name: string;
    type: GraphQLInputType;
    defaultValue?: never;
    default: {
        literal: ConstValueNode;
    } | undefined;
}
/** @internal */
export declare function getVariableSignature(schema: GraphQLSchema, varDefNode: VariableDefinitionNode): GraphQLVariableSignature | GraphQLError;
