import type { ObjMap } from "../../jsutils/ObjMap.js";
import type { GraphQLError } from "../../error/GraphQLError.js";
import type { IncrementalWork } from "../incremental/IncrementalExecutor.js";
import type { LegacyExperimentalIncrementalExecutionResults } from "./BranchingIncrementalExecutor.js";
/** @internal */
export declare class BranchingIncrementalPublisher {
    private _indices;
    constructor();
    buildResponse(data: ObjMap<unknown>, errors: ReadonlyArray<GraphQLError>, work: IncrementalWork, abortSignal: AbortSignal | undefined, onFinished: () => void): LegacyExperimentalIncrementalExecutionResults;
    private _handleBatch;
    private _handleWorkQueueEvent;
}
