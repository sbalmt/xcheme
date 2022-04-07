import * as Lang from '../../../src/index';
import * as Assert from './utils/assert';

test("Prepend without an identity in a 'SKIP' directive", () => {
  Assert.error(
    [Lang.Errors.UNDEFINED_IDENTITY],
    `
    skip prepend 'a';`
  );
});

test("Prepend without an identity in an 'ALIAS TOKEN' directive", () => {
  Assert.error(
    [Lang.Errors.UNDEFINED_IDENTITY, Lang.Errors.UNDEFINED_IDENTITY],
    `
    alias token ALIAS as prepend 'a';`
  );
});

test("Prepend without an identity in a 'MAP' operand", () => {
  Assert.error(
    [Lang.Errors.UNDEFINED_IDENTITY, Lang.Errors.UNDEFINED_IDENTITY],
    `
    alias token ALIAS as map {
      ENTRY as 'a' & prepend 'b'
    };`
  );
});

test('Prepend with an unexpected argument', () => {
  Assert.error(
    [Lang.Errors.UNEXPECTED_ARGUMENT, Lang.Errors.UNDEFINED_IDENTITY],
    `
    skip prepend <X> 'a';`
  );
});

test('Prepend with an unexpected extra argument', () => {
  Assert.error(
    [Lang.Errors.UNEXPECTED_EXTRA_ARGUMENT],
    `
    skip prepend <100, auto> 'a';`
  );
});
