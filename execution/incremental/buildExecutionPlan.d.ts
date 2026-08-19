import { SetMap } from "../../jsutils/SetMap.js";
import type { DeferUsage, GroupedFieldSet } from "../collectFields.js";
/** @internal */
export type DeferUsageSet = ReadonlySet<DeferUsage>;
/** @internal */
export interface ExecutionPlan {
    groupedFieldSet: GroupedFieldSet;
    newGroupedFieldSets: SetMap<DeferUsage, GroupedFieldSet>;
}
/** @internal */
export declare function buildExecutionPlan(originalGroupedFieldSet: GroupedFieldSet, parentDeferUsages?: DeferUsageSet): ExecutionPlan;
