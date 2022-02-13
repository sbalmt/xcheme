"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A location class.
 */
class Location {
    /**
     * Location name.
     */
    #name;
    /**
     * Line range.
     */
    #line;
    /**
     * Column range.
     */
    #column;
    /**
     * Default constructor.
     * @param name Location name.
     * @param line Line range.
     * @param column Column range.
     */
    constructor(name, line, column) {
        this.#name = name;
        this.#line = line;
        this.#column = column;
    }
    /**
     * Get the location name.
     */
    get name() {
        return this.#name;
    }
    /**
     * Get the line range.
     */
    get line() {
        return this.#line;
    }
    /**
     * Get the column range.
     */
    get column() {
        return this.#column;
    }
}
exports.default = Location;
//# sourceMappingURL=location.js.map