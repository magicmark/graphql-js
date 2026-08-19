import type { FieldDetailsList } from "./collectFields.mjs";
import type { ValidatedExecutionArgs } from "./ExecutionArgs.mjs";
/** @internal */
export interface StreamUsage {
    label: string | undefined;
    initialCount: number;
    fieldDetailsList: FieldDetailsList;
}
/**
 * Returns an object containing info for streaming if a field should be
 * streamed based on the experimental flag, stream directive present and
 * not disabled by the "if" argument.
 *
 * @internal
 */
export declare function getStreamUsage(validatedExecutionArgs: ValidatedExecutionArgs, fieldDetailsList: FieldDetailsList): StreamUsage | undefined;
