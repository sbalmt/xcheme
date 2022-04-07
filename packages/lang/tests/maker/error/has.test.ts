import * as Lang from '../../../src/index';
import * as Assert from './utils/assert';

test('Has with an auto identity', () => {
  Assert.error(
    [Lang.Errors.INVALID_AUTO_IDENTITY],
    `
    skip has <auto> 'a';`
  );
});

test('Has with an unexpected argument', () => {
  Assert.error(
    [Lang.Errors.UNEXPECTED_ARGUMENT],
    `
    skip has <X> 'a';`
  );
});

test('Has with an unexpected extra argument', () => {
  Assert.error(
    [Lang.Errors.UNEXPECTED_EXTRA_ARGUMENT],
    `
    skip has <100, auto> 'a';`
  );
});
