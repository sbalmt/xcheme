"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A fragment location in terms of lines and columns.
 */
class Location {
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
     * @param line Location line.
     * @param column Location column.
     */
    constructor(line, column) {
        this.#line = line;
        this.#column = column;
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