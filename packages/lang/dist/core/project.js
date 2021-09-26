"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const Entries = require("./entries");
/**
 * Store all the project entries, errors and options during the making process.
 */
class Project {
    /**
     * Project coder.
     */
    #coder;
    /**
     * Project options.
     */
    #options;
    /**
     * Project errors.
     */
    #errors = [];
    /**
     * Skip entries.
     */
    #skipEntries = new Entries.Aggregator();
    /**
     * Token entries.
     */
    #tokenEntries = new Entries.Aggregator();
    /**
     * Node entries.
     */
    #nodeEntries = new Entries.Aggregator();
    /**
     * Get an array of patterns from the the specified entries.
     * @param entries Patterns entry.
     * @returns Returns the array of patterns.
     */
    #getPatterns(entries) {
        return entries.filter((entry) => entry.pattern !== void 0).map((entry) => entry.pattern);
    }
    /**
     * Get an array of references from the specified entries.
     * @param entries References entries.
     * @returns Returns the array of references.
     */
    #getReferences(entries) {
        return entries
            .filter((entry) => entry.pattern !== void 0)
            .map((entry) => ({
            name: entry.identifier,
            pattern: entry.pattern
        }));
    }
    /**
     * Default constructor.
     * @param coder Project coder.
     * @param options Project options.
     */
    constructor(coder, options = {}) {
        this.#coder = coder;
        this.#options = options;
    }
    /**
     * Get the project coder.
     */
    get coder() {
        return this.#coder;
    }
    /**
     * Get the project options.
     */
    get options() {
        return this.#options;
    }
    /**
     * Get the project errors.
     */
    get errors() {
        return this.#errors;
    }
    /**
     * Get the skip entries aggregator.
     */
    get skipEntries() {
        return this.#skipEntries;
    }
    /**
     * Get the token entries aggregator.
     */
    get tokenEntries() {
        return this.#tokenEntries;
    }
    /**
     * Get the node entries aggregator.
     */
    get nodeEntries() {
        return this.#nodeEntries;
    }
    /**
     * Get the resulting lexer.
     */
    get lexer() {
        return this.#coder.getEntry('Lexer', this.#getReferences(this.#tokenEntries.referencePatterns), [
            ...this.#getPatterns(this.#skipEntries.patterns),
            ...this.#getPatterns(this.#tokenEntries.patterns)
        ]);
    }
    /**
     * Get the resulting parser.
     */
    get parser() {
        return this.#coder.getEntry('Parser', this.#getReferences(this.#nodeEntries.referencePatterns), this.#getPatterns(this.#nodeEntries.patterns));
    }
}
exports.Project = Project;
//# sourceMappingURL=project.js.map