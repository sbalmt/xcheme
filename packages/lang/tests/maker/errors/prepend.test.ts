import * as Lang from '../../../src/index';
import * as Assert from './utils/assert';

test('PREPEND without an identity in a SKIP directive', () => {
  Assert.error(
    `
    skip prepend 'a';`,
    [
      {
        code: Lang.Errors.UNDEFINED_IDENTITY,
        column: [9, 16],
        line: [1, 1]
      }
    ]
  );
});

test('PREPEND without an identity in an ALIAS TOKEN directive', () => {
  Assert.error(
    `
    alias token ALIAS as prepend 'a';`,
    [
      {
        code: Lang.Errors.UNDEFINED_IDENTITY,
        column: [16, 21],
        line: [1, 1]
      },
      {
        code: Lang.Errors.UNDEFINED_IDENTITY,
        column: [25, 32],
        line: [1, 1]
      }
    ]
  );
});

test('', () => {
  Assert.error(
    `
    alias token ALIAS as map {
      'a' & prepend 'b'
    };`,
    [
      {
        code: Lang.Errors.UNDEFINED_IDENTITY,
        column: [16, 21],
        line: [1, 1]
      },
      {
        code: Lang.Errors.UNDEFINED_IDENTITY,
        column: [12, 19],
        line: [2, 2]
      }
    ]
  );
});

test('PREPEND with an unexpected argument', () => {
  Assert.error(
    `
    skip prepend <X> 'a';`,
    [
      {
        code: Lang.Errors.UNEXPECTED_ARGUMENT,
        column: [18, 19],
        line: [1, 1]
      },
      {
        code: Lang.Errors.UNDEFINED_IDENTITY,
        column: [9, 20],
        line: [1, 1]
      }
    ]
  );
});

test('PREPEND with an unexpected extra argument', () => {
  Assert.error(
    `
    skip prepend <100, auto> 'a';`,
    [
      {
        code: Lang.Errors.UNEXPECTED_EXTRA_ARGUMENT,
        column: [23, 27],
        line: [1, 1]
      }
    ]
  );
});
