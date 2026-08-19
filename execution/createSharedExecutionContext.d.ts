import type { GraphQLResolveInfoHelpers } from "../type/index.js";
import { AsyncWorkTracker } from "./AsyncWorkTracker.js";
/** @internal */
export interface SharedExecutionContext {
    asyncWorkTracker: AsyncWorkTracker;
    getAbortSignal: () => AbortSignal | undefined;
    getAsyncHelpers: () => GraphQLResolveInfoHelpers;
    promiseAll: <T>(values: ReadonlyArray<PromiseLike<T> | T>) => Promise<Array<T>>;
}
/** @internal */
export declare function createSharedExecutionContext(abortSignal: AbortSignal | undefined): SharedExecutionContext;
