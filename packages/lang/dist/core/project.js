"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
const Core = require("@xcheme/core");
const Entries = require("./entries");
/**
 * Project context.
 */
class Context {
    /**
     * Context depth for the same coder.
     */
    static #depth = new WeakMap();
    /**
     * Project coder.
     */
    #coder;
    /**
     * Project options.
     */
    #options;
    /**
     * Local entries aggregator.
     */
    #localEntries;
    /**
     * External entries aggregators.
     */
    #externalEntries = {};
    /**
     * Project errors.
     */
    #errors = [];
    /**
     * Get the current depth for the given coder.
     * @param coder Input coder.
     * @returns Returns the current depth.
     */
    static #count(coder) {
        return this.#depth.get(coder) ?? 0;
    }
    /**
     * Increment the current depth for the given coder.
     * @param coder Input coder.
     */
    static #increment(coder) {
        const count = this.#count(coder);
        this.#depth.set(coder, count + 1);
        return count;
    }
    /**
     * Get an array of patterns from the the specified entries.
     * @param type Entry type.
     * @param entries Input entries.
     * @returns Returns an array containing all the patterns.
     */
    #getPatterns(type, entries) {
        return entries.map((entry) => {
            if (entry.dependents.includes(entry) || entry.dependents.filter((entry) => entry.type === type).length > 1) {
                return this.#coder.emitReferencePattern(entry);
            }
            return entry.pattern;
        });
    }
    /**
     * Get an array of references from the specified entries.
     * @param entries Input entries.
     * @returns Returns an array containing all the references.
     */
    #getReferences(entries) {
        return entries.map((entry) => ({ name: entry.name, pattern: entry.pattern }));
    }
    /**
     * Get an array of entries (including all sub entries) that corresponds to the specified entry type.
     * @param type Entry type.
     * @param entries Input entries.
     * @param cache Optional cache for entries already processed.
     * @returns Returns an array containing all the corresponding entries.
     */
    #getAllEntries(type, entries, cache = new WeakSet()) {
        const list = [];
        for (const entry of entries) {
            if (!cache.has(entry)) {
                cache.add(entry);
                if (entry.pattern && entry.type === type) {
                    list.push(entry);
                }
                list.push(...this.#getAllEntries(type, entry.dependencies, cache));
            }
        }
        return list;
    }
    /**
     * Default constructor.
     * @param name Project name.
     * @param coder Project coder.
     * @param options Project options.
     */
    constructor(name, coder, options = {}) {
        this.#coder = coder;
        this.#options = options;
        this.#localEntries = new Entries.Aggregator(`L${Context.#increment(coder)}`, name);
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
     * Get the local entries aggregator.
     */
    get local() {
        return this.#localEntries;
    }
    /**
     * Get the external entries aggregator.
     */
    get external() {
        return this.#externalEntries;
    }
    /**
     * Get the project errors.
     */
    get errors() {
        return this.#errors;
    }
    /**
     * Get the resulting lexer.
     */
    get lexer() {
        const patterns = this.#localEntries.getPatternsByType([1 /* Skip */, 2 /* Token */, 3 /* Node */]);
        const entries = this.#getAllEntries(2 /* Token */, patterns);
        const dependencies = entries.filter((entry) => Entries.isReferencedBy(entry, 2 /* Token */));
        const tokens = entries.filter((entry) => !entry.alias);
        return this.#coder.getEntry('Lexer', this.#getReferences(dependencies), [
            ...this.#getPatterns(2 /* Token */, this.#localEntries.getPatternsByType([1 /* Skip */])),
            ...this.#getPatterns(2 /* Token */, tokens)
        ]);
    }
    /**
     * Get the resulting parser.
     */
    get parser() {
        const patterns = this.#localEntries.getPatternsByType([3 /* Node */]);
        const entries = this.#getAllEntries(3 /* Node */, patterns);
        const dependencies = entries.filter((entry) => Entries.isReferencedBy(entry, 3 /* Node */));
        const nodes = entries.filter((entry) => !entry.alias);
        return this.#coder.getEntry('Parser', this.#getReferences(dependencies), this.#getPatterns(3 /* Node */, nodes));
    }
    /**
     * Add a new error in the project.
     * @param node Input node.
     * @param value Error value.
     */
    addError(node, value) {
        this.#errors.push(new Core.Error(node.fragment, value));
    }
}
exports.Context = Context;
//# sourceMappingURL=project.js.map