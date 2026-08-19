import type { PromiseOrValue } from "../jsutils/PromiseOrValue.js";
/**
 * Given an AsyncIterable and a callback function, return an AsyncIterator
 * which produces values mapped via calling the callback function.
 *
 * @internal
 */
export declare function mapAsyncIterable<T, U>(iterable: AsyncGenerator<T> | AsyncIterable<T>, callback: (value: T) => PromiseOrValue<U>): AsyncGenerator<U, void, void>;
