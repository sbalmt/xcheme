import * as Lang from '../../../src/index';
import * as Assert from './utils/assert';

test('Node without an identity', () => {
  Assert.error(
    [Lang.Errors.UNDEFINED_IDENTITY],
    `
    node NODE as 'a';`
  );
});

test('Node with an unexpected argument', () => {
  Assert.error(
    [Lang.Errors.UNEXPECTED_ARGUMENT, Lang.Errors.UNDEFINED_IDENTITY],
    `
    node <X> NODE as 'a';`
  );
});

test('Node with an unexpected extra argument', () => {
  Assert.error(
    [Lang.Errors.UNEXPECTED_EXTRA_ARGUMENT],
    `
    node <100, auto> NODE as 'a';`
  );
});

test('Node with an alias node template without arguments', () => {
  Assert.error(
    [Lang.Errors.ARGUMENTS_MISSING],
    `
    alias <X>
    node TEMPLATE as opt X;

    node <200> NODE as TEMPLATE;`
  );
});

test('Node with an alias node template missing arguments', () => {
  Assert.error(
    [Lang.Errors.ARGUMENTS_MISSING],
    `
    alias <X, Y>
    node <X> TEMPLATE as opt Y;

    node <200> NODE as TEMPLATE <50>;`
  );
});

test('Node with an alias node template using extra arguments', () => {
  Assert.error(
    [Lang.Errors.UNEXPECTED_EXTRA_ARGUMENT],
    `
    alias <X>
    node TEMPLATE as set <X> 'foo';

    node <100> NODE as TEMPLATE <50, NODE>;`
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
