/**
 * Execute GraphQL operations and produce GraphQL execution results.
 *
 * These exports are also available from the root `graphql` package.
 * @packageDocumentation
 */
export { pathToArray as responsePathAsArray } from "../jsutils/Path.mjs";
export { createSourceEventStream, execute, executeRootSelectionSet, executeSubscriptionEvent, executeSync, experimentalExecuteIncrementally, experimentalExecuteRootSelectionSet, defaultFieldResolver, defaultTypeResolver, mapSourceToResponseEvent, subscribe, validateExecutionArgs, validateSubscriptionArgs, } from "./execute.mjs";
export { legacyExecuteIncrementally, legacyExecuteRootSelectionSet, } from "./legacyIncremental/legacyExecuteIncrementally.mjs";
export type { AsyncWorkFinishedInfo, ExecutionArgs, ExecutionHooks, ValidatedExecutionArgs, ValidatedSubscriptionArgs, } from "./ExecutionArgs.mjs";
export type { RootSelectionSetExecutor } from "./execute.mjs";
export type { ExecutionResult, FormattedExecutionResult } from "./Executor.mjs";
export type { ExperimentalIncrementalExecutionResults, InitialIncrementalExecutionResult, SubsequentIncrementalExecutionResult, IncrementalDeferResult, IncrementalStreamResult, IncrementalResult, FormattedExperimentalIncrementalExecutionResults, FormattedInitialIncrementalExecutionResult, FormattedSubsequentIncrementalExecutionResult, FormattedIncrementalDeferResult, FormattedIncrementalStreamResult, FormattedIncrementalResult, } from "./incremental/IncrementalExecutor.mjs";
export type { LegacyExperimentalIncrementalExecutionResults, LegacyInitialIncrementalExecutionResult, LegacySubsequentIncrementalExecutionResult, LegacyIncrementalDeferResult, LegacyIncrementalStreamResult, LegacyIncrementalResult, FormattedLegacyExperimentalIncrementalExecutionResults, FormattedLegacyInitialIncrementalExecutionResult, FormattedLegacySubsequentIncrementalExecutionResult, FormattedLegacyIncrementalDeferResult, FormattedLegacyIncrementalStreamResult, FormattedLegacyIncrementalResult, } from "./legacyIncremental/BranchingIncrementalExecutor.mjs";
export { AbortedGraphQLExecutionError } from "./AbortedGraphQLExecutionError.mjs";
export { getArgumentValues, getVariableValues, getDirectiveValues, } from "./values.mjs";
export type { VariableValues } from "./values.mjs";
