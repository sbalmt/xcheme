import type Context from '../core/context';
import Fragment from '../core/fragment';
import Base from './base';
/**
 * Internal source state.
 */
declare type State = {
    /**
     * Line state.
     */
    line: number;
    /**
     * Column state.
     */
    column: number;
    /**
     * Offset state.
     */
    offset: number;
};
/**
 * Data source for processing texts during the analysis process.
 */
export default class Text extends Base {
    #private;
    /**
     * Default constructor.
     * @param data Source data.
     * @param context Source context.
     */
    constructor(data: string, context: Context);
    /**
     * Get the current source offset.
     */
    get offset(): number;
    /**
     * Get the available source length.
     */
    get length(): number;
    /**
     * Get the current source value.
     * @throws Throws an error when the source is empty.
     */
    get value(): string;
    /**
     * Get the current source fragment.
     * If there are pushed states, the fragment length will be based in the current and the previous pushed state.
     */
    get fragment(): Fragment;
    /**
     * Get the current state.
     */
    get currentState(): State;
    /**
     * Get the longest state.
     */
    get longestState(): State;
    /**
     * Save the current source state.
     */
    saveState(): void;
    /**
     * Restore the previous source state.
     * @throws Throws an error when there's no state to restore.
     */
    restoreState(): void;
    /**
     * Discard the current source state.
     */
    discardState(): void;
    /**
     * Move to the next source state.
     */
    nextState(): void;
}
export {};
