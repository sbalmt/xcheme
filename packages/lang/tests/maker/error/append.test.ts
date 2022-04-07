import * as Lang from '../../../src/index';
import * as Assert from './utils/assert';

test("Append without an identity in a 'SKIP' directive", () => {
  Assert.error(
    [Lang.Errors.UNDEFINED_IDENTITY],
    `
    skip append 'a';`
  );
});

test("Append without an identity in an 'ALIAS TOKEN' directive", () => {
  Assert.error(
    [Lang.Errors.UNDEFINED_IDENTITY, Lang.Errors.UNDEFINED_IDENTITY],
    `
    alias token ALIAS as append 'a';`
  );
});

test("Append without an identity in a 'MAP' operand", () => {
  Assert.error(
    [Lang.Errors.UNDEFINED_IDENTITY, Lang.Errors.UNDEFINED_IDENTITY],
    `
    alias token ALIAS as map {
      ENTRY as 'a' & append 'b'
    };`
  );
});

test('Append with an unexpected argument', () => {
  Assert.error(
    [Lang.Errors.UNEXPECTED_ARGUMENT, Lang.Errors.UNDEFINED_IDENTITY],
    `
    skip append <X> 'a';`
  );
});

test('Append with an unexpected extra argument', () => {
  Assert.error(
    [Lang.Errors.UNEXPECTED_EXTRA_ARGUMENT],
    `
    skip append <100, auto> 'a';`
  );
});
