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
  Assert.nodes(context, [nodeA.data.identity, node.data.identity], 3);
});
