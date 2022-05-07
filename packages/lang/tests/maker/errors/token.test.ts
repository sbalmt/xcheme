import * as Lang from '../../../src/index';
import * as Assert from './utils/assert';

test('TOKEN without an identity', () => {
  Assert.error(
    `
    token TOKEN as 'a';`,
    [
      {
        code: Lang.Errors.UNDEFINED_IDENTITY,
        column: [10, 15],
        line: [1, 1]
      }
    ]
  );
});

test('TOKEN with an unexpected argument', () => {
  Assert.error(
    `
    token <X> TOKEN as 'a';`,
    [
      {
        code: Lang.Errors.UNEXPECTED_ARGUMENT,
        column: [11, 12],
        line: [1, 1]
      },
      {
        code: Lang.Errors.UNDEFINED_IDENTITY,
        column: [14, 19],
        line: [1, 1]
      }
    ]
  );
});

test('TOKEN with an unexpected extra argument', () => {
  Assert.error(
    `
    token <100, auto> TOKEN as 'a';`,
    [
      {
        code: Lang.Errors.UNEXPECTED_EXTRA_ARGUMENT,
        column: [16, 20],
        line: [1, 1]
      }
    ]
  );
});

test('TOKEN with an alias token template without arguments', () => {
  Assert.error(
    `
    alias <X>
    token TEMPLATE as opt X;

    token <100> TOKEN as TEMPLATE;`,
    [
      {
        code: Lang.Errors.ARGUMENTS_MISSING,
        column: [25, 33],
        line: [4, 4]
      }
    ]
  );
});

test('TOKEN with an alias token template missing arguments', () => {
  Assert.error(
    `
    alias <X, Y>
    token <X> TEMPLATE as opt Y;

    token <100> TOKEN as TEMPLATE <50>;`,
    [
      {
        code: Lang.Errors.ARGUMENTS_MISSING,
        column: [25, 33],
        line: [4, 4]
      }
    ]
  );
});

test('TOKEN with an alias token template using extra arguments', () => {
  Assert.error(
    `
    alias <X>
    token TEMPLATE as set <X> 'foo';

    token <100> TOKEN as TEMPLATE <50, TOKEN>;`,
    [
      {
        code: Lang.Errors.UNEXPECTED_EXTRA_ARGUMENT,
        column: [39, 44],
        line: [4, 4]
      }
    ]
  );
});

test('TOKEN with a duplicate identifier', () => {
  Assert.error(
    `
    token <100> TOKEN as 'a';
    token <101> TOKEN as 'b';`,
    [
      {
        code: Lang.Errors.DUPLICATE_IDENTIFIER,
        column: [16, 21],
        line: [2, 2]
      }
    ]
  );
});

test('TOKEN referring an undefined identifier', () => {
  Assert.error(
    `
    token <100> TOKEN as ALIAS;`,
    [
      {
        code: Lang.Errors.UNDEFINED_IDENTIFIER,
        column: [25, 30],
        line: [1, 1]
      }
    ]
  );
});

test('TOKEN referring a node (reference error)', () => {
  Assert.error(
    `
    node  <200> NODE  as '@';
    token <100> TOKEN as NODE;`,
    [
      {
        code: Lang.Errors.INVALID_NODE_REFERENCE,
        column: [25, 29],
        line: [2, 2]
      }
    ]
  );
});

test('TOKEN referring an alias node (reference error)', () => {
  Assert.error(
    `
    alias node  NODE  as '@';
    token <100> TOKEN as NODE;`,
    [
      {
        code: Lang.Errors.INVALID_ALIAS_NODE_REFERENCE,
        column: [25, 29],
        line: [2, 2]
      }
    ]
  );
});

test('Loose TOKEN already defined (token collision)', () => {
  Assert.error(
    `
    node  <200> NODE  as '@';
    token <100> TOKEN as '@';`,
    [
      {
        code: Lang.Errors.TOKEN_COLLISION,
        column: [25, 28],
        line: [2, 2]
      }
    ]
  );
});

test('Loose TOKEN range already defined (token collision)', () => {
  Assert.error(
    `
    node  <200> NODE  as from '0' to '9';
    token <100> TOKEN as from '0' to '9';`,
    [
      {
        code: Lang.Errors.TOKEN_COLLISION,
        column: [34, 36],
        line: [2, 2]
      }
    ]
  );
});

test('TOKEN already defined (token collision)', () => {
  Assert.error(
    `
    token <100> TOKEN1 as '@';
    token <101> TOKEN2 as '@';`,
    [
      {
        code: Lang.Errors.TOKEN_COLLISION,
        column: [26, 29],
        line: [2, 2]
      }
    ]
  );
});

test('TOKEN range already defined (token collision)', () => {
  Assert.error(
    `
    token <100> TOKEN1 as from '0' to '9';
    token <101> TOKEN2 as from '0' to '9';`,
    [
      {
        code: Lang.Errors.TOKEN_COLLISION,
        column: [35, 37],
        line: [2, 2]
      }
    ]
  );
});
