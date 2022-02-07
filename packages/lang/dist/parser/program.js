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
const importModule = new Core.SetValueRoute(241 /* Import */, new Core.AppendNodePattern(Core.BaseSource.Output, 1 /* Right */, 1 /* Right */, new Core.ExpectUnitPattern(102 /* String */)), 133 /* Import */);
/**
 * Main parser pattern.
 */
exports.Program = new Core.ExpectFlowPattern(new Core.OptFlowPattern(new Core.RepeatFlowPattern(new Core.EmitNodePattern(Core.BaseSource.Output, 1 /* Right */, new Core.MapFlowPattern(importModule, skip, token, node, aliasToken, aliasNode, exportAliases), new Core.ExpectUnitPattern(140 /* Semicolon */)))), new Core.EndFlowPattern());
//# sourceMappingURL=program.js.map