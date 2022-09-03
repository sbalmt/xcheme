import * as Lang from '../../src/index';
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

test('SKIP map using an undefined entry', () => {
  Assert.error(
    `
    skip map {
      UNDEFINED
    };`,
    [
      {
        code: Lang.Errors.UNDEFINED_IDENTIFIER,
        column: [6, 15],
        line: [2, 2]
      },
      {
        code: Lang.Errors.INVALID_SKIP_MAP_ENTRY,
        column: [6, 15],
        line: [2, 2]
      }
    ]
  );
});

test('SKIP map using an invalid TOKEN entry', () => {
  Assert.error(
    `
    token <100> TOKEN as '@';
    skip map {
      TOKEN
    };`,
    [
      {
        code: Lang.Errors.INVALID_TOKEN_REFERENCE,
        column: [6, 11],
        line: [3, 3]
      },
      {
        code: Lang.Errors.INVALID_SKIP_MAP_ENTRY,
        column: [6, 11],
        line: [3, 3]
      }
    ]
  );
});

test('SKIP map using an invalid ALIAS TOKEN entry', () => {
  Assert.error(
    `
    alias token ALIAS as '@';
    skip map {
      ALIAS
    };`,
    [
      {
        code: Lang.Errors.INVALID_SKIP_MAP_ENTRY,
        column: [6, 11],
        line: [3, 3]
      }
    ]
  );
});

test('SKIP map using an invalid NODE entry', () => {
  Assert.error(
    `
    node <200> NODE as '@';
    skip map {
      NODE
    };`,
    [
      {
        code: Lang.Errors.INVALID_NODE_REFERENCE,
        column: [6, 10],
        line: [3, 3]
      },
      {
        code: Lang.Errors.INVALID_SKIP_MAP_ENTRY,
        column: [6, 10],
        line: [3, 3]
      }
    ]
  );
});

test('SKIP map using an invalid ALIAS NODE entry', () => {
  Assert.error(
    `
    alias node ALIAS as '@';
    skip map {
      ALIAS
    };`,
    [
      {
        code: Lang.Errors.INVALID_ALIAS_NODE_REFERENCE,
        column: [6, 11],
        line: [3, 3]
      },
      {
        code: Lang.Errors.INVALID_SKIP_MAP_ENTRY,
        column: [6, 11],
        line: [3, 3]
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

test('TOKEN map using an undefined entry', () => {
  Assert.error(
    `
    token <100> TOKEN as map {
      UNDEFINED
    };`,
    [
      {
        code: Lang.Errors.UNDEFINED_IDENTIFIER,
        column: [6, 15],
        line: [2, 2]
      },
      {
        code: Lang.Errors.INVALID_TOKEN_MAP_ENTRY,
        column: [6, 15],
        line: [2, 2]
      }
    ]
  );
});

test('TOKEN map using an invalid TOKEN entry', () => {
  Assert.error(
    `
    token <100> TOKEN1 as '@';
    token <101> TOKEN2 as map {
      TOKEN1
    };`,
    [
      {
        code: Lang.Errors.INVALID_TOKEN_MAP_ENTRY,
        column: [6, 12],
        line: [3, 3]
      }
    ]
  );
});

test('TOKEN map using an invalid ALIAS TOKEN entry', () => {
  Assert.error(
    `
    alias token ALIAS as '@';
    token <100> TOKEN as map {
      ALIAS
    };`,
    [
      {
        code: Lang.Errors.INVALID_TOKEN_MAP_ENTRY,
        column: [6, 11],
        line: [3, 3]
      }
    ]
  );
});

test('TOKEN map using an invalid NODE entry', () => {
  Assert.error(
    `
    node <200> NODE as '@';
    token <100> TOKEN as map {
      NODE
    };`,
    [
      {
        code: Lang.Errors.INVALID_NODE_REFERENCE,
        column: [6, 10],
        line: [3, 3]
      },
      {
        code: Lang.Errors.INVALID_TOKEN_MAP_ENTRY,
        column: [6, 10],
        line: [3, 3]
      }
    ]
  );
});

test('TOKEN map using an invalid ALIAS NODE entry', () => {
  Assert.error(
    `
    alias node ALIAS as '@';
    token <100> TOKEN as map {
      ALIAS
    };`,
    [
      {
        code: Lang.Errors.INVALID_ALIAS_NODE_REFERENCE,
        column: [6, 11],
        line: [3, 3]
      },
      {
        code: Lang.Errors.INVALID_TOKEN_MAP_ENTRY,
        column: [6, 11],
        line: [3, 3]
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

test('NODE map using an undefined entry', () => {
  Assert.error(
    `
    node <200> NODE as map {
      UNDEFINED
    };`,
    [
      {
        code: Lang.Errors.UNDEFINED_IDENTIFIER,
        column: [6, 15],
        line: [2, 2]
      },
      {
        code: Lang.Errors.INVALID_NODE_MAP_ENTRY,
        column: [6, 15],
        line: [2, 2]
      }
    ]
  );
});

test('NODE map using an undefined TOKEN entry', () => {
  Assert.error(
    `
    token <100> TOKEN as map {
      A as 'a'
    };
    node <200> NODE as map {
      TOKEN.UNDEFINED
    };`,
    [
      {
        code: Lang.Errors.UNDEFINED_IDENTIFIER,
        column: [12, 21],
        line: [5, 5]
      },
      {
        code: Lang.Errors.INVALID_NODE_MAP_ENTRY,
        column: [6, 21],
        line: [5, 5]
      }
    ]
  );
});

test('NODE map using an invalid ALIAS TOKEN entry', () => {
  Assert.error(
    `
    alias token ALIAS as '@';
    node <200> NODE as map {
      ALIAS
    };`,
    [
      {
        code: Lang.Errors.INVALID_ALIAS_TOKEN_REFERENCE,
        column: [6, 11],
        line: [3, 3]
      },
      {
        code: Lang.Errors.INVALID_NODE_MAP_ENTRY,
        column: [6, 11],
        line: [3, 3]
      }
    ]
  );
});

test('NODE map using an invalid NODE entry', () => {
  Assert.error(
    `
    node <200> NODE1 as '@';
    node <201> NODE2 as map {
      NODE2
    };`,
    [
      {
        code: Lang.Errors.INVALID_NODE_MAP_ENTRY,
        column: [6, 11],
        line: [3, 3]
      }
    ]
  );
});

test('NODE map using an invalid ALIAS NODE entry', () => {
  Assert.error(
    `
    alias node ALIAS as '@';
    node <200> NODE as map {
      ALIAS
    };`,
    [
      {
        code: Lang.Errors.INVALID_NODE_MAP_ENTRY,
        column: [6, 11],
        line: [3, 3]
      }
    ]
  );
});
