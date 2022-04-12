import * as Assert from './utils/assert';

test("Parse a 'NODE' pattern with zero identity", () => {
  const { project, context } = Assert.parser(
    'aa',
    `
    node <0> NODE as 'a';`
  );
  // Assert tokens.
  const ref1 = project.symbols.get('@REF0')!; // '@'
  expect(ref1).toBeDefined();
  expect(ref1.data.identity).toBe(0);
  Assert.tokens(context, [ref1.data.identity], 2);
  // Assert nodes.
  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.data.identity).toBe(0);
  Assert.nodes(context, [node.data.identity], 2);
});

test("Parse a 'NODE' pattern with a loose token reference", () => {
  const { project, context } = Assert.parser(
    '@@@',
    `
    node <200> NODE as '@' & opt '@';`
  );
  // Assert tokens.
  const ref1 = project.symbols.get('@REF0')!; // '@'
  expect(ref1).toBeDefined();
  expect(ref1.data.identity).toBe(0);
  Assert.tokens(context, [ref1.data.identity], 3);
  // Assert nodes.
  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.data.identity).toBe(200);
  Assert.nodes(context, [node.data.identity], 2);
});

test("Parse a 'NODE' pattern with a loose token range reference", () => {
  const { project, context } = Assert.parser(
    '0123456789',
    `
    node <200> NODE as from '0' to '9';`
  );
  // Assert tokens.
  const ref1 = project.symbols.get('@REF0')!;
  expect(ref1).toBeDefined();
  expect(ref1.data.identity).toBe(0);
  Assert.tokens(context, [ref1.data.identity], 10);
  // Assert nodes.
  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.data.identity).toBe(200);
  Assert.nodes(context, [node.data.identity], 10);
});

test("Parse a 'NODE' pattern with a loose token map reference", () => {
  const { project, context } = Assert.parser(
    'abba',
    `
    node <200> NODE as map {
      'a',
      'b'
    };`
  );
  // Assert tokens.
  const ref0 = project.symbols.get('@REF0')!;
  const ref1 = project.symbols.get('@REF1')!;
  expect(ref0).toBeDefined();
  expect(ref1).toBeDefined();
  expect(ref0.data.identity).toBe(0);
  expect(ref1.data.identity).toBe(1);
  Assert.tokens(context, [ref0.data.identity, ref1.data.identity], 4);
  // Assert nodes.
  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.data.identity).toBe(200);
  Assert.nodes(context, [node.data.identity], 4);
});

test("Parse a 'NODE' pattern with a pre-declared token reference", () => {
  const { project, context } = Assert.parser(
    'foofoo',
    `
    token <100> TOKEN as 'foo';
    node  <200> NODE  as TOKEN;`
  );
  // Assert tokens.
  const token = project.symbols.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(token.data.identity).toBe(100);
  Assert.tokens(context, [token.data.identity], 2);
  // Assert nodes.
  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.data.identity).toBe(200);
  Assert.nodes(context, [node.data.identity], 2);
});

test("Parse a 'NODE' pattern with a post-declared token reference", () => {
  const { project, context } = Assert.parser(
    'foofoo',
    `
    node  <200> NODE  as TOKEN;
    token <100> TOKEN as 'foo';`
  );
  // Assert tokens.
  const token = project.symbols.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(token.data.identity).toBe(100);
  Assert.tokens(context, [token.data.identity], 2);
  // Assert nodes.
  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.data.identity).toBe(200);
  Assert.nodes(context, [node.data.identity], 2);
});

test("Parse a 'NODE' pattern with an alias node reference", () => {
  const { project, context } = Assert.parser(
    '@@@',
    `
    alias node ALIAS as '@';
    node <200> NODE  as ALIAS;`
  );
  // Assert tokens.
  const ref0 = project.symbols.get('@REF0')!; // '@'
  expect(ref0).toBeDefined();
  expect(ref0.data.identity).toBe(0);
  Assert.tokens(context, [ref0.data.identity], 3);
  // Assert nodes.
  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.data.identity).toBe(200);
  Assert.nodes(context, [node.data.identity], 3);
});

test("Parse a 'NODE' pattern with a template node reference", () => {
  const { project, context } = Assert.parser(
    'foofoo',
    `
    alias <X, Y>
    node <X> TEMPLATE as repeat Y;

    token <100> TOKEN as 'foo';
    node  <200> NODE  as TEMPLATE <50, TOKEN>;`
  );
  // Assert templates.
  const template = project.symbols.get('@TEMPLATE:50:TOKEN')!;
  expect(template).toBeDefined();
  expect(template.data.identity).toBe(50);
  // Assert nodes.
  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.data.identity).toBe(200);
  Assert.nodes(context, [node.data.identity], 1);
});

test("Parse a 'NODE' pattern with multiple template node references", () => {
  const { project, context } = Assert.parser(
    'foofoo',
    `
    alias <X>
    node TEMPLATE as set <X> 'foo';

    node <200> NODE_1 as TEMPLATE <50>;
    node <201> NODE_2 as TEMPLATE <50>;`
  );
  // Assert templates.
  const template = project.symbols.get('@TEMPLATE:50')!;
  expect(template).toBeDefined();
  expect(template.data.identity).toBeNaN();
  // Assert nodes.
  const node1 = project.symbols.get('NODE_1')!;
  const node2 = project.symbols.get('NODE_2')!;
  expect(node1).toBeDefined();
  expect(node2).toBeDefined();
  expect(node1.data.identity).toBe(200);
  expect(node2.data.identity).toBe(201);
  Assert.nodes(context, [node1.data.identity], 2);
});

test("Parse a 'NODE' pattern with a reference to itself", () => {
  const { project, context } = Assert.parser(
    '@@@',
    `
    node <200> NODE as '@' & opt NODE;`
  );
  // Assert tokens.
  const ref0 = project.symbols.get('@REF0')!; // '@'
  expect(ref0).toBeDefined();
  expect(ref0.data.identity).toBe(0);
  Assert.tokens(context, [ref0.data.identity], 3);
  // Assert nodes.
  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.data.identity).toBe(200);
  Assert.nodes(context, [node.data.identity], 3);
});

test("Parse a 'NODE' pattern with an alias node that has a reference to itself", () => {
  const { project, context } = Assert.parser(
    '@@@',
    `
    alias node ALIAS as '@' & opt ALIAS;
    node <200> NODE  as ALIAS;`
  );
  // Assert tokens.
  const ref0 = project.symbols.get('@REF0')!; // '@'
  expect(ref0).toBeDefined();
  expect(ref0.data.identity).toBe(0);
  Assert.tokens(context, [ref0.data.identity], 3);
  // Assert nodes.
  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.data.identity).toBe(200);
  Assert.nodes(context, [node.data.identity], 1);
});

test("Parse a 'NODE' pattern with a template node that has a reference to itself", () => {
  const { project, context } = Assert.parser(
    'foofoo',
    `
    alias <X>
    node TEMPLATE as 'foo' & opt X;

    node <200> NODE as TEMPLATE <NODE>;`
  );
  // Assert templates.
  const template = project.symbols.get('@TEMPLATE:NODE')!;
  expect(template).toBeDefined();
  expect(template.data.identity).toBeNaN();
  // Assert nodes.
  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.data.identity).toBe(200);
  Assert.nodes(context, [node.data.identity], 2);
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
  expect(tokenA.data.identity).toBe(100);
  expect(tokenB.data.identity).toBe(101);
  Assert.tokens(context, [tokenA.data.identity, tokenB.data.identity], 4);
  // Assert tokens.
  const nodeA = project.symbols.get('NODE@A')!;
  const nodeB = project.symbols.get('NODE@B')!;
  expect(nodeA).toBeDefined();
  expect(nodeB).toBeDefined();
  expect(nodeA.data.identity).toBe(200);
  expect(nodeB.data.identity).toBe(201);
  Assert.nodes(context, [nodeA.data.identity, nodeB.data.identity], 4);
});

test("Parse a 'NODE' pattern with a whole node map reference", () => {
  const { project, context } = Assert.parser(
    'a!b!',
    `
    alias node ALIAS as map {
        <200> A as 'a',
        <201> B as 'b'
    };
    node <auto> NODE as ALIAS & '!';`
  );
  // Assert tokens.
  const ref0 = project.symbols.get('@REF0')!; // 'a'
  const ref1 = project.symbols.get('@REF1')!; // 'b'
  const ref2 = project.symbols.get('@REF2')!; // '!'
  expect(ref0).toBeDefined();
  expect(ref1).toBeDefined();
  expect(ref2).toBeDefined();
  expect(ref0.data.identity).toBe(0);
  expect(ref1.data.identity).toBe(1);
  expect(ref2.data.identity).toBe(2);
  Assert.tokens(context, [ref0.data.identity, ref1.data.identity, ref2.data.identity], 4);
  // Assert nodes.
  const aliasA = project.symbols.get('ALIAS@A')!;
  const aliasB = project.symbols.get('ALIAS@B')!;
  expect(aliasA).toBeDefined();
  expect(aliasB).toBeDefined();
  expect(aliasA.data.identity).toBe(200);
  expect(aliasB.data.identity).toBe(201);
  Assert.nodes(context, [aliasA.data.identity, aliasB.data.identity], 2);
});

test("Parse a 'NODE' pattern with an imported alias node directive", () => {
  const { project, context } = Assert.parser(
    'node1node1',
    `
    import './module2';
    node <250> NODE as EXTERNAL_NODE1;`
  );
  // Assert nodes.
  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.data.identity).toBe(250);
  Assert.nodes(context, [node.data.identity], 2);
});

test("Parse a 'NODE' pattern with an imported token directive", () => {
  const { project, context } = Assert.parser(
    'token2token2',
    `
    import './module2';
    node <250> NODE as EXTERNAL_ISOLATED_TOKEN2;`
  );
  // Assert nodes.
  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.data.identity).toBe(250);
  Assert.nodes(context, [node.data.identity], 2);
});
