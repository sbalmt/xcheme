import * as Helper from './helper';
import * as Lang from '../../src/index';

test('Skip referring an undefined identifier', () => {
  Helper.makeError(new Lang.LiveCoder(), 'skip TOKEN;', [Lang.Errors.UNDEFINED_IDENTIFIER]);
});

test('Skip referring a token (reference error)', () => {
  Helper.makeError(new Lang.LiveCoder(), "token TOKEN as '@'; skip TOKEN;", [Lang.Errors.INVALID_TOKEN_REFERENCE]);
});

test('Skip referring a node (reference error)', () => {
  Helper.makeError(new Lang.LiveCoder(), "node NODE as '@'; skip NODE;", [Lang.Errors.INVALID_NODE_REFERENCE]);
});

test('Skip referring an alias node (reference error)', () => {
  Helper.makeError(new Lang.LiveCoder(), "alias node NODE as '@'; skip NODE;", [Lang.Errors.INVALID_ALIAS_NODE_REFERENCE]);
});

test('Skip with an identified map', () => {
  Helper.makeError(new Lang.LiveCoder(), "skip map { <100> A as 'a' };", [Lang.Errors.UNSUPPORTED_IDENTITY]);
});
