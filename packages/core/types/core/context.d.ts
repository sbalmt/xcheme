import type Token from './token';
import Table from './table';
import Node from './node';
/**
 * Contains the analysis context and depending on the solution, can store tokens, symbol records and
 * nodes of the current consumption.
 */
export default class Context {
    #private;
    /**
     * Default constructor.
     * @param name Context name.
     */
    constructor(name: string);
    /**
     * Get the token list.
     */
    get tokens(): Token[];
    /**
     * Get the symbol table.
     */
    get table(): Table;
    /**
     * Get the root node.
     */
    get node(): Node;
    /**
     * Get the context name.
     */
    get name(): string;
}
