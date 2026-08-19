import type { ConstValueNode } from "../language/ast.mjs";
import type { GraphQLArgument, GraphQLInputField } from "../type/definition.mjs";
/** @internal */
export declare function getDefaultValueAST(argOrInputField: GraphQLArgument | GraphQLInputField): ConstValueNode | undefined;
