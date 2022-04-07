import * as Lang from '../../../src/index';
import * as Assert from './utils/assert';

test('Set with an auto identity', () => {
  Assert.error(
    [Lang.Errors.INVALID_AUTO_IDENTITY],
    `
    skip set <auto> 'a';`
  );
});

test('Set with an unexpected argument', () => {
  Assert.error(
    [Lang.Errors.UNEXPECTED_ARGUMENT],
    `
    skip set <X> 'a';`
  );
});

test('Set with an unexpected extra argument', () => {
  Assert.error(
    [Lang.Errors.UNEXPECTED_EXTRA_ARGUMENT],
    `
    skip set <100, auto> 'a';`
  );
});
