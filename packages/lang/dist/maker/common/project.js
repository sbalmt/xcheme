"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const String = require("./string");
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
     * Token pointer entries.
     */
    #tokenPointerEntries = new Entries.Aggregator();
    /**
     * Node entries.
     */
    #nodeEntries = new Entries.Aggregator();
    /**
     * Node pointer entries.
     */
    #nodePointerEntries = new Entries.Aggregator();
    /**
     * Get an array of patterns from the the specified aggregator.
     * @param entries Patterns entry aggregator.
     * @returns Returns the array of patterns.
     */
    #getPatterns(entries) {
        return entries.map((entry) => entry.pattern);
    }
    /**
     * Get an array of routes from the specified aggregator.
     * @param entries Patterns entry aggregator.
     * @returns Returns the array of routes.
     */
    #getRoutes(entries) {
        return entries.map((entry) => this.#coder.getRoute(entry.identity, String.extract(entry.name).split('')));
    }
    /**
     * Get an array of pointers from the specified aggregator.
     * @param entries Pointers entry aggregator.
     * @returns Returns the array of pointers.
     */
    #getPointers(entries) {
        return entries.patterns.map((entry) => ({
            name: entry.name,
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
     * Get the token pointer entries aggregator.
     */
    get tokenPointerEntries() {
        return this.#tokenPointerEntries;
    }
    /**
     * Get the node entries aggregator.
     */
    get nodeEntries() {
        return this.#nodeEntries;
    }
    /**
     * Get the node pointer entries aggregator.
     */
    get nodePointerEntries() {
        return this.#nodePointerEntries;
    }
    /**
     * Get the resulting lexer.
     */
    get lexer() {
        const routes = this.#getRoutes(this.#tokenEntries.loosePatterns);
        return this.#coder.getEntry('Lexer', this.#getPointers(this.#tokenPointerEntries), ...this.#getPatterns(this.#skipEntries.patterns), ...(routes.length > 0
            ? [this.#coder.getMap(...routes), ...this.#getPatterns(this.#tokenEntries.patterns)]
            : this.#getPatterns(this.#tokenEntries.patterns)));
    }
    /**
     * Get the resulting parser.
     */
    get parser() {
        return this.#coder.getEntry('Parser', this.#getPointers(this.#nodePointerEntries), ...this.#getPatterns(this.#nodeEntries.patterns));
    }
}
exports.Project = Project;
//# sourceMappingURL=project.js.map