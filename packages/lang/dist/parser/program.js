"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Program = void 0;
const Core = require("@xcheme/core");
const Lexer = require("../lexer");
const directive_1 = require("./patterns/directive");
const binary_1 = require("./patterns/binary");
const unary_1 = require("./patterns/unary");
/**
 * Identity pattern.
 */
const identity = new Core.ExpectFlowPattern(new Core.ExpectUnitPattern(139 /* OpenChevron */), new Core.AppendNodePattern(202 /* Identity */, 0 /* Left */, 1 /* Right */, new Core.ChooseUnitPattern(101 /* Number */, 130 /* Auto */), new Core.ExpectUnitPattern(140 /* CloseChevron */)));
/**
 * State pattern.
 */
const state = new Core.ExpectFlowPattern(new Core.ExpectUnitPattern(139 /* OpenChevron */), new Core.AppendNodePattern(203 /* State */, 0 /* Left */, 1 /* Right */, new Core.ExpectUnitPattern(101 /* Number */), new Core.ExpectUnitPattern(140 /* CloseChevron */)));
/**
 * Unary operators pattern.
 */
const unaryOperators = new Core.MapFlowPattern(new Core.SetValueRoute(214 /* Not */, 111 /* Not */), new Core.SetValueRoute(215 /* Opt */, 112 /* Opt */), new Core.SetValueRoute(216 /* Repeat */, 113 /* Repeat */), new Core.SetValueRoute(217 /* PlaceNext */, 114 /* Place */, 118 /* Next */), new Core.SetValueRoute(218 /* PlaceLeft */, 114 /* Place */, 119 /* Left */), new Core.SetValueRoute(219 /* PlaceRight */, 114 /* Place */, 120 /* Right */), new Core.SetValueRoute(220 /* Place */, 114 /* Place */), new Core.SetValueRoute(221 /* AppendNext */, 115 /* Append */, 118 /* Next */), new Core.SetValueRoute(222 /* AppendLeft */, 115 /* Append */, 119 /* Left */), new Core.SetValueRoute(223 /* AppendRight */, 115 /* Append */, 120 /* Right */), new Core.SetValueRoute(224 /* Append */, 115 /* Append */), new Core.SetValueRoute(225 /* PrependNext */, 116 /* Prepend */, 118 /* Next */), new Core.SetValueRoute(226 /* PrependLeft */, 116 /* Prepend */, 119 /* Left */), new Core.SetValueRoute(227 /* PrependRight */, 116 /* Prepend */, 120 /* Right */), new Core.SetValueRoute(228 /* Prepend */, 116 /* Prepend */), new Core.SetValueRoute(229 /* Pivot */, 117 /* Pivot */), new Core.SetValueRoute(230 /* Symbol */, 121 /* Symbol */), new Core.SetValueRoute(231 /* Scope */, 122 /* Scope */), new Core.SetValueRoute(232 /* Error */, state, 123 /* Error */), new Core.SetValueRoute(233 /* Has */, state, 124 /* Has */), new Core.SetValueRoute(234 /* Set */, state, 125 /* Set */));
/**
 * Map members pattern.
 */
const mapMembers = new Core.ExpectFlowPattern(new Core.AppendNodePattern(209 /* Member */, 1 /* Right */, 2 /* Next */, new Core.ChooseFlowPattern(new directive_1.default(304 /* Member */, identity, new Core.RunFlowPattern(() => expression)), new Core.RunFlowPattern(() => expression))), new Core.OptFlowPattern(new Core.ExpectUnitPattern(133 /* Comma */), new Core.RunFlowPattern(() => mapMembers)));
/**
 * Map operand pattern.
 */
const mapOperand = new Core.ScopeSymbolPattern(new Core.ExpectUnitPattern(106 /* Map */), new Core.AppendNodePattern(208 /* Map */, 1 /* Right */, 1 /* Right */, new Core.ExpectFlowPattern(new Core.ExpectUnitPattern(135 /* OpenBraces */), new Core.OptFlowPattern(mapMembers), new Core.ExpectUnitPattern(136 /* CloseBraces */))));
/**
 * Range operand pattern.
 */
const rangeOperand = new Core.PlaceNodePattern(1 /* Right */, new Core.ExpectUnitPattern(104 /* From */), new Core.AppendNodePattern(204 /* String */, 1 /* Right */, 1 /* Right */, new Core.ExpectUnitPattern(102 /* String */)), new Core.PivotNodePattern(206 /* Range */, 1 /* Right */, 0 /* Left */, new Core.ExpectUnitPattern(105 /* To */), new Core.AppendNodePattern(204 /* String */, 1 /* Right */, 1 /* Right */, new Core.ExpectUnitPattern(102 /* String */))));
/**
 * General operands pattern.
 */
const generalOperands = new Core.AppendNodePattern(Core.BaseSource.Output, 1 /* Right */, 1 /* Right */, new Core.MapFlowPattern(new Core.SetValueRoute(205 /* Any */, 103 /* Any */), new Core.SetValueRoute(204 /* String */, 102 /* String */), new Core.SetValueRoute(201 /* Reference */, 100 /* Identifier */)));
/**
 * Group expression pattern.
 */
const groupExpression = new Core.PlaceNodePattern(1 /* Right */, new Core.ExpectFlowPattern(new Core.ExpectUnitPattern(137 /* OpenParenthesis */), new Core.RunFlowPattern(() => expression), new Core.ExpectUnitPattern(138 /* CloseParenthesis */)));
/**
 * Condition expression pattern.
 */
const conditionExpression = new Core.OptFlowPattern(new Core.PivotNodePattern(210 /* Then */, 1 /* Right */, 0 /* Left */, new Core.ExpectUnitPattern(107 /* Then */), new Core.RunFlowPattern(() => expression), new Core.OptFlowPattern(new Core.PivotNodePattern(211 /* Else */, 1 /* Right */, 0 /* Left */, new Core.ExpectUnitPattern(108 /* Else */), new Core.RunFlowPattern(() => expression)))));
/**
 * Expression pattern.
 */
const expression = new Core.ExpectFlowPattern(new binary_1.default(new Core.MapFlowPattern(new Core.SetValueRoute(212 /* Or */, 109 /* Or */)), new binary_1.default(new Core.MapFlowPattern(new Core.SetValueRoute(213 /* And */, 110 /* And */)), new unary_1.default(unaryOperators, new Core.PlaceNodePattern(1 /* Right */, new binary_1.default(new Core.MapFlowPattern(new Core.SetValueRoute(207 /* Access */, 132 /* Period */)), new Core.ChooseFlowPattern(mapOperand, rangeOperand, generalOperands, groupExpression)))))), conditionExpression);
/**
 * Skip directive route.
 */
const skip = new Core.SetValueRoute(235 /* Skip */, expression, 126 /* Skip */);
/**
 * Token directive route.
 */
const token = new Core.SetValueRoute(236 /* Token */, new directive_1.default(300 /* Token */, identity, expression), 127 /* Token */);
/**
 * Node directive route.
 */
const node = new Core.SetValueRoute(237 /* Node */, new directive_1.default(301 /* Node */, identity, expression), 128 /* Node */);
/**
 * Alias token directive route.
 */
const aliasToken = new Core.SetValueRoute(238 /* AliasToken */, new directive_1.default(303 /* AliasToken */, identity, expression), 129 /* Alias */, 127 /* Token */);
/**
 * Alias node directive route.
 */
const aliasNode = new Core.SetValueRoute(239 /* AliasNode */, new directive_1.default(302 /* AliasNode */, identity, expression), 129 /* Alias */, 128 /* Node */);
/**
 * Main parser pattern.
 */
exports.Program = new Core.ExpectFlowPattern(new Core.OptFlowPattern(new Core.RepeatFlowPattern(new Core.ChooseFlowPattern(new Core.EmitNodePattern(Core.BaseSource.Output, 1 /* Right */, new Core.MapFlowPattern(skip, token, node, aliasToken, aliasNode), new Core.ExpectUnitPattern(134 /* Semicolon */))))), new Core.EndFlowPattern());
//# sourceMappingURL=program.js.map