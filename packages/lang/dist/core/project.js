"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
const Core = require("@xcheme/core");
const Parser = require("../parser");
const Counter = require("./counter");
const Symbols = require("./symbols");
/**
 * Project context.
 */
class Context {
    /**
     * Global project counter.
     */
    static #project = new Counter.Context();
    /**
     * Global identity counter.
     */
    static #identity = new Counter.Context();
    /**
     * Project Id.
     */
    #id;
    /**
     * Project name.
     */
    #name;
    /**
     * Project coder.
     */
    #coder;
    /**
     * Project options.
     */
    #options;
    /**
     * Project symbols.
     */
    #symbols = new Symbols.Aggregator();
    /**
     * Project errors.
     */
    #errors = [];
    /**
     * Get an array of records that corresponds to the specified record type.
     * @param types Record types.
     * @returns Returns an array containing all the corresponding records.
     */
    #getRecordsByType(...types) {
        const list = [];
        for (const current of this.#symbols) {
            const { pattern } = current.data;
            if (pattern && types.includes(current.value)) {
                list.push(current);
            }
        }
        return list;
    }
    /**
     * Get an array of records (including all sub record) that corresponds to the specified record type.
     * @param records Record list.
     * @param types Record types.
     * @returns Returns an array containing all the corresponding records.
     */
    #getFlattenRecordsByType(records, ...types) {
        const list = [];
        const cache = new WeakSet();
        const action = (records) => {
            for (const current of records) {
                if (!cache.has(current)) {
                    cache.add(current);
                    const { pattern, dependencies } = current.data;
                    if (pattern && types.includes(current.value)) {
                        list.push(current);
                    }
                    action(dependencies);
                }
            }
        };
        action(records);
        return list;
    }
    /**
     * Get an array of references from the specified records.
     * @param records Record list.
     * @returns Returns an array containing all the references.
     */
    #getReferences(records) {
        return records.map((record) => {
            return {
                name: record.data.name,
                pattern: record.data.pattern
            };
        });
    }
    /**
     * Get an array of patterns from the the specified records.
     * @param records Record list.
     * @param types Symbol types.
     * @returns Returns an array containing all the patterns.
     */
    #getPatterns(records, ...types) {
        return records.map((current) => {
            if (Symbols.isReferencedBy(current, ...types)) {
                return this.#coder.emitReferencePattern(current);
            }
            return current.data.pattern;
        });
    }
    /**
     * Default constructor.
     * @param name Project name.
     * @param coder Project coder.
     * @param options Project options.
     */
    constructor(name, coder, options = {}) {
        this.#id = Context.#project.increment(coder);
        this.#name = name;
        this.#coder = coder;
        this.#options = options;
    }
    /**
     * Get the global identity counter.
     */
    static get identity() {
        return Context.#identity;
    }
    /**
     * Get the project Id.
     */
    get id() {
        return this.#id;
    }
    /**
     * Get the project name.
     */
    get name() {
        return this.#name;
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
     * Get the project symbols.
     */
    get symbols() {
        return this.#symbols;
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
        const records = this.#getRecordsByType(300 /* Skip */, 301 /* Token */, 303 /* Node */);
        const flatten = this.#getFlattenRecordsByType(records, 301 /* Token */, 302 /* AliasToken */);
        const references = flatten.filter((current) => Symbols.isReferencedBy(current, 2 /* Token */));
        const tokens = flatten.filter((current) => current.value === 301 /* Token */);
        return this.#coder.getEntry('Lexer', this.#getReferences(references), [
            ...this.#getPatterns(this.#getRecordsByType(300 /* Skip */), 2 /* Token */),
            ...this.#getPatterns(tokens, 2 /* Token */)
        ]);
    }
    /**
     * Get the resulting parser.
     */
    get parser() {
        const records = this.#getRecordsByType(303 /* Node */);
        const flatten = this.#getFlattenRecordsByType(records, 303 /* Node */, 304 /* AliasNode */);
        const references = flatten.filter((current) => Symbols.isReferencedBy(current, 3 /* Node */));
        const nodes = flatten.filter((current) => current.value === 303 /* Node */);
        return this.#coder.getEntry('Parser', this.#getReferences(references), this.#getPatterns(nodes, 3 /* Node */));
    }
    /**
     * Add a new error in the project.
     * @param fragment Error fragment.
     * @param value Error value.
     */
    addError(fragment, value) {
        this.#errors.push(new Core.Error(fragment, value));
    }
}
exports.Context = Context;
//# sourceMappingURL=project.js.map