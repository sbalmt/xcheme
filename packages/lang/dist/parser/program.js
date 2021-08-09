"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Program = void 0;
const Core = require("@xcheme/core");
const Lexer = require("../lexer");
const binary_1 = require("./patterns/binary");
const unary_1 = require("./patterns/unary");
/**
 * Main parser program.
 */
const expression = new Core.ExpectFlowPattern(
// Or expressions
new binary_1.default(new Core.MapFlowPattern(new Core.SetValueRoute(208 /* Or */, 116 /* Or */)), 
// And expressions
new binary_1.default(new Core.MapFlowPattern(new Core.SetValueRoute(209 /* And */, 115 /* And */)), 
// Unary operations
new unary_1.default(new Core.MapFlowPattern(new Core.SetValueRoute(210 /* Not */, 105 /* Not */), new Core.SetValueRoute(211 /* Opt */, 106 /* Opt */), new Core.SetValueRoute(212 /* Rep */, 107 /* Rep */), new Core.SetValueRoute(213 /* Place */, 108 /* Place */), new Core.SetValueRoute(214 /* Pivot */, 109 /* Pivot */), new Core.SetValueRoute(215 /* Append */, 110 /* Append */), new Core.SetValueRoute(216 /* Prepend */, 111 /* Prepend */), new Core.SetValueRoute(217 /* PlaceNext */, 108 /* Place */, 112 /* Next */), new Core.SetValueRoute(218 /* AppendNext */, 110 /* Append */, 112 /* Next */), new Core.SetValueRoute(219 /* PrependNext */, 111 /* Prepend */, 112 /* Next */), new Core.SetValueRoute(220 /* Symbol */, 113 /* Symbol */), new Core.SetValueRoute(221 /* Scope */, 114 /* Scope */)), new Core.ChooseFlowPattern(
// Range
new Core.PlaceNodePattern(1 /* Right */, new Core.ExpectUnitPattern(103 /* From */), new Core.AppendNodePattern(Core.BaseSource.Output, 1 /* Right */, 1 /* Right */, new Core.SetValuePattern(225 /* Alphabet */, new Core.ExpectUnitPattern(101 /* Alphabet */))), new Core.PivotNodePattern(224 /* Range */, 1 /* Right */, 0 /* Left */, new Core.SetValuePattern(224 /* Range */, new Core.ExpectUnitPattern(104 /* To */)), new Core.AppendNodePattern(Core.BaseSource.Output, 1 /* Right */, 1 /* Right */, new Core.SetValuePattern(225 /* Alphabet */, new Core.ExpectUnitPattern(101 /* Alphabet */))))), 
// Any & Alphabet
new Core.AppendNodePattern(Core.BaseSource.Output, 1 /* Right */, 1 /* Right */, new Core.MapFlowPattern(new Core.SetValueRoute(223 /* Any */, 102 /* Any */), new Core.SetValueRoute(225 /* Alphabet */, 101 /* Alphabet */))), 
// Group
new Core.PlaceNodePattern(1 /* Right */, new Core.ExpectFlowPattern(new Core.ExpectUnitPattern(125 /* OpenParentheses */), new Core.RunFlowPattern(() => expression), new Core.ExpectUnitPattern(126 /* CloseParentheses */))), 
// Reference
new Core.ExpectFlowPattern(new Core.ExpectUnitPattern(127 /* OpenChevron */), new Core.AppendNodePattern(222 /* Reference */, 1 /* Right */, 1 /* Right */, new Core.ExpectUnitPattern(100 /* Identifier */)), new Core.ExpectUnitPattern(128 /* CloseChevron */)))))), 
// Condition
new Core.OptionFlowPattern(new Core.PivotNodePattern(206 /* Then */, 1 /* Right */, 0 /* Left */, new Core.ExpectUnitPattern(117 /* Then */), new Core.RunFlowPattern(() => expression), new Core.OptionFlowPattern(new Core.PivotNodePattern(207 /* Else */, 1 /* Right */, 0 /* Left */, new Core.ExpectUnitPattern(118 /* Else */), new Core.RunFlowPattern(() => expression))))));
const tokenStatement = new Core.ExpectFlowPattern(new Core.EmitSymbolPattern(300 /* Token */, new Core.AppendNodePattern(200 /* Identifier */, 1 /* Right */, 1 /* Right */, new Core.ExpectUnitPattern(100 /* Identifier */))), new Core.ExpectUnitPattern(123 /* As */), new Core.PlaceNodePattern(1 /* Right */, expression));
const nodeStatement = new Core.ExpectFlowPattern(new Core.EmitSymbolPattern(301 /* Node */, new Core.AppendNodePattern(200 /* Identifier */, 1 /* Right */, 1 /* Right */, new Core.ExpectUnitPattern(100 /* Identifier */))), new Core.ExpectUnitPattern(123 /* As */), new Core.PlaceNodePattern(1 /* Right */, expression));
exports.Program = new Core.ExpectFlowPattern(new Core.OptionFlowPattern(new Core.RepeatFlowPattern(new Core.ChooseFlowPattern(new Core.EmitNodePattern(Core.BaseSource.Output, 1 /* Right */, new Core.MapFlowPattern(new Core.SetValueRoute(201 /* Skip */, expression, 119 /* Skip */), new Core.SetValueRoute(203 /* Token */, tokenStatement, 121 /* Token */), new Core.SetValueRoute(202 /* Node */, nodeStatement, 122 /* Node */), new Core.Route(new Core.MapFlowPattern(new Core.SetValueRoute(205 /* AliasToken */, tokenStatement, 121 /* Token */), new Core.SetValueRoute(204 /* AliasNode */, nodeStatement, 122 /* Node */)), 120 /* Alias */))), new Core.ExpectUnitPattern(124 /* Semicolon */)))), new Core.EndFlowPattern());
//# sourceMappingURL=program.js.map