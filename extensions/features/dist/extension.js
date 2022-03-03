/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Provider = void 0;
const VSCode = __webpack_require__(1);
const Lang = __webpack_require__(3);
const Items = __webpack_require__(122);
/**
 * Auto completion provider.
 */
class Provider {
    /**
     * Diagnostics cache.
     */
    #cache;
    /**
     * Determines whether or not the token before the given offset compound a valid identity.
     * @param tokens Tokens list.
     * @param offset Current offset.
     * @returns Returns true in case of success, false otherwise.
     */
    #isIdentity(tokens, offset) {
        const value = tokens[offset]?.value;
        return ((value === 101 /* Number */ || value === 132 /* Auto */) &&
            tokens[offset - 1]?.value === 146 /* OpenChevron */);
    }
    /**
     * Determines whether or not the token before the given offset compound a valid identifier.
     * @param tokens Tokens list.
     * @param offset Current offset.
     * @returns Returns true in case of success, false otherwise.
     */
    #isIdentifier(tokens, offset) {
        const value = tokens[offset]?.value;
        return ((value === 147 /* CloseChevron */ && this.#isIdentity(tokens, offset - 1)) ||
            value === 129 /* Token */ ||
            value === 130 /* Node */);
    }
    /**
     * Get the symbol filters according to the node or token before the given offset.
     * @param tokens Tokens list.
     * @param offset Token offset.
     * @returns Returns the corresponding filters.
     */
    #getSymbolFilters(tokens, offset) {
        while (offset >= 0) {
            switch (tokens[offset--].value) {
                case 128 /* Skip */:
                    return [302 /* AliasToken */];
                case 129 /* Token */:
                    return [301 /* Token */, 302 /* AliasToken */];
                case 130 /* Node */:
                    return [301 /* Token */, 303 /* Node */, 304 /* AliasNode */];
            }
        }
        return [];
    }
    /**
     * Get a symbol table path based on the given tokens and offset.
     * @param tokens Tokens list.
     * @param offset Token offset.
     * @returns Returns an array containing all records for the corresponding path.
     */
    #getSymbolTablePath(tokens, offset) {
        const records = [];
        do {
            const token = tokens[offset--];
            if (token?.value === 100 /* Identifier */) {
                records.unshift(token.fragment.data);
            }
        } while (tokens[offset--]?.value === 139 /* Period */);
        return records;
    }
    /**
     * Get the symbol table that corresponds to the specified path.
     * @param table First symbol table.
     * @param path Symbol table path.
     * @returns Returns the corresponding symbol table or undefined when the given path doesn't exists.
     */
    #getSymbolTableFromPath(table, path) {
        for (const name of path) {
            const record = table.get(name);
            if (!record || !record.link) {
                return void 0;
            }
            table = record.link;
        }
        return table;
    }
    /**
     * Get the completion item kind based on the given symbol record.
     * @param record Symbol record.
     * @returns Returns the corresponding completion item kind.
     */
    #getItemKind(record) {
        if (record.link) {
            return VSCode.CompletionItemKind.Enum;
        }
        else {
            switch (record.value) {
                case 301 /* Token */:
                case 303 /* Node */:
                case 302 /* AliasToken */:
                case 304 /* AliasNode */:
                    return VSCode.CompletionItemKind.Field;
                case 305 /* MapMember */:
                    return VSCode.CompletionItemKind.EnumMember;
            }
        }
        return VSCode.CompletionItemKind.Reference;
    }
    /**
     * Get a completion items list for all the symbols in the given symbol table.
     * @param table Symbol table.
     * @param types Symbol types for filtering.
     * @returns Returns the completion items list.
     */
    #getSymbolList(table, types) {
        const list = [];
        for (const name of table.names) {
            const record = table.get(name);
            if (types.includes(record.value)) {
                const link = !!record.link;
                const item = Items.getItem(name, `Insert the ${name} reference.`, {
                    kind: this.#getItemKind(record),
                    text: link ? `${name}.` : name,
                    retry: link
                });
                list.push(item);
            }
        }
        return list;
    }
    /**
     * Find the best token offset for the given offset position.
     * @param tokens Tokens list.
     * @param position Offset position.
     * @returns Returns the best token offset.
     */
    #findBestOffset(tokens, position) {
        let best = -1;
        for (let index = 0; index < tokens.length; ++index) {
            const token = tokens[index];
            if (token.fragment.end === position) {
                return index;
            }
            if (token.fragment.begin < position) {
                best = index;
            }
        }
        return best;
    }
    /**
     * Consume the given document and provide all the completion items for the specified token offset.
     * @param table Symbol table.
     * @param tokens Tokens list.
     * @param offset Token offset.
     * @returns Returns an array of completion items or undefined when there's no completion items to suggest.
     */
    #getCompletionItems(table, tokens, offset) {
        if (offset > 0) {
            switch (tokens[offset--].value) {
                case 135 /* Export */:
                    return [Items.aliasItem, Items.tokenItem, Items.nodeItem];
                case 147 /* CloseChevron */:
                    return this.#isIdentity(tokens, offset) ? [Items.identifierItem] : [];
                case 100 /* Identifier */:
                    return this.#isIdentifier(tokens, offset) ? [Items.asItem] : Items.binaryOperatorList;
                case 128 /* Skip */:
                    return Items.operandList;
                case 131 /* Alias */:
                    return [Items.tokenItem, Items.nodeItem];
                case 129 /* Token */:
                case 130 /* Node */:
                    return [Items.identityItem, Items.identifierItem];
                case 104 /* From */:
                    return [Items.wordItem];
                case 105 /* To */:
                case 102 /* String */:
                case 103 /* Any */:
                case 136 /* Asterisk */:
                case 143 /* CloseBraces */:
                case 145 /* CloseParenthesis */:
                    return Items.binaryOperatorList;
                case 140 /* Comma */:
                case 142 /* OpenBraces */:
                    return [Items.identityItem, Items.identifierItem, Items.wordItem];
                case 139 /* Period */:
                    const result = this.#getSymbolTableFromPath(table, this.#getSymbolTablePath(tokens, offset));
                    return result ? this.#getSymbolList(result, [305 /* MapMember */]) : [];
                case 133 /* As */:
                case 107 /* Then */:
                case 108 /* Else */:
                case 109 /* Or */:
                case 137 /* VerticalBar */:
                case 110 /* And */:
                case 138 /* Ampersand */:
                    return [
                        ...this.#getSymbolList(table, this.#getSymbolFilters(tokens, offset)),
                        ...Items.operandList,
                        ...Items.unaryOperatorList
                    ];
                case 111 /* Not */:
                case 112 /* Opt */:
                case 113 /* Repeat */:
                case 119 /* Left */:
                case 120 /* Right */:
                case 118 /* Next */:
                case 117 /* Pivot */:
                case 121 /* Symbol */:
                case 122 /* Scope */:
                case 123 /* Error */:
                case 124 /* Has */:
                case 125 /* Set */:
                case 144 /* OpenParenthesis */:
                    return [
                        ...this.#getSymbolList(table, this.#getSymbolFilters(tokens, offset)),
                        ...Items.operandList,
                        ...Items.unaryOperatorList
                    ];
                case 114 /* Place */:
                case 115 /* Append */:
                case 116 /* Prepend */:
                    return [
                        ...this.#getSymbolList(table, this.#getSymbolFilters(tokens, offset)),
                        ...Items.operandList,
                        ...Items.directionList,
                        ...Items.unaryOperatorList
                    ];
                case 106 /* Map */:
                case 134 /* Import */:
                case 146 /* OpenChevron */:
                    return [];
            }
        }
        return void 0;
    }
    /**
     * Default constructor.
     * @param cache Diagnostics cache.
     */
    constructor(cache) {
        this.#cache = cache;
    }
    /**
     * Provide completion items for the given position and document.
     * @param document Current document.
     * @param position Position in the document.
     * @returns Returns the completion items list or undefined when there's no completion items to suggest.
     */
    provideCompletionItems(document, position) {
        const last = this.#cache.last;
        if (last) {
            const begin = document.offsetAt(position);
            const source = last.source;
            const offset = this.#findBestOffset(source.tokens, begin);
            return (this.#getCompletionItems(source.table, source.tokens, offset) ?? [
                Items.importItem,
                Items.exportItem,
                Items.skipItem,
                Items.aliasItem,
                Items.tokenItem,
                Items.nodeItem
            ]);
        }
        return void 0;
    }
}
exports.Provider = Provider;


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Maker = exports.Optimizer = exports.Parser = exports.Lexer = exports.Symbols = exports.Project = exports.TextCoder = exports.LiveCoder = exports.Coder = void 0;
var base_1 = __webpack_require__(4);
Object.defineProperty(exports, "Coder", ({ enumerable: true, get: function () { return base_1.Base; } }));
var live_1 = __webpack_require__(5);
Object.defineProperty(exports, "LiveCoder", ({ enumerable: true, get: function () { return live_1.Live; } }));
var text_1 = __webpack_require__(59);
Object.defineProperty(exports, "TextCoder", ({ enumerable: true, get: function () { return text_1.Text; } }));
exports.Project = __webpack_require__(62);
exports.Symbols = __webpack_require__(61);
exports.Lexer = __webpack_require__(65);
exports.Parser = __webpack_require__(63);
exports.Optimizer = __webpack_require__(71);
exports.Maker = __webpack_require__(76);
//# sourceMappingURL=index.js.map

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Base = void 0;
const exception_1 = __webpack_require__(127);
/**
 * Common interface for any kind of coder.
 */
class Base {
    /**
     * Should be implemented to return an entry pattern.
     * @param identifier Entry identifier.
     * @param references Entry references.
     * @param patterns Entry patterns.
     * @returns Should return the pattern.
     */
    getEntry(identifier, references, patterns) {
        throw new exception_1.Exception("Method doesn't implemented.");
    }
    /**
     * Should be implemented to return a route.
     * @param path Route path.
     * @param value Optional route value.
     * @param pattern Optional route pattern.
     * @returns Should return the route.
     */
    getRoute(path, value, pattern) {
        throw new exception_1.Exception("Method doesn't implemented.");
    }
    /**
     * Should be implemented to return a map pattern.
     * @param routes Map routes.
     * @returns Should return the pattern.
     */
    emitMapPattern(...routes) {
        throw new exception_1.Exception("Method doesn't implemented.");
    }
    /**
     * Should be implemented to return a token pattern.
     * @param identity Token identity.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emitTokenPattern(identity, ...patterns) {
        throw new exception_1.Exception("Method doesn't implemented.");
    }
    /**
     * Should be implemented to return a node pattern.
     * @param identity Node identity.
     * @param output Output node direction.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emitNodePattern(identity, output, ...patterns) {
        throw new exception_1.Exception("Method doesn't implemented.");
    }
    /**
     * Get a new identity pattern for dynamic directives.
     * @param identity New identity.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    emitIdentityPattern(identity, ...patterns) {
        throw new exception_1.Exception("Method doesn't implemented.");
    }
    /**
     * Should be implemented to return a condition pattern.
     * @param test Test pattern.
     * @param success Success pattern.
     * @param failure Failure pattern.
     * @returns Should return the pattern.
     */
    emitConditionPattern(test, success, failure) {
        throw new exception_1.Exception("Method doesn't implemented.");
    }
    /**
     * Should be implemented to return a choose pattern.
     * @param patterns Possible patterns.
     * @returns Should return the pattern.
     */
    emitChoosePattern(...patterns) {
        throw new exception_1.Exception("Method doesn't implemented.");
    }
    /**
     * Should be implemented to return a choose units pattern.
     * @param units Possible units.
     * @returns Should return the pattern.
     */
    emitChooseUnitsPattern(units) {
        throw new exception_1.Exception("Method doesn't implemented.");
    }
    /**
     * Should be implemented to return an expect pattern.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emitExpectPattern(...patterns) {
        throw new exception_1.Exception("Method doesn't implemented.");
    }
    /**
     * Should be implemented to return an expect units pattern.
     * @param units Expected units.
     * @returns Should return the pattern.
     */
    emitExpectUnitsPattern(units) {
        throw new exception_1.Exception("Method doesn't implemented.");
    }
    /**
     * Should be implemented to return a not pattern.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emitNotPattern(...patterns) {
        throw new exception_1.Exception("Method doesn't implemented.");
    }
    /**
     * Should be implemented to return an opt pattern.
     * @param patterns Optional patterns.
     * @returns Should return the pattern.
     */
    emitOptPattern(...patterns) {
        throw new exception_1.Exception("Method doesn't implemented.");
    }
    /**
     * Should be implemented to return a repeat pattern.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emitRepeatPattern(...patterns) {
        throw new exception_1.Exception("Method doesn't implemented.");
    }
    /**
     * Should be implemented to return a place node pattern.
     * @param current Current node destination.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emitPlacePattern(current, ...patterns) {
        throw new exception_1.Exception("Method doesn't implemented.");
    }
    /**
     * Should be implemented to return an append node pattern.
     * @param identity Node identity.
     * @param current Current node destination.
     * @param head Head pattern.
     * @param patterns Optional patterns.
     * @returns Should return the pattern.
     */
    emitAppendPattern(identity, current, head, ...patterns) {
        throw new exception_1.Exception("Method doesn't implemented.");
    }
    /**
     * Should be implemented to return a prepend node pattern.
     * @param identity Node identity.
     * @param current Current node destination.
     * @param head Head pattern.
     * @param patterns Optional patterns.
     * @returns Should return the pattern.
     */
    emitPrependPattern(identity, current, head, ...patterns) {
        throw new exception_1.Exception("Method doesn't implemented.");
    }
    /**
     * Should be implemented to return a pivot node pattern.
     * @param identity Node identity.
     * @param head Head pattern.
     * @param patterns Optional patterns.
     * @returns Should return the pattern.
     */
    emitPivotPattern(identity, pivot, ...patterns) {
        throw new exception_1.Exception("Method doesn't implemented.");
    }
    /**
     * Should be implemented to return a symbol pattern.
     * @param value Symbol value.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emitSymbolPattern(value, symbol, ...patterns) {
        throw new exception_1.Exception("Method doesn't implemented.");
    }
    /**
     * Should be implemented to return a symbol scope pattern.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emitScopePattern(...patterns) {
        throw new exception_1.Exception("Method doesn't implemented.");
    }
    /**
     * Should be implemented to return an error pattern.
     * @param value Error value.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emitErrorPattern(value, ...patterns) {
        throw new exception_1.Exception("Method doesn't implemented.");
    }
    /**
     * Should be implemented to return a has pattern.
     * @param state Expected state value.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emitHasPattern(state, ...patterns) {
        throw new exception_1.Exception("Method doesn't implemented.");
    }
    /**
     * Should be implemented to return a set pattern.
     * @param state New state value.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emitSetPattern(state, ...patterns) {
        throw new exception_1.Exception("Method doesn't implemented.");
    }
    /**
     * Should be implemented to return an uncase pattern.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emitUncasePattern(...patterns) {
        throw new exception_1.Exception("Method doesn't implemented.");
    }
    /**
     * Should be implemented to return a peek pattern.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emitPeekPattern(...patterns) {
        throw new exception_1.Exception("Method doesn't implemented.");
    }
    /**
     * Should be implemented to return a reference pattern.
     * @param record Referenced record.
     * @returns Should return the pattern.
     */
    emitReferencePattern(record) {
        throw new exception_1.Exception("Method doesn't implemented.");
    }
    /**
     * Should be implemented to return an any pattern.
     * @returns Should return the pattern.
     */
    emitAnyPattern() {
        throw new exception_1.Exception("Method doesn't implemented.");
    }
    /**
     * Should be implemented to return a range pattern.
     * @param from From unit value.
     * @param to To unit value.
     * @returns Should return the pattern.
     */
    emitRangePattern(from, to) {
        throw new exception_1.Exception("Method doesn't implemented.");
    }
}
exports.Base = Base;
//# sourceMappingURL=base.js.map

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Live = void 0;
const Core = __webpack_require__(6);
const base_1 = __webpack_require__(4);
/**
 * Generate a project output for running in memory.
 */
class Live extends base_1.Base {
    /**
     * Get a new entry pattern.
     * @param identifier Entry identifier.
     * @param references Entry references.
     * @param patterns Entry patterns.
     * @returns Returns the pattern.
     */
    getEntry(identifier, references, patterns) {
        return new Core.ExpectFlowPattern(new Core.OptFlowPattern(new Core.RepeatFlowPattern(new Core.ChooseFlowPattern(...patterns))), new Core.EndFlowPattern());
    }
    /**
     * Get a new route.
     * @param path Route path.
     * @param value Optional route value.
     * @param pattern Optional route pattern.
     * @returns Returns the route.
     */
    getRoute(path, value, pattern) {
        const [test, ...remaining] = path;
        if (value) {
            if (pattern) {
                return new Core.SetValueRoute(value, pattern, ...path);
            }
            return new Core.SetValueRoute(value, test, ...remaining);
        }
        if (pattern) {
            return new Core.FlowRoute(pattern, test, ...remaining);
        }
        return new Core.UnitRoute(test, ...remaining);
    }
    /**
     * Get a new map pattern.
     * @param routes Map routes.
     * @returns Returns the pattern.
     */
    emitMapPattern(...routes) {
        return new Core.MapFlowPattern(...routes);
    }
    /**
     * Get a new token pattern.
     * @param identity Token identity.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    emitTokenPattern(identity, ...patterns) {
        return new Core.EmitTokenPattern(identity, ...patterns);
    }
    /**
     * Get a new node pattern.
     * @param identity Node identity.
     * @param output Output node direction.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    emitNodePattern(identity, output, ...patterns) {
        return new Core.EmitNodePattern(identity, output, ...patterns);
    }
    /**
     * Get a new identity pattern for dynamic directives.
     * @param identity New identity.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    emitIdentityPattern(identity, ...patterns) {
        return new Core.SetValuePattern(identity, ...patterns);
    }
    /**
     * Get a new condition pattern.
     * @param test Test pattern.
     * @param success Success pattern.
     * @param failure Failure pattern.
     * @returns Returns the pattern.
     */
    emitConditionPattern(test, success, failure) {
        return new Core.ConditionFlowPattern(test, success, failure);
    }
    /**
     * Get a new choose pattern.
     * @param patterns Possible patterns.
     * @returns Returns the pattern.
     */
    emitChoosePattern(...patterns) {
        return new Core.ChooseFlowPattern(...patterns);
    }
    /**
     * Get a new choose units pattern.
     * @param units Possible units.
     * @returns Returns the pattern.
     */
    emitChooseUnitsPattern(units) {
        return new Core.ChooseUnitPattern(...units);
    }
    /**
     * Get a new expect pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    emitExpectPattern(...patterns) {
        return new Core.ExpectFlowPattern(...patterns);
    }
    /**
     * Get a new expect units pattern.
     * @param units Expected units.
     * @returns Returns the pattern.
     */
    emitExpectUnitsPattern(units) {
        return new Core.ExpectUnitPattern(...units);
    }
    /**
     * Get a new not pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    emitNotPattern(...patterns) {
        return new Core.NotFlowPattern(...patterns);
    }
    /**
     * get a new opt pattern.
     * @param patterns Optional patterns.
     * @returns Returns the pattern.
     */
    emitOptPattern(...patterns) {
        return new Core.OptFlowPattern(...patterns);
    }
    /**
     * Get a new repeat pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    emitRepeatPattern(...patterns) {
        return new Core.RepeatFlowPattern(...patterns);
    }
    /**
     * Get a new place node pattern.
     * @param current Current node destination.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    emitPlacePattern(current, ...patterns) {
        return new Core.PlaceNodePattern(current, ...patterns);
    }
    /**
     * Get a new append node pattern.
     * @param identity Node identity.
     * @param current Current node destination.
     * @param head Head pattern.
     * @param patterns Optional patterns.
     * @returns Returns the pattern.
     */
    emitAppendPattern(identity, current, head, ...patterns) {
        return new Core.AppendNodePattern(identity, 1 /* Right */, current, head, ...patterns);
    }
    /**
     * Get a new prepend node pattern.
     * @param identity Node identity.
     * @param current Current node destination.
     * @param head Head pattern.
     * @param patterns Optional patterns.
     * @returns Returns the pattern.
     */
    emitPrependPattern(identity, current, head, ...patterns) {
        return new Core.PrependNodePattern(identity, 1 /* Right */, current, head, ...patterns);
    }
    /**
     * Get a new pivot node pattern.
     * @param identity Node identity.
     * @param pivot Pivot pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    emitPivotPattern(identity, pivot, ...patterns) {
        return new Core.PivotNodePattern(identity, 1 /* Right */, 0 /* Left */, pivot, ...patterns);
    }
    /**
     * Get a new symbol pattern.
     * @param identity Symbol identity.
     * @param symbol Symbol pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    emitSymbolPattern(identity, symbol, ...patterns) {
        return new Core.EmitSymbolPattern(identity, symbol, ...patterns);
    }
    /**
     * Get a new symbol scope pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    emitScopePattern(...patterns) {
        return new Core.ScopeSymbolPattern(...patterns);
    }
    /**
     * Get a new error pattern.
     * @param value Error value.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    emitErrorPattern(value, ...patterns) {
        return new Core.EmitErrorPattern(value, ...patterns);
    }
    /**
     * Get a new has pattern.
     * @param state Expected state value.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    emitHasPattern(state, ...patterns) {
        return new Core.HasStatePattern(state, ...patterns);
    }
    /**
     * Get a new set pattern.
     * @param state New state value.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    emitSetPattern(state, ...patterns) {
        return new Core.SetStatePattern(state, ...patterns);
    }
    /**
     * Get a new uncase pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    emitUncasePattern(...patterns) {
        return new Core.UncaseTransformPattern(...patterns);
    }
    /**
     * Get a new peek pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    emitPeekPattern(...patterns) {
        return new Core.PeekFlowPattern(...patterns);
    }
    /**
     * Get a new reference pattern.
     * @param record Referenced record.
     * @returns Returns the pattern.
     */
    emitReferencePattern(record) {
        const data = record.data;
        if (!data.pattern) {
            return new Core.RunFlowPattern(() => data.pattern);
        }
        return data.pattern;
    }
    /**
     * Get a new any pattern.
     * @returns Returns the pattern.
     */
    emitAnyPattern() {
        return new Core.AnyUnitPattern();
    }
    /**
     * Get a new range pattern.
     * @param from From unit value.
     * @param to To unit value.
     * @returns Returns the pattern.
     */
    emitRangePattern(from, to) {
        return new Core.RangeUnitPattern(from, to);
    }
}
exports.Live = Live;
//# sourceMappingURL=live.js.map

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ScopeSymbolPattern = exports.EmitSymbolPattern = exports.EmitSymbolRoute = exports.PlaceNodePattern = exports.PivotNodePattern = exports.PrependNodePattern = exports.AppendNodePattern = exports.EmitNodePattern = exports.EmitNodeRoute = exports.EmitTokenPattern = exports.EmitTokenRoute = exports.EmitErrorPattern = exports.EmitErrorRoute = exports.SetStatePattern = exports.HasStatePattern = exports.SetStateRoute = exports.SetValuePattern = exports.SetValueRoute = exports.TryFlowPattern = exports.PeekFlowPattern = exports.MapFlowPattern = exports.StaticFlowPattern = exports.RepeatFlowPattern = exports.OptFlowPattern = exports.NotFlowPattern = exports.EndFlowPattern = exports.ExpectFlowPattern = exports.RunFlowPattern = exports.ConditionFlowPattern = exports.ChooseFlowPattern = exports.FlowRoute = exports.RangeUnitPattern = exports.ExpectUnitPattern = exports.ChooseUnitPattern = exports.AnyUnitPattern = exports.UnitRoute = exports.TokenSource = exports.TextSource = exports.BaseSource = exports.Route = exports.Pattern = exports.Range = exports.Location = exports.Fragment = exports.Record = exports.Table = exports.Token = exports.Node = exports.Error = exports.Context = void 0;
exports.UncaseTransformPattern = exports.UncaseTransformRoute = void 0;
var context_1 = __webpack_require__(7);
Object.defineProperty(exports, "Context", ({ enumerable: true, get: function () { return context_1.default; } }));
var error_1 = __webpack_require__(8);
Object.defineProperty(exports, "Error", ({ enumerable: true, get: function () { return error_1.default; } }));
var node_1 = __webpack_require__(13);
Object.defineProperty(exports, "Node", ({ enumerable: true, get: function () { return node_1.default; } }));
var token_1 = __webpack_require__(14);
Object.defineProperty(exports, "Token", ({ enumerable: true, get: function () { return token_1.default; } }));
var table_1 = __webpack_require__(12);
Object.defineProperty(exports, "Table", ({ enumerable: true, get: function () { return table_1.default; } }));
var record_1 = __webpack_require__(15);
Object.defineProperty(exports, "Record", ({ enumerable: true, get: function () { return record_1.default; } }));
var fragment_1 = __webpack_require__(9);
Object.defineProperty(exports, "Fragment", ({ enumerable: true, get: function () { return fragment_1.default; } }));
var location_1 = __webpack_require__(10);
Object.defineProperty(exports, "Location", ({ enumerable: true, get: function () { return location_1.default; } }));
var range_1 = __webpack_require__(11);
Object.defineProperty(exports, "Range", ({ enumerable: true, get: function () { return range_1.default; } }));
var pattern_1 = __webpack_require__(16);
Object.defineProperty(exports, "Pattern", ({ enumerable: true, get: function () { return pattern_1.default; } }));
var route_1 = __webpack_require__(17);
Object.defineProperty(exports, "Route", ({ enumerable: true, get: function () { return route_1.default; } }));
var base_1 = __webpack_require__(18);
Object.defineProperty(exports, "BaseSource", ({ enumerable: true, get: function () { return base_1.default; } }));
var text_1 = __webpack_require__(19);
Object.defineProperty(exports, "TextSource", ({ enumerable: true, get: function () { return text_1.default; } }));
var token_2 = __webpack_require__(20);
Object.defineProperty(exports, "TokenSource", ({ enumerable: true, get: function () { return token_2.default; } }));
var route_2 = __webpack_require__(21);
Object.defineProperty(exports, "UnitRoute", ({ enumerable: true, get: function () { return route_2.default; } }));
var any_1 = __webpack_require__(22);
Object.defineProperty(exports, "AnyUnitPattern", ({ enumerable: true, get: function () { return any_1.default; } }));
var choose_1 = __webpack_require__(23);
Object.defineProperty(exports, "ChooseUnitPattern", ({ enumerable: true, get: function () { return choose_1.default; } }));
var expect_1 = __webpack_require__(26);
Object.defineProperty(exports, "ExpectUnitPattern", ({ enumerable: true, get: function () { return expect_1.default; } }));
var range_2 = __webpack_require__(27);
Object.defineProperty(exports, "RangeUnitPattern", ({ enumerable: true, get: function () { return range_2.default; } }));
var route_3 = __webpack_require__(28);
Object.defineProperty(exports, "FlowRoute", ({ enumerable: true, get: function () { return route_3.default; } }));
var choose_2 = __webpack_require__(29);
Object.defineProperty(exports, "ChooseFlowPattern", ({ enumerable: true, get: function () { return choose_2.default; } }));
var condition_1 = __webpack_require__(31);
Object.defineProperty(exports, "ConditionFlowPattern", ({ enumerable: true, get: function () { return condition_1.default; } }));
var run_1 = __webpack_require__(32);
Object.defineProperty(exports, "RunFlowPattern", ({ enumerable: true, get: function () { return run_1.default; } }));
var expect_2 = __webpack_require__(25);
Object.defineProperty(exports, "ExpectFlowPattern", ({ enumerable: true, get: function () { return expect_2.default; } }));
var end_1 = __webpack_require__(33);
Object.defineProperty(exports, "EndFlowPattern", ({ enumerable: true, get: function () { return end_1.default; } }));
var not_1 = __webpack_require__(34);
Object.defineProperty(exports, "NotFlowPattern", ({ enumerable: true, get: function () { return not_1.default; } }));
var opt_1 = __webpack_require__(35);
Object.defineProperty(exports, "OptFlowPattern", ({ enumerable: true, get: function () { return opt_1.default; } }));
var repeat_1 = __webpack_require__(36);
Object.defineProperty(exports, "RepeatFlowPattern", ({ enumerable: true, get: function () { return repeat_1.default; } }));
var static_1 = __webpack_require__(37);
Object.defineProperty(exports, "StaticFlowPattern", ({ enumerable: true, get: function () { return static_1.default; } }));
var map_1 = __webpack_require__(38);
Object.defineProperty(exports, "MapFlowPattern", ({ enumerable: true, get: function () { return map_1.default; } }));
var peek_1 = __webpack_require__(39);
Object.defineProperty(exports, "PeekFlowPattern", ({ enumerable: true, get: function () { return peek_1.default; } }));
var try_1 = __webpack_require__(30);
Object.defineProperty(exports, "TryFlowPattern", ({ enumerable: true, get: function () { return try_1.default; } }));
var route_4 = __webpack_require__(40);
Object.defineProperty(exports, "SetValueRoute", ({ enumerable: true, get: function () { return route_4.default; } }));
var set_1 = __webpack_require__(41);
Object.defineProperty(exports, "SetValuePattern", ({ enumerable: true, get: function () { return set_1.default; } }));
var route_5 = __webpack_require__(42);
Object.defineProperty(exports, "SetStateRoute", ({ enumerable: true, get: function () { return route_5.default; } }));
var has_1 = __webpack_require__(44);
Object.defineProperty(exports, "HasStatePattern", ({ enumerable: true, get: function () { return has_1.default; } }));
var set_2 = __webpack_require__(43);
Object.defineProperty(exports, "SetStatePattern", ({ enumerable: true, get: function () { return set_2.default; } }));
var route_6 = __webpack_require__(45);
Object.defineProperty(exports, "EmitErrorRoute", ({ enumerable: true, get: function () { return route_6.default; } }));
var emit_1 = __webpack_require__(46);
Object.defineProperty(exports, "EmitErrorPattern", ({ enumerable: true, get: function () { return emit_1.default; } }));
var route_7 = __webpack_require__(47);
Object.defineProperty(exports, "EmitTokenRoute", ({ enumerable: true, get: function () { return route_7.default; } }));
var emit_2 = __webpack_require__(48);
Object.defineProperty(exports, "EmitTokenPattern", ({ enumerable: true, get: function () { return emit_2.default; } }));
var route_8 = __webpack_require__(49);
Object.defineProperty(exports, "EmitNodeRoute", ({ enumerable: true, get: function () { return route_8.default; } }));
var emit_3 = __webpack_require__(50);
Object.defineProperty(exports, "EmitNodePattern", ({ enumerable: true, get: function () { return emit_3.default; } }));
var append_1 = __webpack_require__(51);
Object.defineProperty(exports, "AppendNodePattern", ({ enumerable: true, get: function () { return append_1.default; } }));
var prepend_1 = __webpack_require__(52);
Object.defineProperty(exports, "PrependNodePattern", ({ enumerable: true, get: function () { return prepend_1.default; } }));
var pivot_1 = __webpack_require__(53);
Object.defineProperty(exports, "PivotNodePattern", ({ enumerable: true, get: function () { return pivot_1.default; } }));
var place_1 = __webpack_require__(54);
Object.defineProperty(exports, "PlaceNodePattern", ({ enumerable: true, get: function () { return place_1.default; } }));
var route_9 = __webpack_require__(55);
Object.defineProperty(exports, "EmitSymbolRoute", ({ enumerable: true, get: function () { return route_9.default; } }));
var emit_4 = __webpack_require__(56);
Object.defineProperty(exports, "EmitSymbolPattern", ({ enumerable: true, get: function () { return emit_4.default; } }));
var scope_1 = __webpack_require__(57);
Object.defineProperty(exports, "ScopeSymbolPattern", ({ enumerable: true, get: function () { return scope_1.default; } }));
var route_10 = __webpack_require__(58);
Object.defineProperty(exports, "UncaseTransformRoute", ({ enumerable: true, get: function () { return route_10.default; } }));
var uncase_1 = __webpack_require__(24);
Object.defineProperty(exports, "UncaseTransformPattern", ({ enumerable: true, get: function () { return uncase_1.default; } }));
//# sourceMappingURL=index.js.map

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const error_1 = __webpack_require__(8);
const fragment_1 = __webpack_require__(9);
const location_1 = __webpack_require__(10);
const range_1 = __webpack_require__(11);
const table_1 = __webpack_require__(12);
const node_1 = __webpack_require__(13);
/**
 * Contains the analysis context and depending on the solution, can store errors, tokens, symbols and
 * nodes from the current consumption.
 */
class Context {
    /**
     * Context errors.
     */
    #errors = [];
    /**
     * Context tokens.
     */
    #tokens = [];
    /**
     * Context symbol table.
     */
    #table = new table_1.default();
    /**
     * Context main node.
     */
    #node;
    /**
     * Context name.
     */
    #name;
    /**
     * Default constructor.
     * @param name Context name.
     */
    constructor(name) {
        const range = new range_1.default(0, 0);
        const location = new location_1.default(name, range, range);
        const fragment = new fragment_1.default('', 0, 0, location);
        this.#node = new node_1.default(fragment, 0x00, this.#table);
        this.#name = name;
    }
    /**
     * Get the error list.
     */
    get errors() {
        return this.#errors;
    }
    /**
     * Get the token list.
     */
    get tokens() {
        return this.#tokens;
    }
    /**
     * Get the symbol table.
     */
    get table() {
        return this.#table;
    }
    /**
     * Get the root node.
     */
    get node() {
        return this.#node;
    }
    /**
     * Get the context name.
     */
    get name() {
        return this.#name;
    }
    /**
     * Add a new error in the context.
     * @param fragment Error fragment.
     * @param value Error value.
     */
    addError(fragment, value) {
        this.#errors.push(new error_1.default(fragment, value));
    }
}
exports["default"] = Context;
//# sourceMappingURL=context.js.map

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * An error product to compose the error list generated in the analysis process.
 */
class Error {
    /**
     * Error fragment.
     */
    #fragment;
    /**
     * Error value.
     */
    #value;
    /**
     * Default constructor.
     * @param fragment Error fragment.
     * @param value Error value.
     */
    constructor(fragment, value) {
        this.#fragment = fragment;
        this.#value = value;
    }
    /**
     * Get the error fragment.
     */
    get fragment() {
        return this.#fragment;
    }
    /**
     * Get the error value.
     */
    get value() {
        return this.#value;
    }
}
exports["default"] = Error;
//# sourceMappingURL=error.js.map

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * A data fragment with its precise location.
 */
class Fragment {
    /**
     * Fragment source.
     */
    #source;
    /**
     * Beginning of the fragment offset.
     */
    #begin;
    /**
     * End of the fragment offset
     */
    #end;
    /**
     * Fragment location.
     */
    #location;
    /**
     * Default constructor.
     * @param source Fragment source.
     * @param offset Fragment offset.
     * @param length Fragment length.
     * @param location Fragment location.
     */
    constructor(source, begin, end, location) {
        this.#source = source;
        this.#begin = begin;
        this.#end = end;
        this.#location = location;
    }
    /**
     * Get the fragment source.
     */
    get source() {
        return this.#source;
    }
    /**
     * Get the fragment data.
     */
    get data() {
        return this.#source.substring(this.#begin, this.#end);
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
     * Get the fragment length.
     */
    get length() {
        return this.#end - this.#begin;
    }
    /**
     * Get the fragment location in terms of lines and columns.
     */
    get location() {
        return this.#location;
    }
}
exports["default"] = Fragment;
//# sourceMappingURL=fragment.js.map

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
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
exports["default"] = Location;
//# sourceMappingURL=location.js.map

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * A range class.
 */
class Range {
    /**
     * Range begin.
     */
    #begin;
    /**
     * Range end.
     */
    #end;
    /**
     * Default constructor.
     * @param begin Range begin.
     * @param end Range end.
     */
    constructor(begin, end) {
        this.#begin = begin;
        this.#end = end;
    }
    /**
     * Get the range begin.
     */
    get begin() {
        return this.#begin;
    }
    /**
     * Get the range end.
     */
    get end() {
        return this.#end;
    }
    /**
     * Get the range length.
     */
    get length() {
        return this.#end - this.#begin;
    }
}
exports["default"] = Range;
//# sourceMappingURL=range.js.map

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const fragment_1 = __webpack_require__(9);
/**
 * A symbol table for storing symbol records generated during the analysis process.
 */
class Table {
    /**
     * Table of records.
     */
    #records = {};
    /**
     * Table length.
     */
    #length = 0;
    /**
     * Parent table.
     */
    #parent;
    /**
     * Default constructor.
     * @param parent Parent table.
     */
    constructor(parent) {
        this.#parent = parent;
    }
    /**
     * Get all the record names in the table.
     */
    get names() {
        return Object.keys(this.#records);
    }
    /**
     * Get the number of entries in the table.
     */
    get length() {
        return this.#length;
    }
    /**
     * Get the parent table.
     */
    get parent() {
        return this.#parent;
    }
    /**
     * Check whether or not there's a symbol record for the given name.
     * @param name Symbol record name.
     * @returns Returns true when the symbol record already exists, false otherwise.
     */
    has(name) {
        return this.get(name) !== void 0;
    }
    /**
     * Get the symbol record that corresponds to the specified name.
     * @param name Symbol record name.
     * @returns Returns the corresponding record or undefined when the record wasn't found.
     */
    get(name) {
        return this.#records[name instanceof fragment_1.default ? name.data : name];
    }
    /**
     * Add a new symbol record into the symbol table.
     * @param record Symbol record.
     * @throw Throws an error when a symbol record with the same name (fragment data) already exists.
     * @returns Returns the given symbol record.
     */
    add(record) {
        const name = record.fragment.data;
        if (this.#records[name]) {
            throw 'Unable to add records with duplicate name.';
        }
        this.#records[name] = record;
        this.#length++;
        return record;
    }
    /**
     * Find for a symbol record that corresponds to the specified name in all symbol tables.
     * @param name Symbol record name.
     * @returns Returns the corresponding record or undefined when the record wasn't found.
     */
    find(name) {
        const record = this.get(name);
        if (!record && this.#parent) {
            return this.#parent.find(name);
        }
        return record;
    }
    /**
     * Iterable generator.
     */
    *[Symbol.iterator]() {
        for (const name in this.#records) {
            yield this.#records[name];
        }
    }
}
exports["default"] = Table;
//# sourceMappingURL=table.js.map

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * A node product to compose the AST generated in the analysis process.
 */
class Node {
    /**
     * Node children.
     */
    #children = {};
    /**
     * Node fragment.
     */
    #fragment;
    /**
     * Node value.
     */
    #value;
    /**
     * Node symbol table.
     */
    #table;
    /**
     * Default constructor
     * @param fragment Node fragment.
     * @param value Node value.
     * @param table Node table.
     */
    constructor(fragment, value, table) {
        this.#fragment = fragment;
        this.#table = table;
        this.#value = value;
    }
    /**
     * Get the node fragment.
     */
    get fragment() {
        return this.#fragment;
    }
    /**
     * Get the node value.
     */
    get value() {
        return this.#value;
    }
    /**
     * Get the symbol table associated to the node.
     */
    get table() {
        return this.#table;
    }
    /**
     * Get the child node on the left.
     */
    get left() {
        return this.#children[0 /* Left */];
    }
    /**
     * Get the child node on the right.
     */
    get right() {
        return this.#children[1 /* Right */];
    }
    /**
     * Get the child node on the next.
     */
    get next() {
        return this.#children[2 /* Next */];
    }
    /**
     * Swap all the currently node properties by all properties from the given one.
     * @param node Input node.
     */
    swap(node) {
        [this.#children, node.#children] = [node.#children, this.#children];
        [this.#fragment, node.#fragment] = [node.#fragment, this.#fragment];
        [this.#table, node.#table] = [node.#table, this.#table];
        [this.#value, node.#value] = [node.#value, this.#value];
    }
    /**
     * Get a child node in the specified direction.
     * @param child Child node direction.
     * @returns Return the corresponding child node.
     */
    getChild(child) {
        return this.#children[child];
    }
    /**
     * Set the specified child node in the given direction.
     * @param child Child node direction.
     * @param node New child node.
     */
    setChild(child, node) {
        this.#children[child] = node;
    }
    /**
     * Get the lowest child node in the given direction.
     * @param child Child node direction.
     * @returns Returns the corresponding child node.
     */
    getLowestChild(child) {
        let current = this;
        let node;
        while ((current = current.getChild(child))) {
            node = current;
        }
        return node;
    }
}
exports["default"] = Node;
//# sourceMappingURL=node.js.map

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * A token product to compose the token list generated in the analysis process.
 */
class Token {
    /**
     * Token fragment.
     */
    #fragment;
    /**
     * Token value.
     */
    #value;
    /**
     * Default constructor.
     * @param fragment Token fragment.
     * @param value Token value.
     */
    constructor(fragment, value) {
        this.#fragment = fragment;
        this.#value = value;
    }
    /**
     * Get the token fragment.
     */
    get fragment() {
        return this.#fragment;
    }
    /**
     * Get the token value.
     */
    get value() {
        return this.#value;
    }
}
exports["default"] = Token;
//# sourceMappingURL=token.js.map

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * A symbol record generated during the analysis process to be stored into the symbol table.
 */
class Record {
    /**
     * Record data map.
     */
    #data = {};
    /**
     * Record fragment.
     */
    #fragment;
    /**
     * Record value.
     */
    #value;
    /**
     * Record node.
     */
    #node;
    /**
     * Record table link.
     */
    #link;
    /**
     * Default constructor.
     * @param fragment Record fragment.
     * @param value Record value.
     * @param node Record node.
     * @param link Record table link.
     */
    constructor(fragment, value, node, link) {
        this.#fragment = fragment;
        this.#value = value;
        this.#node = node;
        this.#link = link;
    }
    /**
     * Get the record data map.
     */
    get data() {
        return this.#data;
    }
    /**
     * Get the record fragment.
     */
    get fragment() {
        return this.#fragment;
    }
    /**
     * Get the record value.
     */
    get value() {
        return this.#value;
    }
    /**
     * Get the record node.
     */
    get node() {
        return this.#node;
    }
    /**
     * Get the record table link.
     */
    get link() {
        return this.#link;
    }
}
exports["default"] = Record;
//# sourceMappingURL=record.js.map

/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * Base of any pattern class.
 */
class Pattern {
    /**
     * Should be implemented to consume the given source.
     * @param source Should receive the data source.
     * @returns Should returns true when the data source was consumed, otherwise should return false.
     */
    consume(source) {
        throw "Consume method doesn't implemented.";
    }
}
exports["default"] = Pattern;
//# sourceMappingURL=pattern.js.map

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * Base of any route for using together with map patterns.
 */
class Route {
    /**
     * Route pattern.
     */
    #pattern;
    /**
     * Route units.
     */
    #units;
    /**
     * Default constructor.
     * @param pattern Route pattern.
     * @param first First route unit.
     * @param units Remaining route units.
     */
    constructor(pattern, first, ...units) {
        this.#pattern = pattern;
        this.#units = [first, ...units];
    }
    /**
     * Get the route pattern.
     */
    get pattern() {
        return this.#pattern;
    }
    /**
     * Get the route units.
     */
    get units() {
        return this.#units;
    }
}
exports["default"] = Route;
//# sourceMappingURL=route.js.map

/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const error_1 = __webpack_require__(8);
const token_1 = __webpack_require__(14);
const node_1 = __webpack_require__(13);
const record_1 = __webpack_require__(15);
const table_1 = __webpack_require__(12);
/**
 * Base of any data source for the analysis process.
 */
class Base {
    /**
     * Source context.
     */
    #context;
    /**
     * Current symbol table manager.
     */
    #table;
    /**
     * Current source output.
     */
    #output;
    /**
     * Magic value for getting the current output value from the current source.
     */
    static get Output() {
        return 0xffffffff;
    }
    /**
     * Default constructor.
     * @param context Source context.
     */
    constructor(context) {
        this.#context = context;
        this.#table = context.table;
        this.#output = {
            state: 0,
            table: this.#table
        };
    }
    /**
     * Get the source context name.
     */
    get name() {
        return this.#context.name;
    }
    /**
     * Get the current source output.
     */
    get output() {
        return this.#output;
    }
    /**
     * Should be implemented to return the current source offset.
     */
    get offset() {
        throw "Property doesn't implemented.";
    }
    /**
     * Should be implemented to return the current source length.
     */
    get length() {
        throw "Property doesn't implemented.";
    }
    /**
     * Should be implemented to return the current source value.
     */
    get value() {
        throw "Property doesn't implemented.";
    }
    /**
     * Should be implemented to return the current source fragment.
     */
    get fragment() {
        throw "Property doesn't implemented.";
    }
    /**
     * Should be implement to push the current source state.
     */
    saveState() {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to restore the previous source state.
     */
    restoreState() {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to pop the previous source state.
     */
    discardState() {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to move to the next source state.
     */
    nextState() {
        throw "Move method doesn't implemented.";
    }
    /**
     * Emit the given product in the current source context.
     * @param product Input product.
     * @throws Throws an error when the given product isn't supported.
     */
    emit(product) {
        if (product instanceof error_1.default) {
            this.#context.errors.push(product);
        }
        else if (product instanceof token_1.default) {
            this.#context.tokens.push(product);
        }
        else if (product instanceof node_1.default) {
            const root = this.#context.node.getLowestChild(2 /* Next */) ?? this.#context.node;
            root.setChild(2 /* Next */, product);
        }
        else if (product instanceof record_1.default) {
            this.#table.add(product);
        }
        else {
            throw 'Unsupported product type.';
        }
    }
    /**
     * Open a new symbol table.
     */
    openTable() {
        this.#table = new table_1.default(this.#table);
        this.#output.table = this.#table;
    }
    /**
     * Close the current symbol table.
     * @throws Throws an error when there's no parent symbol table to be collapsed.
     */
    closeTable() {
        if (!this.#table.parent) {
            throw "There's no parent symbol table to collapse.";
        }
        if (this.#table.length > 0) {
            this.#output.link = this.#table;
        }
        this.#table = this.#table.parent;
        this.#output.table = this.#table;
    }
}
exports["default"] = Base;
//# sourceMappingURL=base.js.map

/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const fragment_1 = __webpack_require__(9);
const location_1 = __webpack_require__(10);
const range_1 = __webpack_require__(11);
const base_1 = __webpack_require__(18);
/**
 * Data source for processing texts during the analysis process.
 */
class Text extends base_1.default {
    /**
     * Source data.
     */
    #data;
    /**
     * Source states.
     */
    #states = [];
    /**
     * Current source state.
     */
    #current = { line: 0, column: 0, offset: 0 };
    /**
     * Longest source state.
     */
    #longest = { ...this.#current };
    /**
     * Default constructor.
     * @param data Source data.
     * @param context Source context.
     */
    constructor(data, context) {
        super(context);
        this.#data = data;
    }
    /**
     * Get the current source offset.
     */
    get offset() {
        return this.#current.offset;
    }
    /**
     * Get the available source length.
     */
    get length() {
        return this.#data.length - this.offset;
    }
    /**
     * Get the current source value.
     * @throws Throws an error when the source is empty.
     */
    get value() {
        const value = this.#data[this.offset];
        if (!value) {
            throw "There's no value to get.";
        }
        return value;
    }
    /**
     * Get the current source fragment.
     * If there are pushed states, the fragment length will be based in the current and the previous pushed state.
     */
    get fragment() {
        if (this.#states.length > 0) {
            const state = this.#states[this.#states.length - 1];
            if (this.offset > state.offset) {
                const line = new range_1.default(state.line, this.#current.line);
                const column = new range_1.default(state.column, this.#current.column);
                const location = new location_1.default(this.name, line, column);
                return new fragment_1.default(this.#data, state.offset, this.offset, location);
            }
        }
        const line = new range_1.default(this.#current.line, this.#current.line);
        const column = new range_1.default(this.#current.column, this.#current.column);
        const location = new location_1.default(this.name, line, column);
        const length = this.offset + (this.length > 0 ? 1 : 0);
        return new fragment_1.default(this.#data, this.offset, length, location);
    }
    /**
     * Get the current state.
     */
    get currentState() {
        return this.#current;
    }
    /**
     * Get the longest state.
     */
    get longestState() {
        return this.#longest;
    }
    /**
     * Save the current source state.
     */
    saveState() {
        this.#states.push({ ...this.#current });
    }
    /**
     * Restore the previous source state.
     * @throws Throws an error when there's no state to restore.
     */
    restoreState() {
        if (!(this.#current = this.#states[this.#states.length - 1])) {
            throw "There's no state to restore.";
        }
    }
    /**
     * Discard the current source state.
     */
    discardState() {
        this.#states.pop();
    }
    /**
     * Move to the next source state.
     */
    nextState() {
        if (this.value !== '\n') {
            this.#current.column++;
        }
        else {
            this.#current.column = 0;
            this.#current.line++;
        }
        this.#current.offset++;
        if (this.#current.offset > this.#longest.offset) {
            this.#longest = { ...this.#current };
        }
    }
}
exports["default"] = Text;
//# sourceMappingURL=text.js.map

/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const fragment_1 = __webpack_require__(9);
const location_1 = __webpack_require__(10);
const range_1 = __webpack_require__(11);
const base_1 = __webpack_require__(18);
/**
 * Data source for processing tokens during the analysis.
 */
class TokenSource extends base_1.default {
    /**
     * Source data.
     */
    #data;
    /**
     * Source states.
     */
    #states = [];
    /**
     * Current source state.
     */
    #current = { offset: 0 };
    /**
     * Longest source state.
     */
    #longest = { ...this.#current };
    /**
     * Default constructor.
     * @param data Source data.
     * @param context Source context.
     */
    constructor(data, context) {
        super(context);
        this.#data = data;
    }
    /**
     * Get the current source offset.
     */
    get offset() {
        return this.#current.offset;
    }
    /**
     * Get the current source length.
     */
    get length() {
        return this.#data.length - this.offset;
    }
    /**
     * Get the current source value.
     * @throws Throws an error when the source is empty.
     */
    get value() {
        const value = this.#data[this.offset];
        if (!value) {
            throw "There's no value to get.";
        }
        return value.value;
    }
    /**
     * Get the current source fragment.
     */
    get fragment() {
        if (this.#states.length > 0) {
            const state = this.#states[this.#states.length - 1];
            if (this.offset > state.offset) {
                const first = this.#data[state.offset].fragment;
                const last = this.#data[Math.max(0, this.offset - 1)].fragment;
                const line = new range_1.default(first.location.line.begin, last.location.line.end);
                const column = new range_1.default(first.location.column.begin, last.location.column.end);
                const location = new location_1.default(first.location.name, line, column);
                return new fragment_1.default(first.source, first.begin, last.end, location);
            }
        }
        const offset = Math.min(this.offset, this.#data.length - 1);
        return this.#data[offset].fragment;
    }
    /**
     * Get the current state.
     */
    get currentState() {
        return this.#current;
    }
    /**
     * Get the longest state.
     */
    get longestState() {
        return this.#longest;
    }
    /**
     * Save the current source state.
     */
    saveState() {
        this.#states.push({ ...this.#current });
    }
    /**
     * Restore the previous source state.
     * @throws Throws an error when there's no state to restore.
     */
    restoreState() {
        if (!(this.#current = this.#states[this.#states.length - 1])) {
            throw "There's no state to restore.";
        }
    }
    /**
     * Discard the current source state.
     */
    discardState() {
        this.#states.pop();
    }
    /**
     * Move to the next source state.
     */
    nextState() {
        this.#current.offset++;
        if (this.#current.offset > this.#longest.offset) {
            this.#longest = { ...this.#current };
        }
    }
}
exports["default"] = TokenSource;
//# sourceMappingURL=token.js.map

/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const route_1 = __webpack_require__(17);
/**
 * Produce a route to consume units.
 */
class Route extends route_1.default {
    /**
     * Default constructor.
     * @param first First route unit.
     * @param units Route units.
     */
    constructor(first, ...units) {
        super(null, first, ...units);
    }
}
exports["default"] = Route;
//# sourceMappingURL=route.js.map

/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const pattern_1 = __webpack_require__(16);
/**
 * Consume one unit.
 */
class Any extends pattern_1.default {
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source) {
        if (source.length > 0) {
            source.nextState();
            return true;
        }
        return false;
    }
}
exports["default"] = Any;
//# sourceMappingURL=any.js.map

/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const pattern_1 = __webpack_require__(16);
const uncase_1 = __webpack_require__(24);
/**
 * Consume one unit that is between all the acceptable units in the pattern.
 */
class Choose extends pattern_1.default {
    /**
     * Set of units.
     */
    #units;
    /**
     * Default constructor.
     * @param units List of acceptable units.
     */
    constructor(...units) {
        super();
        this.#units = new Set(units);
    }
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source) {
        if (source.length > 0) {
            const unit = uncase_1.default.transform(source.value);
            if (this.#units.has(unit)) {
                source.nextState();
                return true;
            }
        }
        return false;
    }
}
exports["default"] = Choose;
//# sourceMappingURL=choose.js.map

/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const expect_1 = __webpack_require__(25);
const pattern_1 = __webpack_require__(16);
/**
 * Consumes all the given patterns with the uncase transformation.
 */
class Uncase extends pattern_1.default {
    /**
     * Target pattern.
     */
    #target;
    /**
     * Default constructor.
     * @param patterns Sequence of patterns.
     */
    constructor(...patterns) {
        super();
        this.#target = new expect_1.default(...patterns);
    }
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source) {
        const current = Uncase.#state;
        Uncase.#state = true;
        const result = this.#target.consume(source);
        Uncase.#state = current;
        return result;
    }
    /**
     * Current state.
     */
    static #state = false;
    /**
     * Transform the given unit according to the current state.
     * @param unit Input unit.
     * @returns Returns the unit transformation.
     */
    static transform(unit) {
        return Uncase.active && typeof unit === 'string' ? unit.toLocaleLowerCase() : unit;
    }
    /**
     * Determines whether or not the uncase is active.
     */
    static get active() {
        return Uncase.#state;
    }
}
exports["default"] = Uncase;
//# sourceMappingURL=uncase.js.map

/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const pattern_1 = __webpack_require__(16);
/**
 * Consume all patterns that are expected by this pattern.
 */
class Expect extends pattern_1.default {
    /**
     * Target patterns.
     */
    #targets;
    /**
     * Default constructor.
     * @param patterns Sequence of patterns.
     */
    constructor(...patterns) {
        super();
        this.#targets = patterns;
    }
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source) {
        for (const target of this.#targets) {
            if (!target.consume(source)) {
                return false;
            }
        }
        return true;
    }
}
exports["default"] = Expect;
//# sourceMappingURL=expect.js.map

/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const pattern_1 = __webpack_require__(16);
const uncase_1 = __webpack_require__(24);
/**
 * Consume all the units that are expected by the pattern.
 */
class Expect extends pattern_1.default {
    /**
     * Array of units.
     */
    #units;
    /**
     * Default constructor.
     * @param units List of expected units.
     */
    constructor(...units) {
        super();
        this.#units = units;
    }
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source) {
        for (const unit of this.#units) {
            if (source.length === 0 || unit !== uncase_1.default.transform(source.value)) {
                return false;
            }
            source.nextState();
        }
        return true;
    }
}
exports["default"] = Expect;
//# sourceMappingURL=expect.js.map

/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const pattern_1 = __webpack_require__(16);
const uncase_1 = __webpack_require__(24);
/**
 * Consume one unit that is in the range accepted by the pattern.
 */
class Range extends pattern_1.default {
    /**
     * Beginning of the boundary unit.
     */
    #begin;
    /**
     * End of the boundary unit.
     */
    #end;
    /**
     * Default constructor.
     * @param begin Beginning of the boundary unit.
     * @param end End of the boundary unit.
     */
    constructor(begin, end) {
        super();
        this.#begin = begin;
        this.#end = end;
    }
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source) {
        if (source.length > 0) {
            const unit = uncase_1.default.transform(source.value);
            if (unit >= this.#begin && unit <= this.#end) {
                source.nextState();
                return true;
            }
        }
        return false;
    }
}
exports["default"] = Range;
//# sourceMappingURL=range.js.map

/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const route_1 = __webpack_require__(17);
/**
 * Produce a route to consume units and, in case of success, it consumes the specified pattern.
 */
class Route extends route_1.default {
    /**
     * Default constructor.
     * @param pattern Route pattern.
     * @param first First route unit.
     * @param units Route units.
     */
    constructor(pattern, first, ...units) {
        super(pattern, first, ...units);
    }
}
exports["default"] = Route;
//# sourceMappingURL=route.js.map

/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const pattern_1 = __webpack_require__(16);
const try_1 = __webpack_require__(30);
/**
 * Consume the first matching pattern in the list of patterns.
 */
class Choose extends pattern_1.default {
    /**
     * List of target patterns.
     */
    #targets;
    /**
     * Default constructor.
     * @param patterns List of patterns.
     */
    constructor(...patterns) {
        super();
        this.#targets = patterns.map((pattern) => new try_1.default(pattern));
    }
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source) {
        for (const target of this.#targets) {
            if (target.consume(source)) {
                return true;
            }
        }
        return false;
    }
}
exports["default"] = Choose;
//# sourceMappingURL=choose.js.map

/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const pattern_1 = __webpack_require__(16);
const expect_1 = __webpack_require__(25);
/**
 * Consume all the given patterns and, in case of failure, it preserves the current source state.
 */
class Try extends pattern_1.default {
    /**
     * Target pattern.
     */
    #target;
    /**
     * Default constructor.
     * @param pattern Sequence of patterns.
     */
    constructor(...patterns) {
        super();
        this.#target = new expect_1.default(...patterns);
    }
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source) {
        source.saveState();
        const status = this.#target.consume(source);
        if (!status) {
            source.restoreState();
        }
        source.discardState();
        return status;
    }
}
exports["default"] = Try;
//# sourceMappingURL=try.js.map

/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const pattern_1 = __webpack_require__(16);
const try_1 = __webpack_require__(30);
/**
 * Consume the test pattern and, in case of success, it also consumes the success pattern.
 * Otherwise, it will consume the failure pattern (when specified).
 */
class Condition extends pattern_1.default {
    /**
     * Test pattern.
     */
    #test;
    /**
     * Success pattern.
     */
    #success;
    /**
     * Failure pattern.
     */
    #failure;
    /**
     * Default constructor.
     * @param test Test pattern.
     * @param success Success pattern.
     * @param failure Failure pattern.
     */
    constructor(test, success, failure) {
        super();
        this.#test = new try_1.default(test);
        this.#success = success;
        this.#failure = failure;
    }
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source) {
        if (this.#test.consume(source)) {
            return this.#success.consume(source);
        }
        else if (this.#failure) {
            return this.#failure.consume(source);
        }
        return false;
    }
}
exports["default"] = Condition;
//# sourceMappingURL=condition.js.map

/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const pattern_1 = __webpack_require__(16);
/**
 * Consume the pattern object returned by the callback given for this pattern.
 */
class Run extends pattern_1.default {
    /**
     * Callback for the pattern.
     */
    #callback;
    /**
     * Default constructor.
     * @param callback Callback for the pattern.
     */
    constructor(callback) {
        super();
        this.#callback = callback;
    }
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source) {
        return this.#callback().consume(source);
    }
}
exports["default"] = Run;
//# sourceMappingURL=run.js.map

/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const pattern_1 = __webpack_require__(16);
/**
 * Doesn't consume anything, but it expects the end of the given data source.
 */
class End extends pattern_1.default {
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was ended, otherwise returns false.
     */
    consume(source) {
        return source.length === 0;
    }
}
exports["default"] = End;
//# sourceMappingURL=end.js.map

/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const pattern_1 = __webpack_require__(16);
const try_1 = __webpack_require__(30);
/**
 * Consume all the given patterns and invert the consumption state.
 */
class Not extends pattern_1.default {
    /**
     * Target pattern.
     */
    #target;
    /**
     * Default constructor.
     * @param patterns Sequence of patterns.
     */
    constructor(...patterns) {
        super();
        this.#target = new try_1.default(...patterns);
    }
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns the inverted consumption state.
     */
    consume(source) {
        if (source.length > 0) {
            return !this.#target.consume(source);
        }
        return false;
    }
}
exports["default"] = Not;
//# sourceMappingURL=not.js.map

/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const pattern_1 = __webpack_require__(16);
const try_1 = __webpack_require__(30);
/**
 * Consume all the given patterns in this pattern as an optional behavior.
 */
class Opt extends pattern_1.default {
    /**
     * Target pattern.
     */
    #target;
    /**
     * Default constructor.
     * @param patterns Sequence of patterns.
     */
    constructor(...patterns) {
        super();
        this.#target = new try_1.default(...patterns);
    }
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true anyways.
     */
    consume(source) {
        this.#target.consume(source);
        return true;
    }
}
exports["default"] = Opt;
//# sourceMappingURL=opt.js.map

/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const pattern_1 = __webpack_require__(16);
const expect_1 = __webpack_require__(25);
const try_1 = __webpack_require__(30);
/**
 * Consume all the given patterns in this pattern and, in case of success, retry the consumption.
 */
class Repeat extends pattern_1.default {
    /**
     * Target pattern.
     */
    #target;
    /**
     * Triable pattern.
     */
    #triable;
    /**
     * Default constructor.
     * @param patterns Sequence of patterns.
     */
    constructor(...patterns) {
        super();
        this.#target = new expect_1.default(...patterns);
        this.#triable = new try_1.default(this.#target);
    }
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source) {
        if (this.#target.consume(source)) {
            while (this.#triable.consume(source))
                ;
            return true;
        }
        return false;
    }
}
exports["default"] = Repeat;
//# sourceMappingURL=repeat.js.map

/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const pattern_1 = __webpack_require__(16);
/**
 * Doesn't consume anything and returns the static state given for this pattern.
 */
class Static extends pattern_1.default {
    /**
     * Static value.
     */
    #value;
    /**
     * Default constructor.
     * @param value Static value.
     */
    constructor(value) {
        super();
        this.#value = value;
    }
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns the static result.
     */
    consume(source) {
        return this.#value;
    }
}
exports["default"] = Static;
//# sourceMappingURL=static.js.map

/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const pattern_1 = __webpack_require__(16);
const uncase_1 = __webpack_require__(24);
/**
 * Consume the first route that match in the list of routes given for this pattern.
 */
class Map extends pattern_1.default {
    /**
     * Root node.
     */
    #root;
    /**
     * Compare the given inputs and returns the difference between both of them.
     * @param a Input A.
     * @param b Input B.
     * @returns Returns less than zero when input A is less than input B.
     *          Returns greater than zero when input A is greater than input B.
     *          Returns zero when input A is equals to input B.
     */
    #compare(a, b) {
        const x = typeof a === 'string' ? a.charCodeAt(0) : a;
        const y = typeof b === 'string' ? b.charCodeAt(0) : b;
        return x - y;
    }
    /**
     * Get the node that correspond to the given input units.
     * @param units Input units.
     * @returns Returns the corresponding node or undefined when it wasn't found.
     */
    #getNode(units) {
        let current = this.#root;
        let previous = void 0;
        for (let index = 0; index < units.length;) {
            if (!current) {
                return void 0;
            }
            const unit = uncase_1.default.transform(units[index]);
            const diff = this.#compare(current.value, unit);
            if (diff < 0) {
                current = current.left;
            }
            else if (diff > 0) {
                current = current.right;
            }
            else {
                previous = current;
                current = current.next;
                index++;
            }
        }
        return previous;
    }
    /**
     * Set a new node based on the given input units.
     * @param units Input units.
     * @returns Returns the terminal node or undefined when the given units are empty.
     */
    #setNode(units) {
        let current = this.#root;
        let previous = current;
        let selected = current;
        let diff = 0;
        for (let index = 0; index < units.length;) {
            if (current) {
                const unit = uncase_1.default.transform(units[index]);
                diff = this.#compare(current.value, unit);
                if (diff < 0) {
                    previous = current;
                    current = current.left;
                    continue;
                }
                else if (diff > 0) {
                    previous = current;
                    current = current.right;
                    continue;
                }
            }
            else {
                const node = { value: units[index] };
                if (previous) {
                    if (diff < 0) {
                        previous.left = current = node;
                    }
                    else if (diff > 0) {
                        previous.right = current = node;
                    }
                    else {
                        previous.next = current = node;
                    }
                    diff = 0;
                }
                else {
                    this.#root = previous = current = node;
                }
            }
            selected = current;
            previous = current;
            current = current.next;
            index++;
        }
        return selected;
    }
    /**
     * Find a node with pattern in the given data source starting from the specified node.
     * @param source Data source.
     * @param current Current node.
     * @returns Returns the corresponding node or undefined when it wasn't found.
     */
    #findNode(source, current) {
        source.saveState();
        while (current && source.length > 0) {
            const unit = uncase_1.default.transform(source.value);
            const diff = this.#compare(current.value, unit);
            if (diff < 0) {
                current = current.left;
            }
            else if (diff > 0) {
                current = current.right;
            }
            else {
                if (current.pattern !== void 0) {
                    source.discardState();
                    return current;
                }
                source.nextState();
                current = current.next;
            }
        }
        source.restoreState();
        source.discardState();
        return void 0;
    }
    /**
     * Consume the given source and get the longest consumption node.
     * @param source Data source.
     * @returns Returns the consumption node or undefined when the given source doesn't match any route.
     */
    #getLongestConsumptionNode(source) {
        let current = this.#root;
        let longest;
        while ((current = this.#findNode(source, current))) {
            longest = current;
            current = current.next;
            source.nextState();
        }
        return longest;
    }
    /**
     * Default constructor.
     * @param routes List of routes.
     */
    constructor(...routes) {
        super();
        for (const route of routes) {
            const node = this.#getNode(route.units) ?? this.#setNode(route.units);
            node.pattern = route.pattern;
        }
    }
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source) {
        const node = this.#getLongestConsumptionNode(source);
        if (node) {
            if (node.pattern) {
                return node.pattern.consume(source);
            }
            return true;
        }
        return false;
    }
}
exports["default"] = Map;
//# sourceMappingURL=map.js.map

/***/ }),
/* 39 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const pattern_1 = __webpack_require__(16);
const expect_1 = __webpack_require__(25);
/**
 * Consume all the given patterns and always preserve the current source state.
 */
class Peek extends pattern_1.default {
    /**
     * Target pattern.
     */
    #target;
    /**
     * Default constructor.
     * @param pattern Sequence of patterns.
     */
    constructor(...patterns) {
        super();
        this.#target = new expect_1.default(...patterns);
    }
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source) {
        source.saveState();
        const status = this.#target.consume(source);
        source.restoreState();
        return status;
    }
}
exports["default"] = Peek;
//# sourceMappingURL=peek.js.map

/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const route_1 = __webpack_require__(17);
const pattern_1 = __webpack_require__(16);
const set_1 = __webpack_require__(41);
/**
 * Produce a route to consume units and, in case of success, it emits a new token.
 */
class Route extends route_1.default {
    /**
     * Default constructor.
     * @param value New value.
     * @param first Route pattern or first route unit.
     * @param units Route units.
     */
    constructor(value, first, ...units) {
        if (first instanceof pattern_1.default) {
            const [test, ...remaining] = units;
            super(new set_1.default(value, first), test, ...remaining);
        }
        else {
            super(new set_1.default(value), first, ...units);
        }
    }
}
exports["default"] = Route;
//# sourceMappingURL=route.js.map

/***/ }),
/* 41 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const expect_1 = __webpack_require__(25);
const pattern_1 = __webpack_require__(16);
/**
 * Consume all the given patterns and, in case of success, it will change the current output value.
 */
class Set extends pattern_1.default {
    /**
     * Target pattern.
     */
    #target;
    /**
     * Token value.
     */
    #value;
    /**
     * Default constructor.
     * @param value New value.
     * @param patterns Sequence of patterns.
     */
    constructor(value, ...patterns) {
        super();
        this.#target = new expect_1.default(...patterns);
        this.#value = value;
    }
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source) {
        if (this.#target.consume(source)) {
            source.output.value = this.#value;
            return true;
        }
        return false;
    }
}
exports["default"] = Set;
//# sourceMappingURL=set.js.map

/***/ }),
/* 42 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const route_1 = __webpack_require__(17);
const pattern_1 = __webpack_require__(16);
const set_1 = __webpack_require__(43);
/**
 * Produce a route to consume units and, in case of success, it set a new state value.
 */
class Route extends route_1.default {
    /**
     * Default constructor.
     * @param value State value.
     * @param first Route pattern or first route unit.
     * @param units Route units.
     */
    constructor(value, first, ...units) {
        if (first instanceof pattern_1.default) {
            super(new set_1.default(value, first), units[0], ...units.splice(1));
        }
        else {
            super(new set_1.default(value), first, ...units);
        }
    }
}
exports["default"] = Route;
//# sourceMappingURL=route.js.map

/***/ }),
/* 43 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const expect_1 = __webpack_require__(25);
const pattern_1 = __webpack_require__(16);
/**
 * Consumes all the given patterns and, in case of success, it will set a new state value.
 */
class Set extends pattern_1.default {
    /**
     * Target pattern.
     */
    #target;
    /**
     * State value.
     */
    #value;
    /**
     * Default constructor.
     * @param value State value.
     * @param patterns Sequence of patterns.
     */
    constructor(value, ...patterns) {
        super();
        this.#target = new expect_1.default(...patterns);
        this.#value = value;
    }
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source) {
        if (this.#target.consume(source)) {
            source.output.state = this.#value;
            return true;
        }
        return false;
    }
}
exports["default"] = Set;
//# sourceMappingURL=set.js.map

/***/ }),
/* 44 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const expect_1 = __webpack_require__(25);
const pattern_1 = __webpack_require__(16);
/**
 * Consume all the given patterns when the specified state value is defined.
 */
class Has extends pattern_1.default {
    /**
     * Target pattern.
     */
    #target;
    /**
     * State value.
     */
    #value;
    /**
     * Default constructor.
     * @param value State value.
     * @param patterns Sequence of patterns.
     */
    constructor(value, ...patterns) {
        super();
        this.#target = new expect_1.default(...patterns);
        this.#value = value;
    }
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source) {
        if (source.output.state === this.#value) {
            return this.#target.consume(source);
        }
        return false;
    }
}
exports["default"] = Has;
//# sourceMappingURL=has.js.map

/***/ }),
/* 45 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const route_1 = __webpack_require__(17);
const pattern_1 = __webpack_require__(16);
const emit_1 = __webpack_require__(46);
/**
 * Produce a route to consume units and, in case of success, it emits a new error.
 */
class Route extends route_1.default {
    /**
     * Default constructor.
     * @param value Error value.
     * @param first Route pattern or first route unit.
     * @param units Route units.
     */
    constructor(value, first, ...units) {
        if (first instanceof pattern_1.default) {
            super(new emit_1.default(value, first), units[0], ...units.splice(1));
        }
        else {
            super(new emit_1.default(value), first, ...units);
        }
    }
}
exports["default"] = Route;
//# sourceMappingURL=route.js.map

/***/ }),
/* 46 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_1 = __webpack_require__(18);
const error_1 = __webpack_require__(8);
const expect_1 = __webpack_require__(25);
const pattern_1 = __webpack_require__(16);
/**
 * Consume all the given patterns and, in case of success, it will emit a new error into the current error list.
 */
class Emit extends pattern_1.default {
    /**
     * Target pattern.
     */
    #target;
    /**
     * Error value.
     */
    #value;
    /**
     * Default constructor.
     * @param value Error value.
     * @param patterns Sequence of patterns.
     */
    constructor(value, ...patterns) {
        super();
        this.#target = new expect_1.default(...patterns);
        this.#value = value;
    }
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source) {
        source.saveState();
        const status = this.#target.consume(source);
        if (status) {
            const { value } = source.output;
            const result = this.#value === base_1.default.Output ? value ?? -1 : this.#value;
            const error = new error_1.default(source.fragment, result);
            source.emit(error);
        }
        source.discardState();
        return status;
    }
}
exports["default"] = Emit;
//# sourceMappingURL=emit.js.map

/***/ }),
/* 47 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const route_1 = __webpack_require__(17);
const pattern_1 = __webpack_require__(16);
const emit_1 = __webpack_require__(48);
/**
 * Produce a route to consume units and, in case of success, it emits a new token.
 */
class Route extends route_1.default {
    /**
     * Default constructor.
     * @param value Token value.
     * @param first Route pattern or first route unit.
     * @param units Route units.
     */
    constructor(value, first, ...units) {
        if (first instanceof pattern_1.default) {
            const [test, ...remaining] = units;
            super(new emit_1.default(value, first), test, ...remaining);
        }
        else {
            super(new emit_1.default(value), first, ...units);
        }
    }
}
exports["default"] = Route;
//# sourceMappingURL=route.js.map

/***/ }),
/* 48 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_1 = __webpack_require__(18);
const token_1 = __webpack_require__(14);
const expect_1 = __webpack_require__(25);
const pattern_1 = __webpack_require__(16);
/**
 * Consume all the given patterns and, in case of success, it will emit a new token into the current token list.
 */
class Emit extends pattern_1.default {
    /**
     * Target pattern.
     */
    #target;
    /**
     * Token value.
     */
    #value;
    /**
     * Default constructor.
     * @param value Token value.
     * @param patterns Sequence of patterns.
     */
    constructor(value, ...patterns) {
        super();
        this.#target = new expect_1.default(...patterns);
        this.#value = value;
    }
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source) {
        source.saveState();
        const status = this.#target.consume(source);
        if (status) {
            const { value } = source.output;
            const result = this.#value === base_1.default.Output ? value ?? -1 : this.#value;
            const token = new token_1.default(source.fragment, result);
            source.emit(token);
        }
        source.discardState();
        return status;
    }
}
exports["default"] = Emit;
//# sourceMappingURL=emit.js.map

/***/ }),
/* 49 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const route_1 = __webpack_require__(17);
const pattern_1 = __webpack_require__(16);
const emit_1 = __webpack_require__(50);
/**
 * Produce a route to consume units and, in case of success, it emits a new node.
 * Any working node in the source output will be attached as the left child from the new node.
 */
class Route extends route_1.default {
    /**
     * Default constructor.
     * @param value Node value.
     * @param output Output node destination.
     * @param first Route pattern or first route unit.
     * @param units Route units.
     */
    constructor(value, output, first, ...units) {
        if (first instanceof pattern_1.default) {
            super(new emit_1.default(value, output, first), units[0], ...units.splice(1));
        }
        else {
            super(new emit_1.default(value, output), first, ...units);
        }
    }
}
exports["default"] = Route;
//# sourceMappingURL=route.js.map

/***/ }),
/* 50 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_1 = __webpack_require__(18);
const node_1 = __webpack_require__(13);
const expect_1 = __webpack_require__(25);
const pattern_1 = __webpack_require__(16);
/**
 * Consume all the given patterns and, in case of success, it will emit a new node as the next child of the current one.
 * Any working node in the source output will be attached as the left child from the new node.
 */
class Emit extends pattern_1.default {
    /**
     * Target pattern.
     */
    #target;
    /**
     * Token value.
     */
    #value;
    /**
     * Output node destination.
     */
    #output;
    /**
     * Default constructor.
     * @param value Token value.
     * @param output Output node destination.
     * @param patterns Sequence of patterns.
     */
    constructor(value, output, ...patterns) {
        super();
        this.#target = new expect_1.default(...patterns);
        this.#value = value;
        this.#output = output;
    }
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     * @throws Throws an error when there's no node to emit.
     */
    consume(source) {
        source.saveState();
        const status = this.#target.consume(source);
        if (status) {
            const { table, value } = source.output;
            const result = this.#value === base_1.default.Output ? value ?? -1 : this.#value;
            const node = new node_1.default(source.fragment, result, table);
            node.setChild(this.#output, source.output.node);
            source.output.node = void 0;
            source.emit(node);
        }
        source.discardState();
        return status;
    }
}
exports["default"] = Emit;
//# sourceMappingURL=emit.js.map

/***/ }),
/* 51 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_1 = __webpack_require__(18);
const node_1 = __webpack_require__(13);
const expect_1 = __webpack_require__(25);
const pattern_1 = __webpack_require__(16);
/**
 * Consume all the given patterns in this pattern and, in case of success,
 * it appends a new node in the source output node.
 */
class Append extends pattern_1.default {
    /**
     * Head pattern.
     */
    #head;
    /**
     * Target pattern.
     */
    #target;
    /**
     * Node value.
     */
    #value;
    /**
     * Output node destination.
     */
    #output;
    /**
     * Current node destination.
     */
    #current;
    /**
     * Default constructor.
     * @param value Node value.
     * @param output Output node destination.
     * @param current Child node destination.
     * @param head Append head pattern.
     * @param patterns Sequence of patterns.
     */
    constructor(value, output, current, head, ...patterns) {
        super();
        this.#head = head;
        this.#target = new expect_1.default(...patterns);
        this.#value = value;
        this.#output = output;
        this.#current = current;
    }
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source) {
        source.saveState();
        const output = source.output;
        let current = output.node;
        output.node = void 0;
        let status = this.#head.consume(source);
        if (status) {
            const fragment = source.fragment;
            if ((status = this.#target.consume(source))) {
                const { table, value } = output;
                const result = this.#value === base_1.default.Output ? value ?? -1 : this.#value;
                const child = new node_1.default(fragment, result, table);
                child.setChild(this.#output, output.node);
                if (current) {
                    const parent = current.getLowestChild(this.#current) ?? current;
                    parent.setChild(this.#current, child);
                }
                else {
                    current = child;
                }
            }
        }
        output.node = current;
        source.discardState();
        return status;
    }
}
exports["default"] = Append;
//# sourceMappingURL=append.js.map

/***/ }),
/* 52 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_1 = __webpack_require__(18);
const node_1 = __webpack_require__(13);
const expect_1 = __webpack_require__(25);
const pattern_1 = __webpack_require__(16);
/**
 * Consume all the given patterns in this pattern and, in case of success,
 * it prepends a new node in the source output node.
 */
class Prepend extends pattern_1.default {
    /**
     * Head pattern.
     */
    #head;
    /**
     * Target pattern.
     */
    #target;
    /**
     * Node value.
     */
    #value;
    /**
     * Output node destination.
     */
    #output;
    /**
     * Current node destination.
     */
    #current;
    /**
     * Default constructor.
     * @param value Node value.
     * @param output Output node destination.
     * @param current Current node destination.
     * @param head Prepend head pattern.
     * @param patterns Sequence of patterns.
     */
    constructor(value, output, current, head, ...patterns) {
        super();
        this.#head = head;
        this.#target = new expect_1.default(...patterns);
        this.#value = value;
        this.#output = output;
        this.#current = current;
    }
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source) {
        source.saveState();
        const output = source.output;
        let current = output.node;
        output.node = void 0;
        let status = this.#head.consume(source);
        if (status) {
            const fragment = source.fragment;
            if ((status = this.#target.consume(source))) {
                const { table, value } = output;
                const result = this.#value === base_1.default.Output ? value ?? -1 : this.#value;
                const child = new node_1.default(fragment, result, table);
                child.setChild(this.#output, output.node);
                if (current) {
                    const parent = child.getLowestChild(this.#current) ?? child;
                    parent.setChild(this.#current, current);
                }
                current = child;
            }
        }
        output.node = current;
        source.discardState();
        return status;
    }
}
exports["default"] = Prepend;
//# sourceMappingURL=prepend.js.map

/***/ }),
/* 53 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_1 = __webpack_require__(18);
const node_1 = __webpack_require__(13);
const expect_1 = __webpack_require__(25);
const pattern_1 = __webpack_require__(16);
/**
 * Consume all the given patterns in this pattern and, in case of success,
 * it creates a new node in the source output and pivot current ones.
 */
class Pivot extends pattern_1.default {
    /**
     * Head pattern.
     */
    #head;
    /**
     * Target pattern.
     */
    #target;
    /**
     * Node value.
     */
    #value;
    /**
     * Output node destination.
     */
    #output;
    /**
     * Current node destination.
     */
    #current;
    /**
     * Default constructor.
     * @param value Node value.
     * @param output Output node destination.
     * @param current Current node destination.
     * @param head Pivot head pattern.
     * @param patterns Sequence of patterns.
     */
    constructor(value, output, current, head, ...patterns) {
        super();
        if (current === output) {
            throw "Current and Output destinations can't have the same value.";
        }
        this.#head = head;
        this.#target = new expect_1.default(...patterns);
        this.#value = value;
        this.#output = output;
        this.#current = current;
    }
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source) {
        source.saveState();
        let status = this.#head.consume(source);
        if (status) {
            const output = source.output;
            const { table, value } = output;
            const fragment = source.fragment;
            const current = output.node;
            output.node = void 0;
            if (!(status = this.#target.consume(source))) {
                output.node = current;
            }
            else {
                const result = this.#value === base_1.default.Output ? value ?? -1 : this.#value;
                const child = new node_1.default(fragment, result, table);
                child.setChild(this.#output, output.node);
                child.setChild(this.#current, current);
                output.node = child;
            }
        }
        source.discardState();
        return status;
    }
}
exports["default"] = Pivot;
//# sourceMappingURL=pivot.js.map

/***/ }),
/* 54 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const pattern_1 = __webpack_require__(16);
const expect_1 = __webpack_require__(25);
/**
 * Consume all the given patterns and, in case of success,
 * it places the resulting node into the source output node.
 */
class Place extends pattern_1.default {
    /**
     * Target pattern.
     */
    #target;
    /**
     * Child node destination.
     */
    #current;
    /**
     * Default constructor.
     * @param current Child destination in the current node.
     * @param patterns Sequence of patterns.
     */
    constructor(current, ...patterns) {
        super();
        this.#target = new expect_1.default(...patterns);
        this.#current = current;
    }
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source) {
        const output = source.output;
        let current = output.node;
        output.node = void 0;
        const status = this.#target.consume(source);
        const child = output.node;
        if (status && child) {
            if (current) {
                const parent = current.getLowestChild(this.#current) ?? current;
                parent.setChild(this.#current, child);
            }
            else {
                current = child;
            }
        }
        output.node = current;
        return status;
    }
}
exports["default"] = Place;
//# sourceMappingURL=place.js.map

/***/ }),
/* 55 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const route_1 = __webpack_require__(17);
const pattern_1 = __webpack_require__(16);
const emit_1 = __webpack_require__(56);
/**
 * Produce a route to consume units and, in case of success, it emits a new symbol record.
 */
class Route extends route_1.default {
    /**
     * Default constructor.
     * @param value Symbol value.
     * @param test Symbol pattern.
     * @param first Route pattern or first route unit.
     * @param units Route units.
     */
    constructor(value, test, first, ...units) {
        if (first instanceof pattern_1.default) {
            super(new emit_1.default(value, test, first), units[0], ...units.splice(1));
        }
        else {
            super(new emit_1.default(value, test), first, ...units);
        }
    }
}
exports["default"] = Route;
//# sourceMappingURL=route.js.map

/***/ }),
/* 56 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_1 = __webpack_require__(18);
const record_1 = __webpack_require__(15);
const pattern_1 = __webpack_require__(16);
const expect_1 = __webpack_require__(25);
const error_1 = __webpack_require__(8);
/**
 * Consume all the given patterns and, in case of success, it will emit a new symbol into the current symbol table.
 */
class Emit extends pattern_1.default {
    /**
     * Test pattern.
     */
    #test;
    /**
     * Target pattern.
     */
    #target;
    /**
     * Symbol value.
     */
    #value;
    /**
     * Default constructor.
     * @param value Symbol value.
     * @param test Symbol pattern.
     * @param patterns Sequence of patterns.
     */
    constructor(value, test, ...patterns) {
        super();
        this.#test = test;
        this.#target = new expect_1.default(...patterns);
        this.#value = value;
    }
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source) {
        source.saveState();
        let status = this.#test.consume(source);
        if (status) {
            const { node, table, value } = source.output;
            const fragment = source.fragment;
            if ((status = this.#target.consume(source))) {
                if (table.has(fragment)) {
                    const error = new error_1.default(fragment, 4096 /* DUPLICATE_IDENTIFIER */);
                    source.emit(error);
                }
                else {
                    const result = this.#value === base_1.default.Output ? value ?? -1 : this.#value;
                    const record = new record_1.default(fragment, result, node, source.output.link);
                    source.output.link = void 0;
                    source.emit(record);
                }
            }
        }
        source.discardState();
        return status;
    }
}
exports["default"] = Emit;
//# sourceMappingURL=emit.js.map

/***/ }),
/* 57 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const pattern_1 = __webpack_require__(16);
const expect_1 = __webpack_require__(25);
/**
 * Consume all the given patterns behind a new symbol table.
 */
class Scope extends pattern_1.default {
    /**
     * Target pattern.
     */
    #target;
    /**
     * Default constructor.
     * @param patterns Sequence of patterns.
     */
    constructor(...patterns) {
        super();
        this.#target = new expect_1.default(...patterns);
    }
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source) {
        source.openTable();
        const status = this.#target.consume(source);
        source.closeTable();
        return status;
    }
}
exports["default"] = Scope;
//# sourceMappingURL=scope.js.map

/***/ }),
/* 58 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const route_1 = __webpack_require__(17);
const uncase_1 = __webpack_require__(24);
/**
 * Produce a route to consume all the given patterns with the uncase transformation.
 */
class Route extends route_1.default {
    /**
     * Default constructor.
     * @param pattern Route pattern.
     * @param first First route unit.
     * @param units Route units.
     */
    constructor(pattern, first, ...units) {
        super(new uncase_1.default(pattern), first, ...units);
    }
}
exports["default"] = Route;
//# sourceMappingURL=route.js.map

/***/ }),
/* 59 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Text = void 0;
const Core = __webpack_require__(6);
const String = __webpack_require__(60);
const Symbols = __webpack_require__(61);
const base_1 = __webpack_require__(4);
/**
 * Can generate a project output to be saved as a JavaScript source.
 */
class Text extends base_1.Base {
    /**
     * Get a formatted identifier based on the given input.
     * @param identifier Input identifier.
     * @returns Returns the formatted identifier.
     */
    #getIdentifier(identifier) {
        return identifier.replace(/[^a-zA-Z0-9]+/g, '_');
    }
    /**
     * Get string units.
     * @param string Input string.
     * @returns Returns the string units.
     */
    #getUnits(string) {
        return string.map((unit) => (typeof unit !== 'number' ? String.compose(unit) : unit));
    }
    /**
     * Get a new pattern.
     * @param name Pattern name.
     * @param params Pattern parameters.
     * @returns Returns the pattern.
     */
    #getPattern(name, ...params) {
        return `new Core.${name}(${params.join(', ')})`;
    }
    /**
     * Get a new reference.
     * @param reference Reference entry.
     * @returns Returns the reference.
     */
    #getReference(reference) {
        return `const ${this.#getIdentifier(reference.name)} = ${reference.pattern};`;
    }
    /**
     * Get a new export entry.
     * @param identifier Export entry identifier.
     * @param pattern Export entry pattern.
     * @returns Returns the export entry.
     */
    #getExportEntry(identifier, pattern) {
        return `exports.${identifier} = ${pattern};`;
    }
    /**
     * Get a new entry pattern.
     * @param identifier Entry identifier.
     * @param references Entry references.
     * @param patterns Entry patterns.
     * @returns Returns the pattern.
     */
    getEntry(identifier, references, patterns) {
        const deps = references.map((entry) => this.#getReference(entry));
        return (deps.join('') +
            this.#getExportEntry(identifier, this.#getPattern('ExpectFlowPattern', this.#getPattern('OptFlowPattern', this.#getPattern('RepeatFlowPattern', this.#getPattern('ChooseFlowPattern', ...patterns))), this.#getPattern('EndFlowPattern'))));
    }
    /**
     * Get a new route.
     * @param path Route path.
     * @param value Optional route value.
     * @param pattern Optional route pattern.
     * @returns Returns the route.
     */
    getRoute(path, value, pattern) {
        if (value !== void 0) {
            if (pattern) {
                return this.#getPattern('SetValueRoute', value, pattern, ...this.#getUnits(path));
            }
            return this.#getPattern('SetValueRoute', value, ...this.#getUnits(path));
        }
        if (pattern) {
            return this.#getPattern('FlowRoute', pattern, ...this.#getUnits(path));
        }
        return this.#getPattern('UnitRoute', ...this.#getUnits(path));
    }
    /**
     * Get a new map pattern.
     * @param routes Map routes.
     * @returns Returns the pattern.
     */
    emitMapPattern(...routes) {
        return this.#getPattern('MapFlowPattern', ...routes);
    }
    /**
     * Get a new token pattern.
     * @param identity Token identity.
     * @param patterns Token patterns.
     * @returns Returns the pattern.
     */
    emitTokenPattern(identity, ...patterns) {
        return this.#getPattern('EmitTokenPattern', identity, ...patterns);
    }
    /**
     * Get a new node pattern.
     * @param identity Node identity.
     * @param output Output node direction.
     * @param patterns Node patterns.
     * @returns Returns the pattern.
     */
    emitNodePattern(identity, output, ...patterns) {
        return this.#getPattern('EmitNodePattern', identity, output, ...patterns);
    }
    /**
     * Get a new identity pattern for dynamic directives.
     * @param identity New identity.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    emitIdentityPattern(identity, ...patterns) {
        return this.#getPattern('SetValuePattern', identity, ...patterns);
    }
    /**
     * Get a new condition pattern.
     * @param test Test pattern.
     * @param success Success pattern.
     * @param failure Failure pattern.
     * @returns Returns the pattern.
     */
    emitConditionPattern(test, success, failure) {
        return this.#getPattern('ConditionFlowPattern', ...(failure ? [test, success, failure] : [test, success]));
    }
    /**
     * Get a new choose pattern.
     * @param patterns Possible patterns.
     * @returns Returns the pattern.
     */
    emitChoosePattern(...patterns) {
        return this.#getPattern('ChooseFlowPattern', ...patterns);
    }
    /**
     * Get a new choose units pattern.
     * @param units Possible units.
     * @returns Returns the pattern.
     */
    emitChooseUnitsPattern(units) {
        return this.#getPattern('ChooseUnitPattern', ...this.#getUnits(units));
    }
    /**
     * Get a new expect pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    emitExpectPattern(...patterns) {
        return this.#getPattern('ExpectFlowPattern', ...patterns);
    }
    /**
     * Get a new expect units pattern.
     * @param units Expected units.
     * @returns Returns the pattern.
     */
    emitExpectUnitsPattern(units) {
        return this.#getPattern('ExpectUnitPattern', ...this.#getUnits(units));
    }
    /**
     * Get a new not pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    emitNotPattern(...patterns) {
        return this.#getPattern('NotFlowPattern', ...patterns);
    }
    /**
     * get a new opt pattern.
     * @param patterns Optional patterns.
     * @returns Returns the pattern.
     */
    emitOptPattern(...patterns) {
        return this.#getPattern('OptFlowPattern', ...patterns);
    }
    /**
     * Get a new repeat pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    emitRepeatPattern(...patterns) {
        return this.#getPattern('RepeatFlowPattern', ...patterns);
    }
    /**
     * Get a new place node pattern.
     * @param current Current node destination.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    emitPlacePattern(current, ...patterns) {
        return this.#getPattern('PlaceNodePattern', current, ...patterns);
    }
    /**
     * Get a new append node pattern.
     * @param identity Node identity.
     * @param current Current node destination.
     * @param head Head pattern.
     * @param patterns Optional patterns.
     * @returns Returns the pattern.
     */
    emitAppendPattern(identity, current, head, ...patterns) {
        return this.#getPattern('AppendNodePattern', identity, 1 /* Right */, current, head, ...patterns);
    }
    /**
     * Get a new prepend node pattern.
     * @param identity Node identity.
     * @param current Current node destination.
     * @param head Head pattern.
     * @param patterns Optional patterns.
     * @returns Returns the pattern.
     */
    emitPrependPattern(identity, current, head, ...patterns) {
        return this.#getPattern('PrependNodePattern', identity, 1 /* Right */, current, head, ...patterns);
    }
    /**
     * Get a new pivot node pattern.
     * @param identity Node identity.
     * @param pivot Pivot pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    emitPivotPattern(identity, pivot, ...patterns) {
        return this.#getPattern('PivotNodePattern', identity, 1 /* Right */, 0 /* Left */, pivot, ...patterns);
    }
    /**
     * Get a new symbol pattern.
     * @param identity Symbol identity.
     * @param symbol Symbol pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    emitSymbolPattern(identity, symbol, ...patterns) {
        return this.#getPattern('EmitSymbolPattern', identity, symbol, ...patterns);
    }
    /**
     * Get a new symbol scope pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    emitScopePattern(...patterns) {
        return this.#getPattern('ScopeSymbolPattern', ...patterns);
    }
    /**
     * Get a new error pattern.
     * @param value Error value.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    emitErrorPattern(value, ...patterns) {
        return this.#getPattern('EmitErrorPattern', value, ...patterns);
    }
    /**
     * Get a new has pattern.
     * @param state Expected state value.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    emitHasPattern(state, ...patterns) {
        return this.#getPattern('HasStatePattern', state, ...patterns);
    }
    /**
     * Get a new set pattern.
     * @param state New state value.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    emitSetPattern(state, ...patterns) {
        return this.#getPattern('SetStatePattern', state, ...patterns);
    }
    /**
     * Get a new uncase pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    emitUncasePattern(...patterns) {
        return this.#getPattern('UncaseTransformPattern', ...patterns);
    }
    /**
     * Get a new peek pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    emitPeekPattern(...patterns) {
        return this.#getPattern('PeekFlowPattern', ...patterns);
    }
    /**
     * Get a new reference pattern.
     * @param record Referenced record.
     * @returns Returns the pattern.
     */
    emitReferencePattern(record) {
        const data = record.data;
        if (!data.pattern) {
            return this.#getPattern('RunFlowPattern', `() => ${this.#getIdentifier(data.name)}`);
        }
        else if (Symbols.isReferencedBy(record, data.type)) {
            return this.#getIdentifier(data.name);
        }
        else {
            return data.pattern;
        }
    }
    /**
     * Get a new any pattern.
     * @returns Returns the pattern.
     */
    emitAnyPattern() {
        return this.#getPattern('AnyUnitPattern');
    }
    /**
     * Get a new range pattern.
     * @param from From unit value.
     * @param to To unit value.
     * @returns Returns the pattern.
     */
    emitRangePattern(from, to) {
        return this.#getPattern('RangeUnitPattern', ...this.#getUnits([from, to]));
    }
}
exports.Text = Text;
//# sourceMappingURL=text.js.map

/***/ }),
/* 60 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.compose = exports.extract = void 0;
/**
 * Characters that can have slashes.
 */
const charList = ['\\\\', '\\t', '\\v', '\\f', '\\r', '\\n', "\\'"];
/**
 * Regex for adding slashes.
 */
const addRegex = new RegExp(`(?:${charList.join('|')})`, 'g');
/**
 * Regex for stripping slashes.
 */
const stripRegex = new RegExp(`(?:${charList.join('|').replace(/\\/g, '\\\\')})`, 'g');
/**
 * Strip slashes in the specified text.
 * @param text Input text.
 * @returns Returns the stripped text.
 */
const stripSlashes = (text) => {
    return text.replace(stripRegex, (match) => {
        switch (match) {
            case '\\\\':
                return '\\';
            case '\\t':
                return '\t';
            case '\\v':
                return '\v';
            case '\\f':
                return '\f';
            case '\\r':
                return '\r';
            case '\\n':
                return '\n';
            case "\\'":
                return "'";
        }
        return match;
    });
};
/**
 * Add slashes in the specified text.
 * @param text Input text.
 * @returns Returns the slashed text.
 */
const addSlashes = (text) => {
    return text.replace(addRegex, (match) => {
        switch (match) {
            case '\\':
                return '\\\\';
            case '\t':
                return '\\t';
            case '\v':
                return '\\v';
            case '\f':
                return '\\f';
            case '\r':
                return '\\r';
            case '\n':
                return '\\n';
            case "'":
                return "\\'";
        }
        return match;
    });
};
/**
 * Extract the text from the given string removing all slashes.
 * @param text Input text.
 * @returns Returns the extracted text.
 */
const extract = (text) => {
    return stripSlashes(text.substring(1, text.length - 1));
};
exports.extract = extract;
/**
 * Compose a string with the given text adding all the necessary slashes.
 * @param text Input text.
 * @returns Returns the composed string.
 */
const compose = (value) => {
    return `'${addSlashes(value)}'`;
};
exports.compose = compose;
//# sourceMappingURL=string.js.map

/***/ }),
/* 61 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isReferencedBy = exports.Aggregator = void 0;
const exception_1 = __webpack_require__(127);
/**
 * Symbol aggregator class.
 */
class Aggregator {
    /**
     * Symbol records.
     */
    #records = {};
    /**
     * Symbol links.
     */
    #links = {};
    /**
     * Symbols events.
     */
    #events = {};
    /**
     * Get the record that correspond to the given identifier.
     * @param identifier Record identifier.
     * @returns Returns the corresponding record.
     * @throws Throws an exception when the given record wasn't found.
     */
    #get(identifier) {
        if (!this.has(identifier)) {
            throw new exception_1.Exception(`A record named '${identifier}' doesn't exists.`);
        }
        return this.get(identifier);
    }
    /**
     * Determines whether or not a record with the given identifier exists.
     * @param identifier Record identifier.
     * @returns Returns true when the record exists, false otherwise.
     */
    has(identifier) {
        return this.#records[identifier] !== void 0 || this.#links[identifier] !== void 0;
    }
    /**
     * Get the record that correspond to the given identifier.
     * @param identifier Record identifier.
     * @returns Returns the corresponding record or undefined when it doesn't exists.
     */
    get(identifier) {
        return this.#records[identifier] ?? this.#links[identifier];
    }
    /**
     * Add the specified record,.
     * @param record Symbol record.
     * @throws Throws an error when the specified record already exists.
     * @returns Returns the added record.
     */
    add(record) {
        const { identifier } = record.data;
        if (!identifier || this.has(identifier)) {
            throw new exception_1.Exception(`A record named '${identifier}' can't be added.`);
        }
        const events = this.#events[identifier];
        this.#records[identifier] = record;
        if (events) {
            delete this.#events[identifier];
            for (const event of events) {
                event(record);
            }
        }
        return record;
    }
    /**
     * Link an existing record to another one.
     * @param identifier Record identifier.
     * @param alias Alias identifier.
     * @throws Throws an error when the specified alias already exists or the given identifier doesn't exists.
     * @returns Returns the linked record.
     */
    link(identifier, alias) {
        if (this.has(identifier)) {
            throw new exception_1.Exception(`An entry named '${identifier}' already exists.`);
        }
        const entry = this.#get(alias);
        this.#links[identifier] = entry;
        return entry;
    }
    /**
     * Add an event to be triggered once a record with the given identifier is added.
     * @param identifier Record identifier.
     * @param callback Trigger callback.
     */
    listen(identifier, callback) {
        const events = this.#events[identifier];
        if (!events) {
            this.#events[identifier] = [callback];
        }
        else {
            events.push(callback);
        }
    }
    /**
     * Iterable generator.
     */
    *[Symbol.iterator]() {
        for (const name in this.#records) {
            yield this.#records[name];
        }
    }
}
exports.Aggregator = Aggregator;
/**
 * Determines whether or not the given record is referenced.
 * @param record System record.
 * @param types Symbol types.
 * @returns Returns true when the record is referenced, false otherwise.
 */
const isReferencedBy = (record, ...types) => {
    const { dependents } = record.data;
    if (!dependents.includes(record)) {
        const references = dependents.reduce((previous, current) => {
            return types.includes(current.data.type) ? previous + 1 : previous;
        }, 0);
        return references > 1;
    }
    return true;
};
exports.isReferencedBy = isReferencedBy;
//# sourceMappingURL=symbols.js.map

/***/ }),
/* 62 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Context = void 0;
const Core = __webpack_require__(6);
const Parser = __webpack_require__(63);
const Counter = __webpack_require__(70);
const Symbols = __webpack_require__(61);
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

/***/ }),
/* 63 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = exports.consumeTokens = void 0;
const Core = __webpack_require__(6);
const program_1 = __webpack_require__(64);
/**
 * Consume the specified tokens and produce an AST for updating the given context.
 * @param tokens Input tokens.
 * @param context Input context.
 * @returns Returns true when the consumption was successful, false otherwise.
 */
const consumeTokens = (tokens, context) => {
    const source = new Core.TokenSource(tokens, context);
    if (!program_1.Program.consume(source)) {
        const fragment = tokens[source.longestState.offset]?.fragment ?? source.fragment;
        context.addError(fragment, 4098 /* UNEXPECTED_SYNTAX */);
        return false;
    }
    return true;
};
exports.consumeTokens = consumeTokens;
/**
 * Consume the given source.
 * @param source Data source.
 * @returns Returns true when the source was consumed, otherwise returns false.
 */
const consume = (source) => {
    return program_1.Program.consume(source);
};
exports.consume = consume;
//# sourceMappingURL=index.js.map

/***/ }),
/* 64 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Program = void 0;
const Core = __webpack_require__(6);
const Lexer = __webpack_require__(65);
const unary_1 = __webpack_require__(67);
const binary_1 = __webpack_require__(68);
const directive_1 = __webpack_require__(69);
/**
 * Identity pattern.
 */
const identity = new Core.ExpectFlowPattern(new Core.ExpectUnitPattern(146 /* OpenChevron */), new Core.AppendNodePattern(202 /* Identity */, 0 /* Left */, 1 /* Right */, new Core.ChooseUnitPattern(101 /* Number */, 132 /* Auto */), new Core.ExpectUnitPattern(147 /* CloseChevron */)));
/**
 * State pattern.
 */
const state = new Core.ExpectFlowPattern(new Core.ExpectUnitPattern(146 /* OpenChevron */), new Core.AppendNodePattern(203 /* State */, 0 /* Left */, 1 /* Right */, new Core.ExpectUnitPattern(101 /* Number */), new Core.ExpectUnitPattern(147 /* CloseChevron */)));
/**
 * Unary operators pattern.
 */
const unaryOperators = new Core.MapFlowPattern(new Core.SetValueRoute(213 /* Not */, 111 /* Not */), new Core.SetValueRoute(214 /* Opt */, 112 /* Opt */), new Core.SetValueRoute(215 /* Repeat */, 113 /* Repeat */), new Core.SetValueRoute(216 /* PlaceNext */, 114 /* Place */, 118 /* Next */), new Core.SetValueRoute(217 /* PlaceLeft */, 114 /* Place */, 119 /* Left */), new Core.SetValueRoute(218 /* PlaceRight */, 114 /* Place */, 120 /* Right */), new Core.SetValueRoute(219 /* Place */, 114 /* Place */), new Core.SetValueRoute(220 /* AppendNext */, 115 /* Append */, 118 /* Next */), new Core.SetValueRoute(221 /* AppendLeft */, 115 /* Append */, 119 /* Left */), new Core.SetValueRoute(222 /* AppendRight */, 115 /* Append */, 120 /* Right */), new Core.SetValueRoute(223 /* Append */, 115 /* Append */), new Core.SetValueRoute(224 /* PrependNext */, 116 /* Prepend */, 118 /* Next */), new Core.SetValueRoute(225 /* PrependLeft */, 116 /* Prepend */, 119 /* Left */), new Core.SetValueRoute(226 /* PrependRight */, 116 /* Prepend */, 120 /* Right */), new Core.SetValueRoute(227 /* Prepend */, 116 /* Prepend */), new Core.SetValueRoute(228 /* Pivot */, 117 /* Pivot */), new Core.SetValueRoute(229 /* Symbol */, 121 /* Symbol */), new Core.SetValueRoute(230 /* Scope */, 122 /* Scope */), new Core.SetValueRoute(231 /* Error */, state, 123 /* Error */), new Core.SetValueRoute(232 /* Has */, state, 124 /* Has */), new Core.SetValueRoute(233 /* Set */, state, 125 /* Set */), new Core.SetValueRoute(234 /* Uncase */, 126 /* Uncase */), new Core.SetValueRoute(235 /* Peek */, 127 /* Peek */));
/**
 * Map members pattern.
 */
const mapMembers = new Core.ExpectFlowPattern(new Core.AppendNodePattern(208 /* MapMember */, 1 /* Right */, 2 /* Next */, new Core.ChooseFlowPattern(new directive_1.default(305 /* MapMember */, identity, new Core.RunFlowPattern(() => expression)), new Core.RunFlowPattern(() => expression))), new Core.OptFlowPattern(new Core.ExpectUnitPattern(140 /* Comma */), new Core.RunFlowPattern(() => mapMembers)));
/**
 * Map operand pattern.
 */
const mapOperand = new Core.ScopeSymbolPattern(new Core.ExpectUnitPattern(106 /* Map */), new Core.AppendNodePattern(207 /* Map */, 1 /* Right */, 1 /* Right */, new Core.ExpectFlowPattern(new Core.ExpectUnitPattern(142 /* OpenBraces */), new Core.OptFlowPattern(mapMembers), new Core.ExpectUnitPattern(143 /* CloseBraces */))));
/**
 * Range operand pattern.
 */
const rangeOperand = new Core.PlaceNodePattern(1 /* Right */, new Core.ExpectUnitPattern(104 /* From */), new Core.AppendNodePattern(204 /* String */, 1 /* Right */, 1 /* Right */, new Core.ExpectUnitPattern(102 /* String */)), new Core.PivotNodePattern(206 /* Range */, 1 /* Right */, 0 /* Left */, new Core.ExpectUnitPattern(105 /* To */), new Core.AppendNodePattern(204 /* String */, 1 /* Right */, 1 /* Right */, new Core.ExpectUnitPattern(102 /* String */))));
/**
 * General operands pattern.
 */
const generalOperands = new Core.AppendNodePattern(Core.BaseSource.Output, 1 /* Right */, 1 /* Right */, new Core.MapFlowPattern(new Core.SetValueRoute(205 /* Any */, 103 /* Any */), new Core.SetValueRoute(205 /* Any */, 136 /* Asterisk */), new Core.SetValueRoute(204 /* String */, 102 /* String */), new Core.SetValueRoute(201 /* Reference */, 100 /* Identifier */)));
/**
 * Group expression pattern.
 */
const groupExpression = new Core.PlaceNodePattern(1 /* Right */, new Core.ExpectFlowPattern(new Core.ExpectUnitPattern(144 /* OpenParenthesis */), new Core.RunFlowPattern(() => expression), new Core.ExpectUnitPattern(145 /* CloseParenthesis */)));
/**
 * Condition expression pattern.
 */
const conditionExpression = new Core.OptFlowPattern(new Core.PivotNodePattern(209 /* Then */, 1 /* Right */, 0 /* Left */, new Core.ExpectUnitPattern(107 /* Then */), new Core.RunFlowPattern(() => expression), new Core.OptFlowPattern(new Core.PivotNodePattern(210 /* Else */, 1 /* Right */, 0 /* Left */, new Core.ExpectUnitPattern(108 /* Else */), new Core.RunFlowPattern(() => expression)))));
/**
 * Expression pattern.
 */
const expression = new Core.ExpectFlowPattern(new binary_1.default(new Core.SetValuePattern(211 /* Or */, new Core.ChooseUnitPattern(109 /* Or */, 137 /* VerticalBar */)), new binary_1.default(new Core.SetValuePattern(212 /* And */, new Core.ChooseUnitPattern(110 /* And */, 138 /* Ampersand */)), new unary_1.default(unaryOperators, new Core.PlaceNodePattern(1 /* Right */, new binary_1.default(new Core.SetValuePattern(236 /* Access */, new Core.ExpectUnitPattern(139 /* Period */)), new Core.ChooseFlowPattern(mapOperand, rangeOperand, generalOperands, groupExpression)))))), conditionExpression);
/**
 * Skip directive route.
 */
const skip = new Core.SetValueRoute(237 /* Skip */, expression, 128 /* Skip */);
/**
 * Token directive route.
 */
const token = new Core.SetValueRoute(238 /* Token */, new directive_1.default(301 /* Token */, identity, expression), 129 /* Token */);
/**
 * Node directive route.
 */
const node = new Core.SetValueRoute(239 /* Node */, new directive_1.default(303 /* Node */, identity, expression), 130 /* Node */);
/**
 * Alias token directive route.
 */
const aliasToken = new Core.SetValueRoute(240 /* AliasToken */, new directive_1.default(302 /* AliasToken */, identity, expression), 131 /* Alias */, 129 /* Token */);
/**
 * Alias node directive route.
 */
const aliasNode = new Core.SetValueRoute(241 /* AliasNode */, new directive_1.default(304 /* AliasNode */, identity, expression), 131 /* Alias */, 130 /* Node */);
/**
 * Export identifier route.
 */
const exportIdentifier = new Core.SetValueRoute(200 /* Identifier */, 100 /* Identifier */);
/**
 * Export aliases route.
 */
const exportAliases = new Core.SetValueRoute(243 /* Export */, new Core.AppendNodePattern(Core.BaseSource.Output, 1 /* Right */, 1 /* Right */, new Core.MapFlowPattern(token, node, aliasToken, aliasNode, exportIdentifier)), 135 /* Export */);
/**
 * Import module route.
 */
const importModule = new Core.SetValueRoute(242 /* Import */, new Core.AppendNodePattern(204 /* String */, 1 /* Right */, 1 /* Right */, new Core.ExpectUnitPattern(102 /* String */)), 134 /* Import */);
/**
 * Main parser pattern.
 */
exports.Program = new Core.ExpectFlowPattern(new Core.OptFlowPattern(new Core.RepeatFlowPattern(new Core.EmitNodePattern(Core.BaseSource.Output, 1 /* Right */, new Core.MapFlowPattern(importModule, skip, token, node, aliasToken, aliasNode, exportAliases), new Core.ExpectUnitPattern(141 /* Semicolon */)))), new Core.EndFlowPattern());
//# sourceMappingURL=program.js.map

/***/ }),
/* 65 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = exports.consumeText = void 0;
const Core = __webpack_require__(6);
const program_1 = __webpack_require__(66);
/**
 * Consume the specified text and produce a list of tokens for updating the given context.
 * @param text Input text.
 * @param context Input context.
 * @returns Returns true when the consumption was successful, false otherwise.
 */
const consumeText = (text, context) => {
    const source = new Core.TextSource(text, context);
    if (!program_1.Program.consume(source)) {
        context.addError(source.fragment, 4097 /* UNEXPECTED_TOKEN */);
        return false;
    }
    return true;
};
exports.consumeText = consumeText;
/**
 * Consume the given source.
 * @param source Data source.
 * @returns Returns true when the source was consumed, otherwise returns false.
 */
const consume = (source) => {
    return program_1.Program.consume(source);
};
exports.consume = consume;
//# sourceMappingURL=index.js.map

/***/ }),
/* 66 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Program = void 0;
const Core = __webpack_require__(6);
/**
 * White-spaces pattern.
 */
const whiteSpaces = new Core.ChooseUnitPattern(' ', '\t', '\v', '\f', '\r', '\n');
/**
 * Comment line pattern.
 */
const commentLine = new Core.ExpectFlowPattern(new Core.ExpectUnitPattern('/', '/'), new Core.OptFlowPattern(new Core.RepeatFlowPattern(new Core.ConditionFlowPattern(new Core.NotFlowPattern(new Core.ExpectUnitPattern('\n')), new Core.AnyUnitPattern()))));
/**
 * Comment block pattern.
 */
const commentBlock = new Core.ExpectFlowPattern(new Core.ExpectUnitPattern('/', '*'), new Core.OptFlowPattern(new Core.RepeatFlowPattern(new Core.ConditionFlowPattern(new Core.NotFlowPattern(new Core.ExpectUnitPattern('*', '/')), new Core.AnyUnitPattern()))), new Core.ExpectUnitPattern('*', '/'));
/**
 * Alpha characters.
 */
const alpha = new Core.ChooseFlowPattern(new Core.RangeUnitPattern('a', 'z'), new Core.RangeUnitPattern('A', 'Z'));
/**
 * Digit characters.
 */
const digit = new Core.RangeUnitPattern('0', '9');
/**
 * Extra characters for identifiers.
 */
const extra = new Core.ExpectUnitPattern('_');
/**
 * Word characters.
 */
const word = new Core.ChooseFlowPattern(alpha, digit, extra);
/**
 * Word boundary pattern.
 */
const end = new Core.NotFlowPattern(word);
/**
 * Keywords and symbols pattern.
 */
const keywordsAndSymbols = new Core.MapFlowPattern(new Core.SetValueRoute(103 /* Any */, end, 'a', 'n', 'y'), new Core.SetValueRoute(104 /* From */, end, 'f', 'r', 'o', 'm'), new Core.SetValueRoute(105 /* To */, end, 't', 'o'), new Core.SetValueRoute(106 /* Map */, end, 'm', 'a', 'p'), new Core.SetValueRoute(107 /* Then */, end, 't', 'h', 'e', 'n'), new Core.SetValueRoute(108 /* Else */, end, 'e', 'l', 's', 'e'), new Core.SetValueRoute(109 /* Or */, end, 'o', 'r'), new Core.SetValueRoute(110 /* And */, end, 'a', 'n', 'd'), new Core.SetValueRoute(111 /* Not */, end, 'n', 'o', 't'), new Core.SetValueRoute(112 /* Opt */, end, 'o', 'p', 't'), new Core.SetValueRoute(113 /* Repeat */, end, 'r', 'e', 'p', 'e', 'a', 't'), new Core.SetValueRoute(114 /* Place */, end, 'p', 'l', 'a', 'c', 'e'), new Core.SetValueRoute(115 /* Append */, end, 'a', 'p', 'p', 'e', 'n', 'd'), new Core.SetValueRoute(116 /* Prepend */, end, 'p', 'r', 'e', 'p', 'e', 'n', 'd'), new Core.SetValueRoute(117 /* Pivot */, end, 'p', 'i', 'v', 'o', 't'), new Core.SetValueRoute(118 /* Next */, end, 'n', 'e', 'x', 't'), new Core.SetValueRoute(119 /* Left */, end, 'l', 'e', 'f', 't'), new Core.SetValueRoute(120 /* Right */, end, 'r', 'i', 'g', 'h', 't'), new Core.SetValueRoute(121 /* Symbol */, end, 's', 'y', 'm', 'b', 'o', 'l'), new Core.SetValueRoute(122 /* Scope */, end, 's', 'c', 'o', 'p', 'e'), new Core.SetValueRoute(123 /* Error */, end, 'e', 'r', 'r', 'o', 'r'), new Core.SetValueRoute(124 /* Has */, end, 'h', 'a', 's'), new Core.SetValueRoute(125 /* Set */, end, 's', 'e', 't'), new Core.SetValueRoute(126 /* Uncase */, end, 'u', 'n', 'c', 'a', 's', 'e'), new Core.SetValueRoute(127 /* Peek */, end, 'p', 'e', 'e', 'k'), new Core.SetValueRoute(128 /* Skip */, end, 's', 'k', 'i', 'p'), new Core.SetValueRoute(129 /* Token */, end, 't', 'o', 'k', 'e', 'n'), new Core.SetValueRoute(130 /* Node */, end, 'n', 'o', 'd', 'e'), new Core.SetValueRoute(131 /* Alias */, end, 'a', 'l', 'i', 'a', 's'), new Core.SetValueRoute(132 /* Auto */, end, 'a', 'u', 't', 'o'), new Core.SetValueRoute(133 /* As */, end, 'a', 's'), new Core.SetValueRoute(134 /* Import */, end, 'i', 'm', 'p', 'o', 'r', 't'), new Core.SetValueRoute(135 /* Export */, end, 'e', 'x', 'p', 'o', 'r', 't'), new Core.SetValueRoute(136 /* Asterisk */, '*'), new Core.SetValueRoute(137 /* VerticalBar */, '|'), new Core.SetValueRoute(138 /* Ampersand */, '&'), new Core.SetValueRoute(139 /* Period */, '.'), new Core.SetValueRoute(140 /* Comma */, ','), new Core.SetValueRoute(141 /* Semicolon */, ';'), new Core.SetValueRoute(142 /* OpenBraces */, '{'), new Core.SetValueRoute(143 /* CloseBraces */, '}'), new Core.SetValueRoute(144 /* OpenParenthesis */, '('), new Core.SetValueRoute(145 /* CloseParenthesis */, ')'), new Core.SetValueRoute(146 /* OpenChevron */, '<'), new Core.SetValueRoute(147 /* CloseChevron */, '>'));
/**
 * Integer number pattern.
 */
const literalInteger = new Core.SetValuePattern(101 /* Number */, new Core.ChooseFlowPattern(new Core.ExpectUnitPattern('0'), new Core.ExpectFlowPattern(new Core.RangeUnitPattern('1', '9'), new Core.OptFlowPattern(new Core.RepeatFlowPattern(digit)))));
/**
 * Single quoted string pattern.
 */
const literalString = new Core.SetValuePattern(102 /* String */, new Core.ExpectUnitPattern("'"), new Core.RepeatFlowPattern(new Core.ConditionFlowPattern(new Core.ExpectUnitPattern('\\'), new Core.AnyUnitPattern(), new Core.ConditionFlowPattern(new Core.NotFlowPattern(new Core.ExpectUnitPattern("'")), new Core.AnyUnitPattern()))), new Core.ExpectUnitPattern("'"));
/**
 * Identifier pattern.
 */
const identifier = new Core.SetValuePattern(100 /* Identifier */, new Core.ChooseFlowPattern(alpha, extra), new Core.OptFlowPattern(new Core.RepeatFlowPattern(word)));
/**
 * Main lexer pattern.
 */
exports.Program = new Core.ExpectFlowPattern(new Core.OptFlowPattern(new Core.RepeatFlowPattern(new Core.ChooseFlowPattern(whiteSpaces, commentLine, commentBlock, new Core.EmitTokenPattern(Core.TextSource.Output, new Core.ChooseFlowPattern(keywordsAndSymbols, literalInteger, literalString, identifier))))), new Core.EndFlowPattern());
//# sourceMappingURL=program.js.map

/***/ }),
/* 67 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const Core = __webpack_require__(6);
/**
 * Prefixed unary expression pattern.
 */
class Unary extends Core.Pattern {
    /**
     * Unary pattern.
     */
    #pattern;
    /**
     * Default constructor.
     * @param operator Unary operator pattern.
     * @param expression Expression pattern.
     */
    constructor(operator, expression) {
        super();
        this.#pattern = new Core.ExpectFlowPattern(new Core.OptFlowPattern(new Core.RepeatFlowPattern(new Core.AppendNodePattern(Core.BaseSource.Output, 1 /* Right */, 1 /* Right */, operator))), expression);
    }
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source) {
        return this.#pattern.consume(source);
    }
}
exports["default"] = Unary;
//# sourceMappingURL=unary.js.map

/***/ }),
/* 68 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const Core = __webpack_require__(6);
/**
 * Binary expression pattern.
 */
class Binary extends Core.Pattern {
    /**
     * Binary pattern.
     */
    #pattern;
    /**
     * Default constructor.
     * @param operator Binary operator pattern.
     * @param expression Expression pattern.
     */
    constructor(operator, expression) {
        super();
        this.#pattern = new Core.ExpectFlowPattern(expression, new Core.OptFlowPattern(new Core.RepeatFlowPattern(new Core.PivotNodePattern(Core.BaseSource.Output, 1 /* Right */, 0 /* Left */, operator, expression))));
    }
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source) {
        return this.#pattern.consume(source);
    }
}
exports["default"] = Binary;
//# sourceMappingURL=binary.js.map

/***/ }),
/* 69 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const Core = __webpack_require__(6);
const Lexer = __webpack_require__(65);
/**
 * Directive pattern
 */
class Directive extends Core.Pattern {
    /**
     * Directive pattern.
     */
    #pattern;
    /**
     * Default constructor.
     * @param symbol Symbol value.
     * @param identity Identity pattern.
     * @param expression Expression pattern.
     */
    constructor(symbol, identity, expression) {
        super();
        this.#pattern = new Core.ExpectFlowPattern(new Core.OptFlowPattern(identity), new Core.EmitSymbolPattern(symbol, new Core.PivotNodePattern(200 /* Identifier */, 1 /* Right */, 0 /* Left */, new Core.ExpectUnitPattern(100 /* Identifier */), new Core.PeekFlowPattern(new Core.ExpectUnitPattern(133 /* As */))), new Core.ExpectUnitPattern(133 /* As */), new Core.PlaceNodePattern(1 /* Right */, expression)));
    }
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source) {
        return this.#pattern.consume(source);
    }
}
exports["default"] = Directive;
//# sourceMappingURL=directive.js.map

/***/ }),
/* 70 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Context = void 0;
/**
 * Counter context class.
 */
class Context {
    /**
     * Counter cache.
     */
    #cache = new WeakMap();
    /**
     * Get the current counter value for the specified key object.
     * @param object Key object.
     * @param initial Initial value.
     * @returns Returns the counter value.
     */
    count(object, initial = 0) {
        return this.#cache.get(object) ?? initial;
    }
    /**
     * Increment the counter value for the specified key object.
     * @param object Key object.
     * @param initial Initial value.
     * @returns Returns the previous counter value.
     */
    increment(object, initial = 0) {
        const value = this.count(object, initial);
        this.#cache.set(object, value + 1);
        return value;
    }
}
exports.Context = Context;
//# sourceMappingURL=counter.js.map

/***/ }),
/* 71 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consumeNodes = void 0;
const Core = __webpack_require__(6);
const Project = __webpack_require__(62);
const Counter = __webpack_require__(70);
const Parser = __webpack_require__(63);
const Identity = __webpack_require__(72);
const Context = __webpack_require__(73);
const Import = __webpack_require__(74);
const Export = __webpack_require__(109);
const Node = __webpack_require__(110);
const Token = __webpack_require__(116);
const Skip = __webpack_require__(121);
const exception_1 = __webpack_require__(127);
/**
 * Global skip counter.
 */
const skipCounter = new Counter.Context();
/**
 * Resolve the token or node directive for the given node and update the specified project.
 * @param project Project context.
 * @param node Directive node.
 * @param state Consumption state.
 * @throws Throws an exception when the given node isn't valid.
 */
const resolveTokenOrNode = (project, node, state) => {
    const identity = Identity.resolve(node.right);
    state.identity = identity ?? Project.Context.identity.increment(project.coder, project.options.identity);
    switch (node.value) {
        case 238 /* Token */:
        case 240 /* AliasToken */:
            Token.consume(project, 1 /* Right */, node, state);
            break;
        case 239 /* Node */:
        case 241 /* AliasNode */:
            Node.consume(project, 1 /* Right */, node, state);
            break;
        default:
            throw new exception_1.Exception(`Invalid node type (${node.value}).`);
    }
};
/**
 * Consume the specified node (organized as an AST) and optimize that AST for the maker.
 * @param node Input node.
 * @param project Project context.
 * @returns Returns true when the consumption was successful, false otherwise.
 */
const consumeNodes = (node, project) => {
    let current;
    while ((current = node.next)) {
        const state = Context.getNewState(node, -1);
        switch (current.value) {
            case 242 /* Import */:
                Import.consume(project, current);
                break;
            case 243 /* Export */:
                if (!Export.consume(project, current, state)) {
                    resolveTokenOrNode(project, current.right, state);
                    state.record.data.exported = true;
                }
                break;
            case 237 /* Skip */:
                state.identity = skipCounter.increment(project);
                Skip.consume(project, 2 /* Next */, node, state);
                break;
            default:
                resolveTokenOrNode(project, current, state);
        }
        node = state.anchor.next;
    }
    return project.errors.length === 0;
};
exports.consumeNodes = consumeNodes;
//# sourceMappingURL=index.js.map

/***/ }),
/* 72 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolve = void 0;
const Core = __webpack_require__(6);
/**
 * Resolve the node identity from the given node.
 * @param node Input node.
 * @returns Returns the node identity or undefined when identity doesn't exists or it's invalid.
 */
const resolve = (node) => {
    if (node.left) {
        const value = node.left.fragment.data;
        if (value === 'auto') {
            return Core.BaseSource.Output;
        }
        const identity = parseInt(value);
        if (!isNaN(identity)) {
            return identity;
        }
    }
    return void 0;
};
exports.resolve = resolve;
//# sourceMappingURL=identity.js.map

/***/ }),
/* 73 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setMetadata = exports.getNewState = void 0;
/**
 * Get a new state based on the given parameters.
 * @param anchor Anchor node.
 * @param identity State identity.
 * @returns Returns the new state.
 */
const getNewState = (anchor, identity) => {
    return {
        type: 0 /* Unknown */,
        origin: 0 /* User */,
        identity,
        anchor
    };
};
exports.getNewState = getNewState;
/**
 * Set the record's metadata based on the given identifier and consumption state.
 * @param project Project context.
 * @param identifier Record identifier.
 * @param record Target record.
 * @param state Consumption state.
 */
const setMetadata = (project, identifier, record, state) => {
    Object.assign(record.data, {
        type: state.type,
        origin: state.origin,
        name: `L${project.id}:${identifier}`,
        identifier,
        identity: state.identity,
        location: project.name,
        dynamic: false,
        imported: false,
        exported: false,
        dependencies: [],
        dependents: [],
        pattern: void 0
    });
};
exports.setMetadata = setMetadata;
//# sourceMappingURL=context.js.map

/***/ }),
/* 74 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const Path = __webpack_require__(75);
const Core = __webpack_require__(6);
const String = __webpack_require__(60);
const Project = __webpack_require__(62);
const Lexer = __webpack_require__(65);
const Parser = __webpack_require__(63);
const Maker = __webpack_require__(76);
const Optimizer = __webpack_require__(71);
/**
 * Purge from the given record list all dependents that doesn't exists in the specified project context.
 * @param project Project context.
 * @param records Record list.
 */
const purge = (project, records) => {
    for (const current of records) {
        current.data.dependents = current.data.dependents.filter((dependent) => {
            return project.symbols.has(dependent.data.identifier);
        });
        purge(project, current.data.dependencies);
    }
};
/**
 * Import all directives from the given source to the specified project context.
 * @param project Project context.
 * @param node Root node.
 * @param source Source records.
 * @returns Returns an array containing all imported record.
 */
const integrate = (project, node, source) => {
    const list = [];
    for (const current of source) {
        const { identifier, exported } = current.data;
        if (exported) {
            const record = node.table.find(identifier);
            if (record) {
                project.addError(record.node.fragment, 4096 /* DUPLICATE_IDENTIFIER */);
            }
            else {
                list.push(current);
                node.table.add(current);
                project.symbols.add(current);
                current.data.exported = false;
                current.data.imported = true;
            }
        }
    }
    return list;
};
/**
 * Compile the given source for the specified project.
 * @param project Project context.
 * @param context Source context.
 * @param content Source input.
 * @returns Returns true when the compilation was successful, false otherwise.
 */
const compile = (project, context, content) => {
    return (Lexer.consumeText(content, context) &&
        Parser.consumeTokens(context.tokens, context) &&
        Optimizer.consumeNodes(context.node, project) &&
        Maker.consumeNodes(context.node, project));
};
/**
 * Consume the import directive for the given node and update the specified project.
 * @param project Project context.
 * @param node Input node.
 */
const consume = (project, node) => {
    const location = node.right;
    if (!project.options.loadFileHook) {
        project.addError(location.fragment, 4117 /* IMPORT_DISABLED */);
    }
    else {
        const file = `${String.extract(location.fragment.data)}.xcm`;
        const path = Path.join(project.options.directory ?? './', file);
        const content = project.options.loadFileHook(path);
        if (!content) {
            project.addError(location.fragment, 4118 /* IMPORT_NOT_FOUND */);
        }
        else {
            const extContext = new Core.Context(file);
            const extProject = new Project.Context(file, project.coder, {
                ...project.options,
                directory: Path.dirname(path)
            });
            if (compile(extProject, extContext, content)) {
                const records = integrate(project, node, extProject.symbols);
                purge(project, records);
            }
            else {
                project.addError(location.fragment, 4119 /* IMPORT_FAILURE */);
                project.errors.push(...extProject.errors);
            }
        }
    }
};
exports.consume = consume;
//# sourceMappingURL=import.js.map

/***/ }),
/* 75 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 76 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consumeNodes = void 0;
const Directive = __webpack_require__(77);
const Parser = __webpack_require__(63);
const exception_1 = __webpack_require__(127);
const Node = __webpack_require__(80);
const Token = __webpack_require__(107);
const Skip = __webpack_require__(108);
/**
 * Resolve the token or node directive for the given node and update the specified project.
 * @param project Project context.
 * @param node Main node.
 * @throws Throws an exception when the given node isn't valid.
 */
const resolveMain = (project, node) => {
    const directive = node.right;
    if (!(directive instanceof Directive.Node)) {
        throw new exception_1.Exception('Main nodes must be instances of directive nodes.');
    }
    const state = { directive };
    switch (node.value) {
        case 238 /* Token */:
            Token.consume(project, state);
            break;
        case 239 /* Node */:
            Node.consume(project, state);
            break;
        case 240 /* AliasToken */:
            Token.consume(project, state);
            break;
        case 241 /* AliasNode */:
            Node.consume(project, state);
            break;
        default:
            throw new exception_1.Exception(`Invalid node type (${node.value}).`);
    }
};
/**
 * Resolve the skip directive for the given node and update the specified project.
 * @param project Project context.
 * @param node Skip node.
 * @throws Throws an exception when the given node isn't valid.
 */
const resolveSkip = (project, node) => {
    if (!(node instanceof Directive.Node)) {
        throw new exception_1.Exception('Skip nodes must be instances of directive nodes.');
    }
    const state = { directive: node };
    Skip.consume(project, state);
};
/**
 * Consume the specified node (organized as an AST) and update the given project.
 * @param node Root node.
 * @param project Project context.
 * @returns Returns true when the consumption was successful, false otherwise.
 */
const consumeNodes = (node, project) => {
    while ((node = node.next)) {
        if (node.value === 242 /* Import */) {
            // Just ignore for now...
        }
        else if (node.value === 243 /* Export */) {
            const current = node.right;
            if (current.value !== 200 /* Identifier */) {
                resolveMain(project, current);
            }
        }
        else if (node.value === 237 /* Skip */) {
            resolveSkip(project, node);
        }
        else {
            resolveMain(project, node);
        }
    }
    return project.errors.length === 0;
};
exports.consumeNodes = consumeNodes;
//# sourceMappingURL=index.js.map

/***/ }),
/* 77 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Node = void 0;
const Parser = __webpack_require__(63);
const Identified = __webpack_require__(78);
/**
 * Directive node.
 */
class Node extends Identified.Node {
    /**
     * Directive record.
     */
    #record;
    /**
     * Default constructor.
     * @param node Original node.
     * @param record Symbol record.
     */
    constructor(node, record) {
        super(node, record.data.identity);
        this.#record = record;
    }
    /**
     * Get the directive identifier.
     */
    get identifier() {
        return this.#record.fragment.data;
    }
    /**
     * Get the directive type.
     */
    get type() {
        return this.#record.data.type;
    }
    /**
     * Get whether or not the directive is an alias.
     */
    get alias() {
        return this.#record.value === 304 /* AliasNode */ || this.#record.value === 302 /* AliasToken */;
    }
}
exports.Node = Node;
//# sourceMappingURL=directive.js.map

/***/ }),
/* 78 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Node = void 0;
const Basic = __webpack_require__(79);
/**
 * Identified node.
 */
class Node extends Basic.Node {
    /**
     * Node identity.
     */
    #identity;
    /**
     * Default constructor.
     * @param node Original node.
     * @param identity Node identity.
     */
    constructor(node, identity) {
        super(node);
        this.#identity = identity;
    }
    /**
     * Get the node identity.
     */
    get identity() {
        return this.#identity;
    }
}
exports.Node = Node;
//# sourceMappingURL=identified.js.map

/***/ }),
/* 79 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Node = void 0;
const Core = __webpack_require__(6);
/**
 * Basic node.
 */
class Node extends Core.Node {
    /**
     * Default constructor.
     * @param node Original node.
     */
    constructor(node) {
        super(node.fragment, node.value, node.table);
        this.setChild(0 /* Left */, node.left);
        this.setChild(1 /* Right */, node.right);
        this.setChild(2 /* Next */, node.next);
    }
    /**
     * Get the node value.
     */
    get value() {
        return super.value;
    }
}
exports.Node = Node;
//# sourceMappingURL=basic.js.map

/***/ }),
/* 80 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const Core = __webpack_require__(6);
const Expression = __webpack_require__(81);
/**
 * Consume the specified state resolving the 'NODE' directive.
 * @param project Project context.
 * @param state Consumption state.
 */
const consume = (project, state) => {
    const directive = state.directive;
    const expression = Expression.consume(project, directive.right, state);
    if (expression) {
        const record = project.symbols.get(directive.identifier);
        if (!directive.alias) {
            record.data.pattern = project.coder.emitNodePattern(directive.identity, 1 /* Right */, expression);
        }
        else {
            record.data.pattern = expression;
        }
    }
};
exports.consume = consume;
//# sourceMappingURL=node.js.map

/***/ }),
/* 81 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const Core = __webpack_require__(6);
const Parser = __webpack_require__(63);
const exception_1 = __webpack_require__(127);
const Reference = __webpack_require__(82);
const String = __webpack_require__(83);
const Range = __webpack_require__(84);
const Map = __webpack_require__(85);
const Access = __webpack_require__(88);
const Or = __webpack_require__(89);
const And = __webpack_require__(90);
const Condition = __webpack_require__(91);
const Not = __webpack_require__(92);
const Option = __webpack_require__(93);
const Repeat = __webpack_require__(94);
const Place = __webpack_require__(95);
const Pivot = __webpack_require__(96);
const Append = __webpack_require__(98);
const Prepend = __webpack_require__(99);
const Symbol = __webpack_require__(100);
const Scope = __webpack_require__(101);
const Error = __webpack_require__(102);
const Has = __webpack_require__(103);
const Set = __webpack_require__(104);
const Uncase = __webpack_require__(105);
const Peek = __webpack_require__(106);
/**
 * Consume the given node resolving the expression patterns.
 * @param project Project context.
 * @param node Expression node.
 * @param state Consumption state.
 * @returns Returns the resolved pattern.
 * @throws Throws an exception when the given node isn't valid.
 */
const consume = (project, node, state) => {
    switch (node.value) {
        case 201 /* Reference */:
            return Reference.consume(project, node, state);
        case 204 /* String */:
            return String.consume(project, node, state);
        case 205 /* Any */:
            return project.coder.emitAnyPattern();
        case 206 /* Range */:
            return Range.consume(project, node, state);
        case 207 /* Map */:
            return Map.consume(project, node, state);
        case 236 /* Access */:
            return Access.consume(project, node);
        case 209 /* Then */:
            return Condition.consume(project, node, state);
        case 211 /* Or */:
            return Or.consume(project, node, state);
        case 212 /* And */:
            return And.consume(project, node, state);
        case 213 /* Not */:
            return Not.consume(project, node, state);
        case 214 /* Opt */:
            return Option.consume(project, node, state);
        case 215 /* Repeat */:
            return Repeat.consume(project, node, state);
        case 219 /* Place */:
        case 218 /* PlaceRight */:
            return Place.consume(project, node, state, 1 /* Right */);
        case 216 /* PlaceNext */:
            return Place.consume(project, node, state, 2 /* Next */);
        case 217 /* PlaceLeft */:
            return Place.consume(project, node, state, 0 /* Left */);
        case 223 /* Append */:
        case 222 /* AppendRight */:
            return Append.consume(project, node, state, 1 /* Right */);
        case 220 /* AppendNext */:
            return Append.consume(project, node, state, 2 /* Next */);
        case 221 /* AppendLeft */:
            return Append.consume(project, node, state, 0 /* Left */);
        case 227 /* Prepend */:
        case 226 /* PrependRight */:
            return Prepend.consume(project, node, state, 1 /* Right */);
        case 224 /* PrependNext */:
            return Prepend.consume(project, node, state, 2 /* Next */);
        case 225 /* PrependLeft */:
            return Prepend.consume(project, node, state, 0 /* Left */);
        case 228 /* Pivot */:
            return Pivot.consume(project, node, state);
        case 229 /* Symbol */:
            return Symbol.consume(project, node, state);
        case 230 /* Scope */:
            return Scope.consume(project, node, state);
        case 231 /* Error */:
            return Error.consume(project, node, state);
        case 232 /* Has */:
            return Has.consume(project, node, state);
        case 233 /* Set */:
            return Set.consume(project, node, state);
        case 234 /* Uncase */:
            return Uncase.consume(project, node, state);
        case 235 /* Peek */:
            return Peek.consume(project, node, state);
        default:
            throw new exception_1.Exception(`Invalid expression node type (${node.value}).`);
    }
};
exports.consume = consume;
//# sourceMappingURL=expression.js.map

/***/ }),
/* 82 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const Identified = __webpack_require__(78);
const Parser = __webpack_require__(63);
const exception_1 = __webpack_require__(127);
/**
 * Resolve the corresponding reference for the specified symbol in a 'SKIP' directive.
 * REMARKS: Skips can only accept alias tokens references.
 * @param project Project context.
 * @param record Referenced record symbol.
 * @returns Returns the corresponding reference pattern.
 * @throws Throws an exception when the given node isn't valid.
 */
const resolveSkip = (project, record) => {
    if (record.value !== 302 /* AliasToken */) {
        throw new exception_1.Exception('Skip reference can only accept alias tokens references.');
    }
    return project.coder.emitReferencePattern(record);
};
/**
 * Resolve the corresponding reference for the specified record in a 'TOKEN' directive.
 * REMARKS: Tokens can only accept tokens and alias tokens references.
 * @param project Project context.
 * @param record Referenced record.
 * @returns Returns the corresponding reference pattern.
 * @throws Throws an exception when the given node isn't valid.
 */
const resolveToken = (project, record) => {
    if (record.value !== 301 /* Token */ && record.value !== 302 /* AliasToken */) {
        throw new exception_1.Exception('Token reference can only accept tokens and alias tokens references.');
    }
    return project.coder.emitReferencePattern(record);
};
/**
 * Resolve the corresponding reference for the specified record in a 'NODE' directive.
 * REMARKS: Nodes can only accept tokens, nodes and alias nodes references.
 * @param project Project context.
 * @param node Reference node.
 * @param record Referenced record.
 * @returns Returns the corresponding reference pattern.
 * @throws Throws an exception when the given node isn't valid.
 */
const resolveNode = (project, node, record) => {
    if (record.value !== 303 /* Node */ && record.value !== 304 /* AliasNode */) {
        if (!(node instanceof Identified.Node)) {
            throw new exception_1.Exception('Node reference can only accept tokens, nodes and alias nodes references.');
        }
        return project.coder.emitExpectUnitsPattern([node.identity]);
    }
    return project.coder.emitReferencePattern(record);
};
/**
 * Consume the given node resolving the reference pattern.
 * @param project Project context.
 * @param node Reference node.
 * @param state Consumption state.
 * @returns Returns the resolved pattern.
 * @throws Throws an exception when the given node isn't valid.
 */
const consume = (project, node, state) => {
    const identifier = node.fragment.data;
    const record = node.table.find(identifier);
    if (!record) {
        throw new exception_1.Exception(`Node reference ${identifier} doesn't exists in the symbol table.`);
    }
    const directive = state.directive;
    switch (directive.type) {
        case 1 /* Skip */:
            return resolveSkip(project, record);
        case 2 /* Token */:
            return resolveToken(project, record);
        case 3 /* Node */:
            return resolveNode(project, node, record);
        default:
            throw new exception_1.Exception(`Unsupported directive node type (${directive.type}).`);
    }
};
exports.consume = consume;
//# sourceMappingURL=reference.js.map

/***/ }),
/* 83 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const String = __webpack_require__(60);
const exception_1 = __webpack_require__(127);
/**
 * Consume the given node resolving the string pattern.
 * @param project Project context.
 * @param node String node.
 * @param state Consumption state.
 * @returns Returns the resolved pattern.
 * @throws Throws an exception when the given node isn't valid.
 */
const consume = (project, node, state) => {
    if (state.directive.type !== 1 /* Skip */ && state.directive.type !== 2 /* Token */) {
        throw new exception_1.Exception(`String nodes can only be in a token or skip directive. ${state.directive.type}`);
    }
    const units = String.extract(node.fragment.data).split('');
    return project.coder.emitExpectUnitsPattern(units);
};
exports.consume = consume;
//# sourceMappingURL=string.js.map

/***/ }),
/* 84 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const String = __webpack_require__(60);
const exception_1 = __webpack_require__(127);
/**
 * Consume the given node resolving the range pattern.
 * @param project Project context.
 * @param node Range node.
 * @param state Consumption state.
 * @returns Returns the resolved pattern.
 * @throws Throws an exception when the given node isn't valid.
 */
const consume = (project, node, state) => {
    if (state.directive.type !== 1 /* Skip */ && state.directive.type !== 2 /* Token */) {
        throw new exception_1.Exception('Range nodes can only be in a token or skip directive.');
    }
    const from = String.extract(node.left.fragment.data);
    const to = String.extract(node.right.fragment.data);
    return project.coder.emitRangePattern(from, to);
};
exports.consume = consume;
//# sourceMappingURL=range.js.map

/***/ }),
/* 85 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const Sequential = __webpack_require__(86);
const Identified = __webpack_require__(78);
const Member = __webpack_require__(87);
const String = __webpack_require__(60);
const Parser = __webpack_require__(63);
const exception_1 = __webpack_require__(127);
const Expression = __webpack_require__(81);
/**
 * Resolve all units for the given map entry node.
 * @param node Map entry node.
 * @returns Returns an array containing all the entry units.
 * @throws Throws an exception when the given node isn't valid.
 */
const resolveUnits = (node) => {
    if (node.value === 204 /* String */) {
        return String.extract(node.fragment.data).split('');
    }
    if (node instanceof Identified.Node) {
        return [node.identity];
    }
    if (!(node instanceof Sequential.Node)) {
        throw new exception_1.Exception('Unable to resolve the units for the map entry node.');
    }
    if (node.type !== 204 /* String */) {
        return node.sequence.map((node) => node.identity);
    }
    const words = node.sequence.map((node) => String.extract(node.fragment.data));
    return words.join('').split('');
};
/**
 * Resolve the corresponding route for the given map entry member.
 * @param project Project context.
 * @param map Map directive.
 * @param entry Map entry member.
 * @param state Consumption state.
 * @param units Route units.
 * @returns Returns the resolved route.
 */
const resolveRoute = (project, map, entry, state, units) => {
    if (!entry.empty) {
        const pattern = Expression.consume(project, entry, state);
        if (entry.dynamic || map.type === 1 /* Skip */) {
            return project.coder.getRoute(units, void 0, pattern);
        }
        return project.coder.getRoute(units, entry.identity, pattern);
    }
    if (map.type === 1 /* Skip */) {
        return project.coder.getRoute(units, void 0);
    }
    return project.coder.getRoute(units, entry.identity);
};
/**
 * Consume the given node resolving the 'MAP' pattern.
 * @param project Project context.
 * @param node Map node.
 * @param state Consumption state.
 * @returns Returns the resolved pattern or undefined when the map node has no entry members.
 * @throws Throws an exception when the given node isn't valid.
 */
const consume = (project, node, state) => {
    let member = node.right;
    const directive = state.directive;
    const routes = [];
    while (member) {
        const current = member.right;
        if (!(current instanceof Member.Node)) {
            throw new exception_1.Exception('Map entry nodes must be instances of member nodes.');
        }
        const units = resolveUnits(current.route);
        const route = resolveRoute(project, directive, current, state, units);
        routes.push(route);
        member = member.next;
    }
    if (routes.length > 0) {
        return project.coder.emitMapPattern(...routes);
    }
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=map.js.map

/***/ }),
/* 86 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Node = void 0;
const Core = __webpack_require__(6);
const Basic = __webpack_require__(79);
/**
 * Sequential node.
 */
class Node extends Basic.Node {
    /**
     * Sequence type.
     */
    #type;
    /**
     * Sequence nodes.
     */
    #sequence;
    /**
     * Get all the sequential nodes from the specified node in a sequence.
     * @param node Input node.
     * @returns Returns an array containing the sequence.
     */
    #getNodes(node) {
        if (this.value === node.value) {
            return [...this.#getNodes(node.left), ...this.#getNodes(node.right)];
        }
        return [node];
    }
    /**
     * Default constructor.
     * @param node Original node.
     * @param type Node sequence type.
     */
    constructor(node, type) {
        super(node);
        this.#type = type;
        this.#sequence = this.#getNodes(node);
        this.setChild(0 /* Left */, void 0);
        this.setChild(1 /* Right */, void 0);
        this.setChild(2 /* Next */, void 0);
    }
    /**
     * Get the node sequence type.
     */
    get type() {
        return this.#type;
    }
    /**
     * Get the nodes sequence.
     */
    get sequence() {
        return this.#sequence;
    }
}
exports.Node = Node;
//# sourceMappingURL=sequential.js.map

/***/ }),
/* 87 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Node = void 0;
const Identified = __webpack_require__(78);
/**
 * Member node.
 */
class Node extends Identified.Node {
    /**
     * Symbol record.
     */
    #record;
    /**
     * Route node.
     */
    #route;
    /**
     * Default constructor.
     * @param node Original node.
     * @param record Symbol record.
     * @param route Route node.
     */
    constructor(node, record, route) {
        super(node, record.data.identity);
        this.#record = record;
        this.#route = route;
    }
    /**
     * Determines whether or not the member has a route.
     */
    get empty() {
        return this.#route.fragment === this.fragment;
    }
    /**
     * Get whether or not the member is dynamic.
     */
    get dynamic() {
        return this.#record.data.dynamic;
    }
    /**
     * Get the member route.
     */
    get route() {
        return this.#route;
    }
}
exports.Node = Node;
//# sourceMappingURL=member.js.map

/***/ }),
/* 88 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const Identified = __webpack_require__(78);
const exception_1 = __webpack_require__(127);
/**
 * Consume the given node resolving the access pattern.
 * @param project Project context.
 * @param node Access node.
 * @returns Returns the resolved pattern.
 * @throws Throws an exception when the given node isn't valid.
 */
const consume = (project, node) => {
    if (!(node instanceof Identified.Node)) {
        throw new exception_1.Exception('Access nodes must be instances of identified nodes.');
    }
    return project.coder.emitExpectUnitsPattern([node.identity]);
};
exports.consume = consume;
//# sourceMappingURL=access.js.map

/***/ }),
/* 89 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = exports.resolve = void 0;
const Sequential = __webpack_require__(86);
const String = __webpack_require__(60);
const Parser = __webpack_require__(63);
const Expression = __webpack_require__(81);
/**
 * Resolve the given node as an 'OR' pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns an array containing all patterns or undefined when the node is invalid.
 */
const resolve = (project, node, state) => {
    if (node.value !== 211 /* Or */) {
        const pattern = Expression.consume(project, node, state);
        if (pattern) {
            return [pattern];
        }
    }
    else if (node instanceof Sequential.Node) {
        if (node.type === 204 /* String */) {
            const fragments = node.sequence.map((node) => String.extract(node.fragment.data));
            if (fragments.length > 3 || fragments.find((fragment) => fragment.length > 1)) {
                const routes = fragments.map((fragment) => project.coder.getRoute(fragment.split('')));
                return [project.coder.emitMapPattern(...routes)];
            }
            return [project.coder.emitChooseUnitsPattern(fragments)];
        }
        else {
            const units = node.sequence.map((node) => node.identity);
            if (units.length > 3) {
                const routes = units.map((unit) => project.coder.getRoute([unit]));
                return [project.coder.emitMapPattern(...routes)];
            }
            return [project.coder.emitChooseUnitsPattern(units)];
        }
    }
    else {
        const left = (0, exports.resolve)(project, node.left, state);
        if (left) {
            const right = (0, exports.resolve)(project, node.right, state);
            if (right) {
                return [...left, ...right];
            }
        }
    }
    return void 0;
};
exports.resolve = resolve;
/**
 * Consume the given node resolving the 'OR' pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns the pattern or undefined when the node is invalid.
 */
const consume = (project, node, state) => {
    const patterns = (0, exports.resolve)(project, node, state);
    if (patterns) {
        if (patterns.length > 1) {
            return project.coder.emitChoosePattern(...patterns);
        }
        return patterns[0];
    }
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=or.js.map

/***/ }),
/* 90 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = exports.resolve = void 0;
const Sequential = __webpack_require__(86);
const String = __webpack_require__(60);
const Parser = __webpack_require__(63);
const Expression = __webpack_require__(81);
/**
 * Resolve the given input node as an 'AND' pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns an array containing all rules or undefined when the pattern is invalid.
 */
const resolve = (project, node, state) => {
    if (node.value !== 212 /* And */) {
        const pattern = Expression.consume(project, node, state);
        if (pattern) {
            return [pattern];
        }
    }
    else if (node instanceof Sequential.Node) {
        let units;
        if (node.type === 204 /* String */) {
            const words = node.sequence.map((node) => String.extract(node.fragment.data));
            units = words.join('').split('');
        }
        else {
            units = node.sequence.map((node) => node.identity);
        }
        return [project.coder.emitExpectUnitsPattern(units)];
    }
    else {
        const left = (0, exports.resolve)(project, node.left, state);
        if (left) {
            const right = (0, exports.resolve)(project, node.right, state);
            if (right) {
                return [...left, ...right];
            }
        }
    }
    return void 0;
};
exports.resolve = resolve;
/**
 * Consume the given node resolving the 'AND' pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns the pattern or undefined when the node is invalid.
 */
const consume = (project, node, state) => {
    const patterns = (0, exports.resolve)(project, node, state);
    if (patterns) {
        if (patterns.length > 1) {
            return project.coder.emitExpectPattern(...patterns);
        }
        return patterns[0];
    }
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=and.js.map

/***/ }),
/* 91 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const Parser = __webpack_require__(63);
const Expression = __webpack_require__(81);
/**
 * Consume the given node resolving the condition pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns the pattern or undefined when the node is invalid.
 */
const consume = (project, node, state) => {
    const test = Expression.consume(project, node.left, state);
    if (test) {
        const content = node.right;
        if (content.value === 210 /* Else */) {
            const success = Expression.consume(project, content.left, state);
            if (success) {
                const failure = Expression.consume(project, content.right, state);
                if (failure) {
                    return project.coder.emitConditionPattern(test, success, failure);
                }
            }
        }
        else {
            const success = Expression.consume(project, content, state);
            if (success) {
                return project.coder.emitConditionPattern(test, success);
            }
        }
    }
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=condition.js.map

/***/ }),
/* 92 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const And = __webpack_require__(90);
/**
 * Consume the given node resolving the 'NOT' pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns the pattern or undefined when the node is invalid.
 */
const consume = (project, node, state) => {
    const patterns = And.resolve(project, node.right, state);
    if (patterns) {
        return project.coder.emitNotPattern(...patterns);
    }
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=not.js.map

/***/ }),
/* 93 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const And = __webpack_require__(90);
/**
 * Consume the given node resolving the 'OPTION' pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns the pattern or undefined when the node is invalid.
 */
const consume = (project, node, state) => {
    const patterns = And.resolve(project, node.right, state);
    if (patterns) {
        return project.coder.emitOptPattern(...patterns);
    }
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=option.js.map

/***/ }),
/* 94 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const And = __webpack_require__(90);
/**
 * Consume the given node resolving the 'REPEAT' pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns the pattern or undefined when the node is invalid.
 */
const consume = (project, node, state) => {
    const patterns = And.resolve(project, node.right, state);
    if (patterns) {
        return project.coder.emitRepeatPattern(...patterns);
    }
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=repeat.js.map

/***/ }),
/* 95 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const And = __webpack_require__(90);
/**
 * Consume the given node resolving the 'PLACE' pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @param direction Placed node direction.
 * @returns Returns the pattern or undefined when the node is invalid.
 */
const consume = (project, node, state, direction) => {
    const patterns = And.resolve(project, node.right, state);
    if (patterns) {
        return project.coder.emitPlacePattern(direction, ...patterns);
    }
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=place.js.map

/***/ }),
/* 96 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const Splitter = __webpack_require__(126);
/**
 * Consume the given node resolving the 'PIVOT' pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns the pattern or undefined when the node is invalid.
 */
const consume = (project, node, state) => {
    const patterns = Splitter.resolve(project, node.right, state);
    if (patterns) {
        const identity = state.directive.identity;
        const [test, ...remaining] = patterns;
        return project.coder.emitPivotPattern(identity, test, ...remaining);
    }
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=pivot.js.map

/***/ }),
/* 97 */,
/* 98 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const Splitter = __webpack_require__(126);
/**
 * Consume the given node resolving the 'APPEND' pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @param direction Append direction.
 * @returns Returns the pattern or undefined when the node is invalid.
 */
const consume = (project, node, state, direction) => {
    const patterns = Splitter.resolve(project, node.right, state);
    if (patterns) {
        const identity = state.directive.identity;
        const [test, ...remaining] = patterns;
        return project.coder.emitAppendPattern(identity, direction, test, ...remaining);
    }
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=append.js.map

/***/ }),
/* 99 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const Splitter = __webpack_require__(126);
/**
 * Consume the given node resolving the 'PREPEND' pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @param direction Prepended node direction.
 * @returns Returns the consumption result or undefined when the node is invalid.
 */
const consume = (project, node, state, direction) => {
    const patterns = Splitter.resolve(project, node.right, state);
    if (patterns) {
        const identity = state.directive.identity;
        const [test, ...remaining] = patterns;
        return project.coder.emitPrependPattern(identity, direction, test, ...remaining);
    }
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=prepend.js.map

/***/ }),
/* 100 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const Splitter = __webpack_require__(126);
/**
 * Consume the given node resolving the 'SYMBOL' pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns the pattern or undefined when the node is invalid.
 */
const consume = (project, node, state) => {
    const patterns = Splitter.resolve(project, node.right, state);
    if (patterns) {
        const directive = state.directive;
        const [test, ...remaining] = patterns;
        return project.coder.emitSymbolPattern(directive.identity, test, ...remaining);
    }
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=symbol.js.map

/***/ }),
/* 101 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const And = __webpack_require__(90);
/**
 * Consume the given node resolving the 'SCOPE' pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns the pattern or undefined when the node is invalid.
 */
const consume = (project, node, state) => {
    const patterns = And.resolve(project, node.right, state);
    if (patterns) {
        return project.coder.emitScopePattern(...patterns);
    }
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=scope.js.map

/***/ }),
/* 102 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const And = __webpack_require__(90);
/**
 * Consume the given node resolving the 'ERROR' pattern.
 * @param project Context project.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns the pattern or undefined when the node is invalid.
 */
const consume = (project, node, state) => {
    const param = node.right;
    const patterns = And.resolve(project, param.right, state);
    if (patterns) {
        const value = parseInt(param.fragment.data);
        return project.coder.emitErrorPattern(value, ...patterns);
    }
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=error.js.map

/***/ }),
/* 103 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const And = __webpack_require__(90);
/**
 * Consume the given node resolving the 'HAS' pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns the pattern or undefined when the node is invalid.
 */
const consume = (project, node, state) => {
    const param = node.right;
    const patterns = And.resolve(project, param.right, state);
    if (patterns) {
        const value = parseInt(param.fragment.data);
        return project.coder.emitHasPattern(value, ...patterns);
    }
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=has.js.map

/***/ }),
/* 104 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const And = __webpack_require__(90);
/**
 * Consume the given node resolving the 'SET' pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns the pattern or undefined when the node is invalid.
 */
const consume = (project, node, state) => {
    const param = node.right;
    const patterns = And.resolve(project, param.right, state);
    if (patterns) {
        const value = parseInt(param.fragment.data);
        return project.coder.emitSetPattern(value, ...patterns);
    }
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=set.js.map

/***/ }),
/* 105 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const And = __webpack_require__(90);
/**
 * Consume the given node resolving the 'UNCASE' pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns the pattern or undefined when the node is invalid.
 */
const consume = (project, node, state) => {
    const patterns = And.resolve(project, node.right, state);
    if (patterns) {
        return project.coder.emitUncasePattern(...patterns);
    }
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=uncase.js.map

/***/ }),
/* 106 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const And = __webpack_require__(90);
/**
 * Consume the given node resolving the 'PEEK' pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns the pattern or undefined when the node is invalid.
 */
const consume = (project, node, state) => {
    const patterns = And.resolve(project, node.right, state);
    if (patterns) {
        return project.coder.emitPeekPattern(...patterns);
    }
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=peek.js.map

/***/ }),
/* 107 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const Expression = __webpack_require__(81);
/**
 * Consume the specified state resolving the 'TOKEN' directive.
 * @param project Project context.
 * @param state Consumption state.
 */
const consume = (project, state) => {
    const directive = state.directive;
    const expression = Expression.consume(project, directive.right, state);
    if (expression) {
        const record = project.symbols.get(directive.identifier);
        if (!directive.alias) {
            record.data.pattern = project.coder.emitTokenPattern(directive.identity, expression);
        }
        else {
            record.data.pattern = expression;
        }
    }
};
exports.consume = consume;
//# sourceMappingURL=token.js.map

/***/ }),
/* 108 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const Expression = __webpack_require__(81);
/**
 * Consume the specified state resolving the 'SKIP' directive.
 * @param project Project context.
 * @param state Consumption state.
 */
const consume = (project, state) => {
    const directive = state.directive;
    const expression = Expression.consume(project, directive.right, state);
    if (expression) {
        const record = project.symbols.get(directive.identifier);
        record.data.pattern = expression;
    }
};
exports.consume = consume;
//# sourceMappingURL=skip.js.map

/***/ }),
/* 109 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const Parser = __webpack_require__(63);
/**
 * Consume the export directive for the given node and update the specified state.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns true when the given node is valid for the export directive, false otherwise.
 */
const consume = (project, node, state) => {
    const current = node.right;
    if (current.value === 200 /* Identifier */) {
        const identifier = current.fragment.data;
        const record = node.table.find(identifier);
        if (!record) {
            project.addError(current.fragment, 4102 /* UNDEFINED_IDENTIFIER */);
        }
        else {
            record.data.exported = true;
            state.record = record;
        }
        return true;
    }
    return false;
};
exports.consume = consume;
//# sourceMappingURL=export.js.map

/***/ }),
/* 110 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const Core = __webpack_require__(6);
const Directive = __webpack_require__(77);
const Context = __webpack_require__(73);
const Expression = __webpack_require__(111);
/**
 * Emit a new node entry and replace the current node by an optimized one.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Consumption state.
 */
const emit = (project, direction, parent, state) => {
    const node = parent.getChild(direction);
    const replacement = new Directive.Node(node, state.record);
    parent.setChild(direction, replacement);
    project.symbols.add(state.record);
};
/**
 * Consume a child node from the AST on the given parent and optimize the 'NODE' directive.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Consumption state.
 */
const consume = (project, direction, parent, state) => {
    const node = parent.getChild(direction);
    const identifier = node.fragment.data;
    if (project.symbols.has(identifier)) {
        project.addError(node.fragment, 4096 /* DUPLICATE_IDENTIFIER */);
    }
    else {
        state.type = 3 /* Node */;
        state.record = node.table.get(identifier);
        Context.setMetadata(project, identifier, state.record, state);
        Expression.consume(project, 1 /* Right */, node, state);
        emit(project, direction, parent, state);
    }
};
exports.consume = consume;
//# sourceMappingURL=node.js.map

/***/ }),
/* 111 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const Core = __webpack_require__(6);
const Parser = __webpack_require__(63);
const Reference = __webpack_require__(112);
const Sequential = __webpack_require__(113);
const String = __webpack_require__(114);
const Range = __webpack_require__(117);
const Map = __webpack_require__(119);
const Access = __webpack_require__(120);
/**
 * Consume a child node from the AST on the given parent and optimize the expression pattern.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Context state.
 */
const consume = (project, direction, parent, state) => {
    const node = parent.getChild(direction);
    switch (node.value) {
        case 205 /* Any */:
        case 206 /* Range */:
            Range.consume(project, direction, parent, state);
            break;
        case 201 /* Reference */:
            Reference.consume(project, direction, parent, state);
            break;
        case 204 /* String */:
            String.consume(project, direction, parent, state);
            break;
        case 207 /* Map */:
            Map.consume(project, direction, parent, state);
            break;
        case 236 /* Access */:
            Access.consume(project, direction, parent, state);
            break;
        case 211 /* Or */:
            Sequential.consume(project, direction, parent, 211 /* Or */, state);
            break;
        case 212 /* And */:
            Sequential.consume(project, direction, parent, 212 /* And */, state);
            break;
        default:
            (0, exports.consume)(project, 1 /* Right */, node, state);
    }
};
exports.consume = consume;
//# sourceMappingURL=expression.js.map

/***/ }),
/* 112 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const Identified = __webpack_require__(78);
const Parser = __webpack_require__(63);
const exception_1 = __webpack_require__(127);
/**
 * Update the specified node for an optimized one after resolving its reference.
 * @param project Project context.
 * @param record Reference record.
 * @param parent Parent node.
 * @param direction Node direction.
 */
const upgrade = (project, record, parent, direction) => {
    const node = parent.getChild(direction);
    if (!record.data.dynamic) {
        parent.setChild(direction, new Identified.Node(node, record.data.identity));
    }
    else {
        project.addError(node.fragment, 4112 /* INVALID_MAP_REFERENCE */);
    }
};
/**
 * Find and connect the corresponding reference for the specified record.
 * @param project Project context.
 * @param identifier Reference identifier.
 * @param record Reference record.
 * @param state Consumption state.
 */
const connect = (project, identifier, record, state) => {
    const current = state.record;
    if (record.data.dependencies) {
        current.data.dependencies.push(record);
        record.data.dependents.push(current);
    }
    else {
        project.symbols.listen(identifier, () => {
            current.data.dependencies.push(record);
            record.data.dependents.push(current);
        });
    }
};
/**
 * Resolve and validate the corresponding reference for the specified record and node in a 'SKIP' directive.
 * REMARKS: Skips can only accept alias tokens references.
 * @param project Project context.
 * @param node Input node.
 * @param record Reference record.
 * @param state Consumption state.
 */
const resolveSkip = (project, node, record, state) => {
    if (record.value === 302 /* AliasToken */) {
        connect(project, node.fragment.data, record, state);
    }
    else if (record.value === 301 /* Token */) {
        project.addError(node.fragment, 4108 /* INVALID_TOKEN_REFERENCE */);
    }
    else if (record.value === 304 /* AliasNode */) {
        project.addError(node.fragment, 4111 /* INVALID_ALIAS_NODE_REFERENCE */);
    }
    else if (record.value === 303 /* Node */) {
        project.addError(node.fragment, 4109 /* INVALID_NODE_REFERENCE */);
    }
    else {
        project.addError(node.fragment, 4103 /* UNRESOLVED_IDENTIFIER */);
    }
};
/**
 * Resolve and validate the corresponding reference for the specified record and node in a 'TOKEN' directive.
 * REMARKS: Tokens can only accept tokens and alias tokens references.
 * @param project Project context.
 * @param node Input node.
 * @param record Reference record.
 * @param state Consumption state.
 */
const resolveToken = (project, node, record, state) => {
    if (record.value === 301 /* Token */ || record.value === 302 /* AliasToken */) {
        connect(project, node.fragment.data, record, state);
    }
    else if (record.value === 303 /* Node */) {
        project.addError(node.fragment, 4109 /* INVALID_NODE_REFERENCE */);
    }
    else if (record.value === 304 /* AliasNode */) {
        project.addError(node.fragment, 4111 /* INVALID_ALIAS_NODE_REFERENCE */);
    }
    else {
        project.addError(node.fragment, 4103 /* UNRESOLVED_IDENTIFIER */);
    }
};
/**
 * Resolve and validate the corresponding reference for the specified record and node in a 'NODE' directive.
 * REMARKS: Nodes can only accept tokens, nodes and alias nodes references.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param record Referenced record.
 * @param state Consumption state.
 */
const resolveNode = (project, direction, parent, record, state) => {
    const node = parent.getChild(direction);
    const identifier = node.fragment.data;
    if (record.value === 303 /* Node */ || record.value === 304 /* AliasNode */) {
        connect(project, identifier, record, state);
    }
    else if (record.value === 301 /* Token */) {
        connect(project, identifier, record, state);
        if (record.data.dynamic !== void 0) {
            upgrade(project, record, parent, direction);
        }
        else {
            project.symbols.listen(identifier, () => {
                upgrade(project, record, parent, direction);
            });
        }
    }
    else if (record.value === 302 /* AliasToken */) {
        project.addError(node.fragment, 4110 /* INVALID_ALIAS_TOKEN_REFERENCE */);
    }
    else {
        project.addError(node.fragment, 4103 /* UNRESOLVED_IDENTIFIER */);
    }
};
/**
 * Consume a child node from the AST on the given parent and optimize the reference pattern.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Consumption state.
 * @throws Throws an exception when the given node isn't valid.
 */
const consume = (project, direction, parent, state) => {
    const node = parent.getChild(direction);
    const record = node.table.find(node.fragment.data);
    if (!record) {
        project.addError(node.fragment, 4102 /* UNDEFINED_IDENTIFIER */);
    }
    else {
        switch (state.type) {
            case 1 /* Skip */:
                resolveSkip(project, node, record, state);
                break;
            case 2 /* Token */:
                resolveToken(project, node, record, state);
                break;
            case 3 /* Node */:
                resolveNode(project, direction, parent, record, state);
                break;
            default:
                throw new exception_1.Exception(`Unsupported context state type: ${state.type}`);
        }
    }
};
exports.consume = consume;
//# sourceMappingURL=reference.js.map

/***/ }),
/* 113 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const Core = __webpack_require__(6);
const Sequential = __webpack_require__(86);
const Identified = __webpack_require__(78);
const Parser = __webpack_require__(63);
const Expression = __webpack_require__(111);
/**
 * Determines whether or not the given node contains sequential units.
 * @param node Input node.
 * @param operator Sequential node type.
 * @returns Returns true when the node is sequential, false otherwise.
 */
const areSequentialUnits = (node, operator) => {
    if (node.value === operator) {
        if (!(node instanceof Sequential.Node)) {
            return areSequentialUnits(node.left, operator) && areSequentialUnits(node.right, operator);
        }
        return false;
    }
    return node.value === 204 /* String */;
};
/**
 * Determines whether or not the given node contains sequential references.
 * @param node Input node.
 * @param operator Sequential node type.
 * @returns Returns true when the node is sequential, false otherwise.
 */
const areSequentialReferences = (node, operator) => {
    if (node.value === operator) {
        if (!(node instanceof Sequential.Node)) {
            return areSequentialReferences(node.left, operator) && areSequentialReferences(node.right, operator);
        }
        return false;
    }
    return node instanceof Identified.Node;
};
/**
 * Consume a child node from the AST on the given parent and optimize the sequential pattern.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param type Sequential node type.
 * @param state Context state.
 */
const consume = (project, direction, parent, type, state) => {
    const node = parent.getChild(direction);
    if (node.value !== type) {
        Expression.consume(project, direction, parent, state);
    }
    else if (state.type === 3 /* Node */) {
        Expression.consume(project, 0 /* Left */, node, state);
        Expression.consume(project, 1 /* Right */, node, state);
        if (areSequentialReferences(node, type)) {
            parent.setChild(direction, new Sequential.Node(node, 201 /* Reference */));
        }
    }
    else {
        if (areSequentialUnits(node, type)) {
            parent.setChild(direction, new Sequential.Node(node, 204 /* String */));
        }
        else {
            Expression.consume(project, 0 /* Left */, node, state);
            Expression.consume(project, 1 /* Right */, node, state);
        }
    }
};
exports.consume = consume;
//# sourceMappingURL=sequential.js.map

/***/ }),
/* 114 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const Loose = __webpack_require__(115);
const Nodes = __webpack_require__(118);
const Expression = __webpack_require__(111);
/**
 * Consume a child node from the AST on the given parent and optimize the string pattern.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Context state.
 */
const consume = (project, direction, parent, state) => {
    if (state.type === 3 /* Node */) {
        const node = parent.getChild(direction);
        const record = Loose.resolve(project, node.fragment.data, node, state);
        const reference = Nodes.getReference(record.data.identifier, node.table, node.fragment.location);
        parent.setChild(direction, reference);
        Expression.consume(project, direction, parent, state);
    }
};
exports.consume = consume;
//# sourceMappingURL=string.js.map

/***/ }),
/* 115 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolve = exports.collision = void 0;
const Core = __webpack_require__(6);
const Project = __webpack_require__(62);
const Token = __webpack_require__(116);
const Context = __webpack_require__(73);
const Nodes = __webpack_require__(118);
/**
 * Emit a new loose token and returns the corresponding record.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns the generated record.
 */
const emit = (project, node, state) => {
    const identity = Project.Context.identity.increment(project.coder, project.options.identity);
    const token = Nodes.getToken(`@REF${identity}`, node.table, node.fragment.location, node);
    const temp = Context.getNewState(state.anchor, identity);
    temp.origin = 1 /* Loose */;
    Token.consume(project, 1 /* Right */, token, temp);
    token.setChild(2 /* Next */, state.anchor.next);
    state.anchor.setChild(2 /* Next */, token);
    state.anchor = token;
    return temp.record;
};
/**
 * Determines whether or not there are a collision for the given name.
 * @param project Project context.
 * @param identifier Record identifier.
 * @param node Input node.
 * @returns Returns true when the specified name already exists, false otherwise.
 */
const collision = (project, identifier, node) => {
    if (project.symbols.has(identifier)) {
        project.addError(node.fragment, 4116 /* TOKEN_COLLISION */);
        return true;
    }
    return false;
};
exports.collision = collision;
/**
 * Resolve the loose pattern record for the given node.
 * @param project Project context.
 * @param identifier Record identifier.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns the loose pattern record.
 */
const resolve = (project, identifier, node, state) => {
    const record = project.symbols.get(identifier);
    if (record) {
        if (record.data.origin === 0 /* User */) {
            project.addError(node.fragment, 4116 /* TOKEN_COLLISION */);
        }
        return record;
    }
    return emit(project, node, state);
};
exports.resolve = resolve;
//# sourceMappingURL=loose.js.map

/***/ }),
/* 116 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const Core = __webpack_require__(6);
const Directive = __webpack_require__(77);
const Parser = __webpack_require__(63);
const Context = __webpack_require__(73);
const Loose = __webpack_require__(115);
const Expression = __webpack_require__(111);
const Range = __webpack_require__(117);
const String = __webpack_require__(114);
/**
 * Emit a new token entry and replace the current token node by an optimized one.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Consumption state.
 */
const emit = (project, direction, parent, state) => {
    const node = parent.getChild(direction);
    const replacement = new Directive.Node(node, state.record);
    parent.setChild(direction, replacement);
    project.symbols.add(state.record);
};
/**
 * Consume a child node from the AST on the given parent and optimize the 'TOKEN' directive.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Consumption state.
 */
const consume = (project, direction, parent, state) => {
    const node = parent.getChild(direction);
    const identifier = node.fragment.data;
    if (project.symbols.has(identifier)) {
        project.addError(node.fragment, 4096 /* DUPLICATE_IDENTIFIER */);
    }
    else {
        const expression = node.right;
        state.type = 2 /* Token */;
        state.record = node.table.get(identifier);
        Context.setMetadata(project, identifier, state.record, state);
        if (expression.value === 204 /* String */) {
            String.consume(project, 1 /* Right */, node, state);
            const word = expression.fragment.data;
            if (!Loose.collision(project, word, expression)) {
                emit(project, direction, parent, state);
                project.symbols.link(word, identifier);
            }
        }
        else if (expression.value === 206 /* Range */) {
            Range.consume(project, 1 /* Right */, node, state);
            const range = `${expression.left.fragment.data}-${expression.right.fragment.data}`;
            if (!Loose.collision(project, range, expression)) {
                emit(project, direction, parent, state);
                project.symbols.link(range, identifier);
            }
        }
        else {
            Expression.consume(project, 1 /* Right */, node, state);
            emit(project, direction, parent, state);
        }
    }
};
exports.consume = consume;
//# sourceMappingURL=token.js.map

/***/ }),
/* 117 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const Loose = __webpack_require__(115);
const Nodes = __webpack_require__(118);
const Expression = __webpack_require__(111);
/**
 * Consume a child node from the AST on the given parent and optimize the range pattern.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Context state.
 */
const consume = (project, direction, parent, state) => {
    if (state.type === 3 /* Node */) {
        const node = parent.getChild(direction);
        const identifier = `${node.left.fragment.data}-${node.right.fragment.data}`;
        const record = Loose.resolve(project, identifier, node, state);
        const reference = Nodes.getReference(record.data.identifier, node.table, node.fragment.location);
        parent.setChild(direction, reference);
        Expression.consume(project, direction, parent, state);
    }
};
exports.consume = consume;
//# sourceMappingURL=range.js.map

/***/ }),
/* 118 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getReference = exports.getToken = exports.getIdentifier = exports.getIdentity = void 0;
const Core = __webpack_require__(6);
const Parser = __webpack_require__(63);
/**
 * Get a new identity node.
 * @param identity Node identity.
 * @param table Node symbol table.
 * @param location Node location.
 * @returns Returns the node.
 */
const getIdentity = (identity, table, location) => {
    const fragment = new Core.Fragment(identity, 0, identity.length, location);
    const node = new Core.Node(fragment, 202 /* Identity */, table);
    return node;
};
exports.getIdentity = getIdentity;
/**
 * Get a new identifier node.
 * @param identifier Node identifier.
 * @param table Node symbol table.
 * @param location Node location.
 * @returns Returns the node.
 */
const getIdentifier = (identifier, table, location) => {
    const identity = identifier.substring(4);
    const fragment = new Core.Fragment(identifier, 0, identifier.length, location);
    const node = new Core.Node(fragment, 200 /* Identifier */, table);
    const record = new Core.Record(fragment, 301 /* Token */, node);
    node.setChild(0 /* Left */, (0, exports.getIdentity)(identity, table, location));
    table.add(record);
    return node;
};
exports.getIdentifier = getIdentifier;
/**
 * Get a new token node.
 * @param identifier Node identifier.
 * @param table Node symbol table.
 * @param location Node location.
 * @param expression Node expression.
 * @returns Return the node.
 */
const getToken = (identifier, table, location, expression) => {
    const fragment = new Core.Fragment('token', 0, 5, location);
    const node = new Core.Node(fragment, 238 /* Token */, table);
    const ident = (0, exports.getIdentifier)(identifier, table, location);
    ident.setChild(1 /* Right */, expression);
    node.setChild(1 /* Right */, ident);
    return node;
};
exports.getToken = getToken;
/**
 * Get a new reference node.
 * @param identifier Node identifier.
 * @param table Node symbol table.
 * @param location Node location.
 * @returns Returns the reference node.
 */
const getReference = (identifier, table, location) => {
    const fragment = new Core.Fragment(identifier, 0, identifier.length, location);
    const node = new Core.Node(fragment, 201 /* Reference */, table);
    return node;
};
exports.getReference = getReference;
//# sourceMappingURL=nodes.js.map

/***/ }),
/* 119 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const Core = __webpack_require__(6);
const Member = __webpack_require__(87);
const Sequential = __webpack_require__(86);
const Identified = __webpack_require__(78);
const Parser = __webpack_require__(63);
const Identity = __webpack_require__(72);
const Context = __webpack_require__(73);
const Loose = __webpack_require__(115);
const Expression = __webpack_require__(111);
/**
 * Get the candidate node based on the given input node.
 * @param node Input node.
 * @param parent Node parent.
 * @returns Returns the candidate node or undefined when there's no candidates.
 */
const getCandidate = (node, parent) => {
    if (node.value !== 209 /* Then */ && node.value !== 211 /* Or */) {
        if (node.value === 204 /* String */ || node instanceof Identified.Node || node instanceof Sequential.Node) {
            if (parent) {
                const right = parent.right;
                parent.setChild(0 /* Left */, void 0);
                parent.setChild(1 /* Right */, void 0);
                parent.swap(right);
            }
            return node;
        }
        if (node.left) {
            return getCandidate(node.left, node);
        }
    }
    return void 0;
};
/**
 * Consume a child node from the AST on the given parent and optimize the map pattern.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Context state.
 */
const consume = (project, direction, parent, state) => {
    let member = parent.getChild(direction).right;
    state.record.data.dynamic = true;
    while (member) {
        const expression = member.right;
        if (expression.value === 200 /* Identifier */) {
            if (state.type === 1 /* Skip */) {
                project.addError(expression.fragment, 4101 /* UNSUPPORTED_IDENTITY */);
                break;
            }
            const record = state.record;
            const identifier = `${record.data.identifier}@${expression.fragment.data}`;
            if (project.symbols.has(identifier)) {
                project.addError(expression.fragment, 4096 /* DUPLICATE_IDENTIFIER */);
            }
            else {
                const identity = state.identity;
                state.identity = Identity.resolve(expression) ?? state.identity;
                state.record = member.table.get(expression.fragment.data);
                Context.setMetadata(project, identifier, state.record, state);
                Expression.consume(project, 1 /* Right */, expression, state);
                const candidate = getCandidate(expression.right);
                if (!candidate) {
                    project.addError(member.fragment, 4114 /* INVALID_MAP_ENTRY */);
                }
                else {
                    if (candidate.value === 204 /* String */) {
                        Loose.collision(project, candidate.fragment.data, candidate);
                    }
                    const replacement = new Member.Node(expression.right, state.record, candidate);
                    member.setChild(1 /* Right */, replacement);
                    project.symbols.add(state.record);
                }
                state.identity = identity;
                state.record = record;
            }
        }
        else {
            Expression.consume(project, 1 /* Right */, member, state);
            const candidate = getCandidate(member.right);
            if (!candidate) {
                project.addError(member.fragment, 4114 /* INVALID_MAP_ENTRY */);
            }
            else {
                if (candidate.value === 204 /* String */) {
                    Loose.collision(project, candidate.fragment.data, candidate);
                }
                const replacement = new Member.Node(member.right, state.record, candidate);
                member.setChild(1 /* Right */, replacement);
            }
        }
        member = member.next;
    }
};
exports.consume = consume;
//# sourceMappingURL=map.js.map

/***/ }),
/* 120 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const Identified = __webpack_require__(78);
const Parser = __webpack_require__(63);
/**
 * Get all nodes from the given access node.
 * @param node Access node.
 * @returns Returns an array containing all nodes.
 */
const getNodes = (node) => {
    if (node.left && node.right) {
        return [...getNodes(node.left), ...getNodes(node.right)];
    }
    else if (node.left) {
        return getNodes(node.left);
    }
    else if (node.right) {
        return getNodes(node.right);
    }
    return [node];
};
/**
 * Get the member record that corresponds to the specified nodes containing a member path.
 * @param project Project context.
 * @param base Base record.
 * @param nodes Node list containing the member path.
 * @returns Returns the corresponding member record or undefined when the member wasn't found.
 */
const getMember = (project, base, nodes) => {
    let member = base;
    for (let index = 1; index < nodes.length; index++) {
        const node = nodes[index];
        if (!(member = member.link?.get(node.fragment.data))) {
            project.addError(node.fragment, 4102 /* UNDEFINED_IDENTIFIER */);
            break;
        }
    }
    return member;
};
/**
 * Consume a child node from the AST on the given parent and optimize the access pattern.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Consumption state.
 */
const consume = (project, direction, parent, state) => {
    const node = parent.getChild(direction);
    const nodes = getNodes(node);
    const first = node.table.find(nodes[0].fragment.data);
    if (!first) {
        project.addError(nodes[0].fragment, 4102 /* UNDEFINED_IDENTIFIER */);
    }
    else {
        const member = getMember(project, first, nodes);
        if (member) {
            if (state.type !== 3 /* Node */ || member.data.type === 3 /* Node */) {
                project.addError(member.node.fragment, 4113 /* INVALID_MAP_ENTRY_REFERENCE */);
            }
            else if (member.data.dynamic) {
                project.addError(member.node.fragment, 4112 /* INVALID_MAP_REFERENCE */);
            }
            else if (first.value === 302 /* AliasToken */) {
                project.addError(first.node.fragment, 4113 /* INVALID_MAP_ENTRY_REFERENCE */);
            }
            else {
                parent.setChild(direction, new Identified.Node(node, member.data.identity));
            }
        }
    }
};
exports.consume = consume;
//# sourceMappingURL=access.js.map

/***/ }),
/* 121 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const Core = __webpack_require__(6);
const Directive = __webpack_require__(77);
const Parser = __webpack_require__(63);
const Context = __webpack_require__(73);
const Expression = __webpack_require__(111);
/**
 * Emit a new skip entry and replace the current skip node by an optimized one.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Consumption state.
 */
const emit = (project, direction, parent, state) => {
    const node = parent.getChild(direction);
    const replacement = new Directive.Node(node, state.record);
    parent.setChild(direction, replacement);
    project.symbols.add(state.record);
};
/**
 * Consume a child node from the AST on the given parent and optimize the 'SKIP' directive.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Consumption state.
 */
const consume = (project, direction, parent, state) => {
    const node = parent.getChild(direction);
    const identifier = `@SKIP${state.identity}`;
    const line = new Core.Range(0, 0);
    const column = new Core.Range(0, identifier.length);
    const location = new Core.Location(project.name, line, column);
    const fragment = new Core.Fragment(identifier, 0, identifier.length, location);
    const record = new Core.Record(fragment, 300 /* Skip */, node);
    state.type = 1 /* Skip */;
    state.record = node.table.add(record);
    Context.setMetadata(project, identifier, state.record, state);
    Expression.consume(project, 1 /* Right */, node, state);
    emit(project, direction, parent, state);
};
exports.consume = consume;
//# sourceMappingURL=skip.js.map

/***/ }),
/* 122 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.operandList = exports.directionList = exports.unaryOperatorList = exports.binaryOperatorList = exports.rangeItem = exports.anyItem = exports.wordItem = exports.mapItem = exports.accessItem = exports.uncaseItem = exports.setItem = exports.hasItem = exports.errorItem = exports.scopeItem = exports.symbolItem = exports.pivotItem = exports.nextItem = exports.rightItem = exports.leftItem = exports.prependItem = exports.appendItem = exports.placeItem = exports.repeatItem = exports.optItem = exports.notItem = exports.andItem = exports.orItem = exports.thenElseItem = exports.thenItem = exports.asItem = exports.identifierItem = exports.identityItem = exports.nodeItem = exports.tokenItem = exports.aliasItem = exports.skipItem = exports.exportItem = exports.importItem = exports.getItem = void 0;
const VSCode = __webpack_require__(1);
/**
 * Reusable trigger command.
 */
const retriggerCommand = {
    command: 'editor.action.triggerSuggest',
    title: 'Re-trigger completions...'
};
/**
 * Get a new completion item based on the given label, documentation and options.
 * @param label Completion item label.
 * @param documentation Completion item documentation.
 * @param options Completion item options.
 * @returns Returns the new completion item.
 */
const getItem = (label, documentation, options) => {
    const text = options?.text ?? label;
    const item = new VSCode.CompletionItem(label, options.kind);
    item.insertText = new VSCode.SnippetString(options.space ? `${text} ` : text);
    item.command = options.retry ? retriggerCommand : void 0;
    item.commitCharacters = options.commit;
    item.documentation = documentation;
    return item;
};
exports.getItem = getItem;
/**
 * Completion item for an 'IMPORT' keyword directive.
 */
exports.importItem = (0, exports.getItem)('import', 'Create an import directive.', {
    kind: VSCode.CompletionItemKind.Keyword,
    space: true
});
/**
 * Completion item for an 'EXPORT' keyword directive.
 */
exports.exportItem = (0, exports.getItem)('export', 'Create an export directive.', {
    kind: VSCode.CompletionItemKind.Keyword,
    space: true,
    retry: true
});
/**
 * Completion item for a 'SKIP' keyword directive.
 */
exports.skipItem = (0, exports.getItem)('skip', 'Create a skip directive.', {
    kind: VSCode.CompletionItemKind.Keyword,
    space: true,
    retry: true
});
/**
 * Completion item for an 'ALIAS' keyword directive.
 */
exports.aliasItem = (0, exports.getItem)('alias', 'Create an alias directive for a token or node.', {
    kind: VSCode.CompletionItemKind.Keyword,
    space: true,
    retry: true
});
/**
 * Completion item for a 'TOKEN' keyword directive.
 */
exports.tokenItem = (0, exports.getItem)('token', 'Create a token directive.', {
    kind: VSCode.CompletionItemKind.Keyword,
    space: true,
    retry: true
});
/**
 * Completion item for a 'NODE' directive.
 */
exports.nodeItem = (0, exports.getItem)('node', 'Create a node directive.', {
    kind: VSCode.CompletionItemKind.Keyword,
    space: true,
    retry: true
});
/**
 * Completion item for an identity.
 */
exports.identityItem = (0, exports.getItem)('IDENTITY', 'Set an identity for the current directive.', {
    kind: VSCode.CompletionItemKind.Text,
    text: '<${1}>',
    commit: ['>']
});
/**
 * Completion item for an identifier.
 */
exports.identifierItem = (0, exports.getItem)('IDENTIFIER', 'Set an identifier for the current directive.', {
    kind: VSCode.CompletionItemKind.Text,
    text: '${1}',
    commit: [' ', '\n']
});
/**
 * Completion item for an 'AS' keyword operator.
 */
exports.asItem = (0, exports.getItem)('as', 'Set an expression for the current directive.', {
    kind: VSCode.CompletionItemKind.Keyword,
    space: true
});
/**
 * Completion item for a 'THEN' keyword operator.
 */
exports.thenItem = (0, exports.getItem)('then', 'Set a partial condition based on the last consumption state.', {
    kind: VSCode.CompletionItemKind.Keyword,
    space: true
});
/**
 * Completion item for a 'THEN/ELSE' keyword operator.
 */
exports.thenElseItem = (0, exports.getItem)('then else', 'Set a full condition based on the last consumption state.', {
    kind: VSCode.CompletionItemKind.Keyword,
    text: 'then ${1} else ${2}',
    commit: [' ', '\n']
});
/**
 * Completion item for an 'OR' keyword operator.
 */
exports.orItem = (0, exports.getItem)('or', 'Set another optional consumption.', {
    kind: VSCode.CompletionItemKind.Keyword,
    text: '|'
});
/**
 * Completion item for an 'AND' keyword operator.
 */
exports.andItem = (0, exports.getItem)('and', 'Set another expected consumption.', {
    kind: VSCode.CompletionItemKind.Keyword,
    text: '&'
});
/**
 * Completion item for a 'NOT' keyword operator.
 */
exports.notItem = (0, exports.getItem)('not', 'Invert the next consumption state (true to false and vice versa).', {
    kind: VSCode.CompletionItemKind.Keyword,
    space: true
});
/**
 * Completion item for an 'OPT' keyword operator.
 */
exports.optItem = (0, exports.getItem)('opt', 'Set the next consumption as optional.', {
    kind: VSCode.CompletionItemKind.Keyword,
    space: true
});
/**
 * Completion item for a 'REPEAT' keyword operator.
 */
exports.repeatItem = (0, exports.getItem)('repeat', 'Repeat the next consumption in case of success after the first try.', {
    kind: VSCode.CompletionItemKind.Keyword,
    space: true
});
/**
 * Completion item for a 'PLACE' keyword operator.
 */
exports.placeItem = (0, exports.getItem)('place', 'Place the resulting node from the next consumption in another direction.', {
    kind: VSCode.CompletionItemKind.Keyword,
    space: true,
    retry: true
});
/**
 * Completion item for an 'APPEND' keyword operator.
 */
exports.appendItem = (0, exports.getItem)('append', 'Append a new node when the next consumption is successful.', {
    kind: VSCode.CompletionItemKind.Keyword,
    space: true,
    retry: true
});
/**
 * Completion item for a 'PREPEND' keyword operator.
 */
exports.prependItem = (0, exports.getItem)('prepend', 'Prepend a new node when the next consumption is successful.', {
    kind: VSCode.CompletionItemKind.Keyword,
    space: true,
    retry: true
});
/**
 * Completion item for a 'LEFT' keyword operator modifier.
 */
exports.leftItem = (0, exports.getItem)('left', 'Modify the current node direction to left.', {
    kind: VSCode.CompletionItemKind.Keyword,
    space: true
});
/**
 * Completion item for a 'RIGHT' keyword operator modifier.
 */
exports.rightItem = (0, exports.getItem)('right', 'Modify the current node direction to right.', {
    kind: VSCode.CompletionItemKind.Keyword,
    space: true
});
/**
 * Completion item for a 'NEXT' keyword operator modifier.
 */
exports.nextItem = (0, exports.getItem)('next', 'Modify the current node direction to next.', {
    kind: VSCode.CompletionItemKind.Keyword,
    space: true
});
/**
 * Completion item for a 'PIVOT' keyword operator.
 */
exports.pivotItem = (0, exports.getItem)('pivot', 'Create a new pivot node when the next consumption is successful.', {
    kind: VSCode.CompletionItemKind.Keyword,
    space: true
});
/**
 * Completion item for a 'SYMBOL' keyword operator.
 */
exports.symbolItem = (0, exports.getItem)('symbol', 'Create a new symbol when the next consumption is successful.', {
    kind: VSCode.CompletionItemKind.Keyword,
    space: true
});
/**
 * Completion item for a 'SCOPE' keyword operator.
 */
exports.scopeItem = (0, exports.getItem)('scope', 'Create a new symbol scope for the next consumption.', {
    kind: VSCode.CompletionItemKind.Keyword,
    space: true
});
/**
 * Completion item for an 'ERROR' keyword operator.
 */
exports.errorItem = (0, exports.getItem)('error', 'Create a new error when the next consumption is successful.', {
    kind: VSCode.CompletionItemKind.Keyword,
    text: 'error <${1}>',
    commit: ['>'],
    space: true
});
/**
 * Completion item for a 'HAS' keyword operator.
 */
exports.hasItem = (0, exports.getItem)('has', 'Perform the next consumption when the expected state matches.', {
    kind: VSCode.CompletionItemKind.Keyword,
    text: 'has <${1}>',
    commit: ['>'],
    space: true
});
/**
 * Completion item for a 'SET' keyword operator.
 */
exports.setItem = (0, exports.getItem)('set', 'Set the state when the next consumption is successful.', {
    kind: VSCode.CompletionItemKind.Keyword,
    text: 'set <${1}>',
    commit: ['>'],
    space: true
});
/**
 * Completion item for an 'UNCASE' keyword operator.
 */
exports.uncaseItem = (0, exports.getItem)('uncase', 'Consume the next expression without case-sensitivity.', {
    kind: VSCode.CompletionItemKind.Keyword,
    space: true
});
/**
 * Completion item for an 'ACCESS' operator.
 */
exports.accessItem = (0, exports.getItem)('access', 'Access a map member.', {
    kind: VSCode.CompletionItemKind.Operator,
    text: '.'
});
/**
 * Completion item for a 'MAP' keyword operator.
 */
exports.mapItem = (0, exports.getItem)('map', 'Perform the next consumption in a prefix tree.', {
    kind: VSCode.CompletionItemKind.Keyword,
    text: 'map {${1}}',
    commit: [',', '}']
});
/**
 * Completion item for a word operand.
 */
exports.wordItem = (0, exports.getItem)('WORD', 'Accept a sequence of units.', {
    kind: VSCode.CompletionItemKind.Constant,
    text: "'${1}'",
    commit: ["'"]
});
/**
 * Completion item for an 'ANY' operand.
 */
exports.anyItem = (0, exports.getItem)('any', 'Accept any unit.', {
    kind: VSCode.CompletionItemKind.Constant,
    text: '*'
});
/**
 * Completion item for a 'FROM/TO' operand.
 */
exports.rangeItem = (0, exports.getItem)('from to', 'Accept an unit range.', {
    kind: VSCode.CompletionItemKind.Constant,
    text: "from '${1}' to '${2}'",
    commit: ["'"]
});
/**
 * Completion list containing all binary operators.
 */
exports.binaryOperatorList = [exports.thenItem, exports.thenElseItem, exports.orItem, exports.andItem, exports.accessItem];
/**
 * Completion list containing all unary operators.
 */
exports.unaryOperatorList = [
    exports.notItem,
    exports.optItem,
    exports.repeatItem,
    exports.placeItem,
    exports.appendItem,
    exports.prependItem,
    exports.pivotItem,
    exports.symbolItem,
    exports.scopeItem,
    exports.errorItem,
    exports.hasItem,
    exports.setItem,
    exports.uncaseItem,
    exports.mapItem
];
/**
 * Completion list containing all direction modifiers.
 */
exports.directionList = [exports.leftItem, exports.rightItem, exports.nextItem];
/**
 * Completion list containing all operands.
 */
exports.operandList = [exports.wordItem, exports.anyItem, exports.rangeItem];


/***/ }),
/* 123 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.update = void 0;
const VSCode = __webpack_require__(1);
const FS = __webpack_require__(124);
const Core = __webpack_require__(6);
const Lang = __webpack_require__(3);
const Errors = __webpack_require__(125);
/**
 * Load the specified file contents.
 * @param file File path.
 * @returns Returns the file contents or undefined when the file wasn't found.
 */
const loadFile = (file) => {
    if (FS.existsSync(file)) {
        return FS.readFileSync(file, { encoding: 'utf-8' });
    }
    return void 0;
};
/**
 * Consume the current document and generates the source context.
 * @param document Current document
 * @returns Returns the source context.
 */
const consumeDocument = (document) => {
    const begin = document.lineAt(0).range.start;
    const end = document.lineAt(document.lineCount - 1).range.end;
    const text = document.getText(new VSCode.Range(begin, end));
    const source = new Core.Context(document.uri.path);
    Lang.Lexer.consumeText(text, source);
    Lang.Parser.consumeTokens(source.tokens, source);
    return source;
};
/**
 * Update the specified diagnostics collection based on the current document.
 * @param document Current document.
 * @param collection Diagnostics collection.
 */
const update = (document, collection) => {
    const source = consumeDocument(document);
    const workspaces = VSCode.workspace.workspaceFolders;
    const directory = workspaces ? workspaces[0].uri.path.substring(1) : void 0;
    const project = new Lang.Project.Context('editor', new Lang.TextCoder(), {
        loadFileHook: directory ? loadFile : void 0,
        directory
    });
    Lang.Optimizer.consumeNodes(source.node, project);
    collection.set(document.uri, [...Errors.getDiagnostics(source.errors), ...Errors.getDiagnostics(project.errors)]);
    return { project, source };
};
exports.update = update;


/***/ }),
/* 124 */
/***/ ((module) => {

module.exports = require("fs");

/***/ }),
/* 125 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getDiagnostics = void 0;
const VSCode = __webpack_require__(1);
const Lang = __webpack_require__(3);
/**
 * All error messages.
 */
const errorMessages = {
    [4096 /* DUPLICATE_IDENTIFIER */]: 'Duplicate identifier.',
    [4097 /* UNEXPECTED_TOKEN */]: 'Unexpected token.',
    [4098 /* UNEXPECTED_SYNTAX */]: 'Unexpected syntax.',
    [4099 /* UNEXPECTED_NODE */]: 'Unexpected node.',
    [4100 /* UNSUPPORTED_NODE */]: 'Unsupported node.',
    [4101 /* UNSUPPORTED_IDENTITY */]: 'Unsupported identity.',
    [4102 /* UNDEFINED_IDENTIFIER */]: 'Undefined identifiers cannot be referenced.',
    [4103 /* UNRESOLVED_IDENTIFIER */]: 'Unresolved identifiers cannot be referenced.',
    [4104 /* UNRESOLVED_TOKEN_REFERENCE */]: 'Token reference is not resolved yet.',
    [4105 /* UNRESOLVED_NODE_REFERENCE */]: 'Node reference is not resolved yet.',
    [4106 /* UNRESOLVED_ALIAS_TOKEN_REFERENCE */]: 'Alias Token reference is not resolved yet.',
    [4107 /* UNRESOLVED_ALIAS_NODE_REFERENCE */]: 'Alias Node reference is not resolved yet.',
    [4108 /* INVALID_TOKEN_REFERENCE */]: 'Token references cannot be in use here.',
    [4109 /* INVALID_NODE_REFERENCE */]: 'Node references cannot be in use here.',
    [4110 /* INVALID_ALIAS_TOKEN_REFERENCE */]: 'References for an alias token cannot be in use here.',
    [4111 /* INVALID_ALIAS_NODE_REFERENCE */]: 'References for an alias node cannot be in use here.',
    [4112 /* INVALID_MAP_REFERENCE */]: 'Map cannot be referenced here.',
    [4113 /* INVALID_MAP_ENTRY_REFERENCE */]: 'Map entries cannot be referenced here.',
    [4114 /* INVALID_MAP_ENTRY */]: 'Map entries must start with a token or string.',
    [4116 /* TOKEN_COLLISION */]: 'Multiple tokens with the same expression.',
    [4117 /* IMPORT_DISABLED */]: 'Import feature disabled.',
    [4118 /* IMPORT_NOT_FOUND */]: "File doesn't found.",
    [4119 /* IMPORT_FAILURE */]: 'Failed to compile.'
};
/**
 * Get the corresponding error message based on the given error object.
 * @param error Error object.
 * @returns Returns the corresponding error message.
 * @throws Throws an exception when the specified error isn't supported.
 */
const getMessage = (error) => {
    const message = errorMessages[error.value];
    if (!message) {
        throw new Error(`Error value ${error.value} is not supported.`);
    }
    return message;
};
/**
 * Get a new diagnostics list based on the specified errors list.
 * @param error Errors list.
 * @returns Returns the diagnostics list.
 */
const getDiagnostics = (errors) => {
    const list = [];
    for (const error of errors) {
        const location = error.fragment.location;
        const severity = VSCode.DiagnosticSeverity.Error;
        const range = new VSCode.Range(new VSCode.Position(location.line.begin, location.column.begin), new VSCode.Position(location.line.end, location.column.end));
        list.push(new VSCode.Diagnostic(range, getMessage(error), severity));
    }
    return list;
};
exports.getDiagnostics = getDiagnostics;


/***/ }),
/* 126 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolve = void 0;
const Sequential = __webpack_require__(86);
const String = __webpack_require__(60);
const Parser = __webpack_require__(63);
const And = __webpack_require__(90);
/**
 * Split the first part of the specified sequential node and resolve all the patterns.
 * @param project Project context.
 * @param node Sequential node.
 * @param state Consumption state.
 * @returns Returns an array containing all patterns or undefined when the node is invalid.
 */
const split = (project, node, state) => {
    const record = node.sequence.shift();
    const patterns = And.resolve(project, node, state);
    if (patterns) {
        let units;
        if (node.type === 204 /* String */) {
            units = String.extract(record.fragment.data).split('');
        }
        else {
            units = [record.identity];
        }
        return [project.coder.emitExpectUnitsPattern(units), ...patterns];
    }
    return void 0;
};
/**
 * Traverse the specified node trying to split the first part of the sequential node and resolve all the patterns.
 * @param project Project context.
 * @param node Sequential node.
 * @param state Consumption state.
 * @returns Returns an array containing all patterns or undefined when the node is invalid.
 */
const traverse = (project, node, state) => {
    const left = (0, exports.resolve)(project, node.left, state);
    if (left) {
        const right = (0, exports.resolve)(project, node.right, state);
        if (right) {
            return [...left, ...right];
        }
    }
    return void 0;
};
/**
 * Resolve the given node splitting the first part from the sequential node in an 'AND' pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns an array containing all patterns or undefined when the node is invalid.
 */
const resolve = (project, node, state) => {
    if (node.value === 212 /* And */) {
        if (node instanceof Sequential.Node) {
            if (node.sequence.length > 1) {
                return split(project, node, state);
            }
        }
        else {
            return traverse(project, node, state);
        }
    }
    return And.resolve(project, node, state);
};
exports.resolve = resolve;
//# sourceMappingURL=splitter.js.map

/***/ }),
/* 127 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Exception = void 0;
/**
 * Exception class.
 */
class Exception extends Error {
    /**
     * Default constructor.
     * @param message Message.
     */
    constructor(message) {
        super(message);
    }
}
exports.Exception = Exception;
//# sourceMappingURL=exception.js.map

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
const VSCode = __webpack_require__(1);
const Completion = __webpack_require__(2);
const Diagnostics = __webpack_require__(123);
/**
 * Global diagnostic cache.
 */
const cache = {};
/**
 * Updates the global diagnostic cache.
 * @param document Current document.
 * @param collection Diagnostics collection.
 */
const updateDiagnostics = (document, collection) => {
    collection.clear();
    if (document && document.languageId === 'xcheme') {
        cache.last = Diagnostics.update(document, collection);
    }
};
/**
 * Returns a new disposable with an auto completion provider.
 * @returns Returns the disposable.
 */
const registerAutoCompletion = () => {
    return VSCode.languages.registerCompletionItemProvider('xcheme', new Completion.Provider(cache), '.');
};
/**
 * Returns a new disposable for detecting editor changes and update the given diagnostics collection.
 * @param collection Diagnostics collection.
 * @returns Returns the disposable.
 */
const detectEditorChanges = (collection) => {
    return VSCode.window.onDidChangeActiveTextEditor((editor) => {
        if (editor && editor.document) {
            updateDiagnostics(editor.document, collection);
        }
    });
};
/**
 * Returns a new disposable for detecting text changes and update the given diagnostics collection.
 * @param collection Diagnostics collection.
 * @returns Returns the disposable.
 */
const detectTextChanges = (collection) => {
    return VSCode.workspace.onDidChangeTextDocument((event) => {
        if (event.document) {
            updateDiagnostics(event.document, collection);
        }
    });
};
/**
 * Called when the extension is activated.
 * @param context Extension context.
 */
function activate(context) {
    const collection = VSCode.languages.createDiagnosticCollection('xcheme');
    context.subscriptions.push(detectTextChanges(collection), detectEditorChanges(collection));
    context.subscriptions.push(registerAutoCompletion());
    const editor = VSCode.window.activeTextEditor;
    if (editor && editor.document) {
        updateDiagnostics(editor.document, collection);
    }
}
exports.activate = activate;
/**
 * Called when the extension is deactivated.
 */
function deactivate() { }
exports.deactivate = deactivate;

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=extension.js.map