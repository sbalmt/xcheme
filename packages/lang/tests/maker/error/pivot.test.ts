import * as Lang from '../../../src/index';
import * as Assert from './utils/assert';

test("Pivot without an identity in a 'SKIP' directive", () => {
  Assert.error(
    [Lang.Errors.UNDEFINED_IDENTITY],
    `
    skip pivot 'a';`
  );
});

test("Pivot without an identity in an 'ALIAS TOKEN' directive", () => {
  Assert.error(
    [Lang.Errors.UNDEFINED_IDENTITY, Lang.Errors.UNDEFINED_IDENTITY],
    `
    alias token ALIAS as pivot 'a';`
  );
});

test("Pivot without an identity in a 'MAP' operand", () => {
  Assert.error(
    [Lang.Errors.UNDEFINED_IDENTITY, Lang.Errors.UNDEFINED_IDENTITY],
    `
    alias token ALIAS as map {
      ENTRY as 'a' & pivot 'b'
    };`
  );
});

test('Pivot with an unexpected argument', () => {
  Assert.error(
    [Lang.Errors.UNEXPECTED_ARGUMENT, Lang.Errors.UNDEFINED_IDENTITY],
    `
    skip pivot <X> 'a';`
  );
});

test('Pivot with an unexpected extra argument', () => {
  Assert.error(
    [Lang.Errors.UNEXPECTED_EXTRA_ARGUMENT],
    `
    skip pivot <100, auto> 'a';`
  );
});
