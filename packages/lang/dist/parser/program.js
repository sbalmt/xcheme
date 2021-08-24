"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Program = void 0;
const Core = require("@xcheme/core");
const Lexer = require("../lexer");
const binary_1 = require("./patterns/binary");
const unary_1 = require("./patterns/unary");
/**
 * Identity pattern.
 */
const identity = new Core.ExpectFlowPattern(new Core.ExpectUnitPattern(133 /* OpenChevron */), new Core.AppendNodePattern(202 /* Identity */, 0 /* Left */, 1 /* Right */, new Core.ExpectUnitPattern(101 /* Number */), new Core.ExpectUnitPattern(134 /* CloseChevron */)));
/**
 * Expression pattern.
 */
const expression = new Core.ExpectFlowPattern(
// Or expressions
new binary_1.default(new Core.MapFlowPattern(new Core.SetValueRoute(208 /* Or */, 108 /* Or */)), 
// And expressions
new binary_1.default(new Core.MapFlowPattern(new Core.SetValueRoute(209 /* And */, 109 /* And */)), 
// Unary operations
new unary_1.default(new Core.MapFlowPattern(new Core.SetValueRoute(210 /* Not */, 110 /* Not */), new Core.SetValueRoute(211 /* Opt */, 111 /* Opt */), new Core.SetValueRoute(212 /* Repeat */, 112 /* Repeat */), new Core.SetValueRoute(216 /* Place */, 113 /* Place */), new Core.SetValueRoute(225 /* Pivot */, 116 /* Pivot */), new Core.SetValueRoute(220 /* Append */, 114 /* Append */), new Core.SetValueRoute(224 /* Prepend */, 115 /* Prepend */), new Core.SetValueRoute(213 /* PlaceNext */, 113 /* Place */, 117 /* Next */), new Core.SetValueRoute(217 /* AppendNext */, 114 /* Append */, 117 /* Next */), new Core.SetValueRoute(221 /* PrependNext */, 115 /* Prepend */, 117 /* Next */), new Core.SetValueRoute(214 /* PlaceLeft */, 113 /* Place */, 118 /* Left */), new Core.SetValueRoute(218 /* AppendLeft */, 114 /* Append */, 118 /* Left */), new Core.SetValueRoute(222 /* PrependLeft */, 115 /* Prepend */, 118 /* Left */), new Core.SetValueRoute(215 /* PlaceRight */, 113 /* Place */, 119 /* Right */), new Core.SetValueRoute(219 /* AppendRight */, 114 /* Append */, 119 /* Right */), new Core.SetValueRoute(223 /* PrependRight */, 115 /* Prepend */, 119 /* Right */), new Core.SetValueRoute(226 /* Symbol */, 120 /* Symbol */), new Core.SetValueRoute(227 /* Scope */, 121 /* Scope */), new Core.SetValueRoute(228 /* Error */, identity, 122 /* Error */), new Core.SetValueRoute(229 /* Has */, identity, 123 /* Has */), new Core.SetValueRoute(230 /* Set */, identity, 124 /* Set */)), new Core.ChooseFlowPattern(
// Range
new Core.PlaceNodePattern(1 /* Right */, new Core.ExpectUnitPattern(104 /* From */), new Core.AppendNodePattern(203 /* String */, 1 /* Right */, 1 /* Right */, new Core.ExpectUnitPattern(102 /* String */)), new Core.PivotNodePattern(205 /* Range */, 1 /* Right */, 0 /* Left */, new Core.ExpectUnitPattern(105 /* To */), new Core.AppendNodePattern(203 /* String */, 1 /* Right */, 1 /* Right */, new Core.ExpectUnitPattern(102 /* String */)))), 
// Any, String & Reference
new Core.AppendNodePattern(Core.BaseSource.Output, 1 /* Right */, 1 /* Right */, new Core.MapFlowPattern(new Core.SetValueRoute(204 /* Any */, 103 /* Any */), new Core.SetValueRoute(203 /* String */, 102 /* String */), new Core.SetValueRoute(201 /* Reference */, 100 /* Identifier */))), 
// Group
new Core.PlaceNodePattern(1 /* Right */, new Core.ExpectFlowPattern(new Core.ExpectUnitPattern(131 /* OpenParentheses */), new Core.RunFlowPattern(() => expression), new Core.ExpectUnitPattern(132 /* CloseParentheses */))))))), 
// Condition
new Core.OptFlowPattern(new Core.PivotNodePattern(206 /* Then */, 1 /* Right */, 0 /* Left */, new Core.ExpectUnitPattern(106 /* Then */), new Core.RunFlowPattern(() => expression), new Core.OptFlowPattern(new Core.PivotNodePattern(207 /* Else */, 1 /* Right */, 0 /* Left */, new Core.ExpectUnitPattern(107 /* Else */), new Core.RunFlowPattern(() => expression))))));
/**
 * Token directive pattern.
 */
const token = new Core.ExpectFlowPattern(new Core.OptFlowPattern(identity), new Core.EmitSymbolPattern(300 /* Token */, new Core.PivotNodePattern(200 /* Identifier */, 1 /* Right */, 0 /* Left */, new Core.ExpectUnitPattern(100 /* Identifier */)), new Core.ExpectUnitPattern(129 /* As */), new Core.PlaceNodePattern(1 /* Right */, expression)));
/**
 * Node directive pattern.
 */
const node = new Core.ExpectFlowPattern(new Core.OptFlowPattern(identity), new Core.EmitSymbolPattern(301 /* Node */, new Core.PivotNodePattern(200 /* Identifier */, 1 /* Right */, 0 /* Left */, new Core.ExpectUnitPattern(100 /* Identifier */)), new Core.ExpectUnitPattern(129 /* As */), new Core.PlaceNodePattern(1 /* Right */, expression)));
/**
 * Main parser pattern.
 */
exports.Program = new Core.ExpectFlowPattern(new Core.OptFlowPattern(new Core.RepeatFlowPattern(new Core.ChooseFlowPattern(new Core.EmitNodePattern(Core.BaseSource.Output, 1 /* Right */, new Core.MapFlowPattern(new Core.SetValueRoute(231 /* Skip */, expression, 125 /* Skip */), new Core.SetValueRoute(233 /* Token */, token, 126 /* Token */), new Core.SetValueRoute(232 /* Node */, node, 127 /* Node */), new Core.SetValueRoute(235 /* AliasToken */, token, 128 /* Alias */, 126 /* Token */), new Core.SetValueRoute(234 /* AliasNode */, node, 128 /* Alias */, 127 /* Node */)), new Core.ExpectUnitPattern(130 /* Semicolon */))))), new Core.EndFlowPattern());
//# sourceMappingURL=program.js.map