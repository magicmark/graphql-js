/** @internal */
export interface CancellablePromise<T> {
    promise: Promise<T>;
    abort: (reason?: unknown) => void;
}
/** @internal */
export declare function withCancellation<T>(originalPromise: Promise<T>): CancellablePromise<T>;
/** @internal */
export declare function cancellablePromise<T>(promise: Promise<T>, abortSignal: AbortSignal): Promise<T>;
