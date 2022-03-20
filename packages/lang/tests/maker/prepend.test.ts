import * as Lang from '../../src/index';
import * as Assert from './assert';

test('Prepend without an identity', () => {
  Assert.error(
    [Lang.Errors.UNDEFINED_IDENTITY, Lang.Errors.UNDEFINED_IDENTITY],
    `
    alias token ALIAS as prepend 'a';`
  );
});
