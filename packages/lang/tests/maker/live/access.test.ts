import * as Assert from './utils/assert';

test('Parse an ACCESS pattern in a token map', () => {
  const { project, context } = Assert.parser(
    'aaaa',
    `
    token <auto> TOKEN as map {
      <100> A as 'a'
    };
    node <200> NODE as TOKEN.A;`
  );
  // Assert tokens.
  const tokenA = project.symbols.get('TOKEN@A')!;
  expect(tokenA).toBeDefined();
  expect(tokenA.data.identity).toBe(100);
  Assert.tokens(context, [tokenA.data.identity], 4);
  // Assert nodes.
  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.data.identity).toBe(200);
  Assert.nodes(context, [node.data.identity], 4);
});

test('Parse an ACCESS pattern in a nested token map', () => {
  const { project, context } = Assert.parser(
    'abac',
    `
    token <auto> TOKEN as map {
      <auto> A as 'a' & map {
        <100> B as 'b',
        <101> C as 'c'
      }
    };
    node <200> NODE_AB as TOKEN.A.B;
    node <201> NODE_AC as TOKEN.A.C;`
  );
  // Assert tokens.
  const tokenAB = project.symbols.get('TOKEN@A@B')!;
  const tokenAC = project.symbols.get('TOKEN@A@C')!;
  expect(tokenAB).toBeDefined();
  expect(tokenAC).toBeDefined();
  expect(tokenAB.data.identity).toBe(100);
  expect(tokenAC.data.identity).toBe(101);
  Assert.tokens(context, [tokenAB.data.identity, tokenAC.data.identity], 2);
  // Assert nodes.
  const nodeAB = project.symbols.get('NODE_AB')!;
  const nodeAC = project.symbols.get('NODE_AC')!;
  expect(nodeAB).toBeDefined();
  expect(nodeAC).toBeDefined();
  expect(nodeAB.data.identity).toBe(200);
  expect(nodeAC.data.identity).toBe(201);
  Assert.nodes(context, [nodeAB.data.identity, nodeAC.data.identity], 2);
});

test('Parse an ACCESS pattern in a post-declared token map', () => {
  const { project, context } = Assert.parser(
    'aaaa',
    `
    node <200> NODE as TOKEN.A;
    token <auto> TOKEN as map {
      <100> A as 'a'
    };`
  );
  // Assert tokens.
  const tokenA = project.symbols.get('TOKEN@A')!;
  expect(tokenA).toBeDefined();
  expect(tokenA.data.identity).toBe(100);
  Assert.tokens(context, [tokenA.data.identity], 4);
  // Assert nodes.
  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.data.identity).toBe(200);
  Assert.nodes(context, [node.data.identity], 4);
});
