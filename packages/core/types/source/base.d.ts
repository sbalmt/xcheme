import type Context from '../core/context';
import type Fragment from '../core/fragment';
import Error from '../core/error';
import Token from '../core/token';
import Node from '../core/node';
import Record from '../core/record';
import Table from '../core/table';
/**
 * Source output structure.
 */
declare type Output = {
    /**
     * Output state.
     */
    state: number;
    /**
     * Output table.
     */
    table: Table;
    /**
     * Record link table.
     */
    link?: Table;
    /**
     * Output value.
     */
    value?: string | number;
    /**
     * Output node.
     */
    node?: Node;
};
/**
 * Base of any data source for the analysis process.
 */
export default class Base {
    #private;
    /**
     * Magic value for getting the current output value from the current source.
     */
    static get Output(): number;
    /**
     * Default constructor.
     * @param context Source context.
     */
    constructor(context: Context);
    /**
     * Get the source context name.
     */
    get name(): string;
    /**
     * Get the current source output.
     */
    get output(): Output;
    /**
     * Should be implemented to return the current source offset.
     */
    get offset(): number;
    /**
     * Should be implemented to return the current source length.
     */
    get length(): number;
    /**
     * Should be implemented to return the current source value.
     */
    get value(): string | number;
    /**
     * Should be implemented to return the current source fragment.
     */
    get fragment(): Fragment;
    /**
     * Should be implement to push the current source state.
     */
    saveState(): void;
    /**
     * Should be implemented to restore the previous source state.
     */
    restoreState(): void;
    /**
     * Should be implemented to pop the previous source state.
     */
    discardState(): void;
    /**
     * Should be implemented to move to the next source state.
     */
    nextState(): void;
    /**
     * Emit the given product in the current source context.
     * @param product Input product.
     * @throws Throws an error when the given product isn't supported.
     */
    emit(product: Error | Token | Node | Record): void;
    /**
     * Open a new symbol table.
     */
    openTable(): void;
    /**
     * Close the current symbol table.
     * @throws Throws an error when there's no parent symbol table to be collapsed.
     */
    closeTable(): void;
}
export {};
