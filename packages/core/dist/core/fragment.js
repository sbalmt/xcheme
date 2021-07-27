"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A data fragment with its precise location.
 */
class Fragment {
    /**
     * Fragment data.
     */
    #data;
    /**
     * Beginning of fragment offset.
     */
    #begin;
    /**
     * End of fragment offset
     */
    #end;
    /**
     * Fragment location.
     */
    #location;
    /**
     * Default constructor.
     * @param data Fragment data.
     * @param offset Fragment offset.
     * @param length Fragment length.
     * @param location Fragment location.
     */
    constructor(data, begin, end, location) {
        this.#data = data;
        this.#begin = begin;
        this.#end = end;
        this.#location = location;
    }
    /**
     * Get the fragment data.
     */
    get data() {
        return this.#data.substring(this.#begin, this.#end);
    }
    /**
     * Get the beginning of the fragment offset.
     */
    get begin() {
        return this.#begin;
    }
    /**
     * Get the end of the fragment offset.
     */
    get end() {
        return this.#end;
    }
    /**
     * Get the fragment location in terms of lines and columns.
     */
    get location() {
        return this.#location;
    }
}
exports.default = Fragment;
//# sourceMappingURL=fragment.js.map