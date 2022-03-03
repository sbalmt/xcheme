import * as Assert from './utils/assert';

test("Parse a 'NODE' pattern with a loose token reference", () => {
  const { project, context } = Assert.parser(
    '@@@',
    `
    node NODE as '@' & opt '@';`
  );
  // Assert tokens.
  const ref1 = project.symbols.get('@REF1')!; // '@'
  expect(ref1).toBeDefined();
  Assert.tokens(context, [ref1.data.identity], 3);
  // Assert nodes.
  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  Assert.nodes(context, [node.data.identity], 2);
});

test("Parse a 'NODE' pattern with a loose token range reference", () => {
  const { project, context } = Assert.parser(
    '0123456789',
    `
    node NODE as from '0' to '9';`
  );
  // Assert tokens.
  const ref1 = project.symbols.get('@REF1')!;
  expect(ref1).toBeDefined();
  Assert.tokens(context, [ref1.data.identity], 10);
  // Assert nodes.
  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  Assert.nodes(context, [node.data.identity], 10);
});

test("Parse a 'NODE' pattern with a loose token map reference", () => {
  const { project, context } = Assert.parser(
    'abba',
    `
    node NODE as map {
      'a',
      'b'
    };`
  );
  // Assert tokens.
  const ref1 = project.symbols.get('@REF1')!;
  const ref2 = project.symbols.get('@REF2')!;
  expect(ref1).toBeDefined();
  expect(ref2).toBeDefined();
  Assert.tokens(context, [ref1.data.identity, ref2.data.identity], 4);
  // Assert nodes.
  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  Assert.nodes(context, [node.data.identity], 4);
});

test("Parse a 'NODE' pattern with a token reference", () => {
  const { project, context } = Assert.parser(
    '@@@',
    `
    token TOKEN as '@';
    node  NODE  as TOKEN;`
  );
  // Assert tokens.
  const token = project.symbols.get('TOKEN')!;
  expect(token).toBeDefined();
  Assert.tokens(context, [token.data.identity], 3);
  // Assert nodes.
  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  Assert.nodes(context, [node.data.identity], 3);
});

test("Parse a 'NODE' pattern with an alias node reference", () => {
  const { project, context } = Assert.parser(
    '@@@',
    `
    alias node ALIAS as '@';
          node NODE  as ALIAS;`
  );
  // Assert tokens.
  const ref1 = project.symbols.get('@REF1')!; // '@'
  expect(ref1).toBeDefined();
  Assert.tokens(context, [ref1.data.identity], 3);
  // Assert nodes.
  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  Assert.nodes(context, [node.data.identity], 3);
});

test("Parse a 'NODE' pattern with a reference to itself", () => {
  const { project, context } = Assert.parser(
    '@@@',
    `
    node NODE as '@' & opt NODE;`
  );
  // Assert tokens.
  const ref1 = project.symbols.get('@REF1')!; // '@'
  expect(ref1).toBeDefined();
  Assert.tokens(context, [ref1.data.identity], 3);
  // Assert nodes.
  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  Assert.nodes(context, [node.data.identity], 3);
});

test("Parse a 'NODE' pattern with an alias node that has a reference to itself", () => {
  const { project, context } = Assert.parser(
    '@@@',
    `
    alias node ALIAS as '@' & opt ALIAS;
          node NODE  as ALIAS;`
  );
  // Assert tokens.
  const ref1 = project.symbols.get('@REF1')!; // '@'
  expect(ref1).toBeDefined();
  Assert.tokens(context, [ref1.data.identity], 3);
  // Assert nodes.
  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  Assert.nodes(context, [node.data.identity], 1);
});

test("Parse a 'NODE' pattern with token map entry references", () => {
  const { project, context } = Assert.parser(
    'abab',
    `
    token <auto> TOKEN as map {
      <100> A as 'a',
      <101> B as 'b'
    };
    node <auto> NODE as map {
      <200> A as TOKEN.A,
      <201> B as TOKEN.B
    };`
  );
  // Assert nodes.
  const tokenA = project.symbols.get('TOKEN@A')!;
  const tokenB = project.symbols.get('TOKEN@B')!;
  expect(tokenA).toBeDefined();
  expect(tokenB).toBeDefined();
  Assert.tokens(context, [tokenA.data.identity, tokenB.data.identity], 4);
  // Assert tokens.
  const nodeA = project.symbols.get('NODE@A')!;
  const nodeB = project.symbols.get('NODE@B')!;
  expect(nodeA).toBeDefined();
  expect(nodeB).toBeDefined();
  Assert.nodes(context, [nodeA.data.identity, nodeB.data.identity], 4);
});

test("Parse a 'NODE' pattern with a whole node map reference", () => {
  const { project, context } = Assert.parser(
    'a!b!',
    `
    alias node NODE1 as map {
        <200> A as 'a',
        <201> B as 'b'
    };
    node <auto> NODE2 as NODE1 & '!';`
  );
  // Assert tokens.
  const ref1 = project.symbols.get('@REF1')!; // 'a'
  const ref2 = project.symbols.get('@REF2')!; // 'b'
  const ref3 = project.symbols.get('@REF3')!; // '!'
  expect(ref1).toBeDefined();
  expect(ref2).toBeDefined();
  expect(ref3).toBeDefined();
  Assert.tokens(context, [ref1.data.identity, ref2.data.identity, ref3.data.identity], 4);
  // Assert nodes.
  const nodeA = project.symbols.get('NODE1@A')!;
  const nodeB = project.symbols.get('NODE1@B')!;
  expect(nodeA).toBeDefined();
  expect(nodeB).toBeDefined();
  Assert.nodes(context, [nodeA.data.identity, nodeB.data.identity], 2);
});

test("Parse a 'NODE' pattern with an imported alias node pattern", () => {
  const { project, context } = Assert.parser(
    'node1node1',
    `
    import './module2';
    node NODE as EXTERNAL_NODE1;`
  );
  // Assert nodes.
  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  Assert.nodes(context, [node.data.identity], 2);
});

test("Parse a 'NODE' pattern with an imported token pattern", () => {
  const { project, context } = Assert.parser(
    'token2token2',
    `
    import './module2';
    node NODE as EXTERNAL_ISOLATED_TOKEN2;`
  );
  // Assert nodes.
  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  Assert.nodes(context, [node.data.identity], 2);
});
