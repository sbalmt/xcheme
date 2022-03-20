import * as Lang from '../../../src/index';
import * as Assert from './utils/assert';

test('Token without an identity', () => {
  Assert.error(
    [Lang.Errors.UNDEFINED_IDENTITY],
    `
    token TOKEN as 'a';`
  );
});

test('Token with a duplicate identifier', () => {
  Assert.error(
    [Lang.Errors.DUPLICATE_IDENTIFIER],
    `
    token <100> TOKEN as 'a';
    token <101> TOKEN as 'b';`
  );
});

test('Token referring an undefined identifier', () => {
  Assert.error(
    [Lang.Errors.UNDEFINED_IDENTIFIER],
    `
    token <100> TOKEN as ALIAS;`
  );
});

test('Token referring a node (reference error)', () => {
  Assert.error(
    [Lang.Errors.INVALID_NODE_REFERENCE],
    `
    node  <200> NODE  as '@';
    token <100> TOKEN as NODE;`
  );
});

test('Token referring an alias node (reference error)', () => {
  Assert.error(
    [Lang.Errors.INVALID_ALIAS_NODE_REFERENCE],
    `
    alias node  NODE  as '@';
    token <100> TOKEN as NODE;`
  );
});

test('Loose token already defined (token collision)', () => {
  Assert.error(
    [Lang.Errors.TOKEN_COLLISION],
    `
    node  <200> NODE  as '@';
    token <100> TOKEN as '@';`
  );
});

test('Loose token range already defined (token collision)', () => {
  Assert.error(
    [Lang.Errors.TOKEN_COLLISION],
    `
    node  <200> NODE  as from '0' to '9';
    token <100> TOKEN as from '0' to '9';`
  );
});

test('Token already defined (token collision)', () => {
  Assert.error(
    [Lang.Errors.TOKEN_COLLISION],
    `
    token <100> TOKEN1 as '@';
    token <101> TOKEN2 as '@';`
  );
});

test('Token range already defined (token collision)', () => {
  Assert.error(
    [Lang.Errors.TOKEN_COLLISION],
    `
    token <100> TOKEN1 as from '0' to '9';
    token <101> TOKEN2 as from '0' to '9';`
  );
});
