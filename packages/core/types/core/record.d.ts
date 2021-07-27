import type Fragment from './fragment';
import type Node from './node';
/**
 * A symbol record generated during the analysis process to be stored in the symbol table.
 */
export default class Record {
    #private;
    /**
     * Default constructor.
     * @param fragment Record fragment.
     * @param node Record node.
     * @param value Record value.
     */
    constructor(fragment: Fragment, node: Node | undefined, value: string | number);
    /**
     * Get the record fragment.
     */
    get fragment(): Fragment;
    /**
     * Get the record node.
     */
    get node(): Node | undefined;
    /**
     * Get the record value.
     */
    get value(): string | number;
}
