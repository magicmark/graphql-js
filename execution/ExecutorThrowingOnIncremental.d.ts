import type { ObjMap } from "../jsutils/ObjMap.js";
import type { Path } from "../jsutils/Path.js";
import type { PromiseOrValue } from "../jsutils/PromiseOrValue.js";
import type { GraphQLList, GraphQLObjectType, GraphQLOutputType, GraphQLResolveInfo } from "../type/index.js";
import type { DeferUsage, FieldDetailsList, GroupedFieldSet } from "./collectFields.js";
import { Executor } from "./Executor.js";
/** @internal */
export declare class ExecutorThrowingOnIncremental extends Executor {
    executeCollectedRootFields(rootType: GraphQLObjectType, rootValue: unknown, originalGroupedFieldSet: GroupedFieldSet, serially: boolean, newDeferUsages: ReadonlyArray<DeferUsage>): PromiseOrValue<ObjMap<unknown>>;
    executeCollectedSubfields(parentType: GraphQLObjectType, sourceValue: unknown, path: Path | undefined, originalGroupedFieldSet: GroupedFieldSet, newDeferUsages: ReadonlyArray<DeferUsage>): PromiseOrValue<ObjMap<unknown>>;
    completeListValue(returnType: GraphQLList<GraphQLOutputType>, fieldDetailsList: FieldDetailsList, info: GraphQLResolveInfo, path: Path, result: unknown, positionContext: undefined): PromiseOrValue<ReadonlyArray<unknown>>;
}
