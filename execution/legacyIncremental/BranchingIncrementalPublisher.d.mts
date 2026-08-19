import type { ObjMap } from "../../jsutils/ObjMap.mjs";
import type { GraphQLError } from "../../error/GraphQLError.mjs";
import type { IncrementalWork } from "../incremental/IncrementalExecutor.mjs";
import type { LegacyExperimentalIncrementalExecutionResults } from "./BranchingIncrementalExecutor.mjs";
/** @internal */
export declare class BranchingIncrementalPublisher {
    private _indices;
    constructor();
    buildResponse(data: ObjMap<unknown>, errors: ReadonlyArray<GraphQLError>, work: IncrementalWork, abortSignal: AbortSignal | undefined, onFinished: () => void): LegacyExperimentalIncrementalExecutionResults;
    private _handleBatch;
    private _handleWorkQueueEvent;
}
