import type Fragment from './fragment';
import type Table from './table';
import type Node from './node';
/**
 * A symbol record generated during the analysis process to be stored in the symbol table.
 */
export default class Record {
    #private;
    /**
     * Default constructor.
     * @param fragment Record fragment.
     * @param value Record value.
     * @param node Record node.
     * @param link Record table link.
     */
    constructor(fragment: Fragment, value: string | number, node?: Node, link?: Table);
    /**
     * Get the record fragment.
     */
    get fragment(): Fragment;
    /**
     * Get the record value.
     */
    get value(): string | number;
    /**
     * Get the record node.
     */
    get node(): Node | undefined;
    /**
     * Get the record table link.
     */
    get link(): Table | undefined;
}
