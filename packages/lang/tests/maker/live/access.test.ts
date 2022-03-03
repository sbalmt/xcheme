import * as Assert from './utils/assert';

test("Parse an 'ACCESS' pattern in a token map", () => {
  const { project, context } = Assert.parser(
    'aaaa',
    `
    token <auto> TOKEN as map {
      <100> A as 'a'
    };
    node NODE as TOKEN.A;`
  );
  // Assert tokens.
  const tokenA = project.symbols.get('TOKEN@A')!;
  expect(tokenA).toBeDefined();
  expect(tokenA.data.identity).toBe(100);
  Assert.tokens(context, [tokenA.data.identity], 4);
  // Assert nodes.
  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.data.identity).toBe(0);
  Assert.nodes(context, [node.data.identity], 4);
});

test("Parse an 'ACCESS' pattern in a nested token map", () => {
  const { project, context } = Assert.parser(
    'abac',
    `
    token <auto> TOKEN as map {
      <100> A as 'a' & map {
        <200> B as 'b',
              C as 'c'
      }
    };
    node NODE_AB as TOKEN.A.B;
    node NODE_AC as TOKEN.A.C;`
  );
  // Assert tokens.
  const tokenAB = project.symbols.get('TOKEN@A@B')!;
  const tokenAC = project.symbols.get('TOKEN@A@C')!;
  expect(tokenAB).toBeDefined();
  expect(tokenAC).toBeDefined();
  expect(tokenAB.data.identity).toBe(200);
  expect(tokenAC.data.identity).toBe(100);
  Assert.tokens(context, [tokenAB.data.identity, tokenAC.data.identity], 2);
  // Assert nodes.
  const nodeAB = project.symbols.get('NODE_AB')!;
  const nodeAC = project.symbols.get('NODE_AC')!;
  expect(nodeAB).toBeDefined();
  expect(nodeAC).toBeDefined();
  expect(nodeAB.data.identity).toBe(0);
  expect(nodeAC.data.identity).toBe(1);
  Assert.nodes(context, [nodeAB.data.identity, nodeAC.data.identity], 2);
});
