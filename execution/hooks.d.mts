/** @category Execution */
import type { SharedExecutionContext } from "./createSharedExecutionContext.mjs";
import type { AsyncWorkFinishedInfo, ValidatedExecutionArgs } from "./ExecutionArgs.mjs";
/** @internal */
export declare function runAsyncWorkFinishedHook(validatedExecutionArgs: ValidatedExecutionArgs, sharedExecutionContext: SharedExecutionContext, asyncWorkFinishedHook: (info: AsyncWorkFinishedInfo) => void): void;
