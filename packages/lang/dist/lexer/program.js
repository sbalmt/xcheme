"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Program = void 0;
const Core = require("@xcheme/core");
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
new Core.MapFlowPattern(new Core.SetValueRoute(103 /* Any */, 'a', 'n', 'y'), new Core.SetValueRoute(104 /* From */, 'f', 'r', 'o', 'm'), new Core.SetValueRoute(105 /* To */, 't', 'o'), new Core.SetValueRoute(110 /* Not */, 'n', 'o', 't'), new Core.SetValueRoute(111 /* Opt */, 'o', 'p', 't'), new Core.SetValueRoute(112 /* Rep */, 'r', 'e', 'p'), new Core.SetValueRoute(113 /* Place */, 'p', 'l', 'a', 'c', 'e'), new Core.SetValueRoute(116 /* Pivot */, 'p', 'i', 'v', 'o', 't'), new Core.SetValueRoute(114 /* Append */, 'a', 'p', 'p', 'e', 'n', 'd'), new Core.SetValueRoute(115 /* Prepend */, 'p', 'r', 'e', 'p', 'e', 'n', 'd'), new Core.SetValueRoute(117 /* Next */, 'n', 'e', 'x', 't'), new Core.SetValueRoute(118 /* Left */, 'l', 'e', 'f', 't'), new Core.SetValueRoute(119 /* Right */, 'r', 'i', 'g', 'h', 't'), new Core.SetValueRoute(120 /* Symbol */, 's', 'y', 'm', 'b', 'o', 'l'), new Core.SetValueRoute(121 /* Scope */, 's', 'c', 'o', 'p', 'e'), new Core.SetValueRoute(122 /* Error */, 'e', 'r', 'r', 'o', 'r'), new Core.SetValueRoute(123 /* Has */, 'h', 'a', 's'), new Core.SetValueRoute(124 /* Set */, 's', 'e', 't'), new Core.SetValueRoute(108 /* Or */, 'o', 'r'), new Core.SetValueRoute(109 /* And */, 'a', 'n', 'd'), new Core.SetValueRoute(106 /* Then */, 't', 'h', 'e', 'n'), new Core.SetValueRoute(107 /* Else */, 'e', 'l', 's', 'e'), new Core.SetValueRoute(125 /* Skip */, 's', 'k', 'i', 'p'), new Core.SetValueRoute(128 /* Alias */, 'a', 'l', 'i', 'a', 's'), new Core.SetValueRoute(126 /* Token */, 't', 'o', 'k', 'e', 'n'), new Core.SetValueRoute(127 /* Node */, 'n', 'o', 'd', 'e'), new Core.SetValueRoute(129 /* As */, 'a', 's'), new Core.SetValueRoute(103 /* Any */, '*'), new Core.SetValueRoute(108 /* Or */, '|'), new Core.SetValueRoute(109 /* And */, '&'), new Core.SetValueRoute(130 /* Semicolon */, ';'), new Core.SetValueRoute(131 /* OpenParentheses */, '('), new Core.SetValueRoute(132 /* CloseParentheses */, ')'), new Core.SetValueRoute(133 /* OpenChevron */, '<'), new Core.SetValueRoute(134 /* CloseChevron */, '>')), 
// Number
new Core.SetValuePattern(101 /* Number */, new Core.ChooseFlowPattern(new Core.ExpectUnitPattern('0'), new Core.ExpectFlowPattern(new Core.RangeUnitPattern('1', '9'), new Core.OptFlowPattern(new Core.RepeatFlowPattern(new Core.RangeUnitPattern('0', '9')))))), 
// String
new Core.SetValuePattern(102 /* Alphabet */, new Core.ExpectUnitPattern("'"), new Core.RepeatFlowPattern(new Core.ConditionFlowPattern(new Core.ExpectUnitPattern('\\'), new Core.AnyUnitPattern(), new Core.ConditionFlowPattern(new Core.NotFlowPattern(new Core.ExpectUnitPattern("'")), new Core.AnyUnitPattern()))), new Core.ExpectUnitPattern("'")), 
// Identifier
new Core.SetValuePattern(100 /* Identifier */, new Core.ChooseFlowPattern(new Core.RangeUnitPattern('A', 'Z'), new Core.RangeUnitPattern('a', 'z'), new Core.ExpectUnitPattern('_')), new Core.OptFlowPattern(new Core.RepeatFlowPattern(new Core.ChooseFlowPattern(new Core.RangeUnitPattern('A', 'Z'), new Core.RangeUnitPattern('a', 'z'), new Core.RangeUnitPattern('0', '9'), new Core.ExpectUnitPattern('_')))))))))), new Core.EndFlowPattern());
//# sourceMappingURL=program.js.map