#! /usr/bin/env node

/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getFlags = void 0;
/**
 * Load all the flags based on the given input arguments.
 * @param args Input arguments.
 * @returns Returns the flags state.
 */
const getFlags = (args) => {
    const flags = { debug: {} };
    for (let index = 0; index < args.length; index++) {
        const option = args[index];
        switch (option) {
            case '-h':
            case '--help':
                flags.help = true;
                return flags;
            case '-v':
            case '--version':
                flags.version = true;
                return flags;
            case '-s':
            case '--source':
                flags.source = args[++index];
                break;
            case '-t':
            case '--target':
                flags.target = args[++index];
                break;
            case '--run':
                flags.run = true;
                break;
            case '--tokens':
                flags.debug.tokens = true;
                break;
            case '--symbols':
                flags.debug.symbols = true;
                break;
            case '--nodes':
                flags.debug.nodes = true;
                break;
            default:
                throw `Option '${option}' is not supported.`;
        }
    }
    return flags;
};
exports.getFlags = getFlags;


/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.print = void 0;
const Console = __webpack_require__(3);
const Version = __webpack_require__(4);
/**
 * Print the help usage.
 */
const print = () => {
    Console.printLine(`Version ${Version.Number}`);
    Console.printLine('Syntax:   xcm [options]');
    Console.printLine('');
    Console.printLine('Examples: xcm -i source.xcm');
    Console.printLine('          xcm -i source.xcm -o parser.js');
    Console.printLine('');
    Console.printLine('Options:');
    Console.printLine('  -h, --help       Show this help.');
    Console.printLine('  -v, --version    Print the version.');
    Console.printLine('  -s, --source     Source file location (Default is stdin).');
    Console.printLine('  -t, --target     Target file location (Default is stdout).');
    Console.printLine('  --run            Run the resulting project in the target file.');
    Console.printLine('  --tokens         Print a list containing all the resulting tokens.');
    Console.printLine('  --symbols        Print a table containing all the resulting symbols.');
    Console.printLine('  --nodes          Print a ternary tree containing all the resulting nodes.');
    Console.printLine('');
};
exports.print = print;


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.printLine = exports.writeLine = exports.clearLine = void 0;
/**
 * Clear the current line.
 */
const clearLine = () => {
    if (process.stdout.isTTY) {
        process.stdout.moveCursor(0, -1);
        process.stdout.clearLine(1);
    }
};
exports.clearLine = clearLine;
/**
 * Write the specified message into stdout.
 * @param message Input message.
 */
const writeLine = (message) => {
    process.stdout.write(message);
};
exports.writeLine = writeLine;
/**
 * Print the specified message into stdout.
 * @param message Input message.
 */
const printLine = (message) => {
    process.stdout.write(`${message}\n`);
};
exports.printLine = printLine;


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Number = void 0;
const json = __webpack_require__(5);
/**
 * Current version number.
 */
exports.Number = json?.version ?? '0.0.0';


/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = JSON.parse('{"name":"@xcheme/cli","version":"0.0.4","description":"Command Line Interface.","license":"MIT","keywords":["xcheme","lang","cli"],"repository":{"type":"git","url":"git+https://github.com/balmanth/xcheme.git","directory":"packages/cli"},"main":"bin/xcm.js","bin":{"xcm":"./bin/xcm.js"},"scripts":{"prepublishOnly":"npm run package","clean":"tsc --build --clean ./tsconfig.json","build":"webpack","watch":"webpack --watch","package":"webpack --mode production --devtool hidden-source-map"},"devDependencies":{"ts-loader":"^9.2.5","typescript":"^4.3.5","webpack":"^5.51.1","webpack-cli":"^4.8.0","webpack-shebang-plugin":"^1.1.6"},"dependencies":{"@xcheme/core":"^0.0.4","@xcheme/lang":"^0.0.4"}}');

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.print = void 0;
const Version = __webpack_require__(4);
/**
 * Print the current version.
 */
const print = () => {
    console.log(Version.Number);
};
exports.print = print;


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.perform = void 0;
const FS = __webpack_require__(8);
const Core = __webpack_require__(9);
const Lang = __webpack_require__(60);
const Lexer = __webpack_require__(123);
const Parser = __webpack_require__(126);
const Console = __webpack_require__(3);
const Errors = __webpack_require__(129);
/**
 * Global language options.
 */
const globalOptions = {
    rootPath: process.cwd(),
    initialIdentity: 0,
    loadFileHook: (file) => {
        if (FS.existsSync(file)) {
            return FS.readFileSync(file, { encoding: 'utf-8' });
        }
        return void 0;
    }
};
/**
 * Generate a new optimized project based on the specified input nodes.
 * @param project Input project.
 * @param node Input node.
 * @returns Returns true in case of success, false otherwise.
 */
const optimize = (project, node) => {
    Console.printLine('Optimizing...');
    if (Lang.Optimizer.consumeNodes(node, project)) {
        Console.clearLine();
        return true;
    }
    Errors.print(project.errors);
    return false;
};
/**
 * Make a new project based on the specified input nodes.
 * @param project Input project.
 * @param node Input node.
 * @returns Returns true in case of success, false otherwise.
 */
const make = (project, node) => {
    Console.printLine('Making...');
    if (Lang.Maker.consumeNodes(node, project)) {
        Console.clearLine();
        return true;
    }
    Errors.print(project.errors);
    return false;
};
/**
 * Test the given project consuming the specified source.
 * @param project Input project.
 * @param source Input source.
 * @param state Debug state.
 * @returns Returns true in case of success, otherwise returns false.
 */
const test = (project, source, state) => {
    const context = new Core.Context('runner');
    if (Lexer.tokenize(project.lexer, source, context, state.tokens)) {
        if (Parser.parse(project.parser, context.tokens, context, state.symbols, state.nodes)) {
            Console.printLine('Done!');
            return true;
        }
    }
    Errors.print(context.errors);
    return false;
};
/**
 * Save the given project in the specified path.
 * @param project Input project.
 * @param path Output file path.
 */
const save = (project, path) => {
    const lib = "const Core = require('@xcheme/core');";
    FS.writeFileSync(path, `${lib}\n${project.lexer}\n${project.parser}\n`);
    if (path !== 1) {
        Console.printLine('Done!');
    }
};
/**
 * Make a new output for the given input file.
 * @param source Source file.
 * @param target Target file.
 * @param run Determines whether or not the project should consume the target.
 * @param state Debug state options.
 * @returns Returns true in case of success, false otherwise.
 */
const perform = (source, target, run, state) => {
    const text = FS.readFileSync(source).toString();
    const context = new Core.Context('maker');
    if (Lexer.tokenize(Lang.Lexer, text, context, !run && state.tokens)) {
        if (Parser.parse(Lang.Parser, context.tokens, context, !run && state.symbols, !run && state.nodes)) {
            const path = source.toString();
            if (run) {
                const project = new Lang.Project.Context(path, new Lang.LiveCoder(), globalOptions);
                if (optimize(project, context.node) && make(project, context.node)) {
                    const content = FS.readFileSync(target).toString();
                    test(project, content, state);
                    return true;
                }
            }
            else {
                const project = new Lang.Project.Context(path, new Lang.TextCoder(), globalOptions);
                if (optimize(project, context.node) && make(project, context.node)) {
                    save(project, target);
                    return true;
                }
            }
        }
    }
    Errors.print(context.errors);
    return false;
};
exports.perform = perform;


/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("fs");

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UncaseTransformPattern = exports.ScopeSymbolPattern = exports.EmitSymbolPattern = exports.EmitSymbolRoute = exports.PlaceNodePattern = exports.PivotNodePattern = exports.PrependNodePattern = exports.AppendNodePattern = exports.EmitNodePattern = exports.EmitNodeRoute = exports.EmitTokenPattern = exports.EmitTokenRoute = exports.EmitErrorPattern = exports.EmitErrorRoute = exports.SetStatePattern = exports.HasStatePattern = exports.SetStateRoute = exports.SetValuePattern = exports.SetValueRoute = exports.MapFlowPattern = exports.StaticFlowPattern = exports.RepeatFlowPattern = exports.OptFlowPattern = exports.NotFlowPattern = exports.EndFlowPattern = exports.ExpectFlowPattern = exports.RunFlowPattern = exports.ConditionFlowPattern = exports.ChooseFlowPattern = exports.FlowRoute = exports.RangeUnitPattern = exports.ExpectUnitPattern = exports.ChooseUnitPattern = exports.AnyUnitPattern = exports.UnitRoute = exports.TokenSource = exports.TextSource = exports.BaseSource = exports.Route = exports.Pattern = exports.Location = exports.Fragment = exports.Record = exports.Table = exports.Token = exports.Node = exports.Error = exports.Context = void 0;
var context_1 = __webpack_require__(10);
Object.defineProperty(exports, "Context", ({ enumerable: true, get: function () { return context_1.default; } }));
var error_1 = __webpack_require__(11);
Object.defineProperty(exports, "Error", ({ enumerable: true, get: function () { return error_1.default; } }));
var node_1 = __webpack_require__(16);
Object.defineProperty(exports, "Node", ({ enumerable: true, get: function () { return node_1.default; } }));
var token_1 = __webpack_require__(17);
Object.defineProperty(exports, "Token", ({ enumerable: true, get: function () { return token_1.default; } }));
var table_1 = __webpack_require__(15);
Object.defineProperty(exports, "Table", ({ enumerable: true, get: function () { return table_1.default; } }));
var record_1 = __webpack_require__(18);
Object.defineProperty(exports, "Record", ({ enumerable: true, get: function () { return record_1.default; } }));
var fragment_1 = __webpack_require__(12);
Object.defineProperty(exports, "Fragment", ({ enumerable: true, get: function () { return fragment_1.default; } }));
var location_1 = __webpack_require__(13);
Object.defineProperty(exports, "Location", ({ enumerable: true, get: function () { return location_1.default; } }));
var pattern_1 = __webpack_require__(19);
Object.defineProperty(exports, "Pattern", ({ enumerable: true, get: function () { return pattern_1.default; } }));
var route_1 = __webpack_require__(20);
Object.defineProperty(exports, "Route", ({ enumerable: true, get: function () { return route_1.default; } }));
var base_1 = __webpack_require__(21);
Object.defineProperty(exports, "BaseSource", ({ enumerable: true, get: function () { return base_1.default; } }));
var text_1 = __webpack_require__(22);
Object.defineProperty(exports, "TextSource", ({ enumerable: true, get: function () { return text_1.default; } }));
var token_2 = __webpack_require__(23);
Object.defineProperty(exports, "TokenSource", ({ enumerable: true, get: function () { return token_2.default; } }));
var route_2 = __webpack_require__(24);
Object.defineProperty(exports, "UnitRoute", ({ enumerable: true, get: function () { return route_2.default; } }));
var any_1 = __webpack_require__(25);
Object.defineProperty(exports, "AnyUnitPattern", ({ enumerable: true, get: function () { return any_1.default; } }));
var choose_1 = __webpack_require__(26);
Object.defineProperty(exports, "ChooseUnitPattern", ({ enumerable: true, get: function () { return choose_1.default; } }));
var expect_1 = __webpack_require__(29);
Object.defineProperty(exports, "ExpectUnitPattern", ({ enumerable: true, get: function () { return expect_1.default; } }));
var range_1 = __webpack_require__(30);
Object.defineProperty(exports, "RangeUnitPattern", ({ enumerable: true, get: function () { return range_1.default; } }));
var route_3 = __webpack_require__(31);
Object.defineProperty(exports, "FlowRoute", ({ enumerable: true, get: function () { return route_3.default; } }));
var choose_2 = __webpack_require__(32);
Object.defineProperty(exports, "ChooseFlowPattern", ({ enumerable: true, get: function () { return choose_2.default; } }));
var condition_1 = __webpack_require__(34);
Object.defineProperty(exports, "ConditionFlowPattern", ({ enumerable: true, get: function () { return condition_1.default; } }));
var run_1 = __webpack_require__(35);
Object.defineProperty(exports, "RunFlowPattern", ({ enumerable: true, get: function () { return run_1.default; } }));
var expect_2 = __webpack_require__(28);
Object.defineProperty(exports, "ExpectFlowPattern", ({ enumerable: true, get: function () { return expect_2.default; } }));
var end_1 = __webpack_require__(36);
Object.defineProperty(exports, "EndFlowPattern", ({ enumerable: true, get: function () { return end_1.default; } }));
var not_1 = __webpack_require__(37);
Object.defineProperty(exports, "NotFlowPattern", ({ enumerable: true, get: function () { return not_1.default; } }));
var opt_1 = __webpack_require__(38);
Object.defineProperty(exports, "OptFlowPattern", ({ enumerable: true, get: function () { return opt_1.default; } }));
var repeat_1 = __webpack_require__(39);
Object.defineProperty(exports, "RepeatFlowPattern", ({ enumerable: true, get: function () { return repeat_1.default; } }));
var static_1 = __webpack_require__(40);
Object.defineProperty(exports, "StaticFlowPattern", ({ enumerable: true, get: function () { return static_1.default; } }));
var map_1 = __webpack_require__(41);
Object.defineProperty(exports, "MapFlowPattern", ({ enumerable: true, get: function () { return map_1.default; } }));
var route_4 = __webpack_require__(42);
Object.defineProperty(exports, "SetValueRoute", ({ enumerable: true, get: function () { return route_4.default; } }));
var set_1 = __webpack_require__(43);
Object.defineProperty(exports, "SetValuePattern", ({ enumerable: true, get: function () { return set_1.default; } }));
var route_5 = __webpack_require__(44);
Object.defineProperty(exports, "SetStateRoute", ({ enumerable: true, get: function () { return route_5.default; } }));
var has_1 = __webpack_require__(46);
Object.defineProperty(exports, "HasStatePattern", ({ enumerable: true, get: function () { return has_1.default; } }));
var set_2 = __webpack_require__(45);
Object.defineProperty(exports, "SetStatePattern", ({ enumerable: true, get: function () { return set_2.default; } }));
var route_6 = __webpack_require__(47);
Object.defineProperty(exports, "EmitErrorRoute", ({ enumerable: true, get: function () { return route_6.default; } }));
var emit_1 = __webpack_require__(48);
Object.defineProperty(exports, "EmitErrorPattern", ({ enumerable: true, get: function () { return emit_1.default; } }));
var route_7 = __webpack_require__(49);
Object.defineProperty(exports, "EmitTokenRoute", ({ enumerable: true, get: function () { return route_7.default; } }));
var emit_2 = __webpack_require__(50);
Object.defineProperty(exports, "EmitTokenPattern", ({ enumerable: true, get: function () { return emit_2.default; } }));
var route_8 = __webpack_require__(51);
Object.defineProperty(exports, "EmitNodeRoute", ({ enumerable: true, get: function () { return route_8.default; } }));
var emit_3 = __webpack_require__(52);
Object.defineProperty(exports, "EmitNodePattern", ({ enumerable: true, get: function () { return emit_3.default; } }));
var append_1 = __webpack_require__(53);
Object.defineProperty(exports, "AppendNodePattern", ({ enumerable: true, get: function () { return append_1.default; } }));
var prepend_1 = __webpack_require__(54);
Object.defineProperty(exports, "PrependNodePattern", ({ enumerable: true, get: function () { return prepend_1.default; } }));
var pivot_1 = __webpack_require__(55);
Object.defineProperty(exports, "PivotNodePattern", ({ enumerable: true, get: function () { return pivot_1.default; } }));
var place_1 = __webpack_require__(56);
Object.defineProperty(exports, "PlaceNodePattern", ({ enumerable: true, get: function () { return place_1.default; } }));
var route_9 = __webpack_require__(57);
Object.defineProperty(exports, "EmitSymbolRoute", ({ enumerable: true, get: function () { return route_9.default; } }));
var emit_4 = __webpack_require__(58);
Object.defineProperty(exports, "EmitSymbolPattern", ({ enumerable: true, get: function () { return emit_4.default; } }));
var scope_1 = __webpack_require__(59);
Object.defineProperty(exports, "ScopeSymbolPattern", ({ enumerable: true, get: function () { return scope_1.default; } }));
var uncase_1 = __webpack_require__(27);
Object.defineProperty(exports, "UncaseTransformPattern", ({ enumerable: true, get: function () { return uncase_1.default; } }));
//# sourceMappingURL=index.js.map

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const error_1 = __webpack_require__(11);
const fragment_1 = __webpack_require__(12);
const location_1 = __webpack_require__(13);
const range_1 = __webpack_require__(14);
const table_1 = __webpack_require__(15);
const node_1 = __webpack_require__(16);
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
/* 11 */
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
/* 12 */
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
/* 13 */
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
/* 14 */
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
/* 15 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const fragment_1 = __webpack_require__(12);
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
     * @throw Throws an error when a symbol record with the same fragment data already exists.
     */
    add(record) {
        const name = record.fragment.data;
        if (this.#records[name]) {
            throw 'Unable to add records with duplicate fragment data.';
        }
        this.#records[name] = record;
        this.#length++;
    }
    /**
     * Find in all tables the symbol record that corresponds to the specified name.
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
/* 16 */
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
/* 17 */
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
/* 18 */
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
/* 19 */
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
/* 20 */
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
/* 21 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const error_1 = __webpack_require__(11);
const token_1 = __webpack_require__(17);
const node_1 = __webpack_require__(16);
const record_1 = __webpack_require__(18);
const table_1 = __webpack_require__(15);
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
/* 22 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const fragment_1 = __webpack_require__(12);
const location_1 = __webpack_require__(13);
const range_1 = __webpack_require__(14);
const base_1 = __webpack_require__(21);
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
/* 23 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const fragment_1 = __webpack_require__(12);
const location_1 = __webpack_require__(13);
const range_1 = __webpack_require__(14);
const base_1 = __webpack_require__(21);
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
/* 24 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const route_1 = __webpack_require__(20);
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
/* 25 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const pattern_1 = __webpack_require__(19);
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
/* 26 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const pattern_1 = __webpack_require__(19);
const uncase_1 = __webpack_require__(27);
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
/* 27 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const expect_1 = __webpack_require__(28);
const pattern_1 = __webpack_require__(19);
/**
 * Consumes all the given patterns with the uncase transformation active.
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
/* 28 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const pattern_1 = __webpack_require__(19);
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
/* 29 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const pattern_1 = __webpack_require__(19);
const uncase_1 = __webpack_require__(27);
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
/* 30 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const pattern_1 = __webpack_require__(19);
const uncase_1 = __webpack_require__(27);
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
/* 31 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const route_1 = __webpack_require__(20);
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
/* 32 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const pattern_1 = __webpack_require__(19);
const try_1 = __webpack_require__(33);
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
/* 33 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const pattern_1 = __webpack_require__(19);
const expect_1 = __webpack_require__(28);
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
/* 34 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const pattern_1 = __webpack_require__(19);
const try_1 = __webpack_require__(33);
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
/* 35 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const pattern_1 = __webpack_require__(19);
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
/* 36 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const pattern_1 = __webpack_require__(19);
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
/* 37 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const pattern_1 = __webpack_require__(19);
const try_1 = __webpack_require__(33);
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
/* 38 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const pattern_1 = __webpack_require__(19);
const try_1 = __webpack_require__(33);
/**
 * Consume all the given patterns in this pattern as an optional behavior.
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
exports["default"] = Option;
//# sourceMappingURL=opt.js.map

/***/ }),
/* 39 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const pattern_1 = __webpack_require__(19);
const expect_1 = __webpack_require__(28);
const try_1 = __webpack_require__(33);
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
/* 40 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const pattern_1 = __webpack_require__(19);
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
/* 41 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const pattern_1 = __webpack_require__(19);
const uncase_1 = __webpack_require__(27);
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
/* 42 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const route_1 = __webpack_require__(20);
const pattern_1 = __webpack_require__(19);
const set_1 = __webpack_require__(43);
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
/* 43 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const expect_1 = __webpack_require__(28);
const pattern_1 = __webpack_require__(19);
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
/* 44 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const route_1 = __webpack_require__(20);
const pattern_1 = __webpack_require__(19);
const set_1 = __webpack_require__(45);
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
/* 45 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const expect_1 = __webpack_require__(28);
const pattern_1 = __webpack_require__(19);
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
exports["default"] = Emit;
//# sourceMappingURL=set.js.map

/***/ }),
/* 46 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const expect_1 = __webpack_require__(28);
const pattern_1 = __webpack_require__(19);
/**
 * Consume all the given patterns when the specified state value is defined.
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
exports["default"] = Emit;
//# sourceMappingURL=has.js.map

/***/ }),
/* 47 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const route_1 = __webpack_require__(20);
const pattern_1 = __webpack_require__(19);
const emit_1 = __webpack_require__(48);
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
/* 48 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_1 = __webpack_require__(21);
const error_1 = __webpack_require__(11);
const expect_1 = __webpack_require__(28);
const pattern_1 = __webpack_require__(19);
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
/* 49 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const route_1 = __webpack_require__(20);
const pattern_1 = __webpack_require__(19);
const emit_1 = __webpack_require__(50);
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
/* 50 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_1 = __webpack_require__(21);
const token_1 = __webpack_require__(17);
const expect_1 = __webpack_require__(28);
const pattern_1 = __webpack_require__(19);
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
/* 51 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const route_1 = __webpack_require__(20);
const pattern_1 = __webpack_require__(19);
const emit_1 = __webpack_require__(52);
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
/* 52 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_1 = __webpack_require__(21);
const node_1 = __webpack_require__(16);
const expect_1 = __webpack_require__(28);
const pattern_1 = __webpack_require__(19);
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
/* 53 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_1 = __webpack_require__(21);
const node_1 = __webpack_require__(16);
const expect_1 = __webpack_require__(28);
const pattern_1 = __webpack_require__(19);
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
/* 54 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_1 = __webpack_require__(21);
const node_1 = __webpack_require__(16);
const expect_1 = __webpack_require__(28);
const pattern_1 = __webpack_require__(19);
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
/* 55 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_1 = __webpack_require__(21);
const node_1 = __webpack_require__(16);
const expect_1 = __webpack_require__(28);
const pattern_1 = __webpack_require__(19);
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
/* 56 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const pattern_1 = __webpack_require__(19);
const expect_1 = __webpack_require__(28);
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
/* 57 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const route_1 = __webpack_require__(20);
const pattern_1 = __webpack_require__(19);
const emit_1 = __webpack_require__(58);
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
/* 58 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_1 = __webpack_require__(21);
const record_1 = __webpack_require__(18);
const pattern_1 = __webpack_require__(19);
const expect_1 = __webpack_require__(28);
const error_1 = __webpack_require__(11);
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
/* 59 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const pattern_1 = __webpack_require__(19);
const expect_1 = __webpack_require__(28);
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
/* 60 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Maker = exports.Optimizer = exports.Parser = exports.Lexer = exports.Entries = exports.Project = exports.TextCoder = exports.LiveCoder = exports.BaseCoder = void 0;
var base_1 = __webpack_require__(61);
Object.defineProperty(exports, "BaseCoder", ({ enumerable: true, get: function () { return base_1.Base; } }));
var live_1 = __webpack_require__(62);
Object.defineProperty(exports, "LiveCoder", ({ enumerable: true, get: function () { return live_1.Live; } }));
var text_1 = __webpack_require__(63);
Object.defineProperty(exports, "TextCoder", ({ enumerable: true, get: function () { return text_1.Text; } }));
exports.Project = __webpack_require__(66);
exports.Entries = __webpack_require__(64);
exports.Lexer = __webpack_require__(67);
exports.Parser = __webpack_require__(69);
exports.Optimizer = __webpack_require__(74);
exports.Maker = __webpack_require__(78);
//# sourceMappingURL=index.js.map

/***/ }),
/* 61 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Base = void 0;
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
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return a route.
     * @param path Route path.
     * @param value Optional route value.
     * @param pattern Optional route pattern.
     * @returns Should return the route.
     */
    getRoute(path, value, pattern) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return a map pattern.
     * @param routes Map routes.
     * @returns Should return the pattern.
     */
    emitMapPattern(...routes) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return a token pattern.
     * @param identity Token identity.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emitTokenPattern(identity, ...patterns) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return a node pattern.
     * @param identity Node identity.
     * @param output Output node direction.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emitNodePattern(identity, output, ...patterns) {
        throw "Method doesn't implemented.";
    }
    /**
     * Get a new identity pattern for dynamic directives.
     * @param identity New identity.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    emitIdentityPattern(identity, ...patterns) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return a condition pattern.
     * @param test Test pattern.
     * @param success Success pattern.
     * @param failure Failure pattern.
     * @returns Should return the pattern.
     */
    emitConditionPattern(test, success, failure) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return a choose pattern.
     * @param patterns Possible patterns.
     * @returns Should return the pattern.
     */
    emitChoosePattern(...patterns) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return a choose units pattern.
     * @param units Possible units.
     * @returns Should return the pattern.
     */
    emitChooseUnitsPattern(units) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return an expect pattern.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emitExpectPattern(...patterns) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return an expect units pattern.
     * @param units Expected units.
     * @returns Should return the pattern.
     */
    emitExpectUnitsPattern(units) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return a not pattern.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emitNotPattern(...patterns) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return an opt pattern.
     * @param patterns Optional patterns.
     * @returns Should return the pattern.
     */
    emitOptPattern(...patterns) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return a repeat pattern.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emitRepeatPattern(...patterns) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return a place node pattern.
     * @param current Current node destination.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emitPlacePattern(current, ...patterns) {
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
    emitAppendPattern(identity, current, head, ...patterns) {
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
    emitPrependPattern(identity, current, head, ...patterns) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return a pivot node pattern.
     * @param identity Node identity.
     * @param head Head pattern.
     * @param patterns Optional patterns.
     * @returns Should return the pattern.
     */
    emitPivotPattern(identity, pivot, ...patterns) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return a symbol pattern.
     * @param value Symbol value.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emitSymbolPattern(value, symbol, ...patterns) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return a symbol scope pattern.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emitScopePattern(...patterns) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return an error pattern.
     * @param value Error value.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emitErrorPattern(value, ...patterns) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return a has pattern.
     * @param state Expected state value.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emitHasPattern(state, ...patterns) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return a set pattern.
     * @param state New state value.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emitSetPattern(state, ...patterns) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return an uncase pattern.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emitUncasePattern(...patterns) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return a reference pattern.
     * @param entry Referenced entry.
     * @returns Should return the pattern.
     */
    emitReferencePattern(entry) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return an any pattern.
     * @returns Should return the pattern.
     */
    emitAnyPattern() {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return a range pattern.
     * @param from From unit value.
     * @param to To unit value.
     * @returns Should return the pattern.
     */
    emitRangePattern(from, to) {
        throw "Method doesn't implemented.";
    }
}
exports.Base = Base;
//# sourceMappingURL=base.js.map

/***/ }),
/* 62 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Live = void 0;
const Core = __webpack_require__(9);
const base_1 = __webpack_require__(61);
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
     * Get a new reference pattern.
     * @param entry Referenced entry.
     * @returns Returns the pattern.
     */
    emitReferencePattern(entry) {
        if (!entry.pattern) {
            return new Core.RunFlowPattern(() => entry.pattern);
        }
        return entry.pattern;
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
/* 63 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Text = void 0;
const Core = __webpack_require__(9);
const Entries = __webpack_require__(64);
const String = __webpack_require__(65);
const base_1 = __webpack_require__(61);
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
        if (value) {
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
     * Get a new reference pattern.
     * @param entry Referenced entry.
     * @returns Returns the pattern.
     */
    emitReferencePattern(entry) {
        if (!entry.pattern) {
            return this.#getPattern('RunFlowPattern', `() => ${this.#getIdentifier(entry.name)}`);
        }
        else if (Entries.isReferencedBy(entry, entry.type)) {
            return this.#getIdentifier(entry.name);
        }
        else {
            return entry.pattern;
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
/* 64 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isReferencedBy = exports.Aggregator = void 0;
/**
 * Aggregate pattern entries during the making process.
 */
class Aggregator {
    /**
     * Aggregator name.
     */
    #name;
    /**
     * Aggregator location.
     */
    #location;
    /**
     * Entry map.
     */
    #entries = {};
    /**
     * Link map.
     */
    #links = {};
    /**
     * Event map.
     */
    #events = {};
    /**
     * Get the entry that correspond to the given name.
     * @param name Entry name.
     * @returns Returns the corresponding entry.
     * @throws Throws an exception when the given entry wasn't found.
     */
    #get(name) {
        if (!this.has(name)) {
            throw `An entry named '${name}' doesn't exists.`;
        }
        return this.get(name);
    }
    /**
     * Default constructor.
     * @param name Aggregator name.
     * @param location Aggregator location.
     */
    constructor(name, location) {
        this.#name = name;
        this.#location = location;
    }
    /**
     * Get the aggregator name.
     */
    get name() {
        return this.#name;
    }
    /**
     * Get the aggregator location.
     */
    get location() {
        return this.#location;
    }
    /**
     * Get all entries.
     */
    get all() {
        return Object.values(this.#entries);
    }
    /**
     * Determines whether or not the aggregator contains an entry with the given name.
     * @param name Entry name.
     * @returns Returns true when the specified entry exists, false otherwise.
     */
    has(name) {
        return this.#entries[name] !== void 0 || this.#links[name] !== void 0;
    }
    /**
     * Get the entry that correspond to the given name.
     * @param name Entry name.
     * @returns Returns the corresponding entry or undefined when it doesn't exists.
     */
    get(name) {
        return this.#entries[name] ?? this.#links[name];
    }
    /**
     * Get an array containing all pattern entries that corresponds to one or more specified types.
     * @param types Entry types.
     * @returns Returns an array containing all entries found.
     */
    getPatternsByType(types) {
        return this.all.filter((entry) => entry.pattern && !entry.alias && types.includes(entry.type));
    }
    /**
     * Add the specified pattern entry.
     * @param entry Pattern entry.
     * @throws Throws an error when the specified entry already exists.
     * @returns Returns the added entry.
     */
    add(entry) {
        const { identifier } = entry;
        if (this.has(identifier)) {
            throw `Another entry named '${identifier}' can't be added.`;
        }
        const events = this.#events[identifier];
        this.#entries[identifier] = entry;
        if (events) {
            delete this.#events[identifier];
            for (const event of events) {
                event(entry);
            }
        }
        return entry;
    }
    /**
     * Create and add a new pattern entry.
     * @param type Entry type.
     * @param origin Entry origin.
     * @param identifier Entry identifier.
     * @param identity Entry identity.
     * @param model Optional entry model.
     * @throws Throws an error when the specified entry already exists.
     * @returns Returns the added entry.
     */
    create(type, origin, identifier, identity, model) {
        return this.add({
            name: `${this.#name}:${identifier}`,
            type,
            origin,
            identifier,
            identity,
            alias: model?.alias ?? false,
            dynamic: model?.dynamic ?? false,
            exported: model?.exported ?? false,
            imported: model?.imported ?? false,
            dependencies: model?.dependencies ?? [],
            dependents: model?.dependents ?? [],
            location: model?.location ?? this.#location,
            pattern: model?.pattern
        });
    }
    /**
     * Link an existing entry to another one.
     * @param identifier Link identifier.
     * @param alias Alias identifier.
     * @throws Throws an error when the specified name already exists or the given identifier doesn't exists.
     * @returns Returns the linked entry.
     */
    link(identifier, alias) {
        if (this.has(identifier)) {
            throw `An entry named '${identifier}' already exists.`;
        }
        const entry = this.#get(alias);
        this.#links[identifier] = entry;
        return entry;
    }
    /**
     * Add an event to be triggered once when an entry with the given identifier is added.
     * @param identifier Entry identifier.
     * @param callback Trigger callback.
     */
    on(identifier, callback) {
        const events = this.#events[identifier];
        if (!events) {
            this.#events[identifier] = [callback];
        }
        else {
            events.push(callback);
        }
    }
}
exports.Aggregator = Aggregator;
/**
 * Determines whether or not the given entry is referenced.
 * @param entry Input entry.
 * @param type Reference type.
 * @returns Returns true when the given entry is referenced, false otherwise.
 */
const isReferencedBy = (entry, type) => {
    if (!entry.dependents.includes(entry)) {
        return entry.dependents.reduce((previous, current) => (current.type === type ? previous + 1 : previous), 0) > 1;
    }
    return true;
};
exports.isReferencedBy = isReferencedBy;
//# sourceMappingURL=entries.js.map

/***/ }),
/* 65 */
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
/* 66 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Context = void 0;
const Core = __webpack_require__(9);
const Entries = __webpack_require__(64);
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

/***/ }),
/* 67 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = exports.consumeText = void 0;
const Core = __webpack_require__(9);
const program_1 = __webpack_require__(68);
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
/* 68 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Program = void 0;
const Core = __webpack_require__(9);
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
const keywordsAndSymbols = new Core.MapFlowPattern(new Core.SetValueRoute(103 /* Any */, end, 'a', 'n', 'y'), new Core.SetValueRoute(104 /* From */, end, 'f', 'r', 'o', 'm'), new Core.SetValueRoute(105 /* To */, end, 't', 'o'), new Core.SetValueRoute(106 /* Map */, end, 'm', 'a', 'p'), new Core.SetValueRoute(107 /* Then */, end, 't', 'h', 'e', 'n'), new Core.SetValueRoute(108 /* Else */, end, 'e', 'l', 's', 'e'), new Core.SetValueRoute(109 /* Or */, end, 'o', 'r'), new Core.SetValueRoute(110 /* And */, end, 'a', 'n', 'd'), new Core.SetValueRoute(111 /* Not */, end, 'n', 'o', 't'), new Core.SetValueRoute(112 /* Opt */, end, 'o', 'p', 't'), new Core.SetValueRoute(113 /* Repeat */, end, 'r', 'e', 'p', 'e', 'a', 't'), new Core.SetValueRoute(114 /* Place */, end, 'p', 'l', 'a', 'c', 'e'), new Core.SetValueRoute(115 /* Append */, end, 'a', 'p', 'p', 'e', 'n', 'd'), new Core.SetValueRoute(116 /* Prepend */, end, 'p', 'r', 'e', 'p', 'e', 'n', 'd'), new Core.SetValueRoute(117 /* Pivot */, end, 'p', 'i', 'v', 'o', 't'), new Core.SetValueRoute(118 /* Next */, end, 'n', 'e', 'x', 't'), new Core.SetValueRoute(119 /* Left */, end, 'l', 'e', 'f', 't'), new Core.SetValueRoute(120 /* Right */, end, 'r', 'i', 'g', 'h', 't'), new Core.SetValueRoute(121 /* Symbol */, end, 's', 'y', 'm', 'b', 'o', 'l'), new Core.SetValueRoute(122 /* Scope */, end, 's', 'c', 'o', 'p', 'e'), new Core.SetValueRoute(123 /* Error */, end, 'e', 'r', 'r', 'o', 'r'), new Core.SetValueRoute(124 /* Has */, end, 'h', 'a', 's'), new Core.SetValueRoute(125 /* Set */, end, 's', 'e', 't'), new Core.SetValueRoute(126 /* Uncase */, end, 'u', 'n', 'c', 'a', 's', 'e'), new Core.SetValueRoute(127 /* Skip */, end, 's', 'k', 'i', 'p'), new Core.SetValueRoute(128 /* Token */, end, 't', 'o', 'k', 'e', 'n'), new Core.SetValueRoute(129 /* Node */, end, 'n', 'o', 'd', 'e'), new Core.SetValueRoute(130 /* Alias */, end, 'a', 'l', 'i', 'a', 's'), new Core.SetValueRoute(131 /* Auto */, end, 'a', 'u', 't', 'o'), new Core.SetValueRoute(132 /* As */, end, 'a', 's'), new Core.SetValueRoute(133 /* Import */, end, 'i', 'm', 'p', 'o', 'r', 't'), new Core.SetValueRoute(134 /* Export */, end, 'e', 'x', 'p', 'o', 'r', 't'), new Core.SetValueRoute(135 /* Asterisk */, '*'), new Core.SetValueRoute(136 /* VerticalBar */, '|'), new Core.SetValueRoute(137 /* Ampersand */, '&'), new Core.SetValueRoute(138 /* Period */, '.'), new Core.SetValueRoute(139 /* Comma */, ','), new Core.SetValueRoute(140 /* Semicolon */, ';'), new Core.SetValueRoute(141 /* OpenBraces */, '{'), new Core.SetValueRoute(142 /* CloseBraces */, '}'), new Core.SetValueRoute(143 /* OpenParenthesis */, '('), new Core.SetValueRoute(144 /* CloseParenthesis */, ')'), new Core.SetValueRoute(145 /* OpenChevron */, '<'), new Core.SetValueRoute(146 /* CloseChevron */, '>'));
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
/* 69 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = exports.consumeTokens = void 0;
const Core = __webpack_require__(9);
const program_1 = __webpack_require__(70);
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
/* 70 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Program = void 0;
const Core = __webpack_require__(9);
const Lexer = __webpack_require__(67);
const directive_1 = __webpack_require__(71);
const binary_1 = __webpack_require__(72);
const unary_1 = __webpack_require__(73);
/**
 * Identity pattern.
 */
const identity = new Core.ExpectFlowPattern(new Core.ExpectUnitPattern(145 /* OpenChevron */), new Core.AppendNodePattern(202 /* Identity */, 0 /* Left */, 1 /* Right */, new Core.ChooseUnitPattern(101 /* Number */, 131 /* Auto */), new Core.ExpectUnitPattern(146 /* CloseChevron */)));
/**
 * State pattern.
 */
const state = new Core.ExpectFlowPattern(new Core.ExpectUnitPattern(145 /* OpenChevron */), new Core.AppendNodePattern(203 /* State */, 0 /* Left */, 1 /* Right */, new Core.ExpectUnitPattern(101 /* Number */), new Core.ExpectUnitPattern(146 /* CloseChevron */)));
/**
 * Unary operators pattern.
 */
const unaryOperators = new Core.MapFlowPattern(new Core.SetValueRoute(213 /* Not */, 111 /* Not */), new Core.SetValueRoute(214 /* Opt */, 112 /* Opt */), new Core.SetValueRoute(215 /* Repeat */, 113 /* Repeat */), new Core.SetValueRoute(216 /* PlaceNext */, 114 /* Place */, 118 /* Next */), new Core.SetValueRoute(217 /* PlaceLeft */, 114 /* Place */, 119 /* Left */), new Core.SetValueRoute(218 /* PlaceRight */, 114 /* Place */, 120 /* Right */), new Core.SetValueRoute(219 /* Place */, 114 /* Place */), new Core.SetValueRoute(220 /* AppendNext */, 115 /* Append */, 118 /* Next */), new Core.SetValueRoute(221 /* AppendLeft */, 115 /* Append */, 119 /* Left */), new Core.SetValueRoute(222 /* AppendRight */, 115 /* Append */, 120 /* Right */), new Core.SetValueRoute(223 /* Append */, 115 /* Append */), new Core.SetValueRoute(224 /* PrependNext */, 116 /* Prepend */, 118 /* Next */), new Core.SetValueRoute(225 /* PrependLeft */, 116 /* Prepend */, 119 /* Left */), new Core.SetValueRoute(226 /* PrependRight */, 116 /* Prepend */, 120 /* Right */), new Core.SetValueRoute(227 /* Prepend */, 116 /* Prepend */), new Core.SetValueRoute(228 /* Pivot */, 117 /* Pivot */), new Core.SetValueRoute(229 /* Symbol */, 121 /* Symbol */), new Core.SetValueRoute(230 /* Scope */, 122 /* Scope */), new Core.SetValueRoute(231 /* Error */, state, 123 /* Error */), new Core.SetValueRoute(232 /* Has */, state, 124 /* Has */), new Core.SetValueRoute(233 /* Set */, state, 125 /* Set */), new Core.SetValueRoute(234 /* Uncase */, 126 /* Uncase */));
/**
 * Map members pattern.
 */
const mapMembers = new Core.ExpectFlowPattern(new Core.AppendNodePattern(208 /* Member */, 1 /* Right */, 2 /* Next */, new Core.ChooseFlowPattern(new directive_1.default(304 /* Member */, identity, new Core.RunFlowPattern(() => expression)), new Core.RunFlowPattern(() => expression))), new Core.OptFlowPattern(new Core.ExpectUnitPattern(139 /* Comma */), new Core.RunFlowPattern(() => mapMembers)));
/**
 * Map operand pattern.
 */
const mapOperand = new Core.ScopeSymbolPattern(new Core.ExpectUnitPattern(106 /* Map */), new Core.AppendNodePattern(207 /* Map */, 1 /* Right */, 1 /* Right */, new Core.ExpectFlowPattern(new Core.ExpectUnitPattern(141 /* OpenBraces */), new Core.OptFlowPattern(mapMembers), new Core.ExpectUnitPattern(142 /* CloseBraces */))));
/**
 * Range operand pattern.
 */
const rangeOperand = new Core.PlaceNodePattern(1 /* Right */, new Core.ExpectUnitPattern(104 /* From */), new Core.AppendNodePattern(204 /* String */, 1 /* Right */, 1 /* Right */, new Core.ExpectUnitPattern(102 /* String */)), new Core.PivotNodePattern(206 /* Range */, 1 /* Right */, 0 /* Left */, new Core.ExpectUnitPattern(105 /* To */), new Core.AppendNodePattern(204 /* String */, 1 /* Right */, 1 /* Right */, new Core.ExpectUnitPattern(102 /* String */))));
/**
 * General operands pattern.
 */
const generalOperands = new Core.AppendNodePattern(Core.BaseSource.Output, 1 /* Right */, 1 /* Right */, new Core.MapFlowPattern(new Core.SetValueRoute(205 /* Any */, 103 /* Any */), new Core.SetValueRoute(205 /* Any */, 135 /* Asterisk */), new Core.SetValueRoute(204 /* String */, 102 /* String */), new Core.SetValueRoute(201 /* Reference */, 100 /* Identifier */)));
/**
 * Group expression pattern.
 */
const groupExpression = new Core.PlaceNodePattern(1 /* Right */, new Core.ExpectFlowPattern(new Core.ExpectUnitPattern(143 /* OpenParenthesis */), new Core.RunFlowPattern(() => expression), new Core.ExpectUnitPattern(144 /* CloseParenthesis */)));
/**
 * Condition expression pattern.
 */
const conditionExpression = new Core.OptFlowPattern(new Core.PivotNodePattern(209 /* Then */, 1 /* Right */, 0 /* Left */, new Core.ExpectUnitPattern(107 /* Then */), new Core.RunFlowPattern(() => expression), new Core.OptFlowPattern(new Core.PivotNodePattern(210 /* Else */, 1 /* Right */, 0 /* Left */, new Core.ExpectUnitPattern(108 /* Else */), new Core.RunFlowPattern(() => expression)))));
/**
 * Expression pattern.
 */
const expression = new Core.ExpectFlowPattern(new binary_1.default(new Core.SetValuePattern(211 /* Or */, new Core.ChooseUnitPattern(109 /* Or */, 136 /* VerticalBar */)), new binary_1.default(new Core.SetValuePattern(212 /* And */, new Core.ChooseUnitPattern(110 /* And */, 137 /* Ampersand */)), new unary_1.default(unaryOperators, new Core.PlaceNodePattern(1 /* Right */, new binary_1.default(new Core.SetValuePattern(235 /* Access */, new Core.ExpectUnitPattern(138 /* Period */)), new Core.ChooseFlowPattern(mapOperand, rangeOperand, generalOperands, groupExpression)))))), conditionExpression);
/**
 * Skip directive route.
 */
const skip = new Core.SetValueRoute(236 /* Skip */, expression, 127 /* Skip */);
/**
 * Token directive route.
 */
const token = new Core.SetValueRoute(237 /* Token */, new directive_1.default(300 /* Token */, identity, expression), 128 /* Token */);
/**
 * Node directive route.
 */
const node = new Core.SetValueRoute(238 /* Node */, new directive_1.default(301 /* Node */, identity, expression), 129 /* Node */);
/**
 * Alias token directive route.
 */
const aliasToken = new Core.SetValueRoute(239 /* AliasToken */, new directive_1.default(303 /* AliasToken */, identity, expression), 130 /* Alias */, 128 /* Token */);
/**
 * Alias node directive route.
 */
const aliasNode = new Core.SetValueRoute(240 /* AliasNode */, new directive_1.default(302 /* AliasNode */, identity, expression), 130 /* Alias */, 129 /* Node */);
/**
 * Export identifier route.
 */
const exportIdentifier = new Core.SetValueRoute(200 /* Identifier */, 100 /* Identifier */);
/**
 * Export aliases route.
 */
const exportAliases = new Core.SetValueRoute(242 /* Export */, new Core.AppendNodePattern(Core.BaseSource.Output, 1 /* Right */, 1 /* Right */, new Core.MapFlowPattern(token, node, aliasToken, aliasNode, exportIdentifier)), 134 /* Export */);
/**
 * Import module route.
 */
const importModule = new Core.SetValueRoute(241 /* Import */, new Core.AppendNodePattern(204 /* String */, 1 /* Right */, 1 /* Right */, new Core.ExpectUnitPattern(102 /* String */)), 133 /* Import */);
/**
 * Main parser pattern.
 */
exports.Program = new Core.ExpectFlowPattern(new Core.OptFlowPattern(new Core.RepeatFlowPattern(new Core.EmitNodePattern(Core.BaseSource.Output, 1 /* Right */, new Core.MapFlowPattern(importModule, skip, token, node, aliasToken, aliasNode, exportAliases), new Core.ExpectUnitPattern(140 /* Semicolon */)))), new Core.EndFlowPattern());
//# sourceMappingURL=program.js.map

/***/ }),
/* 71 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const Core = __webpack_require__(9);
const Lexer = __webpack_require__(67);
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
        this.#pattern = new Core.ExpectFlowPattern(new Core.OptFlowPattern(identity), new Core.EmitSymbolPattern(symbol, new Core.PivotNodePattern(200 /* Identifier */, 1 /* Right */, 0 /* Left */, new Core.ExpectUnitPattern(100 /* Identifier */)), new Core.ExpectUnitPattern(132 /* As */), new Core.PlaceNodePattern(1 /* Right */, expression)));
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
/* 72 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const Core = __webpack_require__(9);
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
/* 73 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const Core = __webpack_require__(9);
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
/* 74 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consumeNodes = void 0;
const Core = __webpack_require__(9);
const Parser = __webpack_require__(69);
const Context = __webpack_require__(75);
const Import = __webpack_require__(76);
const Export = __webpack_require__(110);
const Node = __webpack_require__(111);
const Token = __webpack_require__(117);
const Skip = __webpack_require__(122);
/**
 * Resolve the identity from the given node.
 * @param node Input node.
 * @returns Returns the identity.
 */
const resolveIdentity = (node) => {
    if (node.left) {
        const identity = node.left.fragment.data;
        if (identity === 'auto') {
            return Core.BaseSource.Output;
        }
        return parseInt(identity);
    }
    return NaN;
};
/**
 * Resolve the token or node directive for the given node and update the specified project.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 */
const resolveTokenOrNode = (project, node, state) => {
    state.entry.identity = resolveIdentity(node.right) || Context.getCount(project);
    switch (node.value) {
        case 237 /* Token */:
            Token.consume(project, 1 /* Right */, node, state);
            break;
        case 238 /* Node */:
            Node.consume(project, 1 /* Right */, node, state);
            break;
        case 239 /* AliasToken */:
            state.entry.alias = true;
            Token.consume(project, 1 /* Right */, node, state);
            break;
        case 240 /* AliasNode */:
            state.entry.alias = true;
            Node.consume(project, 1 /* Right */, node, state);
            break;
        default:
            throw `Unexpected AST node.`;
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
            case 241 /* Import */:
                Import.resolve(project, current);
                break;
            case 242 /* Export */:
                if (!Export.resolve(project, current)) {
                    state.entry.exported = true;
                    resolveTokenOrNode(project, current.right, state);
                }
                break;
            case 236 /* Skip */:
                state.entry.identity = Context.getCount(project);
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
/* 75 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getCount = exports.getNewState = exports.getNewStateEntry = void 0;
/**
 * Get a new state entry based on the given entry model.
 * @param model Entry model.
 * @returns Returns the generated entry.
 */
const getNewStateEntry = (model) => {
    return {
        type: model.type ?? 0 /* Unknown */,
        origin: model.origin ?? 0 /* User */,
        identifier: model.identifier ?? '?',
        identity: model.identity ?? -1,
        alias: model.alias ?? false,
        dynamic: model.dynamic ?? false,
        exported: model.exported ?? false
    };
};
exports.getNewStateEntry = getNewStateEntry;
/**
 * Get a new state based on the given parameters.
 * @param anchor Anchor node.
 * @param identity Entry identity.
 * @returns Returns the new state.
 */
const getNewState = (anchor, identity) => {
    return {
        anchor,
        entry: (0, exports.getNewStateEntry)({
            origin: 0 /* User */,
            identity
        })
    };
};
exports.getNewState = getNewState;
const counters = new WeakMap();
const getCount = (project) => {
    const counter = counters.get(project.coder) ?? project.options.initialIdentity ?? 0;
    counters.set(project.coder, counter + 1);
    return counter;
};
exports.getCount = getCount;
//# sourceMappingURL=context.js.map

/***/ }),
/* 76 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolve = void 0;
const Path = __webpack_require__(77);
const Core = __webpack_require__(9);
const String = __webpack_require__(65);
const Project = __webpack_require__(66);
const Entries = __webpack_require__(64);
const Lexer = __webpack_require__(67);
const Parser = __webpack_require__(69);
const Maker = __webpack_require__(78);
const Optimizer = __webpack_require__(74);
/**
 * Get the corresponding symbol type for the given input entry.
 * @param entry Input entry.
 * @returns Returns the symbol type.
 * @throws Throws an exception when the given entry doesn't match any valid symbol type.
 */
const getSymbolType = (entry) => {
    if (entry.type === 3 /* Node */) {
        return entry.alias ? 302 /* AliasNode */ : 301 /* Node */;
    }
    else if (entry.type === 2 /* Token */) {
        return entry.alias ? 303 /* AliasToken */ : 300 /* Token */;
    }
    else {
        throw `Unexpected entry type (${entry.type}).`;
    }
};
/**
 * Assign all dependencies from the given source to the target aggregator.
 * @param target Target aggregator.
 * @param source Source entries.
 */
const assignDependencies = (target, source) => {
    for (const entry of source) {
        const { location } = entry;
        if (!target[location]) {
            target[location] = new Entries.Aggregator('I', location);
        }
        if (!target[location].has(entry.identifier)) {
            target[location].add(entry);
            assignDependencies(target, entry.dependencies);
        }
    }
};
/**
 * Import all directives from the given source to the target.
 * @param project Project context.
 * @param node Root node.
 * @param target Target aggregator.
 * @param source Source aggregator.
 */
const importDirectives = (project, node, target, source) => {
    for (const entry of source.all) {
        if (entry.exported) {
            const identifier = entry.identifier;
            const record = node.table.find(identifier);
            if (record) {
                project.addError(record.node, 4096 /* DUPLICATE_IDENTIFIER */);
            }
            else {
                const { type, origin, identity } = entry;
                const location = node.fragment.location;
                const fragment = new Core.Fragment(identifier, 0, identifier.length, location);
                node.table.add(new Core.Record(fragment, getSymbolType(entry), node));
                target.create(type, origin, identifier, identity, { ...entry, imported: true, exported: false });
                assignDependencies(project.external, entry.dependencies);
            }
        }
    }
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
 * Resolve the import directive for the given node and update the specified project.
 * @param project Project context.
 * @param node Input node.
 */
const resolve = (project, node) => {
    const location = node.right;
    if (!project.options.loadFileHook) {
        project.addError(location, 4117 /* IMPORT_DISABLED */);
    }
    else {
        const file = `${String.extract(location.fragment.data)}.xcm`;
        const path = Path.join(project.options.rootPath ?? './', file);
        const content = project.options.loadFileHook(path);
        if (!content) {
            project.addError(location, 4118 /* IMPORT_NOT_FOUND */);
        }
        else {
            const extContext = new Core.Context(file);
            const extProject = new Project.Context(file, project.coder, {
                ...project.options,
                rootPath: Path.dirname(path)
            });
            if (compile(extProject, extContext, content)) {
                importDirectives(project, node, project.local, extProject.local);
            }
            else {
                project.addError(location, 4119 /* IMPORT_FAILURE */);
                project.errors.push(...extProject.errors);
            }
        }
    }
};
exports.resolve = resolve;
//# sourceMappingURL=import.js.map

/***/ }),
/* 77 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 78 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consumeNodes = void 0;
const Directive = __webpack_require__(79);
const Parser = __webpack_require__(69);
const Node = __webpack_require__(82);
const Token = __webpack_require__(108);
const Skip = __webpack_require__(109);
/**
 * Resolve the token or node directive for the given node and update the specified project.
 * @param project Project context.
 * @param node Input node.
 */
const resolveTokenOrNode = (project, node) => {
    const directive = node.right;
    if (!(directive instanceof Directive.Node)) {
        throw `An AST node directive is expected.`;
    }
    const state = { directive };
    switch (node.value) {
        case 237 /* Token */:
            Token.consume(project, state);
            break;
        case 238 /* Node */:
            Node.consume(project, state);
            break;
        case 239 /* AliasToken */:
            Token.consume(project, state);
            break;
        case 240 /* AliasNode */:
            Node.consume(project, state);
            break;
        default:
            throw `Unsupported AST node directive.`;
    }
};
/**
 * Resolve the skip directive for the given node and update the specified project.
 * @param project Project context.
 * @param node Input node.
 */
const resolveSkip = (project, node) => {
    if (!(node instanceof Directive.Node)) {
        project.addError(node, 4099 /* UNEXPECTED_NODE */);
    }
    else {
        const state = { directive: node };
        Skip.consume(project, state);
    }
};
/**
 * Consume the specified node (organized as an AST) and produce output entries for updating the given project.
 * @param node Input node.
 * @param project Project context.
 * @returns Returns true when the consumption was successful, false otherwise.
 */
const consumeNodes = (node, project) => {
    while ((node = node.next)) {
        if (node.value === 241 /* Import */) {
            // Just ignore for now...
        }
        else if (node.value === 242 /* Export */) {
            const current = node.right;
            if (current.value !== 200 /* Identifier */) {
                resolveTokenOrNode(project, current);
            }
        }
        else if (node.value === 236 /* Skip */) {
            resolveSkip(project, node);
        }
        else {
            resolveTokenOrNode(project, node);
        }
    }
    return project.errors.length === 0;
};
exports.consumeNodes = consumeNodes;
//# sourceMappingURL=index.js.map

/***/ }),
/* 79 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Node = void 0;
const Identity = __webpack_require__(80);
/**
 * Directive node.
 */
class Node extends Identity.Node {
    /**
     * Directive type.
     */
    #type;
    /**
     * Node entry.
     */
    #entry;
    /**
     * Default constructor.
     * @param node Original node.
     * @param type Directive type.
     * @param entry Node entry.
     */
    constructor(node, type, entry) {
        super(node, entry.identity);
        this.#type = type;
        this.#entry = entry;
    }
    /**
     * Get the directive type.
     */
    get type() {
        return this.#type;
    }
    /**
     * Get whether or not the directive can have a dynamic identity.
     */
    get dynamic() {
        return this.#entry.dynamic;
    }
    /**
     * Get whether or not the directive is an alias.
     */
    get alias() {
        return this.#entry.alias;
    }
    /**
     * Get the directive identifier.
     */
    get identifier() {
        return this.#entry.identifier;
    }
}
exports.Node = Node;
//# sourceMappingURL=directive.js.map

/***/ }),
/* 80 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Node = void 0;
const Basic = __webpack_require__(81);
/**
 * Identity node.
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
//# sourceMappingURL=identity.js.map

/***/ }),
/* 81 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Node = void 0;
const Core = __webpack_require__(9);
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
/* 82 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const Core = __webpack_require__(9);
const Expression = __webpack_require__(83);
/**
 * Consume the specified state resolving the 'NODE' directive.
 * @param project Project context.
 * @param state Consumption state.
 */
const consume = (project, state) => {
    const directive = state.directive;
    const expression = Expression.consume(project, directive.right, state);
    if (expression) {
        const entry = project.local.get(directive.identifier);
        if (!directive.alias) {
            entry.pattern = project.coder.emitNodePattern(directive.identity, 1 /* Right */, expression);
        }
        else {
            entry.pattern = expression;
        }
    }
};
exports.consume = consume;
//# sourceMappingURL=node.js.map

/***/ }),
/* 83 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const Core = __webpack_require__(9);
const Parser = __webpack_require__(69);
const Reference = __webpack_require__(84);
const String = __webpack_require__(85);
const Range = __webpack_require__(86);
const Map = __webpack_require__(87);
const Access = __webpack_require__(90);
const Or = __webpack_require__(91);
const And = __webpack_require__(92);
const Condition = __webpack_require__(93);
const Not = __webpack_require__(94);
const Option = __webpack_require__(95);
const Repeat = __webpack_require__(96);
const Place = __webpack_require__(97);
const Pivot = __webpack_require__(98);
const Append = __webpack_require__(100);
const Prepend = __webpack_require__(101);
const Symbol = __webpack_require__(102);
const Scope = __webpack_require__(103);
const Error = __webpack_require__(104);
const Has = __webpack_require__(105);
const Set = __webpack_require__(106);
const Uncase = __webpack_require__(107);
/**
 * Consume the given node resolving the expression patterns.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns the pattern or undefined when the node is invalid.
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
        case 235 /* Access */:
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
        default:
            project.addError(node, 4099 /* UNEXPECTED_NODE */);
    }
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=expression.js.map

/***/ }),
/* 84 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const Identity = __webpack_require__(80);
const Parser = __webpack_require__(69);
/**
 * Resolve the corresponding reference for the specified symbol in a 'SKIP' directive.
 * REMARKS: Skips can only accept alias tokens references.
 * @param project Project context.
 * @param node Input node.
 * @param symbol Referenced symbol.
 * @returns Returns the corresponding reference pattern or undefined when the reference isn't valid.
 */
const resolveSkip = (project, node, symbol) => {
    if (symbol.value === 303 /* AliasToken */) {
        const identifier = node.fragment.data;
        const entry = project.local.get(identifier);
        if (entry) {
            return project.coder.emitReferencePattern(entry);
        }
        project.addError(node, 4103 /* UNRESOLVED_IDENTIFIER */);
    }
    return void 0;
};
/**
 * Resolve the corresponding reference for the specified symbol in a 'TOKEN' directive.
 * REMARKS: Tokens can only accept tokens and alias tokens references.
 * @param project Project context.
 * @param node Input node.
 * @param symbol Referenced symbol.
 * @returns Returns the corresponding reference pattern or undefined when the reference isn't valid.
 */
const resolveToken = (project, node, symbol) => {
    if (symbol.value === 300 /* Token */ || symbol.value === 303 /* AliasToken */) {
        const identifier = node.fragment.data;
        const entry = project.local.get(identifier);
        if (entry) {
            return project.coder.emitReferencePattern(entry);
        }
        project.addError(node, 4103 /* UNRESOLVED_IDENTIFIER */);
    }
    return void 0;
};
/**
 * Resolve the corresponding reference for the specified symbol in a 'NODE' directive.
 * REMARKS: Nodes can only accept tokens, nodes and alias nodes references.
 * @param project Project context.
 * @param node Input node.
 * @param symbol Referenced symbol.
 * @returns Returns the corresponding reference pattern or undefined when the reference isn't valid.
 */
const resolveNode = (project, node, symbol) => {
    if (symbol.value === 301 /* Node */ || symbol.value === 302 /* AliasNode */) {
        const identifier = node.fragment.data;
        const entry = project.local.get(identifier);
        if (entry) {
            return project.coder.emitReferencePattern(entry);
        }
        project.addError(node, 4103 /* UNRESOLVED_IDENTIFIER */);
    }
    if (node instanceof Identity.Node) {
        return project.coder.emitExpectUnitsPattern([node.identity]);
    }
    return void 0;
};
/**
 * Consume the given node resolving the reference pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
 */
const consume = (project, node, state) => {
    const identifier = node.fragment.data;
    const symbol = node.table.find(identifier);
    if (symbol) {
        const directive = state.directive;
        switch (directive.type) {
            case 0 /* Skip */:
                return resolveSkip(project, node, symbol);
            case 1 /* Token */:
                return resolveToken(project, node, symbol);
            case 2 /* Node */:
                return resolveNode(project, node, symbol);
        }
    }
    project.addError(node, 4102 /* UNDEFINED_IDENTIFIER */);
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=reference.js.map

/***/ }),
/* 85 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const String = __webpack_require__(65);
/**
 * Consume the given node resolving the string patterns.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns the pattern or undefined when the node is invalid.
 */
const consume = (project, node, state) => {
    const directive = state.directive;
    if (directive.type !== 2 /* Node */) {
        const units = String.extract(node.fragment.data).split('');
        return project.coder.emitExpectUnitsPattern(units);
    }
    project.addError(node, 4100 /* UNSUPPORTED_NODE */);
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=string.js.map

/***/ }),
/* 86 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const String = __webpack_require__(65);
/**
 * Consume the given node resolving the range pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns the pattern or undefined when the node is invalid.
 */
const consume = (project, node, state) => {
    const directive = state.directive;
    if (directive.type !== 2 /* Node */) {
        const from = String.extract(node.left.fragment.data);
        const to = String.extract(node.right.fragment.data);
        return project.coder.emitRangePattern(from, to);
    }
    project.addError(node, 4100 /* UNSUPPORTED_NODE */);
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=range.js.map

/***/ }),
/* 87 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const Mergeable = __webpack_require__(88);
const Identity = __webpack_require__(80);
const Member = __webpack_require__(89);
const String = __webpack_require__(65);
const Parser = __webpack_require__(69);
const Expression = __webpack_require__(83);
/**
 * Resolve all units for the given entry node.
 * @param node Entry node.
 * @returns Returns the units array or undefined when the given entry isn't supported.
 */
const resolve = (node) => {
    if (node.value === 204 /* String */) {
        return String.extract(node.fragment.data).split('');
    }
    else if (node instanceof Identity.Node) {
        return [node.identity];
    }
    else if (node instanceof Mergeable.Node) {
        if (node.type !== 204 /* String */) {
            return node.sequence.map((node) => node.identity);
        }
        return node.sequence
            .map((node) => String.extract(node.fragment.data))
            .join('')
            .split('');
    }
    return void 0;
};
/**
 * Consume the given node resolving the 'MAP' pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns the pattern or undefined when the node is invalid.
 */
const consume = (project, node, state) => {
    let member = node.right;
    const directive = state.directive;
    const routes = [];
    while (member) {
        const current = member.right;
        if (!(current instanceof Member.Node)) {
            project.addError(node, 4100 /* UNSUPPORTED_NODE */);
        }
        else {
            const units = resolve(current.route);
            if (!units) {
                project.addError(node, 4099 /* UNEXPECTED_NODE */);
            }
            else {
                let route;
                if (!current.empty) {
                    const pattern = Expression.consume(project, current, state);
                    if (current.dynamic || directive.type === 0 /* Skip */) {
                        route = project.coder.getRoute(units, void 0, pattern);
                    }
                    else {
                        route = project.coder.getRoute(units, current.identity, pattern);
                    }
                }
                else if (directive.type === 0 /* Skip */) {
                    route = project.coder.getRoute(units, void 0);
                }
                else {
                    route = project.coder.getRoute(units, current.identity);
                }
                routes.push(route);
            }
        }
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
/* 88 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Node = void 0;
const Core = __webpack_require__(9);
const Basic = __webpack_require__(81);
/**
 * Mergeable node.
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
     * Get all the mergeable nodes from the specified node in a sequence.
     * @param node Input node.
     * @returns Returns an array containing the mergeable sequence.
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
     * @param type Sequence type.
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
     * Get the sequence type.
     */
    get type() {
        return this.#type;
    }
    /**
     * Get the node sequence.
     */
    get sequence() {
        return this.#sequence;
    }
}
exports.Node = Node;
//# sourceMappingURL=mergeable.js.map

/***/ }),
/* 89 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Node = void 0;
const Identity = __webpack_require__(80);
/**
 * Member node.
 */
class Node extends Identity.Node {
    /**
     * Node entry.
     */
    #entry;
    /**
     * Member route node.
     */
    #route;
    /**
     * Default constructor.
     * @param node Original node.
     * @param entry Node entry.
     * @param route Route node.
     */
    constructor(node, entry, route) {
        super(node, entry.identity);
        this.#entry = entry;
        this.#route = route;
    }
    /**
     * Get whether or not the directive can have a dynamic identity.
     */
    get dynamic() {
        return this.#entry.dynamic;
    }
    /**
     * Determines whether or not the member has a route.
     */
    get empty() {
        return this.#route.fragment === this.fragment;
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
/* 90 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const Identity = __webpack_require__(80);
/**
 * Consume the given node resolving the access pattern.
 * @param project Project context.
 * @param node Input node.
 * @returns Returns the pattern or undefined when the node is invalid.
 */
const consume = (project, node) => {
    if (node instanceof Identity.Node) {
        return project.coder.emitExpectUnitsPattern([node.identity]);
    }
    project.addError(node, 4100 /* UNSUPPORTED_NODE */);
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=access.js.map

/***/ }),
/* 91 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = exports.resolve = void 0;
const Mergeable = __webpack_require__(88);
const String = __webpack_require__(65);
const Parser = __webpack_require__(69);
const Expression = __webpack_require__(83);
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
    else if (node instanceof Mergeable.Node) {
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
/* 92 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = exports.resolve = void 0;
const Mergeable = __webpack_require__(88);
const String = __webpack_require__(65);
const Parser = __webpack_require__(69);
const Expression = __webpack_require__(83);
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
    else if (node instanceof Mergeable.Node) {
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
/* 93 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const Parser = __webpack_require__(69);
const Expression = __webpack_require__(83);
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
/* 94 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const And = __webpack_require__(92);
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
/* 95 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const And = __webpack_require__(92);
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
/* 96 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const And = __webpack_require__(92);
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
/* 97 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const And = __webpack_require__(92);
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
/* 98 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const Splitter = __webpack_require__(99);
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
/* 99 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolve = void 0;
const Mergeable = __webpack_require__(88);
const String = __webpack_require__(65);
const Parser = __webpack_require__(69);
const And = __webpack_require__(92);
/**
 * Split the first part of the specified mergeable node and resolve all the patterns.
 * @param project Project context.
 * @param node Mergeable node.
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
 * Traverse the specified node trying to split the first part of the mergeable node and resolve all the patterns.
 * @param project Project context.
 * @param node Mergeable node.
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
 * Resolve the given node splitting the first part from the mergeable node in an 'AND' pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns an array containing all patterns or undefined when the node is invalid.
 */
const resolve = (project, node, state) => {
    if (node.value === 212 /* And */) {
        if (node instanceof Mergeable.Node) {
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
/* 100 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const Splitter = __webpack_require__(99);
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
/* 101 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const Splitter = __webpack_require__(99);
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
/* 102 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const Splitter = __webpack_require__(99);
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
/* 103 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const And = __webpack_require__(92);
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
/* 104 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const And = __webpack_require__(92);
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
/* 105 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const And = __webpack_require__(92);
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
/* 106 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const And = __webpack_require__(92);
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
/* 107 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const And = __webpack_require__(92);
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
/* 108 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const Expression = __webpack_require__(83);
/**
 * Consume the specified state resolving the 'TOKEN' directive.
 * @param project Project context.
 * @param state Consumption state.
 */
const consume = (project, state) => {
    const directive = state.directive;
    const expression = Expression.consume(project, directive.right, state);
    if (expression) {
        const entry = project.local.get(directive.identifier);
        if (!directive.alias) {
            entry.pattern = project.coder.emitTokenPattern(directive.identity, expression);
        }
        else {
            entry.pattern = expression;
        }
    }
};
exports.consume = consume;
//# sourceMappingURL=token.js.map

/***/ }),
/* 109 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const Expression = __webpack_require__(83);
/**
 * Consume the specified state resolving the 'SKIP' directive.
 * @param project Project context.
 * @param state Consumption state.
 */
const consume = (project, state) => {
    const directive = state.directive;
    const expression = Expression.consume(project, directive.right, state);
    if (expression) {
        const entry = project.local.get(directive.identifier);
        entry.pattern = expression;
    }
};
exports.consume = consume;
//# sourceMappingURL=skip.js.map

/***/ }),
/* 110 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolve = void 0;
const Parser = __webpack_require__(69);
/**
 * Get an entry that corresponds to the specified symbol
 * @param project Project context.
 * @param symbol Entry symbol.
 * @returns Returns the corresponding entry or undefined when there are no entries matching the symbol name.
 */
const getEntry = (project, symbol) => {
    const entry = project.local.get(symbol.fragment.data);
    if (!entry) {
        if (symbol.value === 301 /* Node */ || symbol.value === 302 /* AliasNode */) {
            project.addError(symbol.node, 4105 /* UNRESOLVED_NODE_REFERENCE */);
        }
        else if (symbol.value === 300 /* Token */ || symbol.value === 303 /* AliasToken */) {
            project.addError(symbol.node, 4104 /* UNRESOLVED_TOKEN_REFERENCE */);
        }
        else {
            project.addError(symbol.node, 4115 /* INVALID_EXPORT */);
        }
    }
    return entry;
};
/**
 * Resolve the export directive for the given node and update the specified project.
 * @param project Project context.
 * @param node Input node.
 */
const resolve = (project, node) => {
    const current = node.right;
    if (current.value === 200 /* Identifier */) {
        const identifier = current.fragment.data;
        const symbol = node.table.find(identifier);
        if (!symbol) {
            project.addError(current, 4102 /* UNDEFINED_IDENTIFIER */);
        }
        else {
            const entry = getEntry(project, symbol);
            if (entry) {
                entry.exported = true;
            }
        }
        return true;
    }
    return false;
};
exports.resolve = resolve;
//# sourceMappingURL=export.js.map

/***/ }),
/* 111 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const Core = __webpack_require__(9);
const Directive = __webpack_require__(79);
const Expression = __webpack_require__(112);
/**
 * Emit a new node entry and replace the current node by an optimized one.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Consumption state.
 */
const emit = (project, direction, parent, state) => {
    const { origin, identifier, identity } = state.entry;
    const node = parent.getChild(direction);
    const entry = project.local.create(3 /* Node */, origin, identifier, identity, state.entry);
    const replacement = new Directive.Node(node, 2 /* Node */, entry);
    parent.setChild(direction, replacement);
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
    const entry = state.entry;
    entry.type = 3 /* Node */;
    entry.identifier = node.fragment.data;
    Expression.consume(project, 1 /* Right */, node, state);
    emit(project, direction, parent, state);
};
exports.consume = consume;
//# sourceMappingURL=node.js.map

/***/ }),
/* 112 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const Core = __webpack_require__(9);
const Parser = __webpack_require__(69);
const Reference = __webpack_require__(113);
const Mergeable = __webpack_require__(114);
const String = __webpack_require__(115);
const Range = __webpack_require__(118);
const Map = __webpack_require__(120);
const Access = __webpack_require__(121);
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
        case 235 /* Access */:
            Access.consume(project, direction, parent, state);
            break;
        case 211 /* Or */:
            Mergeable.consume(project, direction, parent, 211 /* Or */, state);
            break;
        case 212 /* And */:
            Mergeable.consume(project, direction, parent, 212 /* And */, state);
            break;
        default:
            (0, exports.consume)(project, 1 /* Right */, node, state);
    }
};
exports.consume = consume;
//# sourceMappingURL=expression.js.map

/***/ }),
/* 113 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const Identity = __webpack_require__(80);
const Parser = __webpack_require__(69);
/**
 * Update the specified node for an optimized one after resolving its reference.
 * @param project Project context.
 * @param entry Referenced entry.
 * @param parent Parent node.
 * @param node Reference node.
 * @param direction Node direction.
 */
const updateNode = (project, entry, parent, node, direction) => {
    if (!entry.dynamic) {
        parent.setChild(direction, new Identity.Node(node, entry.identity));
    }
    else {
        project.addError(node, 4112 /* INVALID_MAP_REFERENCE */);
    }
};
/**
 * Find and link the corresponding reference for the specified node.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns the dependency entry or undefined the dependency isn't ready yet.
 */
const linkReference = (project, node, state) => {
    const identifier = node.fragment.data;
    const dependency = project.local.get(identifier);
    if (dependency) {
        project.local.on(state.entry.identifier, (entry) => {
            entry.dependencies.push(dependency);
            dependency.dependents.push(entry);
        });
    }
    else {
        project.local.on(identifier, (dependency) => {
            const entry = project.local.get(state.entry.identifier);
            entry.dependencies.push(dependency);
            dependency.dependents.push(entry);
        });
    }
    return dependency;
};
/**
 * Resolve and validate the corresponding reference for the specified symbol and node in a 'SKIP' directive.
 * REMARKS: Skips can only accept alias tokens references.
 * @param project Project context.
 * @param node Input node.
 * @param symbol Referenced symbol.
 * @param state Consumption state.
 */
const resolveSkip = (project, node, symbol, state) => {
    if (symbol.value === 303 /* AliasToken */) {
        linkReference(project, node, state);
    }
    else if (symbol.value === 300 /* Token */) {
        project.addError(node, 4108 /* INVALID_TOKEN_REFERENCE */);
    }
    else if (symbol.value === 302 /* AliasNode */) {
        project.addError(node, 4111 /* INVALID_ALIAS_NODE_REFERENCE */);
    }
    else if (symbol.value === 301 /* Node */) {
        project.addError(node, 4109 /* INVALID_NODE_REFERENCE */);
    }
    else {
        project.addError(node, 4103 /* UNRESOLVED_IDENTIFIER */);
    }
};
/**
 * Resolve and validate the corresponding reference for the specified symbol and node in a 'TOKEN' directive.
 * REMARKS: Tokens can only accept tokens and alias tokens references.
 * @param project Project context.
 * @param node Input node.
 * @param symbol Referenced symbol.
 * @param state Consumption state.
 */
const resolveToken = (project, node, symbol, state) => {
    if (symbol.value === 300 /* Token */ || symbol.value === 303 /* AliasToken */) {
        linkReference(project, node, state);
    }
    else if (symbol.value === 301 /* Node */) {
        project.addError(node, 4109 /* INVALID_NODE_REFERENCE */);
    }
    else if (symbol.value === 302 /* AliasNode */) {
        project.addError(node, 4111 /* INVALID_ALIAS_NODE_REFERENCE */);
    }
    else {
        project.addError(node, 4103 /* UNRESOLVED_IDENTIFIER */);
    }
};
/**
 * Resolve and validate the corresponding reference for the specified symbol and node in a 'NODE' directive.
 * REMARKS: Nodes can only accept tokens, nodes and alias nodes references.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param symbol Referenced symbol.
 * @param state Consumption state.
 */
const resolveNode = (project, direction, parent, symbol, state) => {
    const node = parent.getChild(direction);
    if (symbol.value === 301 /* Node */ || symbol.value === 302 /* AliasNode */) {
        linkReference(project, node, state);
    }
    else if (symbol.value === 300 /* Token */) {
        const dependency = linkReference(project, node, state);
        if (dependency) {
            updateNode(project, dependency, parent, node, direction);
        }
        else {
            project.local.on(node.fragment.data, (entry) => {
                updateNode(project, entry, parent, node, direction);
            });
        }
    }
    else if (symbol.value === 303 /* AliasToken */) {
        project.addError(node, 4110 /* INVALID_ALIAS_TOKEN_REFERENCE */);
    }
    else {
        project.addError(node, 4103 /* UNRESOLVED_IDENTIFIER */);
    }
};
/**
 * Consume a child node from the AST on the given parent and optimize the reference pattern.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Consumption state.
 */
const consume = (project, direction, parent, state) => {
    const node = parent.getChild(direction);
    const identifier = node.fragment.data;
    const symbol = node.table.find(identifier);
    if (!symbol) {
        project.addError(node, 4102 /* UNDEFINED_IDENTIFIER */);
    }
    else {
        switch (state.entry.type) {
            case 1 /* Skip */:
                resolveSkip(project, node, symbol, state);
                break;
            case 2 /* Token */:
                resolveToken(project, node, symbol, state);
                break;
            case 3 /* Node */:
                resolveNode(project, direction, parent, symbol, state);
                break;
        }
    }
};
exports.consume = consume;
//# sourceMappingURL=reference.js.map

/***/ }),
/* 114 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const Core = __webpack_require__(9);
const Identity = __webpack_require__(80);
const Mergeable = __webpack_require__(88);
const Parser = __webpack_require__(69);
const Expression = __webpack_require__(112);
/**
 * Determines whether or not the given node contains mergeable units.
 * @param node Input node.
 * @param operator Mergeable node type.
 * @returns Returns true when the node is mergeable, false otherwise.
 */
const isMergeableUnits = (node, operator) => {
    if (node.value === operator) {
        if (!(node instanceof Mergeable.Node)) {
            return isMergeableUnits(node.left, operator) && isMergeableUnits(node.right, operator);
        }
        return false;
    }
    return node.value === 204 /* String */;
};
/**
 * Determines whether or not the given node contains mergeable references.
 * @param node Input node.
 * @param operator Mergeable node type.
 * @returns Returns true when the node is mergeable, false otherwise.
 */
const isMergeableRefs = (node, operator) => {
    if (node.value === operator) {
        if (!(node instanceof Mergeable.Node)) {
            return isMergeableRefs(node.left, operator) && isMergeableRefs(node.right, operator);
        }
        return false;
    }
    return node instanceof Identity.Node;
};
/**
 * Consume a child node from the AST on the given parent and optimize the mergeable pattern.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param type Mergeable node type.
 * @param state Context state.
 */
const consume = (project, direction, parent, type, state) => {
    const node = parent.getChild(direction);
    if (node.value !== type) {
        Expression.consume(project, direction, parent, state);
    }
    else if (state.entry.type === 3 /* Node */) {
        Expression.consume(project, 0 /* Left */, node, state);
        Expression.consume(project, 1 /* Right */, node, state);
        if (isMergeableRefs(node, type)) {
            parent.setChild(direction, new Mergeable.Node(node, 201 /* Reference */));
        }
    }
    else {
        if (isMergeableUnits(node, type)) {
            parent.setChild(direction, new Mergeable.Node(node, 204 /* String */));
        }
        else {
            Expression.consume(project, 0 /* Left */, node, state);
            Expression.consume(project, 1 /* Right */, node, state);
        }
    }
};
exports.consume = consume;
//# sourceMappingURL=mergeable.js.map

/***/ }),
/* 115 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const Loose = __webpack_require__(116);
const Nodes = __webpack_require__(119);
const Expression = __webpack_require__(112);
/**
 * Consume a child node from the AST on the given parent and optimize the string pattern.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Context state.
 */
const consume = (project, direction, parent, state) => {
    if (state.entry.type === 3 /* Node */) {
        const node = parent.getChild(direction);
        const name = node.fragment.data;
        const entry = Loose.resolve(project, node, state, name);
        const reference = Nodes.getReference(entry.identifier, node.table, node.fragment.location);
        parent.setChild(direction, reference);
        Expression.consume(project, direction, parent, state);
    }
};
exports.consume = consume;
//# sourceMappingURL=string.js.map

/***/ }),
/* 116 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolve = exports.collision = void 0;
const Core = __webpack_require__(9);
const Token = __webpack_require__(117);
const Context = __webpack_require__(75);
const Nodes = __webpack_require__(119);
/**
 * Emit a new loose token and returns the corresponding pattern entry.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @param name Entry name.
 * @returns Returns the generated pattern entry.
 */
const emit = (project, node, state, name) => {
    const temp = Context.getNewState(state.anchor, Context.getCount(project));
    const token = Nodes.getToken(`@REF${temp.entry.identity}`, node.table, node.fragment.location, node);
    temp.entry.origin = 1 /* Loose */;
    Token.consume(project, 1 /* Right */, token, temp);
    const entry = project.local.get(name);
    token.setChild(2 /* Next */, state.anchor.next);
    state.anchor.setChild(2 /* Next */, token);
    state.anchor = token;
    return entry;
};
/**
 * Determines whether or not there are an entry collision for the given name.
 * @param project Project context.
 * @param node Input node.
 * @param name Entry name.
 * @returns Returns true when the specified name already exists, false otherwise.
 */
const collision = (project, node, name) => {
    if (project.local.has(name)) {
        project.addError(node, 4116 /* TOKEN_COLLISION */);
        return true;
    }
    return false;
};
exports.collision = collision;
/**
 * Resolve the loose pattern entry for the given node.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @param name Entry name.
 * @returns Returns the loose pattern entry.
 */
const resolve = (project, node, state, name) => {
    const entry = project.local.get(name);
    if (entry) {
        if (entry.origin === 0 /* User */) {
            project.addError(node, 4116 /* TOKEN_COLLISION */);
        }
        return entry;
    }
    return emit(project, node, state, name);
};
exports.resolve = resolve;
//# sourceMappingURL=loose.js.map

/***/ }),
/* 117 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const Core = __webpack_require__(9);
const Directive = __webpack_require__(79);
const Parser = __webpack_require__(69);
const Loose = __webpack_require__(116);
const Expression = __webpack_require__(112);
const Range = __webpack_require__(118);
const String = __webpack_require__(115);
/**
 * Emit a new token entry and replace the current token node by an optimized one.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Consumption state.
 */
const emit = (project, direction, parent, state) => {
    const { origin, identifier, identity } = state.entry;
    const node = parent.getChild(direction);
    const entry = project.local.create(2 /* Token */, origin, identifier, identity, state.entry);
    const replacement = new Directive.Node(node, 1 /* Token */, entry);
    parent.setChild(direction, replacement);
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
    const expression = node.right;
    const entry = state.entry;
    entry.type = 2 /* Token */;
    entry.identifier = node.fragment.data;
    if (expression.value === 204 /* String */) {
        String.consume(project, 1 /* Right */, node, state);
        const word = expression.fragment.data;
        if (!Loose.collision(project, expression, word)) {
            emit(project, direction, parent, state);
            project.local.link(word, entry.identifier);
        }
    }
    else if (expression.value === 206 /* Range */) {
        Range.consume(project, 1 /* Right */, node, state);
        const range = `${expression.left.fragment.data}-${expression.right.fragment.data}`;
        if (!Loose.collision(project, expression, range)) {
            emit(project, direction, parent, state);
            project.local.link(range, entry.identifier);
        }
    }
    else {
        Expression.consume(project, 1 /* Right */, node, state);
        emit(project, direction, parent, state);
    }
};
exports.consume = consume;
//# sourceMappingURL=token.js.map

/***/ }),
/* 118 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const Loose = __webpack_require__(116);
const Nodes = __webpack_require__(119);
const Expression = __webpack_require__(112);
/**
 * Consume a child node from the AST on the given parent and optimize the range pattern.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Context state.
 */
const consume = (project, direction, parent, state) => {
    if (state.entry.type === 3 /* Node */) {
        const node = parent.getChild(direction);
        const name = `${node.left.fragment.data}-${node.right.fragment.data}`;
        const entry = Loose.resolve(project, node, state, name);
        const reference = Nodes.getReference(entry.identifier, node.table, node.fragment.location);
        parent.setChild(direction, reference);
        Expression.consume(project, direction, parent, state);
    }
};
exports.consume = consume;
//# sourceMappingURL=range.js.map

/***/ }),
/* 119 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getReference = exports.getToken = exports.getIdentifier = exports.getIdentity = void 0;
const Core = __webpack_require__(9);
const Parser = __webpack_require__(69);
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
    const record = new Core.Record(fragment, 300 /* Token */, node);
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
    const node = new Core.Node(fragment, 237 /* Token */, table);
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
/* 120 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const Core = __webpack_require__(9);
const Member = __webpack_require__(89);
const Mergeable = __webpack_require__(88);
const Identity = __webpack_require__(80);
const Parser = __webpack_require__(69);
const Context = __webpack_require__(75);
const Loose = __webpack_require__(116);
const Expression = __webpack_require__(112);
/**
 * Get the candidate node based on the given input node.
 * @param node Input node.
 * @param parent Node parent.
 * @returns Returns the candidate node or undefined when there's no candidates.
 */
const getCandidate = (node, parent) => {
    if (node.value !== 209 /* Then */ && node.value !== 211 /* Or */) {
        if (node.value === 204 /* String */ || node instanceof Identity.Node || node instanceof Mergeable.Node) {
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
    state.entry.dynamic = true;
    while (member) {
        const expression = member.right;
        if (expression.value === 200 /* Identifier */) {
            if (state.entry.type === 1 /* Skip */) {
                project.addError(expression, 4101 /* UNSUPPORTED_IDENTITY */);
                break;
            }
            const entry = state.entry;
            state.entry = Context.getNewStateEntry({
                type: entry.type,
                identity: expression.left ? parseInt(expression.left.fragment.data) : NaN || state.entry.identity,
                identifier: `${state.entry.identifier}@${expression.fragment.data}`
            });
            Expression.consume(project, 1 /* Right */, expression, state);
            const candidate = getCandidate(expression.right);
            if (!candidate) {
                project.addError(member, 4114 /* INVALID_MAP_ENTRY */);
            }
            else {
                if (candidate.value === 204 /* String */) {
                    Loose.collision(project, candidate, candidate.fragment.data);
                }
                const { type, origin, identifier, identity } = state.entry;
                const replacement = new Member.Node(expression.right, state.entry, candidate);
                project.local.create(type, origin, identifier, identity, state.entry);
                member.setChild(1 /* Right */, replacement);
            }
            state.entry = entry;
        }
        else {
            Expression.consume(project, 1 /* Right */, member, state);
            const candidate = getCandidate(member.right);
            if (!candidate) {
                project.addError(member, 4114 /* INVALID_MAP_ENTRY */);
            }
            else {
                if (candidate.value === 204 /* String */) {
                    Loose.collision(project, candidate, candidate.fragment.data);
                }
                const replacement = new Member.Node(member.right, state.entry, candidate);
                member.setChild(1 /* Right */, replacement);
            }
        }
        member = member.next;
    }
};
exports.consume = consume;
//# sourceMappingURL=map.js.map

/***/ }),
/* 121 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const Identity = __webpack_require__(80);
/**
 * Get all fragments from the given access node.
 * @param node Access node.
 * @returns Returns all the extracted path.
 */
const getPath = (node) => {
    if (node.left && node.right) {
        return [...getPath(node.left), ...getPath(node.right)];
    }
    else if (node.left) {
        return getPath(node.left);
    }
    else if (node.right) {
        return getPath(node.right);
    }
    return [node.fragment.data];
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
    const path = getPath(node);
    const identifier = path.join('@');
    if (state.entry.type !== 3 /* Node */ || project.local.get(identifier)?.type === 3 /* Node */) {
        project.addError(node, 4113 /* INVALID_MAP_ENTRY_REFERENCE */);
    }
    else {
        const directive = project.local.get(path[0]);
        const member = project.local.get(identifier);
        if (!directive || !member) {
            project.addError(node, 4102 /* UNDEFINED_IDENTIFIER */);
        }
        else if (member.dynamic) {
            project.addError(node, 4112 /* INVALID_MAP_REFERENCE */);
        }
        else if (directive.alias) {
            project.addError(node, 4113 /* INVALID_MAP_ENTRY_REFERENCE */);
        }
        else {
            parent.setChild(direction, new Identity.Node(node, member.identity));
        }
    }
};
exports.consume = consume;
//# sourceMappingURL=access.js.map

/***/ }),
/* 122 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consume = void 0;
const Core = __webpack_require__(9);
const Directive = __webpack_require__(79);
const Expression = __webpack_require__(112);
/**
 * Emit a new skip entry and replace the current skip node by an optimized one.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Consumption state.
 */
const emit = (project, direction, parent, state) => {
    const { origin, identifier, identity } = state.entry;
    const node = parent.getChild(direction);
    const entry = project.local.create(1 /* Skip */, origin, identifier, identity, state.entry);
    const replacement = new Directive.Node(node, 0 /* Skip */, entry);
    parent.setChild(direction, replacement);
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
    const entry = state.entry;
    entry.type = 1 /* Skip */;
    entry.identifier = `@SKIP${entry.identity}`;
    Expression.consume(project, 1 /* Right */, node, state);
    emit(project, direction, parent, state);
};
exports.consume = consume;
//# sourceMappingURL=skip.js.map

/***/ }),
/* 123 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.tokenize = void 0;
const Core = __webpack_require__(9);
const Lang = __webpack_require__(60);
const Console = __webpack_require__(3);
const Tokens = __webpack_require__(124);
/**
 * Tokenize the given input source.
 * @param text Input text.
 * @param context Consumption context.
 * @param tokens Determines whether or not the debug mode is active fot tokens.
 * @returns Returns true in case of success, false otherwise.
 */
const tokenize = (program, text, context, tokens) => {
    const source = new Core.TextSource(text, context);
    Console.printLine('Tokenizing...');
    if (!program.consume(source)) {
        context.addError(source.fragment, 4097 /* UNEXPECTED_TOKEN */);
    }
    else {
        Console.clearLine();
    }
    if (tokens) {
        Tokens.print(context.tokens);
    }
    return context.errors.length === 0;
};
exports.tokenize = tokenize;


/***/ }),
/* 124 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.print = void 0;
const Console = __webpack_require__(3);
const Fragment = __webpack_require__(125);
/**
 * Print a list for the given tokens.
 * @param tokens Input tokens.
 */
const print = (tokens) => {
    Console.printLine('Tokens:');
    for (const token of tokens) {
        const location = Fragment.getLocation(token.fragment);
        const message = Fragment.getMessage(token.fragment);
        const code = token.value.toString().padStart(4, '0');
        Console.printLine(` ${location} ${code} "${message}"`);
    }
    Console.printLine('');
};
exports.print = print;


/***/ }),
/* 125 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getLocation = exports.getMessage = void 0;
/**
 * Get the formatted fragment message.
 * @param fragment Input fragment.
 * @returns Returns the fragment message.
 */
const getMessage = (fragment) => {
    return fragment.data.replace(/\n/g, '\\n');
};
exports.getMessage = getMessage;
/**
 * Get the formatted fragment location.
 * @param fragment Input fragment.
 * @returns Returns the fragment location.
 */
const getLocation = (fragment) => {
    const location = fragment.location;
    const line = location.line.toString();
    const column = location.column.toString();
    return `${line.padStart(4, ' ')}:${column.padEnd(4, ' ')}`;
};
exports.getLocation = getLocation;


/***/ }),
/* 126 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parse = void 0;
const Core = __webpack_require__(9);
const Lang = __webpack_require__(60);
const Console = __webpack_require__(3);
const Symbols = __webpack_require__(127);
const Nodes = __webpack_require__(128);
/**
 * Parse the given input tokens.
 * @param tokens Input tokens.
 * @param context Consumption context.
 * @param symbols Determines whether or not the debug mode is active.
 * @param nodes Determines whether or not the debug mode is active.
 * @returns Returns true in case of success, false otherwise.
 */
const parse = (program, tokens, context, symbols, nodes) => {
    const source = new Core.TokenSource(tokens, context);
    Console.printLine('Parsing...');
    if (!program.consume(source)) {
        const fragment = tokens[source.longestState.offset]?.fragment ?? source.fragment;
        context.addError(fragment, 4098 /* UNEXPECTED_SYNTAX */);
    }
    else {
        Console.clearLine();
    }
    if (symbols) {
        Symbols.print(context.table);
    }
    if (nodes) {
        Nodes.print(context.node);
    }
    return context.errors.length === 0;
};
exports.parse = parse;


/***/ }),
/* 127 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.print = void 0;
const Console = __webpack_require__(3);
const Fragment = __webpack_require__(125);
/**
 * Print all the symbols in the given table.
 * @param table Symbol table.
 * @param deep Input depth.
 */
const printTable = (table, deep) => {
    const scope = (deep > 0 ? 'Inner' : 'Global').padEnd(7, ' ');
    const padding = deep > 0 ? '   '.repeat(deep - 1) : '';
    const level = deep.toString().padStart(3, ' ');
    let index = 1;
    for (const record of table) {
        const value = record.value;
        const identifier = record.fragment.data;
        const location = Fragment.getLocation(record.fragment);
        const connector = deep > 0 ? (index === table.length ? ' └─ ' : ' ├─ ') : ' ';
        Console.printLine(` ${location} ${scope} ${level} ${value} ${padding}${connector}${identifier}`);
        if (record.link) {
            printTable(record.link, deep + 1);
        }
        index++;
    }
};
/**
 * Print all the symbol for the given symbol table.
 * @param table Symbol table.
 */
const print = (table) => {
    Console.printLine('Symbols:\n');
    printTable(table, 0);
    Console.printLine('');
};
exports.print = print;


/***/ }),
/* 128 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.print = void 0;
const Core = __webpack_require__(9);
const Console = __webpack_require__(3);
const Fragment = __webpack_require__(125);
/**
 * Get the node indent based on the specified state.
 * @param state Determines whether or not there are next nodes.
 * @returns Returns the node indent.
 */
const getIndent = (state) => {
    return state ? '│  ' : '   ';
};
/**
 * Get the node prefix based on the specified state.
 * @param state Determines whether or not there are next nodes.
 * @returns Returns the node prefix.
 */
const getPrefix = (state) => {
    return state ? '├─ ' : '└─ ';
};
/**
 * Get the node name based on the given direction.
 * @param direction Node direction.
 * @returns Returns the node name.
 */
const getName = (direction) => {
    switch (direction) {
        case 0 /* Left */:
            return 'L';
        case 1 /* Right */:
            return 'R';
        case 2 /* Next */:
            return 'N';
    }
};
/**
 * Print recursively all the child nodes in the given parent node.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param prefix Node prefix.
 * @param indent Node ident.
 */
const printTree = (direction, parent, prefix, indent) => {
    const node = parent.getChild(direction);
    const fragment = Fragment.getMessage(node.fragment);
    const location = Fragment.getLocation(node.fragment);
    const code = node.value.toString();
    const name = getName(direction);
    Console.printLine(` ${location} ${prefix}${name} ${code} "${fragment}"`);
    if (node.left) {
        const state = node.right !== void 0 || node.next !== void 0;
        printTree(0 /* Left */, node, indent + getPrefix(state), indent + getIndent(state));
    }
    if (node.right) {
        const state = node.next !== void 0;
        printTree(1 /* Right */, node, indent + getPrefix(state), indent + getIndent(state));
    }
    if (node.next) {
        printTree(2 /* Next */, node, indent, indent);
    }
};
/**
 * Print the corresponding tree for the given node.
 * @param node Input node.
 */
const print = (node) => {
    if (node.next) {
        Console.printLine('Nodes:\n');
        printTree(2 /* Next */, node, '', '');
        Console.printLine('');
    }
};
exports.print = print;


/***/ }),
/* 129 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.print = exports.getMessage = void 0;
const Lang = __webpack_require__(60);
const Console = __webpack_require__(3);
/**
 * All supported errors.
 */
const errorMessages = {
    [4096 /* DUPLICATE_IDENTIFIER */]: "Duplicate identifier '{0}' at line {1}, column {2}.",
    [4097 /* UNEXPECTED_TOKEN */]: "Unexpected token '{0}' at line {1}, column {2}.",
    [4098 /* UNEXPECTED_SYNTAX */]: "Unexpected syntax '{0}' at line {1}, column {2}.",
    [4099 /* UNEXPECTED_NODE */]: "Unexpected node '{0}' at line {1}, column {2}.",
    [4100 /* UNSUPPORTED_NODE */]: "Unsupported node '{0}' at line {1}, column {2}.",
    [4101 /* UNSUPPORTED_IDENTITY */]: "Unsupported identity '{0}' at line {1}, column {2}.",
    [4102 /* UNDEFINED_IDENTIFIER */]: "Undefined identifiers cannot be referenced, '{0}' at line {1}, column {2}.",
    [4103 /* UNRESOLVED_IDENTIFIER */]: "Unresolved identifiers cannot be referenced, '{0}' at line {1}, column {2}.",
    [4104 /* UNRESOLVED_TOKEN_REFERENCE */]: "Token reference is not resolved yet, '{0}' at line {1}, column {2}.",
    [4105 /* UNRESOLVED_NODE_REFERENCE */]: "Node reference is not resolved yet, '{0}' at line {1}, column {2}.",
    [4106 /* UNRESOLVED_ALIAS_TOKEN_REFERENCE */]: "Alias Token reference is not resolved yet, '{0}' at line {1}, column {2}.",
    [4107 /* UNRESOLVED_ALIAS_NODE_REFERENCE */]: "Alias Node reference is not resolved yet, '{0}' at line {1}, column {2}.",
    [4108 /* INVALID_TOKEN_REFERENCE */]: "Token reference cannot be in use here, '{0}' at line {1}, column {2}.",
    [4109 /* INVALID_NODE_REFERENCE */]: "Node reference cannot be in use here, '{0}' at line {1}, column {2}.",
    [4110 /* INVALID_ALIAS_TOKEN_REFERENCE */]: "Alias Token reference cannot be in use here, '{0}' at line {1}, column {2}.",
    [4111 /* INVALID_ALIAS_NODE_REFERENCE */]: "Alias Node reference cannot be in use here, '{0}' at line {1}, column {2}.",
    [4112 /* INVALID_MAP_REFERENCE */]: "Map cannot be referenced here, '{0}' at line {1}, column {2}.",
    [4113 /* INVALID_MAP_ENTRY_REFERENCE */]: "Map entries cannot be referenced here, '{0}' at line {1}, column {2}.",
    [4114 /* INVALID_MAP_ENTRY */]: "Map entries must start with tokens or strings, '{0}' at line {1}, column {2}.",
    [4115 /* INVALID_EXPORT */]: "Exportation of '{0}' is invalid at line {1}, column {2}.",
    [4116 /* TOKEN_COLLISION */]: "Multiple tokens with the same expression, '{0}' at line {1}, column {2}.",
    [4117 /* IMPORT_DISABLED */]: 'Import feature disabled, {0} at line {1}, column {2}.',
    [4118 /* IMPORT_NOT_FOUND */]: "File doesn't found, {0} at line {1}, column {2}.",
    [4119 /* IMPORT_FAILURE */]: 'Failed to compile, {0} at line {1}, column {2}.'
};
/**
 * Get the corresponding error message based on the given error object.
 * @param error Input error.
 * @returns Returns the corresponding error message.
 * @throws Throws an error when the specified error isn't supported.
 */
const getMessage = (error) => {
    const template = errorMessages[error.value];
    if (!template) {
        throw `Error value ${error.value} is not supported.`;
    }
    const fragment = error.fragment;
    const location = fragment.location;
    return template.replace(/(\{[0-2]\})/g, (match) => {
        switch (match) {
            case '{0}':
                return fragment.data.replace(/\n/g, '\\n');
            case '{1}':
                return (location.line.begin + 1).toString();
            case '{2}':
                return (location.column.begin + 1).toString();
        }
        return match;
    });
};
exports.getMessage = getMessage;
/**
 * Print all the given errors.
 * @param errors Error list.
 */
const print = (errors) => {
    Console.printLine('Errors:');
    for (const error of errors) {
        Console.printLine(`  ${error.fragment.location.name}: ${(0, exports.getMessage)(error)}`);
    }
    Console.printLine('');
};
exports.print = print;


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
const Options = __webpack_require__(1);
const Help = __webpack_require__(2);
const Version = __webpack_require__(6);
const Make = __webpack_require__(7);
try {
    const flags = Options.getFlags(process.argv.slice(2));
    if (flags.help) {
        Help.print();
    }
    else if (flags.version) {
        Version.print();
    }
    else {
        const source = flags.source ? flags.source : 0;
        const target = flags.target ? flags.target : 1;
        Make.perform(source, target, !!flags.run, flags.debug);
    }
}
catch (ex) {
    console.log(ex.message ?? ex);
}

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=xcm.js.map