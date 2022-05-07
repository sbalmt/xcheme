import * as Lang from '../../../src/index';
import * as Assert from './utils/assert';

test('PIVOT without an identity in a SKIP directive', () => {
  Assert.error(
    `
    skip pivot 'a';`,
    [
      {
        code: Lang.Errors.UNDEFINED_IDENTITY,
        column: [9, 14],
        line: [1, 1]
      }
    ]
  );
});

test('PIVOT without an identity in an ALIAS TOKEN directive', () => {
  Assert.error(
    `
    alias token ALIAS as pivot 'a';`,
    [
      {
        code: Lang.Errors.UNDEFINED_IDENTITY,
        column: [25, 30],
        line: [1, 1]
      },
      {
        code: Lang.Errors.UNDEFINED_IDENTITY,
        column: [16, 21],
        line: [1, 1]
      }
    ]
  );
});

test('PIVOT without an identity in a MAP operand', () => {
  Assert.error(
    `
    alias token ALIAS as map {
      ENTRY as 'a' & pivot 'b'
    };`,
    [
      {
        code: Lang.Errors.UNDEFINED_IDENTITY,
        column: [21, 26],
        line: [2, 2]
      },
      {
        code: Lang.Errors.UNDEFINED_IDENTITY,
        column: [6, 11],
        line: [2, 2]
      }
    ]
  );
});

test('PIVOT with an unexpected argument', () => {
  Assert.error(
    `
    skip pivot <X> 'a';`,
    [
      {
        code: Lang.Errors.UNEXPECTED_ARGUMENT,
        column: [16, 17],
        line: [1, 1]
      },
      {
        code: Lang.Errors.UNDEFINED_IDENTITY,
        column: [9, 18],
        line: [1, 1]
      }
    ]
  );
});

test('PIVOT with an unexpected extra argument', () => {
  Assert.error(
    `
    skip pivot <100, auto> 'a';`,
    [
      {
        code: Lang.Errors.UNEXPECTED_EXTRA_ARGUMENT,
        column: [21, 25],
        line: [1, 1]
      }
    ]
  );
});
