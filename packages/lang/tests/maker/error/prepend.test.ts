import * as Lang from '../../../src/index';
import * as Assert from './utils/assert';

test("Prepend without an identity in a 'SKIP' directive", () => {
  Assert.error(
    [Lang.Errors.UNDEFINED_IDENTITY],
    `
    skip prepend 'a';`
  );
});

test('Prepend without an identity', () => {
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
