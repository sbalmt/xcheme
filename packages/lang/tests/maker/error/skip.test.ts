import * as Lang from '../../../src/index';
import * as Assert from './utils/assert';

test('Skip referring an undefined identifier', () => {
  Assert.error(
    [Lang.Errors.UNDEFINED_IDENTIFIER],
    `
    skip TOKEN;`
  );
});

test('Skip referring a token (reference error)', () => {
  Assert.error(
    [Lang.Errors.INVALID_TOKEN_REFERENCE],
    `
    token <100> TOKEN as '@';
    skip TOKEN;`
  );
});

test('Skip referring a node (reference error)', () => {
  Assert.error(
    [Lang.Errors.INVALID_NODE_REFERENCE],
    `
    node <200> NODE as '@';
    skip NODE;`
  );
});

test('Skip referring an alias node (reference error)', () => {
  Assert.error(
    [Lang.Errors.INVALID_ALIAS_NODE_REFERENCE],
    `
    alias node NODE as '@';
    skip NODE;`
  );
});
