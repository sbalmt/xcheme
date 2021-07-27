import type Fragment from './fragment';
import type Table from './table';
/**
 * All children nodes.
 */
export declare const enum Nodes {
    Left = 0,
    Right = 1,
    Next = 2
}
/**
 * A node product to compose the AST generated in the analysis process.
 */
export default class Node {
    #private;
    /**
     * Default constructor
     * @param fragment Node fragment.
     * @param table Node symbol table.
     * @param value Node value.
     */
    constructor(fragment: Fragment, table: Table, value: string | number);
    /**
     * Get the node fragment.
     */
    get fragment(): Fragment;
    /**
     * Get the symbol table associated to this node.
     */
    get table(): Table | undefined;
    /**
     * Get the node value.
     */
    get value(): string | number;
    /**
     * Get the left child node.
     */
    get left(): Node | undefined;
    /**
     * Get the right child node.
     */
    get right(): Node | undefined;
    /**
     * Get the next child node.
     */
    get next(): Node | undefined;
    /**
     * Get a child node.
     * @param child Expected child.
     * @returns Return the corresponding child node.
     */
    getChild(child: Nodes): Node | undefined;
    /**
     * Set a new child node.
     * @param child Expected child.
     * @param node New child node.
     */
    setChild(child: Nodes, node: Node | undefined): void;
    /**
     * Get the lowest child node.
     * @param child Expected child.
     * @returns Returns the corresponding child node.
     */
    getLowestChild(child: Nodes): Node | undefined;
}
