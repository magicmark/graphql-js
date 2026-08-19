import type { PromiseOrValue } from "../jsutils/PromiseOrValue.js";
/**
 * Given an AsyncGenerator and provided functions, return an AsyncGenerator
 * which calls the given functions when the generator is abruptly closed,
 * calling the functions immediately even if the generator is paused.
 *
 * This is useful for allowing return and throw to trigger logic even if the
 * generator is paused on a pending await within a `next()` call (including
 * if that logic can cause that hanging `next()` call to return early).
 *
 * Errors from the provided functions are ignored.
 *
 * @internal
 */
export declare function withConcurrentAbruptClose<T>(generator: AsyncGenerator<T, void, void>, beforeReturn: () => PromiseOrValue<void>, beforeThrow?: (error?: unknown) => PromiseOrValue<void>): AsyncGenerator<T, void, void>;
