import * as Lang from '../../src/index';
import * as Assert from './utils/assert';

test('NODE without an identity', () => {
  Assert.error(
    `
    node NODE as 'a';`,
    [
      {
        code: Lang.Errors.UNDEFINED_IDENTITY,
        column: [9, 13],
        line: [1, 1]
      }
    ]
  );
});

test('NODE with an unexpected argument', () => {
  Assert.error(
    `
    node <X> NODE as 'a';`,
    [
      {
        code: Lang.Errors.UNEXPECTED_ARGUMENT,
        column: [10, 11],
        line: [1, 1]
      },
      {
        code: Lang.Errors.UNDEFINED_IDENTITY,
        column: [13, 17],
        line: [1, 1]
      }
    ]
  );
});

test('NODE with an unexpected extra argument', () => {
  Assert.error(
    `
    node <200, auto> NODE as 'a';`,
    [
      {
        code: Lang.Errors.UNEXPECTED_EXTRA_ARGUMENT,
        column: [15, 19],
        line: [1, 1]
      }
    ]
  );
});

test('NODE with an alias node template without arguments', () => {
  Assert.error(
    `
    alias <X>
    node TEMPLATE as opt X;

    node <200> NODE as TEMPLATE;`,
    [
      {
        code: Lang.Errors.ARGUMENTS_MISSING,
        column: [23, 31],
        line: [4, 4]
      }
    ]
  );
});

test('NODE with an alias node template missing arguments', () => {
  Assert.error(
    `
    alias <X, Y>
    node <X> TEMPLATE as opt Y;

    node <200> NODE as TEMPLATE <50>;`,
    [
      {
        code: Lang.Errors.ARGUMENTS_MISSING,
        column: [23, 31],
        line: [4, 4]
      }
    ]
  );
});

test('NODE with an alias node template using extra arguments', () => {
  Assert.error(
    `
    alias <X>
    node TEMPLATE as set <X> 'foo';

    node <200> NODE as TEMPLATE <50, NODE>;`,
    [
      {
        code: Lang.Errors.UNEXPECTED_EXTRA_ARGUMENT,
        column: [37, 41],
        line: [4, 4]
      }
    ]
  );
});

test('NODE with an alias node template using wrong argument', () => {
  Assert.error(
    `
    alias <X>
    node TEMPLATE as X;

    node <200> NODE as TEMPLATE <50>;`,
    [
      {
        code: Lang.Errors.UNSUPPORTED_ARGUMENT,
        column: [33, 35],
        line: [4, 4]
      }
    ]
  );
});

test('NODE with a duplicate identifier', () => {
  Assert.error(
    `
    node <200> NODE as 'a';
    node <201> NODE as 'b';`,
    [
      {
        code: Lang.Errors.DUPLICATE_IDENTIFIER,
        column: [15, 19],
        line: [2, 2]
      }
    ]
  );
});

test('NODE referring an undefined identifier', () => {
  Assert.error(
    `
    node <200> NODE as TOKEN;`,
    [
      {
        code: Lang.Errors.UNDEFINED_IDENTIFIER,
        column: [23, 28],
        line: [1, 1]
      }
    ]
  );
});

test('NODE referring an alias token (reference error)', () => {
  Assert.error(
    `
    alias token TOKEN as '@';
    node <200>  NODE  as TOKEN;`,
    [
      {
        code: Lang.Errors.INVALID_ALIAS_TOKEN_REFERENCE,
        column: [25, 30],
        line: [2, 2]
      }
    ]
  );
});

test('NODE referring a loose token already defined (token collision)', () => {
  Assert.error(
    `
    token <100> TOKEN as '@';
    node  <200> NODE  as '@';`,
    [
      {
        code: Lang.Errors.TOKEN_COLLISION,
        column: [25, 28],
        line: [2, 2]
      }
    ]
  );
});

test('NODE referring a loose token range already defined (token collision)', () => {
  Assert.error(
    `
    token <100> TOKEN as from 'a' to 'z';
    node  <200> NODE  as from 'a' to 'z';`,
    [
      {
        code: Lang.Errors.TOKEN_COLLISION,
        column: [34, 36],
        line: [2, 2]
      }
    ]
  );
});
