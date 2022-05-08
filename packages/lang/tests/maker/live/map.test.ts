import * as Assert from './utils/assert';

test('Parse a MAP pattern', () => {
  Assert.lexer(
    'abc',
    `
    skip map {
      'a',
      'b',
      'c'
    };`
  );
});

test('Parse a MAP pattern using multiple optimized nodes', () => {
  Assert.lexer(
    'abc',
    `
    skip map {
      'a' & append <50> 'b' & 'c'
    };`
  );
});

test('Parse a MAP pattern with compound patterns', () => {
  Assert.lexer(
    'abcaccde',
    `
    skip map {
      'a' & opt 'b' & repeat 'c',
      'd',
      'e'
    };`
  );
});

test('Parse a MAP pattern with nested map patterns', () => {
  Assert.lexer(
    'a1ba2c',
    `
    skip map {
      'a' & map {
        '1',
        '2'
      },
      'b',
      'c'
    };`
  );
});

test('Parse a MAP pattern with a template reference', () => {
  Assert.lexer(
    'barfoo',
    `
    alias <X>
    token <X> FOO as 'foo';

    skip map {
      'bar' & FOO <10>
    };`
  );
});

test('Parse a MAP pattern in a dynamic TOKEN directive', () => {
  const { project, context } = Assert.lexer(
    'abc',
    `
    token <auto> TOKEN as map {
      <100> A as 'a',
            B as 'b',
            C as 'c'
    };`
  );
  // Assert tokens.
  const tokenA = project.symbols.get('TOKEN@A')!;
  const tokenB = project.symbols.get('TOKEN@B')!;
  const tokenC = project.symbols.get('TOKEN@C')!;
  expect(tokenA).toBeDefined();
  expect(tokenB).toBeDefined();
  expect(tokenC).toBeDefined();
  expect(tokenA.data.identity).toBe(100);
  expect(tokenB.data.identity).toBe(0);
  expect(tokenC.data.identity).toBe(1);
  Assert.tokens(context, [tokenA.data.identity, tokenB.data.identity, tokenC.data.identity], 3);
});

test('Parse a MAP pattern in a NODE directive', () => {
  const { project, context } = Assert.parser(
    'abc',
    `
    node <auto> NODE as map {
      <100> A as 'a',
            B as 'b',
            C as 'c'
    };`
  );
  // Assert tokens.
  const ref0 = project.symbols.get('@REF0')!; // 'a'
  const ref2 = project.symbols.get('@REF2')!; // 'b'
  const ref4 = project.symbols.get('@REF4')!; // 'c'
  expect(ref0).toBeDefined();
  expect(ref2).toBeDefined();
  expect(ref4).toBeDefined();
  Assert.tokens(context, [ref0.data.identity, ref2.data.identity, ref4.data.identity], 3);
  // Assert nodes.
  const nodeA = project.symbols.get('NODE@A')!;
  const nodeB = project.symbols.get('NODE@B')!;
  const nodeC = project.symbols.get('NODE@C')!;
  expect(nodeA).toBeDefined();
  expect(nodeB).toBeDefined();
  expect(nodeC).toBeDefined();
  expect(nodeA.data.identity).toBe(100);
  expect(nodeB.data.identity).toBe(1);
  expect(nodeC.data.identity).toBe(3);
  Assert.nodes(context, [nodeA.data.identity, nodeB.data.identity, nodeC.data.identity], 3);
});

test('Parse a MAP pattern in a NODE directive using access expressions', () => {
  const { project, context } = Assert.parser(
    'acbc',
    `
    token <auto> TOKEN as map {
      <100> A as 'a',
      <101> B as 'b',
            C as 'c'
    };
    node <auto> NODE as map {
      <200> A as TOKEN.A & TOKEN.C,
      <201> B as TOKEN.B & TOKEN.C
    };`
  );
  // Assert tokens.
  const tokenA = project.symbols.get('TOKEN@A')!;
  const tokenB = project.symbols.get('TOKEN@B')!;
  const tokenC = project.symbols.get('TOKEN@C')!;
  expect(tokenA).toBeDefined();
  expect(tokenB).toBeDefined();
  expect(tokenC).toBeDefined();
  Assert.tokens(context, [tokenA.data.identity, tokenB.data.identity, tokenC.data.identity], 4);
  // Assert nodes.
  const nodeA = project.symbols.get('NODE@A')!;
  const nodeB = project.symbols.get('NODE@B')!;
  expect(nodeA).toBeDefined();
  expect(nodeB).toBeDefined();
  expect(nodeA.data.identity).toBe(200);
  expect(nodeB.data.identity).toBe(201);
  Assert.nodes(context, [nodeA.data.identity, nodeB.data.identity], 2);
});
