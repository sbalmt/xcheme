import * as Lang from '../../src/index';
import * as Assert from './utils/assert';

test('SKIP referring an undefined identifier', () => {
  Assert.error(
    `
    skip TOKEN;`,
    [
      {
        code: Lang.Errors.UNDEFINED_IDENTIFIER,
        column: [9, 14],
        line: [1, 1]
      }
    ]
  );
});

test('SKIP referring a token (reference error)', () => {
  Assert.error(
    `
    token <100> TOKEN as '@';
    skip TOKEN;`,
    [
      {
        code: Lang.Errors.INVALID_TOKEN_REFERENCE,
        column: [9, 14],
        line: [2, 2]
      }
    ]
  );
});

test('SKIP referring a node (reference error)', () => {
  Assert.error(
    `
    node <200> NODE as '@';
    skip NODE;`,
    [
      {
        code: Lang.Errors.INVALID_NODE_REFERENCE,
        column: [9, 13],
        line: [2, 2]
      }
    ]
  );
});

test('SKIP referring an alias node (reference error)', () => {
  Assert.error(
    `
    alias node NODE as '@';
    skip NODE;`,
    [
      {
        code: Lang.Errors.INVALID_ALIAS_NODE_REFERENCE,
        column: [9, 13],
        line: [2, 2]
      }
    ]
  );
});
