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
     * @param entries Patterns entry.
     * @returns Returns an array containing all the patterns.
     */
    #getPatterns(entries) {
        return entries.filter((entry) => entry.pattern).map((entry) => entry.pattern);
    }
    /**
     * Get an array of references from the specified entries.
     * @param entries Input entries.
     * @returns Returns an array containing all the references.
     */
    #getReferences(entries) {
        return entries
            .filter((entry) => entry.pattern && entry.references > 1)
            .map((entry) => ({ name: entry.name, pattern: entry.pattern }));
    }
    /**
     * Get an array of dependencies from the specified type and entries.
     * @param type Entry type.
     * @param entries Input entries.
     * @param cache Optional cache for patterns already processed.
     * @returns Returns an array containing all the dependencies.
     */
    #getDependencies(type, entries, cache = new WeakSet()) {
        const dependencies = [];
        for (const entry of entries) {
            if (!cache.has(entry)) {
                cache.add(entry);
                if (entry.type === type && entry.references > 1) {
                    dependencies.push(entry);
                }
                dependencies.push(...this.#getDependencies(type, entry.dependencies, cache));
            }
        }
        return dependencies;
    }
    /**
     * Get an array of dependents from the specified type and patterns.
     * @param type Entry type.
     * @param entries Input entries.
     * @param cache Optional cache for patterns already processed.
     * @returns Returns an array containing all the dependencies.
     */
    #getDependents(type, entries, cache = new WeakSet()) {
        const dependents = [];
        for (const entry of entries) {
            if (!cache.has(entry)) {
                cache.add(entry);
                dependents.push(...entry.dependents.filter((dependent) => dependent.type === type));
                dependents.push(...this.#getDependents(type, entry.dependencies, cache));
            }
        }
        return dependents;
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
        const dependencies = this.#getDependencies(2 /* Token */, [
            ...Object.values(this.#externalEntries)
                .map((aggregator) => aggregator.getPatternsByType([2 /* Token */, 3 /* Node */]))
                .flat(),
            ...this.#localEntries.getPatternsByType([1 /* Skip */, 2 /* Token */, 3 /* Node */])
        ]);
        return this.#coder.getEntry('Lexer', this.#getReferences(dependencies), [
            ...this.#getPatterns(this.#localEntries.getPatternsByType([1 /* Skip */])),
            ...this.#getPatterns(this.#getDependents(2 /* Token */, dependencies)),
            ...this.#getPatterns(this.#localEntries.getPatternsByType([2 /* Token */]))
        ]);
    }
    /**
     * Get the resulting parser.
     */
    get parser() {
        const dependencies = this.#getDependencies(3 /* Node */, [
            ...Object.values(this.#externalEntries)
                .map((aggregator) => aggregator.getPatternsByType([3 /* Node */]))
                .flat(),
            ...this.#localEntries.getPatternsByType([3 /* Node */])
        ]);
        return this.#coder.getEntry('Parser', this.#getReferences(dependencies), [
            ...this.#getPatterns(this.#getDependents(3 /* Node */, dependencies)),
            ...this.#getPatterns(this.#localEntries.getPatternsByType([3 /* Node */]))
        ]);
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