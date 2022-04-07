import * as Lang from '../../../src/index';
import * as Assert from './utils/assert';

test('Error with an auto identity', () => {
  Assert.error(
    [Lang.Errors.INVALID_AUTO_IDENTITY],
    `
    skip error <auto> 'a';`
  );
});

test('Error with an unexpected argument', () => {
  Assert.error(
    [Lang.Errors.UNEXPECTED_ARGUMENT],
    `
    skip error <X> 'a';`
  );
});

test('Error with an unexpected extra argument', () => {
  Assert.error(
    [Lang.Errors.UNEXPECTED_EXTRA_ARGUMENT],
    `
    skip error <100, auto> 'a';`
  );
});
