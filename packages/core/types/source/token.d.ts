import type Context from '../core/context';
import Token from '../core/token';
import Fragment from '../core/fragment';
import Base from './base';
/**
 * Data source for processing tokens during the analysis.
 */
export default class TokenSource extends Base {
    #private;
    /**
     * Default constructor.
     * @param data Source data.
     * @param context Source context.
     */
    constructor(data: Token[], context: Context);
    /**
     * Get the current source offset.
     */
    get offset(): number;
    /**
     * Get the current source length.
     */
    get length(): number;
    /**
     * Get the current source value.
     * @throws Throws an error when the source is empty.
     */
    get value(): string | number;
    /**
     * Get the current source fragment.
     */
    get fragment(): Fragment;
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
    move(): void;
}
