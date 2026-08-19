import type { ObjMap } from "./ObjMap.js";
import type { PromiseOrValue } from "./PromiseOrValue.js";
/**
 * This function transforms a JS object `ObjMap<Promise<T>>` into
 * a `Promise<ObjMap<T>>`
 *
 * This is akin to bluebird's `Promise.props`, but implemented only using
 * `Promise.all` so it will work with any implementation of ES6 promises.
 *
 * @internal
 */
export declare function promiseForObject<T>(object: Readonly<ObjMap<PromiseOrValue<T>>>, promiseAll: <TValue>(values: ReadonlyArray<PromiseOrValue<TValue>>) => Promise<Array<TValue>>): Promise<ObjMap<T>>;
