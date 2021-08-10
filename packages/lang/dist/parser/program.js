"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Program = void 0;
const Core = require("@xcheme/core");
const Lexer = require("../lexer");
const binary_1 = require("./patterns/binary");
const unary_1 = require("./patterns/unary");
const expression = new Core.ExpectFlowPattern(
// Or expressions
new binary_1.default(new Core.MapFlowPattern(new Core.SetValueRoute(209 /* Or */, 119 /* Or */)), 
// And expressions
new binary_1.default(new Core.MapFlowPattern(new Core.SetValueRoute(210 /* And */, 118 /* And */)), 
// Unary operations
new unary_1.default(new Core.MapFlowPattern(new Core.SetValueRoute(211 /* Not */, 106 /* Not */), new Core.SetValueRoute(212 /* Opt */, 107 /* Opt */), new Core.SetValueRoute(213 /* Rep */, 108 /* Rep */), new Core.SetValueRoute(214 /* Place */, 109 /* Place */), new Core.SetValueRoute(215 /* Pivot */, 110 /* Pivot */), new Core.SetValueRoute(216 /* Append */, 111 /* Append */), new Core.SetValueRoute(217 /* Prepend */, 112 /* Prepend */), new Core.SetValueRoute(218 /* PlaceNext */, 109 /* Place */, 113 /* Next */), new Core.SetValueRoute(219 /* AppendNext */, 111 /* Append */, 113 /* Next */), new Core.SetValueRoute(220 /* PrependNext */, 112 /* Prepend */, 113 /* Next */), new Core.SetValueRoute(221 /* PlaceLeft */, 109 /* Place */, 114 /* Left */), new Core.SetValueRoute(222 /* AppendLeft */, 111 /* Append */, 114 /* Left */), new Core.SetValueRoute(223 /* PrependLeft */, 112 /* Prepend */, 114 /* Left */), new Core.SetValueRoute(224 /* PlaceRight */, 109 /* Place */, 115 /* Right */), new Core.SetValueRoute(225 /* AppendRight */, 111 /* Append */, 115 /* Right */), new Core.SetValueRoute(226 /* PrependRight */, 112 /* Prepend */, 115 /* Right */), new Core.SetValueRoute(227 /* Symbol */, 116 /* Symbol */), new Core.SetValueRoute(228 /* Scope */, 117 /* Scope */)), new Core.ChooseFlowPattern(
// Range
new Core.PlaceNodePattern(1 /* Right */, new Core.ExpectUnitPattern(104 /* From */), new Core.AppendNodePattern(Core.BaseSource.Output, 1 /* Right */, 1 /* Right */, new Core.SetValuePattern(232 /* Alphabet */, new Core.ExpectUnitPattern(102 /* Alphabet */))), new Core.PivotNodePattern(231 /* Range */, 1 /* Right */, 0 /* Left */, new Core.SetValuePattern(231 /* Range */, new Core.ExpectUnitPattern(105 /* To */)), new Core.AppendNodePattern(Core.BaseSource.Output, 1 /* Right */, 1 /* Right */, new Core.SetValuePattern(232 /* Alphabet */, new Core.ExpectUnitPattern(102 /* Alphabet */))))), 
// Any, Alphabet & Reference
new Core.AppendNodePattern(Core.BaseSource.Output, 1 /* Right */, 1 /* Right */, new Core.MapFlowPattern(new Core.SetValueRoute(230 /* Any */, 103 /* Any */), new Core.SetValueRoute(232 /* Alphabet */, 102 /* Alphabet */), new Core.SetValueRoute(229 /* Reference */, 100 /* Identifier */))), 
// Group
new Core.PlaceNodePattern(1 /* Right */, new Core.ExpectFlowPattern(new Core.ExpectUnitPattern(128 /* OpenParentheses */), new Core.RunFlowPattern(() => expression), new Core.ExpectUnitPattern(129 /* CloseParentheses */))))))), 
// Condition
new Core.OptionFlowPattern(new Core.PivotNodePattern(207 /* Then */, 1 /* Right */, 0 /* Left */, new Core.ExpectUnitPattern(120 /* Then */), new Core.RunFlowPattern(() => expression), new Core.OptionFlowPattern(new Core.PivotNodePattern(208 /* Else */, 1 /* Right */, 0 /* Left */, new Core.ExpectUnitPattern(121 /* Else */), new Core.RunFlowPattern(() => expression))))));
const identity = new Core.ExpectFlowPattern(new Core.ExpectUnitPattern(130 /* OpenChevron */), new Core.AppendNodePattern(201 /* Identity */, 0 /* Left */, 1 /* Right */, new Core.ExpectUnitPattern(101 /* Number */), new Core.ExpectUnitPattern(131 /* CloseChevron */)));
const token = new Core.ExpectFlowPattern(new Core.OptionFlowPattern(identity), new Core.EmitSymbolPattern(300 /* Token */, new Core.PivotNodePattern(200 /* Identifier */, 1 /* Right */, 0 /* Left */, new Core.ExpectUnitPattern(100 /* Identifier */)), new Core.ExpectUnitPattern(126 /* As */), new Core.PlaceNodePattern(1 /* Right */, expression)));
const node = new Core.ExpectFlowPattern(new Core.OptionFlowPattern(identity), new Core.EmitSymbolPattern(301 /* Node */, new Core.PivotNodePattern(200 /* Identifier */, 1 /* Right */, 0 /* Left */, new Core.ExpectUnitPattern(100 /* Identifier */)), new Core.ExpectUnitPattern(126 /* As */), new Core.PlaceNodePattern(1 /* Right */, expression)));
/**
 * Main parser program.
 */
exports.Program = new Core.ExpectFlowPattern(new Core.OptionFlowPattern(new Core.RepeatFlowPattern(new Core.ChooseFlowPattern(new Core.EmitNodePattern(Core.BaseSource.Output, 1 /* Right */, new Core.MapFlowPattern(new Core.SetValueRoute(202 /* Skip */, expression, 122 /* Skip */), new Core.SetValueRoute(204 /* Token */, token, 124 /* Token */), new Core.SetValueRoute(203 /* Node */, node, 125 /* Node */), new Core.SetValueRoute(206 /* AliasToken */, token, 123 /* Alias */, 124 /* Token */), new Core.SetValueRoute(205 /* AliasNode */, node, 123 /* Alias */, 125 /* Node */))), new Core.ExpectUnitPattern(127 /* Semicolon */)))), new Core.EndFlowPattern());
//# sourceMappingURL=program.js.map