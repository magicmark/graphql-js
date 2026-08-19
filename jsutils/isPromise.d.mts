/** @internal */
export declare function isPromise(value: unknown): value is Promise<unknown>;
/**
 * Returns true if the value acts like a Promise, i.e. has a "then" function,
 * otherwise returns false.
 *
 * @internal
 */
export declare function isPromiseLike(value: any): value is PromiseLike<unknown>;
