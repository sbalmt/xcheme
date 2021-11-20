"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A fragment location in terms of lines and columns.
 */
class Location {
    /**
     * Location name.
     */
    #name;
    /**
     * Location line.
     */
    #line;
    /**
     * Location column.
     */
    #column;
    /**
     * Default constructor.
     * @param name Location name.
     * @param line Location line.
     * @param column Location column.
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
     * Get the location line.
     */
    get line() {
        return this.#line;
    }
    /**
     * Get the location column.
     */
    get column() {
        return this.#column;
    }
}
exports.default = Location;
//# sourceMappingURL=location.js.map