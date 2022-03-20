import * as Lang from '../../../src/index';
import * as Assert from './utils/assert';

test('Node without an identity', () => {
  Assert.error(
    [Lang.Errors.UNDEFINED_IDENTITY],
    `
    node NODE as 'a';`
  );
});

test('Node with a duplicate identifier', () => {
  Assert.error(
    [Lang.Errors.DUPLICATE_IDENTIFIER],
    `
    node <200> NODE as 'a';
    node <201> NODE as 'b';`
  );
});

test('Node referring an undefined identifier', () => {
  Assert.error(
    [Lang.Errors.UNDEFINED_IDENTIFIER],
    `
    node <200> NODE as TOKEN;`
  );
});

test('Node referring an alias token (reference error)', () => {
  Assert.error(
    [Lang.Errors.INVALID_ALIAS_TOKEN_REFERENCE],
    `
    alias token TOKEN as '@';
    node <200>  NODE  as TOKEN;`
  );
});

test('Node referring a loose token already defined (token collision)', () => {
  Assert.error(
    [Lang.Errors.TOKEN_COLLISION],
    `
    token <100> TOKEN as '@';
    node  <200> NODE  as '@';`
  );
});

test('Node referring a loose token range already defined (token collision)', () => {
  Assert.error(
    [Lang.Errors.TOKEN_COLLISION],
    `
    token <100> TOKEN as from 'a' to 'z';
    node  <200> NODE  as from 'a' to 'z';`
  );
});
