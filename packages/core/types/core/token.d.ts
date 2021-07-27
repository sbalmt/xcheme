import type Fragment from './fragment';
/**
 * A token product to compose the token list generated in the analysis process.
 */
export default class Token {
    #private;
    /**
     * Default constructor.
     * @param fragment Token fragment.
     * @param value Token value.
     */
    constructor(fragment: Fragment, value: string | number);
    /**
     * Get the token fragment.
     */
    get fragment(): Fragment;
    /**
     * Get the token value.
     */
    get value(): string | number;
}
