import type { PromiseOrValue } from "../../jsutils/PromiseOrValue.js";
type MaybePromise<T> = {
    status: 'fulfilled';
    value: T;
} | {
    status: 'pending';
    promise: Promise<T>;
} | {
    status: 'rejected';
    reason: unknown;
};
/** @internal * */
export declare class Computation<T> {
    private _fn;
    private _onAbort;
    private _maybePromise?;
    constructor(fn: () => PromiseOrValue<T>, onAbort?: (reason?: unknown) => PromiseOrValue<void>);
    prime(): MaybePromise<T>;
    result(): PromiseOrValue<T>;
    abort(reason?: unknown): PromiseOrValue<void>;
}
export {};
