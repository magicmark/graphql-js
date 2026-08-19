/** @category Execution */
import type { ObjMap } from "../jsutils/ObjMap.mjs";
import type { Path } from "../jsutils/Path.mjs";
import type { PromiseOrValue } from "../jsutils/PromiseOrValue.mjs";
import type { GraphQLFormattedError } from "../error/GraphQLError.mjs";
import { GraphQLError } from "../error/GraphQLError.mjs";
import type { GraphQLAbstractType, GraphQLLeafType, GraphQLList, GraphQLObjectType, GraphQLOutputType, GraphQLResolveInfo, GraphQLResolveInfoHelpers } from "../type/definition.mjs";
import type { GraphQLSchema } from "../type/schema.mjs";
import type { GraphQLExecuteRootSelectionSetContext, GraphQLResolveContext, MinimalTracingChannel } from "../diagnostics.mjs";
import { AbortedGraphQLExecutionError } from "./AbortedGraphQLExecutionError.mjs";
import type { DeferUsage, FieldDetailsList, GroupedFieldSet } from "./collectFields.mjs";
import { collectSubfields as _collectSubfields } from "./collectFields.mjs";
import type { SharedExecutionContext } from "./createSharedExecutionContext.mjs";
import type { ValidatedExecutionArgs } from "./ExecutionArgs.mjs";
import type { StreamUsage } from "./getStreamUsage.mjs";
import { getStreamUsage as _getStreamUsage } from "./getStreamUsage.mjs";
/**
 * Terminology
 *
 * "Definitions" are the generic name for top-level statements in the document.
 * Examples of this include:
 * 1) Operations (such as a query)
 * 2) Fragments
 *
 * "Operations" are a generic name for requests in the document.
 * Examples of this include:
 * 1) query,
 * 2) mutation
 *
 * "Selections" are the definitions that can appear legally and at
 * single level of the query. These include:
 * 1) field references e.g `a`
 * 2) fragment "spreads" e.g. `...c`
 * 3) inline fragment "spreads" e.g. `...on Type { a }`
 *
 * @internal
 */
/**
 * A memoized collection of relevant subfields with regard to the return
 * type. Memoizing ensures the subfields are not repeatedly calculated, which
 * saves overhead when resolving lists of values.
 *
 * @internal
 */
export declare const collectSubfields: (validatedExecutionArgs: ValidatedExecutionArgs, returnType: GraphQLObjectType, fieldDetailsList: FieldDetailsList) => ReturnType<typeof _collectSubfields>;
/** @internal */
export declare const getStreamUsage: typeof _getStreamUsage;
declare class CollectedErrors {
    private _errorPositions;
    private _errors;
    constructor();
    get errors(): ReadonlyArray<GraphQLError>;
    add(error: GraphQLError, path: Path | undefined): void;
    hasNulledPosition(startPath: Path | undefined): boolean;
}
/**
 * Represents the response produced by executing a GraphQL operation.
 * @typeParam TData - Shape of the execution data payload.
 * @typeParam TExtensions - Shape of the extensions payload.
 */
export interface ExecutionResult<TData = ObjMap<unknown>, TExtensions = ObjMap<unknown>> {
    /** Errors raised while parsing, validating, or executing the operation. */
    errors?: ReadonlyArray<GraphQLError>;
    /** Data returned by execution, or null when execution could not produce data. */
    data?: TData | null;
    /** Additional non-standard metadata included in the execution result. */
    extensions?: TExtensions;
}
/**
 * A JSON-serializable GraphQL execution result.
 * @typeParam TData - Shape of the formatted data payload.
 * @typeParam TExtensions - Shape of the formatted extensions payload.
 */
export interface FormattedExecutionResult<TData = ObjMap<unknown>, TExtensions = ObjMap<unknown>> {
    /** Errors raised while parsing, validating, or executing the operation. */
    errors?: ReadonlyArray<GraphQLFormattedError>;
    /** Data returned by execution, or null when execution could not produce data. */
    data?: TData | null;
    /** Additional non-standard metadata included in the formatted result. */
    extensions?: TExtensions;
}
/** @internal */
export declare class Executor<TPositionContext = undefined, // No position context by default
TAlternativeInitialResponse = ExecutionResult> {
    validatedExecutionArgs: ValidatedExecutionArgs;
    aborted: boolean;
    abortReason: unknown;
    sharedExecutionContext: SharedExecutionContext;
    collectedErrors: CollectedErrors;
    abortResultPromise: (() => void) | undefined;
    resolverAbortController: AbortController | undefined;
    getAbortSignal: () => AbortSignal | undefined;
    getAsyncHelpers: () => GraphQLResolveInfoHelpers;
    promiseAll: <T>(values: ReadonlyArray<PromiseOrValue<T>>) => Promise<Array<T>>;
    constructor(validatedExecutionArgs: ValidatedExecutionArgs, sharedExecutionContext?: SharedExecutionContext);
    executeRootSelectionSet(serially?: boolean): PromiseOrValue<ExecutionResult | TAlternativeInitialResponse>;
    /**
     * Build a root-selection-set tracing context from validated execution
     * arguments. The operation has already been selected during argument
     * validation.
     * @internal
     */
    buildExecuteContextFromValidatedArgs(args: ValidatedExecutionArgs): GraphQLExecuteRootSelectionSetContext;
    executeRootSelectionSetImpl(serially?: boolean): PromiseOrValue<ExecutionResult | TAlternativeInitialResponse>;
    abort(reason?: unknown): void;
    finish<T>(result: T): T;
    createAbortedExecutionError<T>(result: PromiseOrValue<T>): AbortedGraphQLExecutionError<T>;
    getFinishSharedExecution(): () => void;
    /**
     * Given a completed execution context and data, build the `{ errors, data }`
     * response defined by the "Response" section of the GraphQL specification.
     *
     * @internal
     */
    buildResponse(data: ObjMap<unknown> | null): ExecutionResult | TAlternativeInitialResponse;
    executeCollectedRootFields(rootType: GraphQLObjectType, rootValue: unknown, originalGroupedFieldSet: GroupedFieldSet, serially: boolean, _newDeferUsages: ReadonlyArray<DeferUsage>): PromiseOrValue<ObjMap<unknown>>;
    executeRootGroupedFieldSet(rootType: GraphQLObjectType, rootValue: unknown, groupedFieldSet: GroupedFieldSet, serially: boolean, positionContext?: TPositionContext): PromiseOrValue<ObjMap<unknown>>;
    /**
     * Implements the "Executing selection sets" section of the spec
     * for fields that must be executed serially.
     *
     * @internal
     */
    executeFieldsSerially(parentType: GraphQLObjectType, sourceValue: unknown, path: Path | undefined, groupedFieldSet: GroupedFieldSet, positionContext: TPositionContext | undefined): PromiseOrValue<ObjMap<unknown>>;
    /**
     * Implements the "Executing selection sets" section of the spec
     * for fields that may be executed in parallel.
     *
     * @internal
     */
    executeFields(parentType: GraphQLObjectType, sourceValue: unknown, path: Path | undefined, groupedFieldSet: GroupedFieldSet, positionContext: TPositionContext | undefined): PromiseOrValue<ObjMap<unknown>>;
    /**
     * Implements the "Executing fields" section of the spec
     * In particular, this function figures out the value that the field returns by
     * calling its resolve function, then calls completeValue to complete promises,
     * coercing scalars, or execute the sub-selection-set for objects.
     *
     * @internal
     */
    executeField(parentType: GraphQLObjectType, source: unknown, fieldDetailsList: FieldDetailsList, path: Path, positionContext: TPositionContext | undefined, tracingChannel: MinimalTracingChannel<GraphQLResolveContext> | undefined): PromiseOrValue<unknown>;
    /**
     * Build a graphql:resolve channel context for a single field invocation.
     *
     * `fieldPath` is exposed as a lazy getter because serializing the response
     * path is O(depth) and APMs that depth-filter or skip default resolvers
     * often never read it. `args` is passed through by reference.
     * @internal
     */
    buildResolveContext(args: ObjMap<unknown>, info: GraphQLResolveInfo, isDefaultResolver: boolean): GraphQLResolveContext;
    handleFieldError(rawError: unknown, returnType: GraphQLOutputType, fieldDetailsList: FieldDetailsList, path: Path): void;
    /**
     * Implements the instructions for completeValue as defined in the
     * "Value Completion" section of the spec.
     *
     * If the field type is Non-Null, then this recursively completes the value
     * for the inner type. It throws a field error if that completion returns null,
     * as per the "Nullability" section of the spec.
     *
     * If the field type is a List, then this recursively completes the value
     * for the inner type on each item in the list.
     *
     * If the field type is a Scalar or Enum, ensures the completed value is a legal
     * value of the type by calling the `coerceOutputValue` method of GraphQL type
     * definition.
     *
     * If the field is an abstract type, determine the runtime type of the value
     * and then complete based on that type
     *
     * Otherwise, the field type expects a sub-selection set, and will complete the
     * value by executing all sub-selections.
     *
     * @internal
     */
    completeValue(returnType: GraphQLOutputType, fieldDetailsList: FieldDetailsList, info: GraphQLResolveInfo, path: Path, result: unknown, positionContext: TPositionContext | undefined): PromiseOrValue<unknown>;
    completePromisedValue(returnType: GraphQLOutputType, fieldDetailsList: FieldDetailsList, info: GraphQLResolveInfo, path: Path, result: PromiseLike<unknown>, positionContext: TPositionContext | undefined): Promise<unknown>;
    /**
     * Complete a async iterator value by completing the result and calling
     * recursively until all the results are completed.
     *
     * @internal
     */
    completeAsyncIterableValue(itemType: GraphQLOutputType, fieldDetailsList: FieldDetailsList, info: GraphQLResolveInfo, path: Path, items: AsyncIterable<unknown>, positionContext: TPositionContext | undefined): Promise<ReadonlyArray<unknown>>;
    handleStream(_index: number, _path: Path, _iterator: {
        handle: Iterator<unknown>;
        isAsync?: never;
    } | {
        handle: AsyncIterator<unknown>;
        isAsync: true;
    }, _streamUsage: StreamUsage, _info: GraphQLResolveInfo, _itemType: GraphQLOutputType): boolean;
    /**
     * Complete a list value by completing each item in the list with the
     * inner type
     *
     * @internal
     */
    completeListValue(returnType: GraphQLList<GraphQLOutputType>, fieldDetailsList: FieldDetailsList, info: GraphQLResolveInfo, path: Path, result: unknown, positionContext: TPositionContext | undefined): PromiseOrValue<ReadonlyArray<unknown>>;
    completeIterableValue(itemType: GraphQLOutputType, fieldDetailsList: FieldDetailsList, info: GraphQLResolveInfo, path: Path, items: Iterable<unknown>, positionContext: TPositionContext | undefined): PromiseOrValue<ReadonlyArray<unknown>>;
    completeMaybePromisedListItemValue(item: unknown, completedResults: Array<unknown>, itemType: GraphQLOutputType, fieldDetailsList: FieldDetailsList, info: GraphQLResolveInfo, itemPath: Path, positionContext: TPositionContext | undefined): boolean;
    /**
     * Complete a list item value by adding it to the completed results.
     *
     * Returns true if the value is a Promise.
     *
     * @internal
     */
    completeListItemValue(item: unknown, completedResults: Array<unknown>, itemType: GraphQLOutputType, fieldDetailsList: FieldDetailsList, info: GraphQLResolveInfo, itemPath: Path, positionContext: TPositionContext | undefined): boolean;
    completePromisedListItemValue(item: PromiseLike<unknown>, itemType: GraphQLOutputType, fieldDetailsList: FieldDetailsList, info: GraphQLResolveInfo, itemPath: Path, positionContext: TPositionContext | undefined): Promise<unknown>;
    /**
     * Complete a Scalar or Enum by serializing to a valid value, returning
     * null if serialization is not possible.
     *
     * @internal
     */
    completeLeafValue(returnType: GraphQLLeafType, result: unknown): unknown;
    /**
     * Complete a value of an abstract type by determining the runtime object type
     * of that value, then complete the value for that type.
     *
     * @internal
     */
    completeAbstractValue(returnType: GraphQLAbstractType, fieldDetailsList: FieldDetailsList, info: GraphQLResolveInfo, path: Path, result: unknown, positionContext: TPositionContext | undefined): PromiseOrValue<ObjMap<unknown>>;
    ensureValidRuntimeType(runtimeTypeName: unknown, schema: GraphQLSchema, returnType: GraphQLAbstractType, fieldDetailsList: FieldDetailsList, info: GraphQLResolveInfo, result: unknown): GraphQLObjectType;
    /**
     * Complete an Object value by executing all sub-selections.
     *
     * @internal
     */
    completeObjectValue(returnType: GraphQLObjectType, fieldDetailsList: FieldDetailsList, info: GraphQLResolveInfo, path: Path, result: unknown, positionContext: TPositionContext | undefined): PromiseOrValue<ObjMap<unknown>>;
    invalidReturnTypeError(returnType: GraphQLObjectType, result: unknown, fieldDetailsList: FieldDetailsList): GraphQLError;
    collectAndExecuteSubfields(returnType: GraphQLObjectType, fieldDetailsList: FieldDetailsList, path: Path, result: unknown, positionContext: TPositionContext | undefined): PromiseOrValue<ObjMap<unknown>>;
    executeCollectedSubfields(parentType: GraphQLObjectType, sourceValue: unknown, path: Path | undefined, originalGroupedFieldSet: GroupedFieldSet, _newDeferUsages: ReadonlyArray<DeferUsage>, _positionContext: TPositionContext | undefined): PromiseOrValue<ObjMap<unknown>>;
}
export {};
