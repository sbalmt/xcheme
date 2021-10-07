"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Program = void 0;
const Core = require("@xcheme/core");
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
const keywordsAndSymbols = new Core.MapFlowPattern(new Core.SetValueRoute(103 /* Any */, end, 'a', 'n', 'y'), new Core.SetValueRoute(104 /* From */, end, 'f', 'r', 'o', 'm'), new Core.SetValueRoute(105 /* To */, end, 't', 'o'), new Core.SetValueRoute(106 /* Map */, end, 'm', 'a', 'p'), new Core.SetValueRoute(107 /* Then */, end, 't', 'h', 'e', 'n'), new Core.SetValueRoute(108 /* Else */, end, 'e', 'l', 's', 'e'), new Core.SetValueRoute(109 /* Or */, end, 'o', 'r'), new Core.SetValueRoute(110 /* And */, end, 'a', 'n', 'd'), new Core.SetValueRoute(111 /* Not */, end, 'n', 'o', 't'), new Core.SetValueRoute(112 /* Opt */, end, 'o', 'p', 't'), new Core.SetValueRoute(113 /* Repeat */, end, 'r', 'e', 'p', 'e', 'a', 't'), new Core.SetValueRoute(114 /* Place */, end, 'p', 'l', 'a', 'c', 'e'), new Core.SetValueRoute(115 /* Append */, end, 'a', 'p', 'p', 'e', 'n', 'd'), new Core.SetValueRoute(116 /* Prepend */, end, 'p', 'r', 'e', 'p', 'e', 'n', 'd'), new Core.SetValueRoute(117 /* Pivot */, end, 'p', 'i', 'v', 'o', 't'), new Core.SetValueRoute(118 /* Next */, end, 'n', 'e', 'x', 't'), new Core.SetValueRoute(119 /* Left */, end, 'l', 'e', 'f', 't'), new Core.SetValueRoute(120 /* Right */, end, 'r', 'i', 'g', 'h', 't'), new Core.SetValueRoute(121 /* Symbol */, end, 's', 'y', 'm', 'b', 'o', 'l'), new Core.SetValueRoute(122 /* Scope */, end, 's', 'c', 'o', 'p', 'e'), new Core.SetValueRoute(123 /* Error */, end, 'e', 'r', 'r', 'o', 'r'), new Core.SetValueRoute(124 /* Has */, end, 'h', 'a', 's'), new Core.SetValueRoute(125 /* Set */, end, 's', 'e', 't'), new Core.SetValueRoute(126 /* Skip */, end, 's', 'k', 'i', 'p'), new Core.SetValueRoute(127 /* Token */, end, 't', 'o', 'k', 'e', 'n'), new Core.SetValueRoute(128 /* Node */, end, 'n', 'o', 'd', 'e'), new Core.SetValueRoute(129 /* Alias */, end, 'a', 'l', 'i', 'a', 's'), new Core.SetValueRoute(130 /* Auto */, end, 'a', 'u', 't', 'o'), new Core.SetValueRoute(131 /* As */, end, 'a', 's'), new Core.SetValueRoute(132 /* Asterisk */, '*'), new Core.SetValueRoute(133 /* VerticalBar */, '|'), new Core.SetValueRoute(134 /* Ampersand */, '&'), new Core.SetValueRoute(135 /* Period */, '.'), new Core.SetValueRoute(136 /* Comma */, ','), new Core.SetValueRoute(137 /* Semicolon */, ';'), new Core.SetValueRoute(138 /* OpenBraces */, '{'), new Core.SetValueRoute(139 /* CloseBraces */, '}'), new Core.SetValueRoute(140 /* OpenParenthesis */, '('), new Core.SetValueRoute(141 /* CloseParenthesis */, ')'), new Core.SetValueRoute(142 /* OpenChevron */, '<'), new Core.SetValueRoute(143 /* CloseChevron */, '>'));
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