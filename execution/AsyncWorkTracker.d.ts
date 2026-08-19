/** @internal */
export declare class AsyncWorkTracker {
    pendingAsyncWork: Set<PromiseLike<void>>;
    constructor();
    add(promiseLike: PromiseLike<unknown>): void;
    addValues(values: ReadonlyArray<unknown>): void;
    wait(): Promise<void> | void;
    promiseAllTrackOnReject<T>(values: ReadonlyArray<PromiseLike<T> | T>): Promise<Array<T>>;
    private waitForPendingAsyncWork;
}
