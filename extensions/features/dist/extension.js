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
exports.update = void 0;
const VSCode = __webpack_require__(1);
const Core = __webpack_require__(3);
const Lang = __webpack_require__(50);
/**
 * All error messages.
 */
const errorMessages = {
    [4096 /* DUPLICATE_IDENTIFIER */]: 'Duplicate identifier.',
    [4097 /* UNEXPECTED_TOKEN */]: 'Unexpected token.',
    [4098 /* UNEXPECTED_SYNTAX */]: 'Unexpected syntax.',
    [4099 /* UNEXPECTED_NODE */]: 'Unexpected node.',
    [4100 /* INVALID_NODE_REFERENCE */]: 'Node reference cannot be in use here.',
    [4101 /* INVALID_TOKEN_REFERENCE */]: 'Token reference cannot be in use here.',
    [4102 /* INVALID_ALIAS_TOKEN_REFERENCE */]: 'Alias Token reference cannot be in use here.',
    [4103 /* UNRESOLVED_TOKEN_REFERENCE */]: 'Token reference is not resolved yet.',
    [4104 /* UNDEFINED_IDENTIFIER */]: 'Undefined identifiers cannot be referenced.'
};
/**
 * Get the corresponding error message based on the given error object.
 * @param error Input error.
 * @returns Returns the corresponding error message.
 * @throws Throws an error when the specified error isn't supported.
 */
const getMessage = (error) => {
    const message = errorMessages[error.value];
    if (!message) {
        throw `Error value ${error.value} is not supported.`;
    }
    return message;
};
/**
 * Push the specified error into the given diagnostics list.
 * @param list Diagnostics list.
 * @param error Input error.
 */
const pushMessage = (list, error) => {
    const location = error.fragment.location;
    const start = new VSCode.Position(location.line, location.column);
    const end = new VSCode.Position(location.line, location.column);
    const range = new VSCode.Range(start, end);
    list.push(new VSCode.Diagnostic(range, getMessage(error), VSCode.DiagnosticSeverity.Error));
};
/**
 * Get all the text from the given document.
 * @param document Input document.
 * @returns Returns the text.
 */
const getText = (document) => {
    const first = document.lineAt(0);
    const last = document.lineAt(document.lineCount - 1);
    return document.getText(new VSCode.Range(first.range.start, last.range.end));
};
/**
 * Update the specified diagnostics collection based on the given document.
 * @param document Input document.
 * @param collection Diagnostics collection.
 */
const update = (document, collection) => {
    collection.clear();
    if (document && document.languageId === 'xcheme') {
        const context = new Core.Context('diagnostics');
        const project = new Lang.Project(new Lang.TextCoder());
        const text = getText(document);
        Lang.Lexer.consumeText(text, context);
        Lang.Parser.consumeTokens(context.tokens, context);
        if (context.errors.length === 0) {
            Lang.Maker.consumeNodes(context.node, project);
        }
        const list = [];
        for (const error of [...context.errors, ...project.errors]) {
            pushMessage(list, error);
        }
        collection.set(document.uri, list);
    }
};
exports.update = update;


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ScopeSymbolPattern = exports.EmitSymbolPattern = exports.EmitSymbolRoute = exports.PlaceNodePattern = exports.PivotNodePattern = exports.PrependNodePattern = exports.AppendNodePattern = exports.EmitNodePattern = exports.EmitNodeRoute = exports.EmitTokenPattern = exports.EmitTokenRoute = exports.EmitErrorPattern = exports.EmitErrorRoute = exports.SetStatePattern = exports.HasStatePattern = exports.SetStateRoute = exports.SetValuePattern = exports.SetValueRoute = exports.MapFlowPattern = exports.StaticFlowPattern = exports.RepeatFlowPattern = exports.OptFlowPattern = exports.NotFlowPattern = exports.EndFlowPattern = exports.ExpectFlowPattern = exports.RunFlowPattern = exports.ConditionFlowPattern = exports.ChooseFlowPattern = exports.RangeUnitPattern = exports.ExpectUnitPattern = exports.ChooseUnitPattern = exports.AnyUnitPattern = exports.TokenSource = exports.TextSource = exports.BaseSource = exports.Route = exports.Pattern = exports.Location = exports.Fragment = exports.Record = exports.Table = exports.Token = exports.Node = exports.Error = exports.Context = void 0;
var context_1 = __webpack_require__(4);
Object.defineProperty(exports, "Context", ({ enumerable: true, get: function () { return context_1.default; } }));
var error_1 = __webpack_require__(9);
Object.defineProperty(exports, "Error", ({ enumerable: true, get: function () { return error_1.default; } }));
var node_1 = __webpack_require__(8);
Object.defineProperty(exports, "Node", ({ enumerable: true, get: function () { return node_1.default; } }));
var token_1 = __webpack_require__(10);
Object.defineProperty(exports, "Token", ({ enumerable: true, get: function () { return token_1.default; } }));
var table_1 = __webpack_require__(7);
Object.defineProperty(exports, "Table", ({ enumerable: true, get: function () { return table_1.default; } }));
var record_1 = __webpack_require__(11);
Object.defineProperty(exports, "Record", ({ enumerable: true, get: function () { return record_1.default; } }));
var fragment_1 = __webpack_require__(5);
Object.defineProperty(exports, "Fragment", ({ enumerable: true, get: function () { return fragment_1.default; } }));
var location_1 = __webpack_require__(6);
Object.defineProperty(exports, "Location", ({ enumerable: true, get: function () { return location_1.default; } }));
var pattern_1 = __webpack_require__(12);
Object.defineProperty(exports, "Pattern", ({ enumerable: true, get: function () { return pattern_1.default; } }));
var route_1 = __webpack_require__(13);
Object.defineProperty(exports, "Route", ({ enumerable: true, get: function () { return route_1.default; } }));
var base_1 = __webpack_require__(14);
Object.defineProperty(exports, "BaseSource", ({ enumerable: true, get: function () { return base_1.default; } }));
var text_1 = __webpack_require__(15);
Object.defineProperty(exports, "TextSource", ({ enumerable: true, get: function () { return text_1.default; } }));
var token_2 = __webpack_require__(16);
Object.defineProperty(exports, "TokenSource", ({ enumerable: true, get: function () { return token_2.default; } }));
var any_1 = __webpack_require__(17);
Object.defineProperty(exports, "AnyUnitPattern", ({ enumerable: true, get: function () { return any_1.default; } }));
var choose_1 = __webpack_require__(18);
Object.defineProperty(exports, "ChooseUnitPattern", ({ enumerable: true, get: function () { return choose_1.default; } }));
var expect_1 = __webpack_require__(19);
Object.defineProperty(exports, "ExpectUnitPattern", ({ enumerable: true, get: function () { return expect_1.default; } }));
var range_1 = __webpack_require__(20);
Object.defineProperty(exports, "RangeUnitPattern", ({ enumerable: true, get: function () { return range_1.default; } }));
var choose_2 = __webpack_require__(21);
Object.defineProperty(exports, "ChooseFlowPattern", ({ enumerable: true, get: function () { return choose_2.default; } }));
var condition_1 = __webpack_require__(24);
Object.defineProperty(exports, "ConditionFlowPattern", ({ enumerable: true, get: function () { return condition_1.default; } }));
var run_1 = __webpack_require__(25);
Object.defineProperty(exports, "RunFlowPattern", ({ enumerable: true, get: function () { return run_1.default; } }));
var expect_2 = __webpack_require__(23);
Object.defineProperty(exports, "ExpectFlowPattern", ({ enumerable: true, get: function () { return expect_2.default; } }));
var end_1 = __webpack_require__(26);
Object.defineProperty(exports, "EndFlowPattern", ({ enumerable: true, get: function () { return end_1.default; } }));
var not_1 = __webpack_require__(27);
Object.defineProperty(exports, "NotFlowPattern", ({ enumerable: true, get: function () { return not_1.default; } }));
var opt_1 = __webpack_require__(28);
Object.defineProperty(exports, "OptFlowPattern", ({ enumerable: true, get: function () { return opt_1.default; } }));
var repeat_1 = __webpack_require__(29);
Object.defineProperty(exports, "RepeatFlowPattern", ({ enumerable: true, get: function () { return repeat_1.default; } }));
var static_1 = __webpack_require__(30);
Object.defineProperty(exports, "StaticFlowPattern", ({ enumerable: true, get: function () { return static_1.default; } }));
var map_1 = __webpack_require__(31);
Object.defineProperty(exports, "MapFlowPattern", ({ enumerable: true, get: function () { return map_1.default; } }));
var route_2 = __webpack_require__(32);
Object.defineProperty(exports, "SetValueRoute", ({ enumerable: true, get: function () { return route_2.default; } }));
var set_1 = __webpack_require__(33);
Object.defineProperty(exports, "SetValuePattern", ({ enumerable: true, get: function () { return set_1.default; } }));
var route_3 = __webpack_require__(34);
Object.defineProperty(exports, "SetStateRoute", ({ enumerable: true, get: function () { return route_3.default; } }));
var has_1 = __webpack_require__(36);
Object.defineProperty(exports, "HasStatePattern", ({ enumerable: true, get: function () { return has_1.default; } }));
var set_2 = __webpack_require__(35);
Object.defineProperty(exports, "SetStatePattern", ({ enumerable: true, get: function () { return set_2.default; } }));
var route_4 = __webpack_require__(37);
Object.defineProperty(exports, "EmitErrorRoute", ({ enumerable: true, get: function () { return route_4.default; } }));
var emit_1 = __webpack_require__(38);
Object.defineProperty(exports, "EmitErrorPattern", ({ enumerable: true, get: function () { return emit_1.default; } }));
var route_5 = __webpack_require__(39);
Object.defineProperty(exports, "EmitTokenRoute", ({ enumerable: true, get: function () { return route_5.default; } }));
var emit_2 = __webpack_require__(40);
Object.defineProperty(exports, "EmitTokenPattern", ({ enumerable: true, get: function () { return emit_2.default; } }));
var route_6 = __webpack_require__(41);
Object.defineProperty(exports, "EmitNodeRoute", ({ enumerable: true, get: function () { return route_6.default; } }));
var emit_3 = __webpack_require__(42);
Object.defineProperty(exports, "EmitNodePattern", ({ enumerable: true, get: function () { return emit_3.default; } }));
var append_1 = __webpack_require__(43);
Object.defineProperty(exports, "AppendNodePattern", ({ enumerable: true, get: function () { return append_1.default; } }));
var prepend_1 = __webpack_require__(44);
Object.defineProperty(exports, "PrependNodePattern", ({ enumerable: true, get: function () { return prepend_1.default; } }));
var pivot_1 = __webpack_require__(45);
Object.defineProperty(exports, "PivotNodePattern", ({ enumerable: true, get: function () { return pivot_1.default; } }));
var place_1 = __webpack_require__(46);
Object.defineProperty(exports, "PlaceNodePattern", ({ enumerable: true, get: function () { return place_1.default; } }));
var route_7 = __webpack_require__(47);
Object.defineProperty(exports, "EmitSymbolRoute", ({ enumerable: true, get: function () { return route_7.default; } }));
var emit_4 = __webpack_require__(48);
Object.defineProperty(exports, "EmitSymbolPattern", ({ enumerable: true, get: function () { return emit_4.default; } }));
var scope_1 = __webpack_require__(49);
Object.defineProperty(exports, "ScopeSymbolPattern", ({ enumerable: true, get: function () { return scope_1.default; } }));
//# sourceMappingURL=index.js.map

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const fragment_1 = __webpack_require__(5);
const location_1 = __webpack_require__(6);
const table_1 = __webpack_require__(7);
const node_1 = __webpack_require__(8);
/**
 * Contains the analysis context and depending on the solution, can store errors, tokens, symbols and
 * nodes of the current consumption.
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
    #node = new node_1.default(new fragment_1.default('', 0, 0, new location_1.default(0, 0)), this.#table, 0x00);
    /**
     * Context name.
     */
    #name;
    /**
     * Default constructor.
     * @param name Context name.
     */
    constructor(name) {
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
}
exports.default = Context;
//# sourceMappingURL=context.js.map

/***/ }),
/* 5 */
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
     * Get the fragment location in terms of lines and columns.
     */
    get location() {
        return this.#location;
    }
}
exports.default = Fragment;
//# sourceMappingURL=fragment.js.map

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
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

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const fragment_1 = __webpack_require__(5);
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
     * Get the parent table.
     */
    get parent() {
        return this.#parent;
    }
    /**
     * Get all record keys in this table.
     */
    get keys() {
        return Object.keys(this.#records);
    }
    /**
     * Get the number of entries in this table.
     */
    get length() {
        return this.#length;
    }
    /**
     * Check whether or not there's a symbol record for the given key.
     * @param key Symbol record key.
     * @returns Returns true when the symbol record already exists, false otherwise.
     */
    hasRecord(key) {
        return this.getRecord(key) !== void 0;
    }
    /**
     * Get the symbol record that corresponds to the specified key.
     * @param key Symbol record key.
     * @returns Returns the corresponding record or undefined when the record wasn't found.
     */
    getRecord(key) {
        return this.#records[key instanceof fragment_1.default ? key.data : key];
    }
    /**
     * Add a new symbol record into the symbol table.
     * @param record Symbol record.
     * @throw Throws an error when a symbol record with the same fragment data already exists.
     */
    addRecord(record) {
        const key = record.fragment.data;
        if (this.#records[key]) {
            throw 'Unable to add records with duplicate fragment data.';
        }
        this.#records[key] = record;
        this.#length++;
    }
}
exports.default = Table;
//# sourceMappingURL=table.js.map

/***/ }),
/* 8 */
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
     * Node symbol table.
     */
    #table;
    /**
     * Node value.
     */
    #value;
    /**
     * Default constructor
     * @param fragment Node fragment.
     * @param table Node symbol table.
     * @param value Node value.
     */
    constructor(fragment, table, value) {
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
     * Get the symbol table associated to this node.
     */
    get table() {
        return this.#table;
    }
    /**
     * Get the node value.
     */
    get value() {
        return this.#value;
    }
    /**
     * Get the left child node.
     */
    get left() {
        return this.#children[0 /* Left */];
    }
    /**
     * Get the right child node.
     */
    get right() {
        return this.#children[1 /* Right */];
    }
    /**
     * Get the next child node.
     */
    get next() {
        return this.#children[2 /* Next */];
    }
    /**
     * Get a child node.
     * @param child Expected child.
     * @returns Return the corresponding child node.
     */
    getChild(child) {
        return this.#children[child];
    }
    /**
     * Set a new child node.
     * @param child Expected child.
     * @param node New child node.
     */
    setChild(child, node) {
        this.#children[child] = node;
    }
    /**
     * Get the lowest child node.
     * @param child Expected child.
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
exports.default = Node;
//# sourceMappingURL=node.js.map

/***/ }),
/* 9 */
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
exports.default = Error;
//# sourceMappingURL=error.js.map

/***/ }),
/* 10 */
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
exports.default = Token;
//# sourceMappingURL=token.js.map

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * A symbol record generated during the analysis process to be stored in the symbol table.
 */
class Record {
    /**
     * Record fragment.
     */
    #fragment;
    /**
     * Record node.
     */
    #node;
    /**
     * Record value.
     */
    #value;
    /**
     * Default constructor.
     * @param fragment Record fragment.
     * @param node Record node.
     * @param value Record value.
     */
    constructor(fragment, node, value) {
        this.#fragment = fragment;
        this.#node = node;
        this.#value = value;
    }
    /**
     * Get the record fragment.
     */
    get fragment() {
        return this.#fragment;
    }
    /**
     * Get the record node.
     */
    get node() {
        return this.#node;
    }
    /**
     * Get the record value.
     */
    get value() {
        return this.#value;
    }
}
exports.default = Record;
//# sourceMappingURL=record.js.map

/***/ }),
/* 12 */
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
exports.default = Pattern;
//# sourceMappingURL=pattern.js.map

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * Base of any route used together with routing patterns.
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
     * @param units Route units.
     */
    constructor(pattern, ...units) {
        this.#pattern = pattern;
        this.#units = units;
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
exports.default = Route;
//# sourceMappingURL=route.js.map

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const error_1 = __webpack_require__(9);
const token_1 = __webpack_require__(10);
const node_1 = __webpack_require__(8);
const record_1 = __webpack_require__(11);
const table_1 = __webpack_require__(7);
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
    move() {
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
            this.#table.addRecord(product);
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
        this.#table = this.#table.parent;
        this.#output.table = this.#table;
    }
}
exports.default = Base;
//# sourceMappingURL=base.js.map

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const fragment_1 = __webpack_require__(5);
const location_1 = __webpack_require__(6);
const base_1 = __webpack_require__(14);
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
        if (value === void 0) {
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
                const location = new location_1.default(state.line, state.column);
                return new fragment_1.default(this.#data, state.offset, this.offset, location);
            }
        }
        const length = this.offset + (this.length > 0 ? 1 : 0);
        const location = new location_1.default(this.#current.line, this.#current.column);
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
        if ((this.#current = this.#states[this.#states.length - 1]) === void 0) {
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
    move() {
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
exports.default = Text;
//# sourceMappingURL=text.js.map

/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const fragment_1 = __webpack_require__(5);
const base_1 = __webpack_require__(14);
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
        if (value === void 0) {
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
                return new fragment_1.default(first.source, first.begin, last.end, first.location);
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
        if ((this.#current = this.#states[this.#states.length - 1]) === void 0) {
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
    move() {
        this.#current.offset++;
        if (this.#current.offset > this.#longest.offset) {
            this.#longest = { ...this.#current };
        }
    }
}
exports.default = TokenSource;
//# sourceMappingURL=token.js.map

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const pattern_1 = __webpack_require__(12);
/**
 * Consumes one unit.
 */
class Any extends pattern_1.default {
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source) {
        if (source.length > 0) {
            source.move();
            return true;
        }
        return false;
    }
}
exports.default = Any;
//# sourceMappingURL=any.js.map

/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const pattern_1 = __webpack_require__(12);
/**
 * Consumes one unit that is between all the acceptable units in the pattern.
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
            if (this.#units.has(source.value)) {
                source.move();
                return true;
            }
        }
        return false;
    }
}
exports.default = Choose;
//# sourceMappingURL=choose.js.map

/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const pattern_1 = __webpack_require__(12);
/**
 * Consumes all the units that are expected by the pattern.
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
            if (source.length === 0 || source.value !== unit) {
                return false;
            }
            source.move();
        }
        return true;
    }
}
exports.default = Expect;
//# sourceMappingURL=expect.js.map

/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const pattern_1 = __webpack_require__(12);
/**
 * Consumes one unit that is in the range accepted by the pattern.
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
            const value = source.value;
            if (value >= this.#begin && value <= this.#end) {
                source.move();
                return true;
            }
        }
        return false;
    }
}
exports.default = Range;
//# sourceMappingURL=range.js.map

/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const pattern_1 = __webpack_require__(12);
const try_1 = __webpack_require__(22);
/**
 * Consumes the first matching pattern in the list of patterns.
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
exports.default = Choose;
//# sourceMappingURL=choose.js.map

/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const pattern_1 = __webpack_require__(12);
const expect_1 = __webpack_require__(23);
/**
 * Consumes all the given patterns and, in case of failure, it preserves the current source state.
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
exports.default = Try;
//# sourceMappingURL=try.js.map

/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const pattern_1 = __webpack_require__(12);
/**
 * Consumes all patterns that are expected by this pattern.
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
exports.default = Expect;
//# sourceMappingURL=expect.js.map

/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const pattern_1 = __webpack_require__(12);
const try_1 = __webpack_require__(22);
/**
 * Consumes the test pattern and, in case of success, it also consumes the success pattern,
 * otherwise, it will consume the failure pattern (when provided).
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
exports.default = Condition;
//# sourceMappingURL=condition.js.map

/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const pattern_1 = __webpack_require__(12);
/**
 * Consumes the pattern object returned by the callback given for this pattern.
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
exports.default = Run;
//# sourceMappingURL=run.js.map

/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const pattern_1 = __webpack_require__(12);
/**
 * Doesn't consume anything, but it expects the end of the source.
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
exports.default = End;
//# sourceMappingURL=end.js.map

/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const pattern_1 = __webpack_require__(12);
const try_1 = __webpack_require__(22);
/**
 * Consumes all the given patterns and invert the consumption result.
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
     * @returns Returns the negated consumption result.
     */
    consume(source) {
        if (source.length > 0) {
            return !this.#target.consume(source);
        }
        return false;
    }
}
exports.default = Not;
//# sourceMappingURL=not.js.map

/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const pattern_1 = __webpack_require__(12);
const try_1 = __webpack_require__(22);
/**
 * Consumes all the given patterns in this pattern without raising a consumption failure.
 */
class Option extends pattern_1.default {
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
exports.default = Option;
//# sourceMappingURL=opt.js.map

/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const pattern_1 = __webpack_require__(12);
const expect_1 = __webpack_require__(23);
const try_1 = __webpack_require__(22);
/**
 * Consumes all the given patterns in this pattern and, in case of success, retry the consumption.
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
exports.default = Repeat;
//# sourceMappingURL=repeat.js.map

/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const pattern_1 = __webpack_require__(12);
/**
 * Doesn't consume anything and returns the static value given for this pattern.
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
exports.default = Static;
//# sourceMappingURL=static.js.map

/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const pattern_1 = __webpack_require__(12);
const expect_1 = __webpack_require__(19);
const try_1 = __webpack_require__(22);
/**
 * Consumes the first route that match in the list of routes given for this pattern.
 */
class Map extends pattern_1.default {
    /**
     * List of routes.
     */
    #routes;
    /**
     * Default constructor.
     * @param routes List of routes.
     */
    constructor(...routes) {
        super();
        this.#routes = routes
            .sort((a, b) => b.units.length - a.units.length)
            .map((route) => ({
            test: new try_1.default(new expect_1.default(...route.units)),
            target: route.pattern
        }));
    }
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source) {
        for (const route of this.#routes) {
            if (route.test.consume(source)) {
                return route.target.consume(source);
            }
        }
        return false;
    }
}
exports.default = Map;
//# sourceMappingURL=map.js.map

/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const route_1 = __webpack_require__(13);
const pattern_1 = __webpack_require__(12);
const set_1 = __webpack_require__(33);
/**
 * Produce a route to consume units and in case of success it emits a new token.
 */
class Route extends route_1.default {
    /**
     * Default constructor.
     * @param value New value.
     * @param first Route pattern or the first unit.
     * @param units Route units.
     */
    constructor(value, first, ...units) {
        if (first instanceof pattern_1.default) {
            super(new set_1.default(value, first), ...units);
        }
        else {
            super(new set_1.default(value), first, ...units);
        }
    }
}
exports.default = Route;
//# sourceMappingURL=route.js.map

/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const expect_1 = __webpack_require__(23);
const pattern_1 = __webpack_require__(12);
/**
 * Consumes all the given patterns and, in case of success, it will change the current output value.
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
exports.default = Set;
//# sourceMappingURL=set.js.map

/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const route_1 = __webpack_require__(13);
const pattern_1 = __webpack_require__(12);
const set_1 = __webpack_require__(35);
/**
 * Produce a route to consume units and in case of success it set a new state value.
 */
class Route extends route_1.default {
    /**
     * Default constructor.
     * @param value State value.
     * @param first Route pattern or the first unit.
     * @param units Route units.
     */
    constructor(value, first, ...units) {
        if (first instanceof pattern_1.default) {
            super(new set_1.default(value, first), ...units);
        }
        else {
            super(new set_1.default(value), first, ...units);
        }
    }
}
exports.default = Route;
//# sourceMappingURL=route.js.map

/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const expect_1 = __webpack_require__(23);
const pattern_1 = __webpack_require__(12);
/**
 * Consumes all the given patterns and, in case of success, it will set a new state value.
 */
class Emit extends pattern_1.default {
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
exports.default = Emit;
//# sourceMappingURL=set.js.map

/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const expect_1 = __webpack_require__(23);
const pattern_1 = __webpack_require__(12);
/**
 * Consumes all the given patterns when the specified state value is defined.
 */
class Emit extends pattern_1.default {
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
exports.default = Emit;
//# sourceMappingURL=has.js.map

/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const route_1 = __webpack_require__(13);
const pattern_1 = __webpack_require__(12);
const emit_1 = __webpack_require__(38);
/**
 * Produce a route to consume units and in case of success it emits a new error.
 */
class Route extends route_1.default {
    /**
     * Default constructor.
     * @param value Error value.
     * @param first Route pattern or the first unit.
     * @param units Route units.
     */
    constructor(value, first, ...units) {
        if (first instanceof pattern_1.default) {
            super(new emit_1.default(value, first), ...units);
        }
        else {
            super(new emit_1.default(value), first, ...units);
        }
    }
}
exports.default = Route;
//# sourceMappingURL=route.js.map

/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_1 = __webpack_require__(14);
const error_1 = __webpack_require__(9);
const expect_1 = __webpack_require__(23);
const pattern_1 = __webpack_require__(12);
/**
 * Consumes all the given patterns and, in case of success, it will emit a new error into the current error list.
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
exports.default = Emit;
//# sourceMappingURL=emit.js.map

/***/ }),
/* 39 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const route_1 = __webpack_require__(13);
const pattern_1 = __webpack_require__(12);
const emit_1 = __webpack_require__(40);
/**
 * Produce a route to consume units and in case of success it emits a new token.
 */
class Route extends route_1.default {
    /**
     * Default constructor.
     * @param value Token value.
     * @param first Route pattern or the first unit.
     * @param units Route units.
     */
    constructor(value, first, ...units) {
        if (first instanceof pattern_1.default) {
            super(new emit_1.default(value, first), ...units);
        }
        else {
            super(new emit_1.default(value), first, ...units);
        }
    }
}
exports.default = Route;
//# sourceMappingURL=route.js.map

/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_1 = __webpack_require__(14);
const token_1 = __webpack_require__(10);
const expect_1 = __webpack_require__(23);
const pattern_1 = __webpack_require__(12);
/**
 * Consumes all the given patterns and, in case of success, it will emit a new token into the current token list.
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
exports.default = Emit;
//# sourceMappingURL=emit.js.map

/***/ }),
/* 41 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const route_1 = __webpack_require__(13);
const pattern_1 = __webpack_require__(12);
const emit_1 = __webpack_require__(42);
/**
 * Produce a route to consume units and in case of success it emits a new node.
 */
class Route extends route_1.default {
    /**
     * Default constructor.
     * @param value Node value.
     * @param output Output node destination.
     * @param first Route pattern or the first unit.
     * @param units Route units.
     */
    constructor(value, output, first, ...units) {
        if (first instanceof pattern_1.default) {
            super(new emit_1.default(value, output, first), ...units);
        }
        else {
            super(new emit_1.default(value, output), first, ...units);
        }
    }
}
exports.default = Route;
//# sourceMappingURL=route.js.map

/***/ }),
/* 42 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_1 = __webpack_require__(14);
const node_1 = __webpack_require__(8);
const expect_1 = __webpack_require__(23);
const pattern_1 = __webpack_require__(12);
/**
 * Consumes all the given patterns and, in case of success, it will emit a new node as the next child of the current node.
 * Any working node in the current source output will be attached as the left child from the new node.
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
            const node = new node_1.default(source.fragment, table, result);
            node.setChild(this.#output, source.output.node);
            source.output.node = void 0;
            source.emit(node);
        }
        source.discardState();
        return status;
    }
}
exports.default = Emit;
//# sourceMappingURL=emit.js.map

/***/ }),
/* 43 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_1 = __webpack_require__(14);
const node_1 = __webpack_require__(8);
const expect_1 = __webpack_require__(23);
const pattern_1 = __webpack_require__(12);
/**
 * Consumes all the given patterns in this pattern and, in case of success,
 * it appends the resulting node in the current source output node.
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
                const child = new node_1.default(fragment, table, result);
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
exports.default = Append;
//# sourceMappingURL=append.js.map

/***/ }),
/* 44 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_1 = __webpack_require__(14);
const node_1 = __webpack_require__(8);
const expect_1 = __webpack_require__(23);
const pattern_1 = __webpack_require__(12);
/**
 * Consumes all the given patterns in this pattern and, in case of success,
 * it prepends the resulting node in the current source output node.
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
                const child = new node_1.default(fragment, table, result);
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
exports.default = Prepend;
//# sourceMappingURL=prepend.js.map

/***/ }),
/* 45 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_1 = __webpack_require__(14);
const node_1 = __webpack_require__(8);
const expect_1 = __webpack_require__(23);
const pattern_1 = __webpack_require__(12);
/**
 * Consumes all the given patterns in this pattern and, in case of success,
 * it pivots the resulting node by the current source output node.
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
                const child = new node_1.default(fragment, table, result);
                child.setChild(this.#output, output.node);
                child.setChild(this.#current, current);
                output.node = child;
            }
        }
        source.discardState();
        return status;
    }
}
exports.default = Pivot;
//# sourceMappingURL=pivot.js.map

/***/ }),
/* 46 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const pattern_1 = __webpack_require__(12);
const expect_1 = __webpack_require__(23);
/**
 * Consumes all the given patterns and, in case of success,
 * it places the resulting node into the current source output node.
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
exports.default = Place;
//# sourceMappingURL=place.js.map

/***/ }),
/* 47 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const route_1 = __webpack_require__(13);
const pattern_1 = __webpack_require__(12);
const emit_1 = __webpack_require__(48);
/**
 * Produce a route to consume units and in case of success it emits a new symbol record.
 */
class Route extends route_1.default {
    /**
     * Default constructor.
     * @param value Symbol value.
     * @param test Symbol pattern.
     * @param first Route pattern or the first unit.
     * @param units Route units.
     */
    constructor(value, test, first, ...units) {
        if (first instanceof pattern_1.default) {
            super(new emit_1.default(value, test, first), ...units);
        }
        else {
            super(new emit_1.default(value, test), first, ...units);
        }
    }
}
exports.default = Route;
//# sourceMappingURL=route.js.map

/***/ }),
/* 48 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_1 = __webpack_require__(14);
const record_1 = __webpack_require__(11);
const pattern_1 = __webpack_require__(12);
const expect_1 = __webpack_require__(23);
const error_1 = __webpack_require__(9);
/**
 * Consumes all the given patterns and, in case of success, it will emit a new symbol into the current symbol table.
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
                if (table.hasRecord(fragment)) {
                    const error = new error_1.default(fragment, 4096 /* DUPLICATE_IDENTIFIER */);
                    source.emit(error);
                }
                else {
                    const result = this.#value === base_1.default.Output ? value ?? -1 : this.#value;
                    const record = new record_1.default(fragment, node, result);
                    source.emit(record);
                }
            }
        }
        source.discardState();
        return status;
    }
}
exports.default = Emit;
//# sourceMappingURL=emit.js.map

/***/ }),
/* 49 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const pattern_1 = __webpack_require__(12);
const expect_1 = __webpack_require__(23);
/**
 * Consumes all the given patterns behind a new symbol table.
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
exports.default = Scope;
//# sourceMappingURL=scope.js.map

/***/ }),
/* 50 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Project = exports.TextCoder = exports.LiveCoder = exports.BaseCoder = exports.Maker = exports.Parser = exports.Lexer = void 0;
exports.Lexer = __webpack_require__(51);
exports.Parser = __webpack_require__(53);
exports.Maker = __webpack_require__(57);
var base_1 = __webpack_require__(81);
Object.defineProperty(exports, "BaseCoder", ({ enumerable: true, get: function () { return base_1.Base; } }));
var live_1 = __webpack_require__(82);
Object.defineProperty(exports, "LiveCoder", ({ enumerable: true, get: function () { return live_1.Live; } }));
var text_1 = __webpack_require__(83);
Object.defineProperty(exports, "TextCoder", ({ enumerable: true, get: function () { return text_1.Text; } }));
var project_1 = __webpack_require__(84);
Object.defineProperty(exports, "Project", ({ enumerable: true, get: function () { return project_1.Project; } }));
//# sourceMappingURL=index.js.map

/***/ }),
/* 51 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = exports.consumeText = void 0;
const Core = __webpack_require__(3);
const program_1 = __webpack_require__(52);
/**
 * Consume the specified text and produce a list of tokens for updating the given context.
 * @param text Input text.
 * @param context Output context.
 * @returns Returns true when the consumption was successful, false otherwise.
 */
const consumeText = (text, context) => {
    const source = new Core.TextSource(text, context);
    if (!program_1.Program.consume(source)) {
        context.errors.push(new Core.Error(source.fragment, 4097 /* UNEXPECTED_TOKEN */));
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
/* 52 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Program = void 0;
const Core = __webpack_require__(3);
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
 * Main lexer program.
 */
exports.Program = new Core.ExpectFlowPattern(new Core.OptFlowPattern(new Core.RepeatFlowPattern(new Core.ChooseFlowPattern(
// White space
new Core.ChooseUnitPattern(' ', '\t', '\v', '\f', '\r', '\n'), 
// Comment
new Core.ExpectFlowPattern(new Core.ExpectUnitPattern('/', '/'), new Core.OptFlowPattern(new Core.RepeatFlowPattern(new Core.ConditionFlowPattern(new Core.NotFlowPattern(new Core.ExpectUnitPattern('\n')), new Core.AnyUnitPattern())))), 
// Comment block
new Core.ExpectFlowPattern(new Core.ExpectUnitPattern('/', '*'), new Core.OptFlowPattern(new Core.RepeatFlowPattern(new Core.ConditionFlowPattern(new Core.NotFlowPattern(new Core.ExpectUnitPattern('*', '/')), new Core.AnyUnitPattern()))), new Core.ExpectUnitPattern('*', '/')), 
// Tokens
new Core.EmitTokenPattern(Core.TextSource.Output, new Core.ChooseFlowPattern(
// Keywords, Functions and Symbols
new Core.MapFlowPattern(new Core.SetValueRoute(103 /* Any */, end, 'a', 'n', 'y'), new Core.SetValueRoute(104 /* From */, end, 'f', 'r', 'o', 'm'), new Core.SetValueRoute(105 /* To */, end, 't', 'o'), new Core.SetValueRoute(110 /* Not */, end, 'n', 'o', 't'), new Core.SetValueRoute(111 /* Opt */, end, 'o', 'p', 't'), new Core.SetValueRoute(112 /* Repeat */, end, 'r', 'e', 'p', 'e', 'a', 't'), new Core.SetValueRoute(113 /* Place */, end, 'p', 'l', 'a', 'c', 'e'), new Core.SetValueRoute(116 /* Pivot */, end, 'p', 'i', 'v', 'o', 't'), new Core.SetValueRoute(114 /* Append */, end, 'a', 'p', 'p', 'e', 'n', 'd'), new Core.SetValueRoute(115 /* Prepend */, end, 'p', 'r', 'e', 'p', 'e', 'n', 'd'), new Core.SetValueRoute(117 /* Next */, end, 'n', 'e', 'x', 't'), new Core.SetValueRoute(118 /* Left */, end, 'l', 'e', 'f', 't'), new Core.SetValueRoute(119 /* Right */, end, 'r', 'i', 'g', 'h', 't'), new Core.SetValueRoute(120 /* Symbol */, end, 's', 'y', 'm', 'b', 'o', 'l'), new Core.SetValueRoute(121 /* Scope */, end, 's', 'c', 'o', 'p', 'e'), new Core.SetValueRoute(122 /* Error */, end, 'e', 'r', 'r', 'o', 'r'), new Core.SetValueRoute(123 /* Has */, end, 'h', 'a', 's'), new Core.SetValueRoute(124 /* Set */, end, 's', 'e', 't'), new Core.SetValueRoute(108 /* Or */, end, 'o', 'r'), new Core.SetValueRoute(109 /* And */, end, 'a', 'n', 'd'), new Core.SetValueRoute(106 /* Then */, end, 't', 'h', 'e', 'n'), new Core.SetValueRoute(107 /* Else */, end, 'e', 'l', 's', 'e'), new Core.SetValueRoute(125 /* Skip */, end, 's', 'k', 'i', 'p'), new Core.SetValueRoute(128 /* Alias */, end, 'a', 'l', 'i', 'a', 's'), new Core.SetValueRoute(126 /* Token */, end, 't', 'o', 'k', 'e', 'n'), new Core.SetValueRoute(127 /* Node */, end, 'n', 'o', 'd', 'e'), new Core.SetValueRoute(129 /* As */, end, 'a', 's'), new Core.SetValueRoute(103 /* Any */, '*'), new Core.SetValueRoute(108 /* Or */, '|'), new Core.SetValueRoute(109 /* And */, '&'), new Core.SetValueRoute(130 /* Semicolon */, ';'), new Core.SetValueRoute(131 /* OpenParentheses */, '('), new Core.SetValueRoute(132 /* CloseParentheses */, ')'), new Core.SetValueRoute(133 /* OpenChevron */, '<'), new Core.SetValueRoute(134 /* CloseChevron */, '>')), 
// Number
new Core.SetValuePattern(101 /* Number */, new Core.ChooseFlowPattern(new Core.ExpectUnitPattern('0'), new Core.ExpectFlowPattern(new Core.RangeUnitPattern('1', '9'), new Core.OptFlowPattern(new Core.RepeatFlowPattern(digit))))), 
// String
new Core.SetValuePattern(102 /* Alphabet */, new Core.ExpectUnitPattern("'"), new Core.RepeatFlowPattern(new Core.ConditionFlowPattern(new Core.ExpectUnitPattern('\\'), new Core.AnyUnitPattern(), new Core.ConditionFlowPattern(new Core.NotFlowPattern(new Core.ExpectUnitPattern("'")), new Core.AnyUnitPattern()))), new Core.ExpectUnitPattern("'")), 
// Identifier
new Core.SetValuePattern(100 /* Identifier */, new Core.ChooseFlowPattern(alpha, extra), new Core.OptFlowPattern(new Core.RepeatFlowPattern(word)))))))), new Core.EndFlowPattern());
//# sourceMappingURL=program.js.map

/***/ }),
/* 53 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = exports.consumeTokens = void 0;
const Core = __webpack_require__(3);
const program_1 = __webpack_require__(54);
/**
 * Consume the specified tokens and produce an AST for updating the given context.
 * @param tokens Input tokens.
 * @param context Output context.
 * @returns Returns true when the consumption was successful, false otherwise.
 */
const consumeTokens = (tokens, context) => {
    const source = new Core.TokenSource(tokens, context);
    if (!program_1.Program.consume(source)) {
        const fragment = tokens[source.longestState.offset]?.fragment ?? source.fragment;
        context.errors.push(new Core.Error(fragment, 4098 /* UNEXPECTED_SYNTAX */));
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
/* 54 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Program = void 0;
const Core = __webpack_require__(3);
const Lexer = __webpack_require__(51);
const binary_1 = __webpack_require__(55);
const unary_1 = __webpack_require__(56);
const identity = new Core.ExpectFlowPattern(new Core.ExpectUnitPattern(133 /* OpenChevron */), new Core.AppendNodePattern(202 /* Identity */, 0 /* Left */, 1 /* Right */, new Core.ExpectUnitPattern(101 /* Number */), new Core.ExpectUnitPattern(134 /* CloseChevron */)));
const expression = new Core.ExpectFlowPattern(
// Or expressions
new binary_1.default(new Core.MapFlowPattern(new Core.SetValueRoute(208 /* Or */, 108 /* Or */)), 
// And expressions
new binary_1.default(new Core.MapFlowPattern(new Core.SetValueRoute(209 /* And */, 109 /* And */)), 
// Unary operations
new unary_1.default(new Core.MapFlowPattern(new Core.SetValueRoute(210 /* Not */, 110 /* Not */), new Core.SetValueRoute(211 /* Opt */, 111 /* Opt */), new Core.SetValueRoute(212 /* Repeat */, 112 /* Repeat */), new Core.SetValueRoute(216 /* Place */, 113 /* Place */), new Core.SetValueRoute(225 /* Pivot */, 116 /* Pivot */), new Core.SetValueRoute(220 /* Append */, 114 /* Append */), new Core.SetValueRoute(224 /* Prepend */, 115 /* Prepend */), new Core.SetValueRoute(213 /* PlaceNext */, 113 /* Place */, 117 /* Next */), new Core.SetValueRoute(217 /* AppendNext */, 114 /* Append */, 117 /* Next */), new Core.SetValueRoute(221 /* PrependNext */, 115 /* Prepend */, 117 /* Next */), new Core.SetValueRoute(214 /* PlaceLeft */, 113 /* Place */, 118 /* Left */), new Core.SetValueRoute(218 /* AppendLeft */, 114 /* Append */, 118 /* Left */), new Core.SetValueRoute(222 /* PrependLeft */, 115 /* Prepend */, 118 /* Left */), new Core.SetValueRoute(215 /* PlaceRight */, 113 /* Place */, 119 /* Right */), new Core.SetValueRoute(219 /* AppendRight */, 114 /* Append */, 119 /* Right */), new Core.SetValueRoute(223 /* PrependRight */, 115 /* Prepend */, 119 /* Right */), new Core.SetValueRoute(226 /* Symbol */, 120 /* Symbol */), new Core.SetValueRoute(227 /* Scope */, 121 /* Scope */), new Core.SetValueRoute(228 /* Error */, identity, 122 /* Error */), new Core.SetValueRoute(229 /* Has */, identity, 123 /* Has */), new Core.SetValueRoute(230 /* Set */, identity, 124 /* Set */)), new Core.ChooseFlowPattern(
// Range
new Core.PlaceNodePattern(1 /* Right */, new Core.ExpectUnitPattern(104 /* From */), new Core.AppendNodePattern(203 /* Alphabet */, 1 /* Right */, 1 /* Right */, new Core.ExpectUnitPattern(102 /* Alphabet */)), new Core.PivotNodePattern(205 /* Range */, 1 /* Right */, 0 /* Left */, new Core.ExpectUnitPattern(105 /* To */), new Core.AppendNodePattern(203 /* Alphabet */, 1 /* Right */, 1 /* Right */, new Core.ExpectUnitPattern(102 /* Alphabet */)))), 
// Any, Alphabet & Reference
new Core.AppendNodePattern(Core.BaseSource.Output, 1 /* Right */, 1 /* Right */, new Core.MapFlowPattern(new Core.SetValueRoute(204 /* Any */, 103 /* Any */), new Core.SetValueRoute(203 /* Alphabet */, 102 /* Alphabet */), new Core.SetValueRoute(201 /* Reference */, 100 /* Identifier */))), 
// Group
new Core.PlaceNodePattern(1 /* Right */, new Core.ExpectFlowPattern(new Core.ExpectUnitPattern(131 /* OpenParentheses */), new Core.RunFlowPattern(() => expression), new Core.ExpectUnitPattern(132 /* CloseParentheses */))))))), 
// Condition
new Core.OptFlowPattern(new Core.PivotNodePattern(206 /* Then */, 1 /* Right */, 0 /* Left */, new Core.ExpectUnitPattern(106 /* Then */), new Core.RunFlowPattern(() => expression), new Core.OptFlowPattern(new Core.PivotNodePattern(207 /* Else */, 1 /* Right */, 0 /* Left */, new Core.ExpectUnitPattern(107 /* Else */), new Core.RunFlowPattern(() => expression))))));
const token = new Core.ExpectFlowPattern(new Core.OptFlowPattern(identity), new Core.EmitSymbolPattern(300 /* Token */, new Core.PivotNodePattern(200 /* Identifier */, 1 /* Right */, 0 /* Left */, new Core.ExpectUnitPattern(100 /* Identifier */)), new Core.ExpectUnitPattern(129 /* As */), new Core.PlaceNodePattern(1 /* Right */, expression)));
const node = new Core.ExpectFlowPattern(new Core.OptFlowPattern(identity), new Core.EmitSymbolPattern(301 /* Node */, new Core.PivotNodePattern(200 /* Identifier */, 1 /* Right */, 0 /* Left */, new Core.ExpectUnitPattern(100 /* Identifier */)), new Core.ExpectUnitPattern(129 /* As */), new Core.PlaceNodePattern(1 /* Right */, expression)));
/**
 * Main parser program.
 */
exports.Program = new Core.ExpectFlowPattern(new Core.OptFlowPattern(new Core.RepeatFlowPattern(new Core.ChooseFlowPattern(new Core.EmitNodePattern(Core.BaseSource.Output, 1 /* Right */, new Core.MapFlowPattern(new Core.SetValueRoute(231 /* Skip */, expression, 125 /* Skip */), new Core.SetValueRoute(233 /* Token */, token, 126 /* Token */), new Core.SetValueRoute(232 /* Node */, node, 127 /* Node */), new Core.SetValueRoute(235 /* AliasToken */, token, 128 /* Alias */, 126 /* Token */), new Core.SetValueRoute(234 /* AliasNode */, node, 128 /* Alias */, 127 /* Node */)), new Core.ExpectUnitPattern(130 /* Semicolon */))))), new Core.EndFlowPattern());
//# sourceMappingURL=program.js.map

/***/ }),
/* 55 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const Core = __webpack_require__(3);
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
     * @param operator Binary operator.
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
exports.default = Binary;
//# sourceMappingURL=binary.js.map

/***/ }),
/* 56 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const Core = __webpack_require__(3);
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
     * @param operator Unary operator.
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
exports.default = Unary;
//# sourceMappingURL=unary.js.map

/***/ }),
/* 57 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consumeNodes = void 0;
const Core = __webpack_require__(3);
const Parser = __webpack_require__(53);
const Skip = __webpack_require__(58);
const Token = __webpack_require__(79);
const Node = __webpack_require__(80);
/**
 * Get the identity from the specified node.
 * @param node Identifiable node.
 * @param identity Default identity.
 * @returns Returns the node identity.
 */
const getIdentity = (node, identity) => {
    if (node.left) {
        return parseInt(node.left.fragment.data);
    }
    return identity;
};
/**
 * Consume the specified node (organized as an AST) and produce output entries for updating the given project.
 * @param node Input node.
 * @param project Output project.
 * @returns Returns true when the consumption was successful, false otherwise.
 */
const consumeNodes = (node, project) => {
    const pointer = new Set();
    for (let counter = project.options.initialIdentity ?? 0; (node = node.next); counter++) {
        const current = node.right;
        let state;
        if (node.value === 231 /* Skip */) {
            state = Skip.consume(project, current, pointer, counter);
        }
        else {
            const identity = getIdentity(current, counter);
            switch (node.value) {
                case 233 /* Token */:
                    state = Token.consume(project, current, identity, pointer, counter, false);
                    break;
                case 235 /* AliasToken */:
                    state = Token.consume(project, current, identity, pointer, counter, true);
                    break;
                case 232 /* Node */:
                    state = Node.consume(project, current, identity, pointer, counter, false);
                    break;
                case 234 /* AliasNode */:
                    state = Node.consume(project, current, identity, pointer, counter, true);
                    break;
                default:
                    project.errors.push(new Core.Error(node.fragment, 4099 /* UNEXPECTED_NODE */));
            }
        }
        if (state) {
            counter = state.counter;
        }
    }
    return project.errors.length === 0;
};
exports.consumeNodes = consumeNodes;
//# sourceMappingURL=index.js.map

/***/ }),
/* 58 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const Expression = __webpack_require__(59);
/**
 * Consume the specified input node resolving its 'SKIP' pattern.
 * @param project Input project.
 * @param node Input node.
 * @param pointers Initial context pointers.
 * @param counter Initial context counter.
 * @returns Returns the consumption state.
 */
const consume = (project, node, pointers, counter) => {
    const state = { identity: counter, pointers, counter, type: 0 /* Skip */ };
    const entry = Expression.consume(project, node, state);
    if (entry) {
        project.skipEntries.add(counter, `SKIP${counter}`, entry, 0 /* Normal */);
    }
    return state;
};
exports.consume = consume;
//# sourceMappingURL=skip.js.map

/***/ }),
/* 59 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const Core = __webpack_require__(3);
const Parser = __webpack_require__(53);
const Condition = __webpack_require__(60);
const Or = __webpack_require__(61);
const And = __webpack_require__(64);
const Negate = __webpack_require__(65);
const Option = __webpack_require__(66);
const Repeat = __webpack_require__(67);
const Place = __webpack_require__(68);
const Pivot = __webpack_require__(69);
const Append = __webpack_require__(70);
const Prepend = __webpack_require__(71);
const Symbol = __webpack_require__(72);
const Scope = __webpack_require__(73);
const Error = __webpack_require__(74);
const Has = __webpack_require__(75);
const Set = __webpack_require__(76);
const Reference = __webpack_require__(77);
const Range = __webpack_require__(78);
const Alphabet = __webpack_require__(62);
/**
 * Consume the specified input node resolving its expression patterns.
 * It can also update the given project and context state during the consumption.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
 */
const consume = (project, node, state) => {
    switch (node.value) {
        case 201 /* Reference */:
            return Reference.consume(project, node, state);
        case 203 /* Alphabet */:
            return Alphabet.consume(project, node, state);
        case 204 /* Any */:
            return project.coder.getAny();
        case 205 /* Range */:
            return Range.consume(project, node, state);
        case 206 /* Then */:
            return Condition.consume(project, node, state);
        case 208 /* Or */:
            return Or.consume(project, node, state);
        case 209 /* And */:
            return And.consume(project, node, state);
        case 210 /* Not */:
            return Negate.consume(project, node, state);
        case 211 /* Opt */:
            return Option.consume(project, node, state);
        case 212 /* Repeat */:
            return Repeat.consume(project, node, state);
        case 216 /* Place */:
        case 215 /* PlaceRight */:
            return Place.consume(project, node, state, 1 /* Right */);
        case 213 /* PlaceNext */:
            return Place.consume(project, node, state, 2 /* Next */);
        case 214 /* PlaceLeft */:
            return Place.consume(project, node, state, 0 /* Left */);
        case 220 /* Append */:
        case 219 /* AppendRight */:
            return Append.consume(project, node, state, 1 /* Right */);
        case 217 /* AppendNext */:
            return Append.consume(project, node, state, 2 /* Next */);
        case 218 /* AppendLeft */:
            return Append.consume(project, node, state, 0 /* Left */);
        case 224 /* Prepend */:
        case 223 /* PrependRight */:
            return Prepend.consume(project, node, state, 1 /* Right */);
        case 221 /* PrependNext */:
            return Prepend.consume(project, node, state, 2 /* Next */);
        case 222 /* PrependLeft */:
            return Prepend.consume(project, node, state, 0 /* Left */);
        case 225 /* Pivot */:
            return Pivot.consume(project, node, state);
        case 226 /* Symbol */:
            return Symbol.consume(project, node, state);
        case 227 /* Scope */:
            return Scope.consume(project, node, state);
        case 228 /* Error */:
            return Error.consume(project, node, state);
        case 229 /* Has */:
            return Has.consume(project, node, state);
        case 230 /* Set */:
            return Set.consume(project, node, state);
        default:
            project.errors.push(new Core.Error(node.fragment, 4099 /* UNEXPECTED_NODE */));
    }
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=expression.js.map

/***/ }),
/* 60 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const Parser = __webpack_require__(53);
const Expression = __webpack_require__(59);
/**
 * Consume the specified input node resolving its condition pattern.
 * It can also update the given project and context state during the consumption.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
 */
const consume = (project, node, state) => {
    const test = Expression.consume(project, node.left, state);
    if (test) {
        const content = node.right;
        let success, failure;
        if (content.value === 207 /* Else */) {
            success = Expression.consume(project, content.left, state);
            failure = Expression.consume(project, content.right, state);
        }
        else {
            success = Expression.consume(project, content, state);
        }
        if (success) {
            return project.coder.getCondition(test, success, failure);
        }
    }
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=condition.js.map

/***/ }),
/* 61 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = exports.resolve = void 0;
const Parser = __webpack_require__(53);
const Alphabet = __webpack_require__(62);
const Expression = __webpack_require__(59);
/**
 * Merge all subsequent occurrences of the 'OR' pattern starting with the given input node.
 * It can also update the given project and context state during the consumption.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @param alphabet Output alphabet.
 * @param patterns Output patterns.
 * @returns Returns true when the merge consumption was successful, false otherwise.
 */
const merge = (project, node, state, alphabet, patterns) => {
    let result;
    if (node.value === 208 /* Or */) {
        if (node.right.value === 203 /* Alphabet */) {
            const result = Alphabet.resolve(project, state, node.right.fragment.data);
            if (result.length === 1) {
                alphabet.push(result);
                return merge(project, node.left, state, alphabet, patterns);
            }
        }
        const lhs = exports.resolve(project, node.left, state);
        const rhs = exports.resolve(project, node.right, state);
        if (!lhs || !rhs) {
            return false;
        }
        patterns.push(...lhs, ...rhs);
    }
    else {
        if (node.value === 203 /* Alphabet */) {
            const result = Alphabet.resolve(project, state, node.fragment.data);
            if (result.length === 1) {
                alphabet.push(result);
                return true;
            }
        }
        result = Expression.consume(project, node, state);
        if (!result) {
            return false;
        }
        patterns.push(result);
    }
    if (alphabet.length > 0) {
        patterns.push(project.coder.getChooseAlphabet(alphabet.reverse().flat()));
    }
    return true;
};
/**
 * Resolve the specified input node as an 'OR' pattern.
 * It can also update the given project and context state during the consumption.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns an array containing all rules or undefined when the pattern is invalid.
 */
const resolve = (project, node, state) => {
    const alphabet = [];
    const patterns = [];
    if (merge(project, node, state, alphabet, patterns)) {
        if (patterns.length > 0) {
            return patterns;
        }
        if (alphabet.length > 0) {
            return [project.coder.getChooseAlphabet(alphabet.reverse().flat())];
        }
    }
    return void 0;
};
exports.resolve = resolve;
/**
 * Consume the specified input node resolving its 'OR' rule.
 * It can also update the given project and state during the consumption.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns the consumption result or undefined when the rule is invalid.
 */
const consume = (project, node, state) => {
    const patterns = exports.resolve(project, node, state);
    if (patterns) {
        if (patterns.length > 1) {
            return project.coder.getChoose(...patterns);
        }
        return patterns[0];
    }
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=or.js.map

/***/ }),
/* 62 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = exports.resolve = void 0;
const String = __webpack_require__(63);
/**
 * Get the identity of the token that corresponds to the specified alphabet.
 * When there's no token matching the given alphabet, a new one will be created.
 * @param project Input project.
 * @param state Context state.
 * @param alphabet Alphabet value.
 * @returns Returns the corresponding token identity.
 */
const getTokenId = (project, state, alphabet) => {
    const token = project.tokenEntries.get(alphabet);
    if (!token) {
        const identity = state.counter++;
        const pattern = project.coder.getAlphabet([identity]);
        project.tokenEntries.add(identity, alphabet, pattern, 2 /* Loose */);
        return identity;
    }
    return token.identity;
};
/**
 * Resolve the specified input node as an alphabet pattern.
 * It can also update the given project and context state when a new token is created.
 * @param project Input project.
 * @param state Context state.
 * @param value Alphabet value.
 * @returns Returns the alphabet resolution which is a token identity or an escaped string.
 */
const resolve = (project, state, value) => {
    if (state.type === 2 /* Node */) {
        return [getTokenId(project, state, value)];
    }
    return String.extract(value).split('');
};
exports.resolve = resolve;
/**
 * Consume the specified input node resolving its alphabet patterns.
 * It can also update the given project and context state when a new token is created.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns the consumption result.
 */
const consume = (project, node, state) => {
    const name = node.fragment.data;
    const alphabet = exports.resolve(project, state, name);
    return project.coder.getAlphabet(alphabet);
};
exports.consume = consume;
//# sourceMappingURL=alphabet.js.map

/***/ }),
/* 63 */
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
const stripRegex = new RegExp(`(?:${charList.join('|').replaceAll('\\', '\\\\')})`, 'g');
/**
 * Strip slashes in the given input text.
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
 * Add slashes in the given input text.
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
 * Compose a string with the given text adding all necessary slashes.
 * @param text Input text.
 * @returns Returns the composed string.
 */
const compose = (value) => {
    return `'${addSlashes(value)}'`;
};
exports.compose = compose;
//# sourceMappingURL=string.js.map

/***/ }),
/* 64 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = exports.resolve = void 0;
const Parser = __webpack_require__(53);
const Alphabet = __webpack_require__(62);
const Expression = __webpack_require__(59);
/**
 * Merge all subsequent occurrences of the 'AND' pattern starting with the given input node.
 * It can also update the given project and context state during the consumption.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @param alphabet Output alphabet.
 * @param patterns Output patterns.
 * @returns Returns true when the merge consumption was successful, false otherwise.
 */
const merge = (project, node, state, alphabet, patterns) => {
    if (node.value === 209 /* And */) {
        if (node.right.value === 203 /* Alphabet */) {
            alphabet.push(Alphabet.resolve(project, state, node.right.fragment.data));
            return merge(project, node.left, state, alphabet, patterns);
        }
        const lhs = exports.resolve(project, node.left, state);
        const rhs = exports.resolve(project, node.right, state);
        if (!lhs || !rhs) {
            return false;
        }
        patterns.push(...lhs, ...rhs);
    }
    else {
        if (node.value === 203 /* Alphabet */) {
            alphabet.push(Alphabet.resolve(project, state, node.fragment.data));
            return true;
        }
        const result = Expression.consume(project, node, state);
        if (!result) {
            return false;
        }
        patterns.push(result);
    }
    if (alphabet.length > 0) {
        patterns.push(project.coder.getExpectAlphabet(alphabet.reverse().flat()));
    }
    return true;
};
/**
 * Resolve the specified input node as an 'AND' pattern.
 * It can also update the given project and context state during the consumption.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns an array containing all rules or undefined when the pattern is invalid.
 */
const resolve = (project, node, state) => {
    const alphabet = [];
    const patterns = [];
    if (merge(project, node, state, alphabet, patterns)) {
        if (patterns.length > 0) {
            return patterns;
        }
        if (alphabet.length > 0) {
            return [project.coder.getExpectAlphabet(alphabet.reverse().flat())];
        }
    }
    return void 0;
};
exports.resolve = resolve;
/**
 * Consume the specified input node resolving its 'AND' pattern.
 * It can also update the given project and context state during the consumption.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
 */
const consume = (project, node, state) => {
    const patterns = exports.resolve(project, node, state);
    if (patterns) {
        if (patterns.length > 1) {
            return project.coder.getExpect(...patterns);
        }
        return patterns[0];
    }
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=and.js.map

/***/ }),
/* 65 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const And = __webpack_require__(64);
/**
 * Consume the specified input node resolving its 'NOT' pattern.
 * It can also update the given project and context state during the consumption.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
 */
const consume = (project, node, state) => {
    const patterns = And.resolve(project, node.right, state);
    if (patterns) {
        return project.coder.getNegate(...patterns);
    }
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=not.js.map

/***/ }),
/* 66 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const And = __webpack_require__(64);
/**
 * Consume the specified input node resolving its 'OPTION' pattern.
 * It can also update the given project and context state during the consumption.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
 */
const consume = (project, node, state) => {
    const patterns = And.resolve(project, node.right, state);
    if (patterns) {
        return project.coder.getOption(...patterns);
    }
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=option.js.map

/***/ }),
/* 67 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const And = __webpack_require__(64);
/**
 * Consume the specified input node resolving its 'REPEAT' pattern.
 * It can also update the given project and context state during the consumption.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
 */
const consume = (project, node, state) => {
    const patterns = And.resolve(project, node.right, state);
    if (patterns) {
        return project.coder.getRepeat(...patterns);
    }
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=repeat.js.map

/***/ }),
/* 68 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const And = __webpack_require__(64);
/**
 * Consume the specified input node resolving its 'PLACE' pattern.
 * It can also update the given project and context state during the consumption.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @param direction Placed node direction.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
 */
const consume = (project, node, state, direction) => {
    const patterns = And.resolve(project, node.right, state);
    if (patterns) {
        return project.coder.getPlaceNode(direction, ...patterns);
    }
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=place.js.map

/***/ }),
/* 69 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const And = __webpack_require__(64);
/**
 * Consume the specified input node resolving its 'PIVOT' pattern.
 * It can also update the given project and context state during the consumption.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
 */
const consume = (project, node, state) => {
    const patterns = And.resolve(project, node.right, state);
    if (patterns) {
        return project.coder.getPivotNode(state.identity, patterns[0], ...patterns.slice(1));
    }
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=pivot.js.map

/***/ }),
/* 70 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const And = __webpack_require__(64);
/**
 * Consume the specified input node resolving its 'APPEND' pattern.
 * It can also update the given project and context state during the consumption.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @param direction Append direction.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
 */
const consume = (project, node, state, direction) => {
    const patterns = And.resolve(project, node.right, state);
    if (patterns) {
        return project.coder.getAppendNode(state.identity, direction, patterns[0], ...patterns.slice(1));
    }
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=append.js.map

/***/ }),
/* 71 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const And = __webpack_require__(64);
/**
 * Consume the specified input node resolving its 'PREPEND' pattern.
 * It can also update the given project and context state during the consumption.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @param direction Prepended node direction.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
 */
const consume = (project, node, state, direction) => {
    const patterns = And.resolve(project, node.right, state);
    if (patterns) {
        return project.coder.getPrependNode(state.identity, direction, patterns[0], ...patterns.slice(1));
    }
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=prepend.js.map

/***/ }),
/* 72 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const And = __webpack_require__(64);
/**
 * Consume the specified input node resolving its 'SYMBOL' pattern.
 * It can also update the given project and context state during the consumption.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
 */
const consume = (project, node, state) => {
    const patterns = And.resolve(project, node.right, state);
    if (patterns) {
        return project.coder.getSymbol(state.identity, patterns[0], ...patterns.slice(1));
    }
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=symbol.js.map

/***/ }),
/* 73 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const And = __webpack_require__(64);
/**
 * Consume the specified input node resolving its 'SCOPE' pattern.
 * It can also update the given project and context state during the consumption.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
 */
const consume = (project, node, state) => {
    const patterns = And.resolve(project, node.right, state);
    if (patterns) {
        return project.coder.getScopeSymbol(...patterns);
    }
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=scope.js.map

/***/ }),
/* 74 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const And = __webpack_require__(64);
/**
 * Consume the specified input node resolving its 'ERROR' pattern.
 * It can also update the given project and context state during the consumption.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
 */
const consume = (project, node, state) => {
    const param = node.right;
    const patterns = And.resolve(project, param.right, state);
    if (patterns) {
        const value = parseInt(param.fragment.data);
        return project.coder.getError(value, ...patterns);
    }
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=error.js.map

/***/ }),
/* 75 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const And = __webpack_require__(64);
/**
 * Consume the specified input node resolving its 'HAS' pattern.
 * It can also update the given project and context state during the consumption.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
 */
const consume = (project, node, state) => {
    const param = node.right;
    const patterns = And.resolve(project, param.right, state);
    if (patterns) {
        const value = parseInt(param.fragment.data);
        return project.coder.getHas(value, ...patterns);
    }
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=has.js.map

/***/ }),
/* 76 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const And = __webpack_require__(64);
/**
 * Consume the specified input node resolving its 'SET' pattern.
 * It can also update the given project and context state during the consumption.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
 */
const consume = (project, node, state) => {
    const param = node.right;
    const patterns = And.resolve(project, param.right, state);
    if (patterns) {
        const value = parseInt(param.fragment.data);
        return project.coder.getSet(value, ...patterns);
    }
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=set.js.map

/***/ }),
/* 77 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const Core = __webpack_require__(3);
const Parser = __webpack_require__(53);
/**
 * Resolve the corresponding reference for the specified symbol in a 'TOKEN' pattern context.
 * It can also update the given project and context state when a new pointer is created.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @param symbol Input symbol.
 * @returns Returns the corresponding reference pattern or undefined when the reference isn't valid.
 */
const resolveToken = (project, node, state, symbol) => {
    const name = node.fragment.data;
    if (symbol.value !== 300 /* Token */) {
        project.errors.push(new Core.Error(node.fragment, 4100 /* INVALID_NODE_REFERENCE */));
        return void 0;
    }
    if (state.pointers.has(name)) {
        return project.coder.getReference(project.tokenPointerEntries, name);
    }
    const token = project.tokenEntries.get(name);
    if (token) {
        project.tokenPointerEntries.add(token.identity, name, token.pattern, 0 /* Normal */);
    }
    state.pointers.add(name);
    return project.coder.getReference(project.tokenPointerEntries, name);
};
/**
 * Resolve the corresponding reference for the specified symbol in a 'NODE' pattern context.
 * It can also update the given project and context state when a new pointer is created.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @param symbol Input symbol.
 * @returns Returns the corresponding reference pattern or undefined when the reference isn't valid.
 */
const resolveNode = (project, node, state, symbol) => {
    const name = node.fragment.data;
    if (symbol.value === 301 /* Node */) {
        if (state.pointers.has(name)) {
            return project.coder.getReference(project.nodePointerEntries, name);
        }
        const node = project.nodeEntries.get(name);
        if (node) {
            project.nodePointerEntries.add(node.identity, name, node.pattern, 0 /* Normal */);
        }
        state.pointers.add(name);
        return project.coder.getReference(project.nodePointerEntries, name);
    }
    const token = project.tokenEntries.get(name);
    if (!token) {
        project.errors.push(new Core.Error(node.fragment, 4103 /* UNRESOLVED_TOKEN_REFERENCE */));
    }
    else {
        if (token.type !== 1 /* Alias */) {
            return project.coder.getAlphabet([token.identity]);
        }
        project.errors.push(new Core.Error(node.fragment, 4102 /* INVALID_ALIAS_TOKEN_REFERENCE */));
    }
    return void 0;
};
/**
 * Resolve the corresponding reference for the specified symbol in a 'SKIP' pattern context.
 * It can also update the given project and context state when a new pointer is created.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @param symbol Input symbol.
 * @returns Returns the corresponding reference pattern or undefined when the reference isn't valid.
 */
const resolveSkip = (project, node, state, symbol) => {
    const name = node.fragment.data;
    if (symbol.value === 301 /* Node */) {
        project.errors.push(new Core.Error(node.fragment, 4100 /* INVALID_NODE_REFERENCE */));
    }
    else {
        const token = project.tokenEntries.get(name);
        if (!token) {
            project.errors.push(new Core.Error(node.fragment, 4103 /* UNRESOLVED_TOKEN_REFERENCE */));
        }
        else {
            if (token.type === 1 /* Alias */) {
                if (state.pointers.has(name)) {
                    return project.coder.getReference(project.tokenPointerEntries, name);
                }
                state.pointers.add(name);
                project.tokenPointerEntries.add(token.identity, name, token.pattern, 0 /* Normal */);
                return project.coder.getReference(project.tokenPointerEntries, name);
            }
            project.errors.push(new Core.Error(node.fragment, 4101 /* INVALID_TOKEN_REFERENCE */));
        }
    }
    return void 0;
};
/**
 * Consume the specified input node resolving its reference pattern.
 * It can also update the given project and context state when a new pointer is created.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
 */
const consume = (project, node, state) => {
    const name = node.fragment.data;
    const symbol = node.table?.getRecord(name);
    if (symbol) {
        if (state.type === 1 /* Token */) {
            return resolveToken(project, node, state, symbol);
        }
        else if (state.type === 2 /* Node */) {
            return resolveNode(project, node, state, symbol);
        }
        else {
            return resolveSkip(project, node, state, symbol);
        }
    }
    project.errors.push(new Core.Error(node.fragment, 4104 /* UNDEFINED_IDENTIFIER */));
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=reference.js.map

/***/ }),
/* 78 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const String = __webpack_require__(63);
/**
 * Consume the specified input node resolving its alphabet range pattern.
 * It can also update the given project and context state when new tokens are created.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
 */
const consume = (project, node, state) => {
    const from = node.left.fragment.data;
    const to = node.right.fragment.data;
    const pattern = project.coder.getRange(String.extract(from), String.extract(to));
    if (state.type === 2 /* Node */) {
        const identity = state.counter++;
        const result = project.coder.getToken(identity, pattern);
        project.tokenEntries.add(identity, `${from}-${to}`, result, 0 /* Normal */);
        return project.coder.getAlphabet([identity]);
    }
    return pattern;
};
exports.consume = consume;
//# sourceMappingURL=range.js.map

/***/ }),
/* 79 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const Expression = __webpack_require__(59);
/**
 * Emit a new token entry into the given project.
 * @param project Input project.
 * @param identity Token identity.
 * @param name Token name.
 * @param pattern Token pattern.
 * @param type Token type.
 * @param ref Determines whether or not the node is referenced by another one.
 */
const emit = (project, identity, name, pattern, type, ref) => {
    if (ref) {
        const reference = project.coder.getReference(project.tokenPointerEntries, name);
        project.tokenPointerEntries.add(identity, name, pattern, 0 /* Normal */);
        project.tokenEntries.add(identity, name, reference, type);
    }
    else {
        project.tokenEntries.add(identity, name, pattern, type);
    }
};
/**
 * Consume the specified input node resolving its 'TOKEN' pattern.
 * @param project Input project.
 * @param node Input node.
 * @param identity Pattern identity.
 * @param pointer Initial context pointers.
 * @param counter Initial context counter.
 * @param alias Determines whether or not the token is an alias.
 * @returns Returns the consumption state.
 */
const consume = (project, node, identity, pointers, counter, alias) => {
    const state = { identity, pointers, counter, type: 1 /* Token */ };
    const entry = Expression.consume(project, node.right, state);
    if (entry) {
        const name = node.fragment.data;
        const referenced = pointers.has(name);
        if (alias) {
            emit(project, identity, name, entry, 1 /* Alias */, referenced);
        }
        else {
            const pattern = project.coder.getToken(identity, entry);
            emit(project, identity, name, pattern, 0 /* Normal */, referenced);
        }
    }
    return state;
};
exports.consume = consume;
//# sourceMappingURL=token.js.map

/***/ }),
/* 80 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const Core = __webpack_require__(3);
const Expression = __webpack_require__(59);
/**
 * Emit a new node entry into the given project.
 * @param project Input project.
 * @param identity Node identity.
 * @param name Node name.
 * @param pattern Node pattern.
 * @param type Node type.
 * @param ref Determines whether or not the node is referenced by another one.
 */
const emit = (project, identity, name, pattern, type, ref) => {
    if (ref) {
        const reference = project.coder.getReference(project.nodePointerEntries, name);
        project.nodePointerEntries.add(identity, name, pattern, 0 /* Normal */);
        project.nodeEntries.add(identity, name, reference, type);
    }
    else {
        project.nodeEntries.add(identity, name, pattern, type);
    }
};
/**
 * Consume the specified input node resolving its 'NODE' pattern.
 * @param project Input project.
 * @param node Input node.
 * @param identity Pattern identity.
 * @param pointers Initial context pointers.
 * @param counter Initial context counter.
 * @param alias Determines whether or not the node is an alias.
 * @returns Returns the consumption state.
 */
const consume = (project, node, identity, pointers, counter, alias) => {
    const state = { identity, pointers, counter, type: 2 /* Node */ };
    const entry = Expression.consume(project, node.right, state);
    if (entry) {
        const name = node.fragment.data;
        const referenced = pointers.has(name);
        if (alias) {
            emit(project, identity, name, entry, 1 /* Alias */, referenced);
        }
        else {
            const pattern = project.coder.getNode(identity, 1 /* Right */, entry);
            emit(project, identity, name, pattern, 0 /* Normal */, referenced);
        }
    }
    return state;
};
exports.consume = consume;
//# sourceMappingURL=node.js.map

/***/ }),
/* 81 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Base = void 0;
/**
 * Common interface for any kind of coder.
 */
class Base {
    /**
     * Should be implemented to return an entry pattern.
     * @param name Entry name.
     * @param pointers Entry pointers.
     * @param patterns Entry patterns.
     * @returns Should return the pattern.
     */
    getEntry(name, pointers, ...patterns) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return a route.
     * @param value Route value.
     * @param path Route path.
     * @returns Should return the route.
     */
    getRoute(value, path) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return a map pattern.
     * @param routes Map routes.
     * @returns Should return the pattern.
     */
    getMap(...routes) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return a token pattern.
     * @param identity Token identity.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    getToken(identity, ...patterns) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return a node pattern.
     * @param identity Node identity.
     * @param output Output node direction.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    getNode(identity, output, ...patterns) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return a condition pattern.
     * @param test Test pattern.
     * @param success Success pattern.
     * @param failure Failure pattern.
     * @returns Should return the pattern.
     */
    getCondition(test, success, failure) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return a choose pattern.
     * @param patterns Possible patterns.
     * @returns Should return the pattern.
     */
    getChoose(...patterns) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return a choose alphabet pattern.
     * @param alphabet Possible alphabet.
     * @returns Should return the pattern.
     */
    getChooseAlphabet(alphabet) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return an expect pattern.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    getExpect(...patterns) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return an expect unit pattern.
     * @param alphabet Expected alphabet.
     * @returns Should return the pattern.
     */
    getExpectAlphabet(alphabet) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return a negate pattern.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    getNegate(...patterns) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return an option pattern.
     * @param patterns Optional patterns.
     * @returns Should return the pattern.
     */
    getOption(...patterns) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return a repeat pattern.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    getRepeat(...patterns) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return a place node pattern.
     * @param current Current node destination.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    getPlaceNode(current, ...patterns) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return a pivot node pattern.
     * @param identity Node identity.
     * @param head Head pattern.
     * @param patterns Optional patterns.
     * @returns Should return the pattern.
     */
    getPivotNode(identity, pivot, ...patterns) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return an append node pattern.
     * @param identity Node identity.
     * @param current Current node destination.
     * @param head Head pattern.
     * @param patterns Optional patterns.
     * @returns Should return the pattern.
     */
    getAppendNode(identity, current, head, ...patterns) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return a prepend node pattern.
     * @param identity Node identity.
     * @param current Current node destination.
     * @param head Head pattern.
     * @param patterns Optional patterns.
     * @returns Should return the pattern.
     */
    getPrependNode(identity, current, head, ...patterns) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return a symbol pattern.
     * @param value Symbol value.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    getSymbol(value, symbol, ...patterns) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return a scope symbol pattern.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    getScopeSymbol(...patterns) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return an error pattern.
     * @param value Error value.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    getError(value, ...patterns) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return a has pattern.
     * @param state Expected state value.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    getHas(state, ...patterns) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return a set pattern.
     * @param state New state value.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    getSet(state, ...patterns) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return a reference pattern.
     * @param entries Pointer entries.
     * @param name Reference name.
     * @returns Should return the pattern.
     */
    getReference(entries, name) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return an any pattern.
     * @returns Should return the pattern.
     */
    getAny() {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return a range pattern.
     * @param from From the alphabet value.
     * @param to To alphabet value.
     * @returns Should return the pattern.
     */
    getRange(from, to) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return an alphabet pattern.
     * @param alphabet Input alphabet.
     * @returns Should return the pattern.
     */
    getAlphabet(alphabet) {
        throw "Method doesn't implemented.";
    }
}
exports.Base = Base;
//# sourceMappingURL=base.js.map

/***/ }),
/* 82 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Live = void 0;
const Core = __webpack_require__(3);
const base_1 = __webpack_require__(81);
/**
 * Generate a project output for running in memory.
 */
class Live extends base_1.Base {
    /**
     * Get a new entry pattern.
     * @param name Entry name.
     * @param pointers Entry pointers.
     * @param patterns Entry patterns.
     * @returns Returns the pattern.
     */
    getEntry(name, pointers, ...patterns) {
        return new Core.ExpectFlowPattern(new Core.OptFlowPattern(new Core.RepeatFlowPattern(new Core.ChooseFlowPattern(...patterns))), new Core.EndFlowPattern());
    }
    /**
     * Get a new route.
     * @param value Route value.
     * @param path Route path.
     * @returns Returns the route.
     */
    getRoute(value, path) {
        return new Core.Route(new Core.SetValuePattern(value), ...path);
    }
    /**
     * Get a new map pattern.
     * @param routes Map routes.
     * @returns Returns the pattern.
     */
    getMap(...routes) {
        return new Core.EmitTokenPattern(Core.BaseSource.Output, new Core.MapFlowPattern(...routes));
    }
    /**
     * Get a new token pattern.
     * @param identity Token identity.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getToken(identity, ...patterns) {
        return new Core.EmitTokenPattern(identity, ...patterns);
    }
    /**
     * Get a new node pattern.
     * @param identity Node identity.
     * @param output Output node direction.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getNode(identity, output, ...patterns) {
        return new Core.EmitNodePattern(identity, output, ...patterns);
    }
    /**
     * Get a new condition pattern.
     * @param test Test pattern.
     * @param success Success pattern.
     * @param failure Failure pattern.
     * @returns Returns the pattern.
     */
    getCondition(test, success, failure) {
        return new Core.ConditionFlowPattern(test, success, failure);
    }
    /**
     * Get a new choose pattern.
     * @param patterns Possible patterns.
     * @returns Returns the pattern.
     */
    getChoose(...patterns) {
        return new Core.ChooseFlowPattern(...patterns);
    }
    /**
     * Get a new choose alphabet pattern.
     * @param alphabet Possible alphabet.
     * @returns Returns the pattern.
     */
    getChooseAlphabet(alphabet) {
        return new Core.ChooseUnitPattern(...alphabet);
    }
    /**
     * Get a new expect pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getExpect(...patterns) {
        return new Core.ExpectFlowPattern(...patterns);
    }
    /**
     * Get a new expect alphabet pattern.
     * @param alphabet Expected alphabet.
     * @returns Returns the pattern.
     */
    getExpectAlphabet(alphabet) {
        return new Core.ExpectUnitPattern(...alphabet);
    }
    /**
     * Get a new negate pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getNegate(...patterns) {
        return new Core.NotFlowPattern(...patterns);
    }
    /**
     * get a new option pattern.
     * @param patterns Optional patterns.
     * @returns Returns the pattern.
     */
    getOption(...patterns) {
        return new Core.OptFlowPattern(...patterns);
    }
    /**
     * Get a new repeat pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getRepeat(...patterns) {
        return new Core.RepeatFlowPattern(...patterns);
    }
    /**
     * Get a new place node pattern.
     * @param current Current node destination.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getPlaceNode(current, ...patterns) {
        return new Core.PlaceNodePattern(current, ...patterns);
    }
    /**
     * Get a new pivot node pattern.
     * @param identity Node identity.
     * @param pivot Pivot pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getPivotNode(identity, pivot, ...patterns) {
        return new Core.PivotNodePattern(identity, 1 /* Right */, 0 /* Left */, pivot, ...patterns);
    }
    /**
     * Get a new append node pattern.
     * @param identity Node identity.
     * @param current Current node destination.
     * @param head Head pattern.
     * @param patterns Optional patterns.
     * @returns Returns the pattern.
     */
    getAppendNode(identity, current, head, ...patterns) {
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
    getPrependNode(identity, current, head, ...patterns) {
        return new Core.PrependNodePattern(identity, 1 /* Right */, current, head, ...patterns);
    }
    /**
     * Get a new symbol pattern.
     * @param identity Symbol identity.
     * @param symbol Symbol pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getSymbol(identity, symbol, ...patterns) {
        return new Core.EmitSymbolPattern(identity, symbol, ...patterns);
    }
    /**
     * Get a new scope symbol pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getScopeSymbol(...patterns) {
        return new Core.ScopeSymbolPattern(...patterns);
    }
    /**
     * Get a new error pattern.
     * @param value Error value.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getError(value, ...patterns) {
        return new Core.EmitErrorPattern(value, ...patterns);
    }
    /**
     * Get a new has pattern.
     * @param state Expected state value.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getHas(state, ...patterns) {
        return new Core.HasStatePattern(state, ...patterns);
    }
    /**
     * Get a new set pattern.
     * @param state New state value.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getSet(state, ...patterns) {
        return new Core.SetStatePattern(state, ...patterns);
    }
    /**
     * Get a new reference pattern.
     * @param entries Pointer entries.
     * @param name Reference name.
     * @returns Returns the pattern.
     */
    getReference(entries, name) {
        const pointer = entries.get(name);
        if (!pointer) {
            return new Core.RunFlowPattern(() => entries.get(name).pattern);
        }
        return pointer.pattern;
    }
    /**
     * Get a new any pattern.
     * @returns Returns the pattern.
     */
    getAny() {
        return new Core.AnyUnitPattern();
    }
    /**
     * Get a new range pattern.
     * @param from From alphabet value.
     * @param to To alphabet value.
     * @returns Returns the pattern.
     */
    getRange(from, to) {
        return new Core.RangeUnitPattern(from, to);
    }
    /**
     * Get a new alphabet pattern.
     * @param alphabet Input alphabet.
     * @returns Returns the alphabet pattern.
     */
    getAlphabet(alphabet) {
        return new Core.ExpectUnitPattern(...alphabet);
    }
}
exports.Live = Live;
//# sourceMappingURL=live.js.map

/***/ }),
/* 83 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Text = void 0;
const Core = __webpack_require__(3);
const String = __webpack_require__(63);
const base_1 = __webpack_require__(81);
/**
 * Can generate a project output to be saved as a JavaScript source.
 */
class Text extends base_1.Base {
    /**
     * Get alphabet units.
     * @param alphabet Input alphabet.
     * @returns Returns the alphabet units.
     */
    #getUnits(alphabet) {
        return alphabet.map((unit) => (typeof unit !== 'number' ? String.compose(unit) : unit));
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
     * Get a new pointer entry.
     * @param name Pointer entry name.
     * @param pattern Pointer entry pattern.
     * @returns Returns the pointer entry.
     */
    #getPointerEntry(name, pattern) {
        return `const ${name} = ${pattern};`;
    }
    /**
     * Get a new export entry.
     * @param name Export entry name.
     * @param pattern Export entry pattern.
     * @returns Returns the export entry.
     */
    #getExportEntry(name, pattern) {
        return `exports.${name} = ${pattern};`;
    }
    /**
     * Get a new entry pattern.
     * @param name Entry name.
     * @param pointers Entry pointers.
     * @param patterns Entry patterns.
     * @returns Returns the pattern.
     */
    getEntry(name, pointers, ...patterns) {
        const deps = pointers.map((entry) => this.#getPointerEntry(entry.name, entry.pattern)).join('');
        return (deps +
            this.#getExportEntry(name, this.#getPattern('ExpectFlowPattern', this.#getPattern('OptFlowPattern', this.#getPattern('RepeatFlowPattern', this.#getPattern('ChooseFlowPattern', ...patterns))), this.#getPattern('EndFlowPattern'))));
    }
    /**
     * Get a new route.
     * @param value Route value.
     * @param path Route path.
     * @returns Returns the route.
     */
    getRoute(value, path) {
        return this.#getPattern('SetValueRoute', value, ...this.#getUnits(path));
    }
    /**
     * Get a new map pattern.
     * @param routes Map routes.
     * @returns Returns the pattern.
     */
    getMap(...routes) {
        return this.#getPattern('EmitTokenPattern', Core.BaseSource.Output, this.#getPattern('MapFlowPattern', ...routes));
    }
    /**
     * Get a new token pattern.
     * @param identity Token identity.
     * @param patterns Token patterns.
     * @returns Returns the pattern.
     */
    getToken(identity, ...patterns) {
        return this.#getPattern('EmitTokenPattern', identity, ...patterns);
    }
    /**
     * Get a new node pattern.
     * @param identity Node identity.
     * @param output Output node direction.
     * @param patterns Node patterns.
     * @returns Returns the pattern.
     */
    getNode(identity, output, ...patterns) {
        return this.#getPattern('EmitNodePattern', identity, output, ...patterns);
    }
    /**
     * Get a new condition pattern.
     * @param test Test pattern.
     * @param success Success pattern.
     * @param failure Failure pattern.
     * @returns Returns the pattern.
     */
    getCondition(test, success, failure) {
        return this.#getPattern('ConditionFlowPattern', ...(failure ? [test, success, failure] : [test, success]));
    }
    /**
     * Get a new choose pattern.
     * @param patterns Possible patterns.
     * @returns Returns the pattern.
     */
    getChoose(...patterns) {
        return this.#getPattern('ChooseFlowPattern', ...patterns);
    }
    /**
     * Should be implemented to return a choose alphabet pattern.
     * @param alphabet Possible alphabet.
     * @returns Should return the pattern.
     */
    getChooseAlphabet(alphabet) {
        return this.#getPattern('ChooseUnitPattern', ...this.#getUnits(alphabet));
    }
    /**
     * Get a new expect pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getExpect(...patterns) {
        return this.#getPattern('ExpectFlowPattern', ...patterns);
    }
    /**
     * Get a new expect alphabet pattern.
     * @param alphabet Expected alphabet.
     * @returns Returns the pattern.
     */
    getExpectAlphabet(alphabet) {
        return this.#getPattern('ExpectUnitPattern', ...this.#getUnits(alphabet));
    }
    /**
     * Get a new negate pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getNegate(...patterns) {
        return this.#getPattern('NotFlowPattern', ...patterns);
    }
    /**
     * get a new option pattern.
     * @param patterns Optional patterns.
     * @returns Returns the pattern.
     */
    getOption(...patterns) {
        return this.#getPattern('OptFlowPattern', ...patterns);
    }
    /**
     * Get a new repeat pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getRepeat(...patterns) {
        return this.#getPattern('RepeatFlowPattern', ...patterns);
    }
    /**
     * Get a new pivot node pattern.
     * @param identity Node identity.
     * @param pivot Pivot pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getPivotNode(identity, pivot, ...patterns) {
        return this.#getPattern('PivotNodePattern', identity, 1 /* Right */, 0 /* Left */, pivot, ...patterns);
    }
    /**
     * Get a new place node pattern.
     * @param current Current node destination.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getPlaceNode(current, ...patterns) {
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
    getAppendNode(identity, current, head, ...patterns) {
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
    getPrependNode(identity, current, head, ...patterns) {
        return this.#getPattern('PrependNodePattern', identity, 1 /* Right */, current, head, ...patterns);
    }
    /**
     * Get a new symbol pattern.
     * @param identity Symbol identity.
     * @param symbol Symbol pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getSymbol(identity, symbol, ...patterns) {
        return this.#getPattern('EmitSymbolPattern', identity, symbol, ...patterns);
    }
    /**
     * Get a new scope symbol pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getScopeSymbol(...patterns) {
        return this.#getPattern('ScopeSymbolPattern', ...patterns);
    }
    /**
     * Get a new error pattern.
     * @param value Error value.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getError(value, ...patterns) {
        return this.#getPattern('EmitErrorPattern', value, ...patterns);
    }
    /**
     * Get a new has pattern.
     * @param state Expected state value.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getHas(state, ...patterns) {
        return this.#getPattern('HasStatePattern', state, ...patterns);
    }
    /**
     * Get a new set pattern.
     * @param state New state value.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getSet(state, ...patterns) {
        return this.#getPattern('SetStatePattern', state, ...patterns);
    }
    /**
     * Get a new reference pattern.
     * @param entries Pointer entries.
     * @param name Reference name.
     * @returns Returns the pattern.
     */
    getReference(entries, name) {
        if (!entries.has(name)) {
            return this.#getPattern('RunFlowPattern', `() => ${name}`);
        }
        return name;
    }
    /**
     * Get a new any pattern.
     * @returns Returns the pattern.
     */
    getAny() {
        return this.#getPattern('AnyUnitPattern');
    }
    /**
     * Get a new range pattern.
     * @param from From alphabet value.
     * @param to To alphabet value.
     * @returns Returns the pattern.
     */
    getRange(from, to) {
        return this.#getPattern('RangeUnitPattern', ...this.#getUnits([from, to]));
    }
    /**
     * Get a new alphabet pattern.
     * @param alphabet Input alphabet.
     * @returns Returns the alphabet pattern.
     */
    getAlphabet(alphabet) {
        return this.#getPattern('ExpectUnitPattern', ...this.#getUnits(alphabet));
    }
}
exports.Text = Text;
//# sourceMappingURL=text.js.map

/***/ }),
/* 84 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Project = void 0;
const String = __webpack_require__(63);
const Entries = __webpack_require__(85);
/**
 * Store the project entries, errors and options during the making process.
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
     * Get an array of patterns from the the specified patterns entry aggregator.
     * @param entries Patterns entry aggregator.
     * @returns Returns the array of patterns.
     */
    #getPatterns(entries) {
        return entries.map((entry) => entry.pattern);
    }
    /**
     * Get an array of routes from the specified patterns entry aggregator.
     * @param entries Patterns entry aggregator.
     * @returns Returns the array of routes.
     */
    #getRoutes(entries) {
        return entries.map((entry) => this.#coder.getRoute(entry.identity, String.extract(entry.name).split('')));
    }
    /**
     * Get an array of pointers entry from the patterns of the specified pointers entry aggregator.
     * @param entries Pointers entries aggregator.
     * @returns Returns the array of pointers entry.
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
     * Get the skip entries.
     */
    get skipEntries() {
        return this.#skipEntries;
    }
    /**
     * Get the token entries.
     */
    get tokenEntries() {
        return this.#tokenEntries;
    }
    /**
     * Get the token pointer entries.
     */
    get tokenPointerEntries() {
        return this.#tokenPointerEntries;
    }
    /**
     * Get the node entries.
     */
    get nodeEntries() {
        return this.#nodeEntries;
    }
    /**
     * Get the node pointer entries.
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

/***/ }),
/* 85 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Aggregator = void 0;
/**
 * Aggregate pattern entries during the making process.
 */
class Aggregator {
    /**
     * Entries map.
     */
    #map = {};
    /**
     * Get all patterns.
     */
    get patterns() {
        return Object.values(this.#map).filter((entry) => entry.type === 0 /* Normal */);
    }
    /**
     * Get all alias patterns.
     */
    get aliasPatterns() {
        return Object.values(this.#map).filter((entry) => entry.type === 1 /* Alias */);
    }
    /**
     * Get all loose patterns.
     */
    get loosePatterns() {
        return Object.values(this.#map).filter((entry) => entry.type === 2 /* Loose */);
    }
    /**
     * Determines whether or not the aggregator contains an entry with the given name.
     * @param name Pattern entry name.
     * @returns Returns true when the specified entry exists, false otherwise.
     */
    has(name) {
        return this.#map[name] !== void 0;
    }
    /**
     * Get the entry that correspond to the given name.
     * @param name Pattern entry name.
     * @returns Returns the corresponding entry or undefined when it doesn't exists.
     */
    get(name) {
        return this.#map[name];
    }
    /**
     * Add a new pattern entry.
     * @param identity Entry identity.
     * @param name Entry name.
     * @param pattern Entry patterns.
     * @param type Entry type.
     * @throws Throws an error when the specified entry already exists.
     */
    add(identity, name, pattern, type) {
        if (this.#map[name]) {
            throw `Pattern entry '${name}' already exists.`;
        }
        this.#map[name] = {
            identity,
            name,
            pattern,
            type
        };
    }
}
exports.Aggregator = Aggregator;
//# sourceMappingURL=entries.js.map

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
const Diagnostics = __webpack_require__(2);
/**
 * Returns a new disposable for detecting editor changes and update the given diagnostics collection.
 * @param collection Diagnostics collection.
 * @returns Returns the disposable.
 */
const detectEditorChanges = (collection) => {
    return VSCode.window.onDidChangeActiveTextEditor((editor) => {
        if (editor) {
            Diagnostics.update(editor.document, collection);
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
        Diagnostics.update(event.document, collection);
    });
};
/**
 * Called when the extension is activated.
 * @param context VSCode context.
 */
function activate(context) {
    const collection = VSCode.languages.createDiagnosticCollection('xcheme');
    context.subscriptions.push(detectTextChanges(collection), detectEditorChanges(collection));
    if (VSCode.window.activeTextEditor) {
        Diagnostics.update(VSCode.window.activeTextEditor.document, collection);
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