/**
 * Drain a sync iterator after abrupt completion so later promise rejections
 * can be observed before they become unhandled.
 *
 * @internal
 */
export declare function collectIteratorPromises(iterator: Iterator<unknown>): Array<unknown>;
