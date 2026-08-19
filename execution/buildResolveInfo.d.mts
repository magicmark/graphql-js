import type { ObjMap } from "../jsutils/ObjMap.mjs";
import type { Path } from "../jsutils/Path.mjs";
import type { FieldNode, FragmentDefinitionNode, OperationDefinitionNode } from "../language/ast.mjs";
import type { GraphQLField, GraphQLObjectType, GraphQLResolveInfo, GraphQLResolveInfoHelpers } from "../type/index.mjs";
import type { GraphQLSchema } from "../type/schema.mjs";
import type { VariableValues } from "./values.mjs";
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
