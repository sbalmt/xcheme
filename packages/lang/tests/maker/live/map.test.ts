import * as Core from '@xcheme/core';

import * as Assert from './utils/assert';

test("Parse a 'MAP' pattern", () => {
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

test("Parse a 'MAP' pattern with compound patterns", () => {
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

test("Parse a 'MAP' pattern with nested map patterns", () => {
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

test("Parse a 'MAP' pattern in a token directive", () => {
  const { project, context } = Assert.lexer(
    'abc',
    `
    token TOKEN as map {
      <100> A as 'a',
                 'b',
                 'c'
    };`
  );
  // Assert tokens.
  const tokenA = project.symbols.get('TOKEN@A')!;
  const token = project.symbols.get('TOKEN')!;
  expect(tokenA).toBeDefined();
  expect(token).toBeDefined();
  expect(tokenA.data.identity).toBe(100);
  expect(token.data.identity).toBe(0);
  Assert.tokens(context, [tokenA.data.identity, token.data.identity], 3);
});

test("Parse a 'MAP' pattern in a node directive", () => {
  const { project, context } = Assert.parser(
    'abc',
    `
    node NODE as map {
      <100> A as 'a',
                 'b',
                 'c'
    };`
  );
  // Assert tokens.
  const ref1 = project.symbols.get('@REF1')!; // 'a'
  const ref2 = project.symbols.get('@REF2')!; // 'b'
  const ref3 = project.symbols.get('@REF3')!; // 'c'
  expect(ref1).toBeDefined();
  expect(ref2).toBeDefined();
  expect(ref3).toBeDefined();
  Assert.tokens(context, [ref1.data.identity, ref2.data.identity, ref3.data.identity], 3);
  // Assert nodes.
  const nodeA = project.symbols.get('NODE@A')!;
  const node = project.symbols.get('NODE')!;
  expect(nodeA).toBeDefined();
  expect(node).toBeDefined();
  expect(nodeA.data.identity).toBe(100);
  expect(node.data.identity).toBe(0);
  Assert.nodes(context, [nodeA.data.identity, node.data.identity], 3);
});

test("Parse a 'MAP' pattern in a node directive using map expressions", () => {
  const { project, context } = Assert.parser(
    'acbc',
    `
    token <auto> TOKEN as map {
      <100> A as 'a',
      <101> B as 'b',
      <102> C as 'c'
    };
    node <auto> NODE as map {
      <200> A as TOKEN.A & TOKEN.C,
      TOKEN.B & TOKEN.C
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
  const node = project.symbols.get('NODE')!;
  expect(nodeA).toBeDefined();
  expect(node).toBeDefined();
  expect(nodeA.data.identity).toBe(200);
  expect(node.data.identity).toBe(Core.BaseSource.Output);
  Assert.nodes(context, [nodeA.data.identity, node.data.identity], 2);
});
