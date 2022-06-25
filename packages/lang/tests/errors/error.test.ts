import * as Lang from '../../src/index';
import * as Assert from './utils/assert';

test('ERROR with an auto identity', () => {
  Assert.error(
    `
    skip error <auto> 'a';`,
    [
      {
        code: Lang.Errors.INVALID_AUTO_IDENTITY,
        column: [9, 21],
        line: [1, 1]
      }
    ]
  );
});

test('ERROR with an unexpected argument', () => {
  Assert.error(
    `
    skip error <X> 'a';`,
    [
      {
        code: Lang.Errors.UNEXPECTED_ARGUMENT,
        column: [16, 17],
        line: [1, 1]
      }
    ]
  );
});

test('ERROR with an unexpected extra argument', () => {
  Assert.error(
    `
    skip error <100, auto> 'a';`,
    [
      {
        code: Lang.Errors.UNEXPECTED_EXTRA_ARGUMENT,
        column: [21, 25],
        line: [1, 1]
      }
    ]
  );
});
