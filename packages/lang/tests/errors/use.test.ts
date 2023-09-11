import * as Lang from '../../src/index';
import * as Assert from './utils/assert';

test('USE with an auto identity', () => {
  Assert.error(
    `
    skip use <auto> 'a';`,
    [
      {
        code: Lang.Errors.INVALID_AUTO_IDENTITY,
        column: [9, 19],
        line: [1, 1]
      }
    ]
  );
});

test('USE with an unexpected argument', () => {
  Assert.error(
    `
    skip use <X> 'a';`,
    [
      {
        code: Lang.Errors.UNEXPECTED_ARGUMENT,
        column: [14, 15],
        line: [1, 1]
      },
      {
        code: Lang.Errors.UNDEFINED_IDENTITY,
        column: [9, 16],
        line: [1, 1]
      }
    ]
  );
});

test('USE with an unexpected extra argument', () => {
  Assert.error(
    `
    skip use <100, auto> 'a';`,
    [
      {
        code: Lang.Errors.UNEXPECTED_EXTRA_ARGUMENT,
        column: [19, 23],
        line: [1, 1]
      }
    ]
  );
});
