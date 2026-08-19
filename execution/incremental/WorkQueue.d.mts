import type { Computation } from "./Computation.mjs";
import { Queue } from "./Queue.mjs";
/** @internal */
export interface Group<TSelf extends Group<TSelf>> {
    parent?: TSelf | undefined;
}
interface WorkResult<TValue, T, I, G extends Group<G>, S extends Stream<T, I, G, S>> {
    value: TValue;
    work?: Work<T, I, G, S> | undefined;
}
/** @internal */
export interface Stream<T, I, G extends Group<G>, S extends Stream<T, I, G, S>> {
    queue: Queue<StreamItem<T, I, G, S>>;
}
/** @internal */
export interface Work<T, I, G extends Group<G>, S extends Stream<T, I, G, S>> {
    groups?: ReadonlyArray<G>;
    tasks?: ReadonlyArray<Task<T, I, G, S>>;
    streams?: ReadonlyArray<S>;
}
interface NewWork<T, I, G extends Group<G>, S extends Stream<T, I, G, S>> {
    newGroups: ReadonlyArray<G>;
    newStreams: ReadonlyArray<S>;
}
/** @internal */
export interface WorkQueue<T, I, G extends Group<G>, S extends Stream<T, I, G, S>> {
    initialGroups: ReadonlyArray<G>;
    initialStreams: ReadonlyArray<S>;
    events: AsyncGenerator<ReadonlyArray<WorkQueueEvent<T, I, G, S>>, void, void>;
}
/** @internal */
export type StreamItem<T, I, G extends Group<G>, S extends Stream<T, I, G, S>> = WorkResult<I, T, I, G, S>;
/** @internal */
export type TaskResult<T, I, G extends Group<G>, S extends Stream<T, I, G, S>> = WorkResult<T, T, I, G, S>;
/** @internal */
export interface Task<T, I, G extends Group<G>, S extends Stream<T, I, G, S>> {
    groups: ReadonlyArray<G>;
    computation: Computation<TaskResult<T, I, G, S>>;
}
interface StreamSuccessEvent<T, I, G extends Group<G>, S extends Stream<T, I, G, S>> {
    kind: 'STREAM_SUCCESS';
    stream: S;
}
interface StreamFailureEvent<T, I, G extends Group<G>, S extends Stream<T, I, G, S>> {
    kind: 'STREAM_FAILURE';
    stream: S;
    error: unknown;
}
interface GroupValuesEvent<T, I, G extends Group<G>, S extends Stream<T, I, G, S>> {
    kind: 'GROUP_VALUES';
    group: G;
    values: ReadonlyArray<T>;
}
interface GroupSuccessEvent<T, I, G extends Group<G>, S extends Stream<T, I, G, S>> extends NewWork<T, I, G, S> {
    kind: 'GROUP_SUCCESS';
    group: G;
}
interface GroupFailureEvent<G extends Group<G>> {
    kind: 'GROUP_FAILURE';
    group: G;
    error: unknown;
}
interface StreamValuesEvent<T, I, G extends Group<G>, S extends Stream<T, I, G, S>> extends NewWork<T, I, G, S> {
    kind: 'STREAM_VALUES';
    stream: S;
    values: ReadonlyArray<I>;
}
interface WorkQueueTerminationEvent {
    kind: 'WORK_QUEUE_TERMINATION';
}
/** @internal */
export type WorkQueueEvent<T, I, G extends Group<G>, S extends Stream<T, I, G, S>> = GroupValuesEvent<T, I, G, S> | GroupSuccessEvent<T, I, G, S> | GroupFailureEvent<G> | StreamValuesEvent<T, I, G, S> | StreamSuccessEvent<T, I, G, S> | StreamFailureEvent<T, I, G, S> | WorkQueueTerminationEvent;
/** @internal */
export declare function createWorkQueue<T, I, G extends Group<G>, S extends Stream<T, I, G, S>>(initialWork: Work<T, I, G, S> | undefined): WorkQueue<T, I, G, S>;
export {};
