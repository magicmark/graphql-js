/**
 * Execute GraphQL operations and produce GraphQL execution results.
 *
 * These exports are also available from the root `graphql` package.
 * @packageDocumentation
 */
export { pathToArray as responsePathAsArray } from "../jsutils/Path.js";
export { createSourceEventStream, execute, executeRootSelectionSet, executeSubscriptionEvent, executeSync, experimentalExecuteIncrementally, experimentalExecuteRootSelectionSet, defaultFieldResolver, defaultTypeResolver, mapSourceToResponseEvent, subscribe, validateExecutionArgs, validateSubscriptionArgs, } from "./execute.js";
export { legacyExecuteIncrementally, legacyExecuteRootSelectionSet, } from "./legacyIncremental/legacyExecuteIncrementally.js";
export type { AsyncWorkFinishedInfo, ExecutionArgs, ExecutionHooks, ValidatedExecutionArgs, ValidatedSubscriptionArgs, } from "./ExecutionArgs.js";
export type { RootSelectionSetExecutor } from "./execute.js";
export type { ExecutionResult, FormattedExecutionResult } from "./Executor.js";
export type { ExperimentalIncrementalExecutionResults, InitialIncrementalExecutionResult, SubsequentIncrementalExecutionResult, IncrementalDeferResult, IncrementalStreamResult, IncrementalResult, FormattedExperimentalIncrementalExecutionResults, FormattedInitialIncrementalExecutionResult, FormattedSubsequentIncrementalExecutionResult, FormattedIncrementalDeferResult, FormattedIncrementalStreamResult, FormattedIncrementalResult, } from "./incremental/IncrementalExecutor.js";
export type { LegacyExperimentalIncrementalExecutionResults, LegacyInitialIncrementalExecutionResult, LegacySubsequentIncrementalExecutionResult, LegacyIncrementalDeferResult, LegacyIncrementalStreamResult, LegacyIncrementalResult, FormattedLegacyExperimentalIncrementalExecutionResults, FormattedLegacyInitialIncrementalExecutionResult, FormattedLegacySubsequentIncrementalExecutionResult, FormattedLegacyIncrementalDeferResult, FormattedLegacyIncrementalStreamResult, FormattedLegacyIncrementalResult, } from "./legacyIncremental/BranchingIncrementalExecutor.js";
export { AbortedGraphQLExecutionError } from "./AbortedGraphQLExecutionError.js";
export { getArgumentValues, getVariableValues, getDirectiveValues, } from "./values.js";
export type { VariableValues } from "./values.js";
