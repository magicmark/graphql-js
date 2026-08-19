import type { GraphQLResolveInfoHelpers } from "../type/index.mjs";
import { AsyncWorkTracker } from "./AsyncWorkTracker.mjs";
/** @internal */
export interface SharedExecutionContext {
    asyncWorkTracker: AsyncWorkTracker;
    getAbortSignal: () => AbortSignal | undefined;
    getAsyncHelpers: () => GraphQLResolveInfoHelpers;
    promiseAll: <T>(values: ReadonlyArray<PromiseLike<T> | T>) => Promise<Array<T>>;
}
/** @internal */
export declare function createSharedExecutionContext(abortSignal: AbortSignal | undefined): SharedExecutionContext;
