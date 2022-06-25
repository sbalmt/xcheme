import * as Lang from '../../src/index';
import * as Assert from './utils/assert';

test('SET with an auto identity', () => {
  Assert.error(
    `
    skip set <auto> 'a';`,
    [
      {
        code: Lang.Errors.INVALID_AUTO_IDENTITY,
        column: [9, 19],
        line: [1, 1]
      }
    ]
  );
});

test('SET with an unexpected argument', () => {
  Assert.error(
    `
    skip set <X> 'a';`,
    [
      {
        code: Lang.Errors.UNEXPECTED_ARGUMENT,
        column: [14, 15],
        line: [1, 1]
      }
    ]
  );
});

test('SET with an unexpected extra argument', () => {
  Assert.error(
    `
    skip set <100, auto> 'a';`,
    [
      {
        code: Lang.Errors.UNEXPECTED_EXTRA_ARGUMENT,
        column: [19, 23],
        line: [1, 1]
      }
    ]
  );
});
