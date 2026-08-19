/** @category Execution */
import type { SharedExecutionContext } from "./createSharedExecutionContext.js";
import type { AsyncWorkFinishedInfo, ValidatedExecutionArgs } from "./ExecutionArgs.js";
/** @internal */
export declare function runAsyncWorkFinishedHook(validatedExecutionArgs: ValidatedExecutionArgs, sharedExecutionContext: SharedExecutionContext, asyncWorkFinishedHook: (info: AsyncWorkFinishedInfo) => void): void;
