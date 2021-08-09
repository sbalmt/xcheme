"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Program = void 0;
const Core = require("@xcheme/core");
/**
 * Main lexer program.
 */
exports.Program = new Core.ExpectFlowPattern(new Core.OptionFlowPattern(new Core.RepeatFlowPattern(new Core.ChooseFlowPattern(
// White space
new Core.ChooseUnitPattern(' ', '\t', '\v', '\f', '\r', '\n'), 
// Comment
new Core.ExpectFlowPattern(new Core.ExpectUnitPattern('/', '/'), new Core.OptionFlowPattern(new Core.RepeatFlowPattern(new Core.ConditionFlowPattern(new Core.NegateFlowPattern(new Core.ExpectUnitPattern('\n')), new Core.AnyUnitPattern())))), 
// Comment block
new Core.ExpectFlowPattern(new Core.ExpectUnitPattern('/', '*'), new Core.OptionFlowPattern(new Core.RepeatFlowPattern(new Core.ConditionFlowPattern(new Core.NegateFlowPattern(new Core.ExpectUnitPattern('*', '/')), new Core.AnyUnitPattern()))), new Core.ExpectUnitPattern('*', '/')), 
// Tokens
new Core.EmitTokenPattern(Core.TextSource.Output, new Core.ChooseFlowPattern(
// Keywords and Symbols
new Core.MapFlowPattern(new Core.SetValueRoute(102 /* Any */, 'a', 'n', 'y'), new Core.SetValueRoute(103 /* From */, 'f', 'r', 'o', 'm'), new Core.SetValueRoute(104 /* To */, 't', 'o'), new Core.SetValueRoute(105 /* Not */, 'n', 'o', 't'), new Core.SetValueRoute(106 /* Opt */, 'o', 'p', 't'), new Core.SetValueRoute(107 /* Rep */, 'r', 'e', 'p'), new Core.SetValueRoute(108 /* Place */, 'p', 'l', 'a', 'c', 'e'), new Core.SetValueRoute(109 /* Pivot */, 'p', 'i', 'v', 'o', 't'), new Core.SetValueRoute(110 /* Append */, 'a', 'p', 'p', 'e', 'n', 'd'), new Core.SetValueRoute(111 /* Prepend */, 'p', 'r', 'e', 'p', 'e', 'n', 'd'), new Core.SetValueRoute(112 /* Next */, 'n', 'e', 'x', 't'), new Core.SetValueRoute(113 /* Symbol */, 's', 'y', 'm', 'b', 'o', 'l'), new Core.SetValueRoute(114 /* Scope */, 's', 'c', 'o', 'p', 'e'), new Core.SetValueRoute(116 /* Or */, 'o', 'r'), new Core.SetValueRoute(115 /* And */, 'a', 'n', 'd'), new Core.SetValueRoute(117 /* Then */, 't', 'h', 'e', 'n'), new Core.SetValueRoute(118 /* Else */, 'e', 'l', 's', 'e'), new Core.SetValueRoute(119 /* Skip */, 's', 'k', 'i', 'p'), new Core.SetValueRoute(120 /* Alias */, 'a', 'l', 'i', 'a', 's'), new Core.SetValueRoute(121 /* Token */, 't', 'o', 'k', 'e', 'n'), new Core.SetValueRoute(122 /* Node */, 'n', 'o', 'd', 'e'), new Core.SetValueRoute(123 /* As */, 'a', 's'), new Core.SetValueRoute(102 /* Any */, '*'), new Core.SetValueRoute(116 /* Or */, '|'), new Core.SetValueRoute(115 /* And */, '&'), new Core.SetValueRoute(124 /* Semicolon */, ';'), new Core.SetValueRoute(125 /* OpenParentheses */, '('), new Core.SetValueRoute(126 /* CloseParentheses */, ')')), 
// String
new Core.SetValuePattern(101 /* Alphabet */, new Core.ExpectUnitPattern("'"), new Core.RepeatFlowPattern(new Core.ConditionFlowPattern(new Core.ExpectUnitPattern('\\'), new Core.AnyUnitPattern(), new Core.ConditionFlowPattern(new Core.NegateFlowPattern(new Core.ExpectUnitPattern("'")), new Core.AnyUnitPattern()))), new Core.ExpectUnitPattern("'")), 
// Identifier
new Core.SetValuePattern(100 /* Identifier */, new Core.ChooseFlowPattern(new Core.RangeUnitPattern('A', 'Z'), new Core.RangeUnitPattern('a', 'z'), new Core.ExpectUnitPattern('_')), new Core.OptionFlowPattern(new Core.RepeatFlowPattern(new Core.ChooseFlowPattern(new Core.RangeUnitPattern('A', 'Z'), new Core.RangeUnitPattern('a', 'z'), new Core.RangeUnitPattern('0', '9'), new Core.ExpectUnitPattern('_')))))))))), new Core.EndFlowPattern());
//# sourceMappingURL=program.js.map