import type { ObjMap } from "../jsutils/ObjMap.mjs";
import type { Path } from "../jsutils/Path.mjs";
import type { PromiseOrValue } from "../jsutils/PromiseOrValue.mjs";
import type { GraphQLList, GraphQLObjectType, GraphQLOutputType, GraphQLResolveInfo } from "../type/index.mjs";
import type { DeferUsage, FieldDetailsList, GroupedFieldSet } from "./collectFields.mjs";
import { Executor } from "./Executor.mjs";
/** @internal */
export declare class ExecutorThrowingOnIncremental extends Executor {
    executeCollectedRootFields(rootType: GraphQLObjectType, rootValue: unknown, originalGroupedFieldSet: GroupedFieldSet, serially: boolean, newDeferUsages: ReadonlyArray<DeferUsage>): PromiseOrValue<ObjMap<unknown>>;
    executeCollectedSubfields(parentType: GraphQLObjectType, sourceValue: unknown, path: Path | undefined, originalGroupedFieldSet: GroupedFieldSet, newDeferUsages: ReadonlyArray<DeferUsage>): PromiseOrValue<ObjMap<unknown>>;
    completeListValue(returnType: GraphQLList<GraphQLOutputType>, fieldDetailsList: FieldDetailsList, info: GraphQLResolveInfo, path: Path, result: unknown, positionContext: undefined): PromiseOrValue<ReadonlyArray<unknown>>;
}
