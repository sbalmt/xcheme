import * as Lang from '../../../src/index';
import * as Assert from './utils/assert';

test('Dynamic MAP containing an unidentified entry', () => {
  Assert.error(
    `
    token <auto> TOKEN as map {
      <0> A as 'a',
               'b'
    };`,
    [
      {
        code: Lang.Errors.UNDEFINED_IDENTITY,
        column: [15, 18],
        line: [3, 3]
      }
    ]
  );
});

test('Dynamic MAP with a duplicate entry identifier', () => {
  Assert.error(
    `
    token <auto> TOKEN as map {
      <0> A as 'a',
      <1> A as 'b'
    };`,
    [
      {
        code: Lang.Errors.DUPLICATE_IDENTIFIER,
        column: [10, 11],
        line: [3, 3]
      }
    ]
  );
});

test('Dynamic MAP without a main identity', () => {
  Assert.error(
    `
    alias token TOKEN as map {
      <0> A as 'a'
    };`,
    [
      {
        code: Lang.Errors.UNDEFINED_IDENTITY,
        column: [16, 21],
        line: [1, 1]
      },
      {
        code: Lang.Errors.UNSUPPORTED_IDENTITY,
        column: [10, 11],
        line: [2, 2]
      }
    ]
  );
});

test('Dynamic MAP with an unexpected argument', () => {
  Assert.error(
    `
    token <auto> TOKEN as map {
      <X> A as 'a'
    };`,
    [
      {
        code: Lang.Errors.UNEXPECTED_ARGUMENT,
        column: [7, 8],
        line: [2, 2]
      }
    ]
  );
});

test('Dynamic MAP with an unexpected extra argument', () => {
  Assert.error(
    `
    token <auto> TOKEN as map {
      <0, X> A as 'a'
    };`,
    [
      {
        code: Lang.Errors.UNEXPECTED_EXTRA_ARGUMENT,
        column: [10, 11],
        line: [2, 2]
      }
    ]
  );
});

test('SKIP with a MAP containing identified entries', () => {
  Assert.error(
    `
    skip map {
      <100> A as 'a',
            B as 'b'
    };`,
    [
      {
        code: Lang.Errors.UNSUPPORTED_IDENTITY,
        column: [12, 13],
        line: [2, 2]
      },
      {
        code: Lang.Errors.UNSUPPORTED_IDENTITY,
        column: [12, 13],
        line: [3, 3]
      }
    ]
  );
});

test('SKIP referring a TOKEN map entry (reference error)', () => {
  Assert.error(
    `
    token <auto> TOKEN as map {
      <100> A as 'a'
    };
    skip TOKEN.A;`,
    [
      {
        code: Lang.Errors.INVALID_MAP_ENTRY_REFERENCE,
        column: [15, 16],
        line: [4, 4]
      }
    ]
  );
});

test('SKIP referring an ALIAS TOKEN map entry (reference error)', () => {
  Assert.error(
    `
    alias token <auto> TOKEN as map {
      <100> A as 'a'
    };
    skip TOKEN.A;`,
    [
      {
        code: Lang.Errors.INVALID_MAP_ENTRY_REFERENCE,
        column: [15, 16],
        line: [4, 4]
      }
    ]
  );
});

test('SKIP referring a NODE map entry (reference error)', () => {
  Assert.error(
    `
    node <auto> NODE as map {
      <100> A as 'a'
    };
    skip NODE.A;`,
    [
      {
        code: Lang.Errors.INVALID_MAP_ENTRY_REFERENCE,
        column: [14, 15],
        line: [4, 4]
      }
    ]
  );
});

test('SKIP referring an ALIAS NODE map entry (reference error)', () => {
  Assert.error(
    `
    alias node <auto> NODE as map {
      <100> A as 'a'
    };
    skip NODE.A;`,
    [
      {
        code: Lang.Errors.INVALID_MAP_ENTRY_REFERENCE,
        column: [14, 15],
        line: [4, 4]
      }
    ]
  );
});

test('TOKEN referring a TOKEN map entry (reference error)', () => {
  Assert.error(
    `
    token <auto> TOKEN1 as map {
      <100> A as 'a'
    };
    token <100> TOKEN2 as TOKEN1.A;`,
    [
      {
        code: Lang.Errors.INVALID_MAP_ENTRY_REFERENCE,
        column: [33, 34],
        line: [4, 4]
      }
    ]
  );
});

test('TOKEN referring an ALIAS TOKEN map entry (reference error)', () => {
  Assert.error(
    `
    alias token <auto> TOKEN1 as map {
      <100> A as 'a'
    };
    token <100> TOKEN2 as TOKEN1.A;`,
    [
      {
        code: Lang.Errors.INVALID_MAP_ENTRY_REFERENCE,
        column: [33, 34],
        line: [4, 4]
      }
    ]
  );
});

test('TOKEN referring a NODE map entry (reference error)', () => {
  Assert.error(
    `
    node <auto> NODE as map {
      <100> A as 'a'
    };
    token <100> TOKEN as NODE.A;`,
    [
      {
        code: Lang.Errors.INVALID_MAP_ENTRY_REFERENCE,
        column: [30, 31],
        line: [4, 4]
      }
    ]
  );
});

test('TOKEN referring an ALIAS NODE map entry (reference error)', () => {
  Assert.error(
    `
    alias node <auto> NODE as map {
      <100> A as 'a'
    };
    token <100> TOKEN as NODE.A;`,
    [
      {
        code: Lang.Errors.INVALID_MAP_ENTRY_REFERENCE,
        column: [30, 31],
        line: [4, 4]
      }
    ]
  );
});

test('TOKEN map entry already defined (token collision)', () => {
  Assert.error(
    `
    token <100> TOKEN1 as '@';
    token <101> TOKEN2 as map {
      '@'
    };`,
    [
      {
        code: Lang.Errors.TOKEN_COLLISION,
        column: [6, 9],
        line: [3, 3]
      }
    ]
  );
});

test('Loose TOKEN map entry already defined (token collision)', () => {
  Assert.error(
    `
    node <200> NODE as map {
      '@'
    };
    token <100> TOKEN as '@';`,
    [
      {
        code: Lang.Errors.TOKEN_COLLISION,
        column: [25, 28],
        line: [4, 4]
      }
    ]
  );
});

test('NODE referring an undefined TOKEN map entry (reference error)', () => {
  Assert.error(
    `
    token <100> TOKEN as map {
      'a'
    };
    node <200> NODE as TOKEN.A;`,
    [
      {
        code: Lang.Errors.UNDEFINED_IDENTIFIER,
        column: [29, 30],
        line: [4, 4]
      }
    ]
  );
});

test('NODE referring a NODE map entry (reference error)', () => {
  Assert.error(
    `
    node <auto> NODE1 as map {
      A as 'a'
    };
    node <200> NODE2 as NODE1.A;`,
    [
      {
        code: Lang.Errors.INVALID_MAP_ENTRY_REFERENCE,
        column: [30, 31],
        line: [4, 4]
      }
    ]
  );
});

test('NODE referring an ALIAS NODE map entry (reference error)', () => {
  Assert.error(
    `
    alias node <auto> NODE1 as map {
      A as 'a'
    };
    node <200> NODE2 as NODE1.A;`,
    [
      {
        code: Lang.Errors.INVALID_MAP_ENTRY_REFERENCE,
        column: [30, 31],
        line: [4, 4]
      }
    ]
  );
});

test('NODE referring an ALIAS TOKEN map entry (reference error)', () => {
  Assert.error(
    `
    alias token <auto> TOKEN as map {
      A as 'a'
    };
    node <200> NODE as TOKEN.A;`,
    [
      {
        code: Lang.Errors.INVALID_MAP_ENTRY_REFERENCE,
        column: [23, 28],
        line: [4, 4]
      }
    ]
  );
});

test('NODE referring a whole dynamic TOKEN map (reference error)', () => {
  Assert.error(
    `
    token <auto> TOKEN as map {
      A as 'a'
    };
    node <200> NODE as TOKEN;`,
    [
      {
        code: Lang.Errors.INVALID_MAP_REFERENCE,
        column: [23, 28],
        line: [4, 4]
      }
    ]
  );
});

test('NODE referring a whole dynamic nested TOKEN map entry (reference error)', () => {
  Assert.error(
    `
    token <auto> TOKEN as map {
      <auto> A as 'a' & map {
        B as 'b'
      }
    };
    node <200> NODE as TOKEN.A;`,
    [
      {
        code: Lang.Errors.INVALID_MAP_REFERENCE,
        column: [29, 30],
        line: [6, 6]
      }
    ]
  );
});

test('NODE referring a loose TOKEN map already defined (token collision)', () => {
  Assert.error(
    `
    token <100> TOKEN as 'a';
    node <200> NODE as map {
      'a'
    };`,
    [
      {
        code: Lang.Errors.TOKEN_COLLISION,
        column: [6, 9],
        line: [3, 3]
      }
    ]
  );
});
