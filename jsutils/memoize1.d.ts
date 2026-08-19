/**
 * Memoizes the provided one-argument function.
 *
 * @internal
 */
export declare function memoize1<A1 extends object, R>(fn: (a1: A1) => R): (a1: A1) => R;
