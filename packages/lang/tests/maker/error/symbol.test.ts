import * as Lang from '../../../src/index';
import * as Assert from './utils/assert';

test("Symbol without an identity in a 'SKIP' directive", () => {
  Assert.error(
    [Lang.Errors.UNDEFINED_IDENTITY],
    `
    skip symbol 'a';`
  );
});

test("Symbol without an identity in an 'ALIAS TOKEN' directive", () => {
  Assert.error(
    [Lang.Errors.UNDEFINED_IDENTITY, Lang.Errors.UNDEFINED_IDENTITY],
    `
    alias token ALIAS as symbol 'a';`
  );
});

test("Symbol without an identity in a 'MAP' operand", () => {
  Assert.error(
    [Lang.Errors.UNDEFINED_IDENTITY, Lang.Errors.UNDEFINED_IDENTITY],
    `
    alias token ALIAS as map {
      ENTRY as 'a' & symbol 'b'
    };`
  );
});

test('Symbol with an unexpected argument', () => {
  Assert.error(
    [Lang.Errors.UNEXPECTED_ARGUMENT, Lang.Errors.UNDEFINED_IDENTITY],
    `
    skip symbol <X> 'a';`
  );
});

test('Symbol with an unexpected extra argument', () => {
  Assert.error(
    [Lang.Errors.UNEXPECTED_EXTRA_ARGUMENT],
    `
    skip symbol <100, auto> 'a';`
  );
});
