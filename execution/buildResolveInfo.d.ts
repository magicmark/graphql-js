import type { ObjMap } from "../jsutils/ObjMap.js";
import type { Path } from "../jsutils/Path.js";
import type { FieldNode, FragmentDefinitionNode, OperationDefinitionNode } from "../language/ast.js";
import type { GraphQLField, GraphQLObjectType, GraphQLResolveInfo, GraphQLResolveInfoHelpers } from "../type/index.js";
import type { GraphQLSchema } from "../type/schema.js";
import type { VariableValues } from "./values.js";
/** @internal */
export interface BuildResolveInfoExecutionArgs {
    schema: GraphQLSchema;
    fragmentDefinitions: ObjMap<FragmentDefinitionNode>;
    rootValue: unknown;
    operation: OperationDefinitionNode;
    variableValues: VariableValues;
}
/** @internal */
export declare function buildResolveInfo(validatedExecutionArgs: BuildResolveInfoExecutionArgs, fieldDef: GraphQLField<unknown, unknown>, fieldNodes: ReadonlyArray<FieldNode>, parentType: GraphQLObjectType, path: Path, getAbortSignal: () => AbortSignal | undefined, getAsyncHelpers: () => GraphQLResolveInfoHelpers): GraphQLResolveInfo;
