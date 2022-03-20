import * as Lang from '../../../src/index';
import * as Assert from './utils/assert';

test('Map with a duplicate entry identifier', () => {
  Assert.error(
    [Lang.Errors.DUPLICATE_IDENTIFIER],
    `
    token <auto> TOKEN as map {
      <0> A as 'a',
      <0> A as 'b'
    };`
  );
});

test('Dynamic map without an <auto> identity', () => {
  Assert.error(
    [Lang.Errors.UNDEFINED_AUTO_IDENTITY, Lang.Errors.UNSUPPORTED_IDENTITY],
    `
    token <100> TOKEN as map {
      <0> A as 'a'
    };`
  );
});

test('Skip with an identified map', () => {
  Assert.error(
    [Lang.Errors.UNSUPPORTED_IDENTITY],
    `
    skip map {
      <100> A as 'a'
    };`
  );
});

test('Skip referring a token map entry (reference error)', () => {
  Assert.error(
    [Lang.Errors.INVALID_MAP_ENTRY_REFERENCE],
    `
    token <auto> TOKEN as map {
      <100> A as 'a'
    };
    skip TOKEN.A;`
  );
});

test('Skip referring an alias token map entry (reference error)', () => {
  Assert.error(
    [Lang.Errors.INVALID_MAP_ENTRY_REFERENCE],
    `
    alias token TOKEN as map {
      <100> A as 'a'
    };
    skip TOKEN.A;`
  );
});

test('Skip referring a node map entry (reference error)', () => {
  Assert.error(
    [Lang.Errors.INVALID_MAP_ENTRY_REFERENCE],
    `
    node <auto> NODE as map {
      <100> A as 'a'
    };
    skip NODE.A;`
  );
});

test('Skip referring an alias node map entry (reference error)', () => {
  Assert.error(
    [Lang.Errors.INVALID_MAP_ENTRY_REFERENCE],
    `
    alias node <auto> NODE as map {
      <100> A as 'a'
    };
    skip NODE.A;`
  );
});

test('Token referring a token map entry (reference error)', () => {
  Assert.error(
    [Lang.Errors.INVALID_MAP_ENTRY_REFERENCE],
    `
    token <auto> TOKEN1 as map {
      <100> A as 'a'
    };
    token <100> TOKEN2 as TOKEN1.A;`
  );
});

test('Token referring an alias token map entry (reference error)', () => {
  Assert.error(
    [Lang.Errors.INVALID_MAP_ENTRY_REFERENCE],
    `
    alias token TOKEN1 as map {
      <100> A as 'a'
    };
    token <100> TOKEN2 as TOKEN1.A;`
  );
});

test('Token referring a node map entry (reference error)', () => {
  Assert.error(
    [Lang.Errors.INVALID_MAP_ENTRY_REFERENCE],
    `
    node <auto> NODE as map {
      <100> A as 'a'
    };
    token <100> TOKEN as NODE.A;`
  );
});

test('Token referring an alias node map entry (reference error)', () => {
  Assert.error(
    [Lang.Errors.INVALID_MAP_ENTRY_REFERENCE],
    `
    alias node <auto> NODE as map {
      <100> A as 'a'
    };
    token <100> TOKEN as NODE.A;`
  );
});

test('Token map entry already defined (token collision)', () => {
  Assert.error(
    [Lang.Errors.TOKEN_COLLISION],
    `
    token <100> TOKEN1 as '@';
    token <101> TOKEN2 as map {
      '@'
    };`
  );
});

test('Loose token map entry already defined (token collision)', () => {
  Assert.error(
    [Lang.Errors.TOKEN_COLLISION],
    `
    node <200> NODE as map {
      '@'
    };
    token <100> TOKEN as '@';`
  );
});

test('Node referring an undefined token map entry (reference error)', () => {
  Assert.error(
    [Lang.Errors.UNDEFINED_IDENTIFIER],
    `
    token <100> TOKEN as map {
      'a'
    };
    node <200> NODE as TOKEN.A;`
  );
});

test('Node referring a node map entry (reference error)', () => {
  Assert.error(
    [Lang.Errors.INVALID_MAP_ENTRY_REFERENCE],
    `
    node <auto> NODE1 as map {
      A as 'a'
    };
    node <200> NODE2 as NODE1.A;`
  );
});

test('Node referring an alias node map entry (reference error)', () => {
  Assert.error(
    [Lang.Errors.INVALID_MAP_ENTRY_REFERENCE],
    `
    alias node <auto> NODE1 as map {
      A as 'a'
    };
    node <200> NODE2 as NODE1.A;`
  );
});

test('Node referring an alias token map entry (reference error)', () => {
  Assert.error(
    [Lang.Errors.INVALID_MAP_ENTRY_REFERENCE],
    `
    alias token TOKEN as map {
      A as 'a'
    };
    node <200> NODE as TOKEN.A;`
  );
});

test('Node referring a whole dynamic token map (reference error)', () => {
  Assert.error(
    [Lang.Errors.INVALID_MAP_REFERENCE],
    `
    token <auto> TOKEN as map {
      A as 'a'
    };
    node <200> NODE as TOKEN;`
  );
});

test('Node referring a whole dynamic nested token map entry (reference error)', () => {
  Assert.error(
    [Lang.Errors.INVALID_MAP_REFERENCE],
    `
    token <auto> TOKEN as map {
      <auto> A as 'a' & map {
        B as 'b'
      }
    };
    node <200> NODE as TOKEN.A;`
  );
});

test('Node referring a loose token map already defined (token collision)', () => {
  Assert.error(
    [Lang.Errors.TOKEN_COLLISION],
    `
    token <100> TOKEN as 'a';
    node <200> NODE as map {
      'a'
    };`
  );
});