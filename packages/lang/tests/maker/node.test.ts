import * as Helper from './helper';
import * as Lang from '../../src/index';

test('Node referring an undefined identifier', () => {
  Helper.makeError(new Lang.LiveCoder(), 'node NODE as TOKEN;', [Lang.Errors.UNDEFINED_IDENTIFIER]);
});

test('Node referring an alias token (reference error)', () => {
  Helper.makeError(new Lang.LiveCoder(), "alias token TOKEN as '@'; node NODE as TOKEN;", [Lang.Errors.INVALID_TOKEN_REFERENCE]);
});

test('Node referring an unresolved token (reference error)', () => {
  Helper.makeError(new Lang.LiveCoder(), "node NODE as TOKEN; token TOKEN as '@';", [Lang.Errors.UNRESOLVED_TOKEN_REFERENCE]);
});
