import * as Core from '@xcheme/core';

import * as Lang from '../../../src/index';
import * as Helper from '../helper';

const checkTokens = (context: Core.Context, identities: number[]): number => {
  let total = 0;
  for (const current of context.tokens) {
    expect(identities).toContain(current.value);
    total++;
  }
  return total;
};

const checkNodes = (context: Core.Context, identities: number[]): number => {
  let current = context.node;
  let total = 0;
  while ((current = current.next!)) {
    expect(identities).toContain(current.value);
    total++;
  }
  return total;
};

test("Parse a 'NODE' pattern with a loose token reference", () => {
  const input = "node NODE as '@' & opt '@';";
  const project = Helper.makeParser(new Lang.LiveCoder(), input);
  const context = new Core.Context('test');

  // Check the resulting tokens.
  Helper.testLexer(project, context, '@@@');

  const token = project.symbols.get('@REF1')!; // '@'
  expect(token).toBeDefined();
  expect(checkTokens(context, [token.data.identity])).toBe(3);

  // Check the resulting nodes.
  Helper.testParser(project, context, context.tokens);

  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  expect(checkNodes(context, [node.data.identity])).toBe(2);
});

test("Parse a 'NODE' pattern with a loose token range reference", () => {
  const input = "node NODE as from '0' to '9';";
  const project = Helper.makeParser(new Lang.LiveCoder(), input);
  const context = new Core.Context('test');

  // Check the resulting tokens.
  Helper.testLexer(project, context, '0123456789');

  const token = project.symbols.get('@REF1')!;
  expect(token).toBeDefined();
  expect(checkTokens(context, [token.data.identity])).toBe(10);

  // Check the resulting nodes.
  Helper.testParser(project, context, context.tokens);

  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  expect(checkNodes(context, [node.data.identity])).toBe(10);
});

test("Parse a 'NODE' pattern with a loose token map reference", () => {
  const input = "node NODE as map { 'a', 'b' };";
  const project = Helper.makeParser(new Lang.LiveCoder(), input);
  const context = new Core.Context('test');

  // Check the resulting tokens.
  Helper.testLexer(project, context, 'abba');

  const token1 = project.symbols.get('@REF1')!;
  expect(token1).toBeDefined();

  const token2 = project.symbols.get('@REF2')!;
  expect(token2).toBeDefined();

  expect(checkTokens(context, [token1.data.identity, token2.data.identity])).toBe(4);

  // Check the resulting nodes.
  Helper.testParser(project, context, context.tokens);

  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  expect(checkNodes(context, [0])).toBe(4);
});

test("Parse a 'NODE' pattern with a token reference", () => {
  const input = "token TOKEN as '@'; node NODE as TOKEN;";
  const project = Helper.makeParser(new Lang.LiveCoder(), input);
  const context = new Core.Context('test');

  // Check the resulting tokens.
  Helper.testLexer(project, context, '@@@');

  const token = project.symbols.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(checkTokens(context, [token.data.identity])).toBe(3);

  // Check the resulting nodes.
  Helper.testParser(project, context, context.tokens);

  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  expect(checkNodes(context, [node.data.identity])).toBe(3);
});

test("Parse a 'NODE' pattern with an alias node reference", () => {
  const input = "alias node ALIAS as '@'; node NODE as ALIAS;";
  const project = Helper.makeParser(new Lang.LiveCoder(), input);
  const context = new Core.Context('test');

  // Check the resulting tokens.
  Helper.testLexer(project, context, '@@@');

  const token = project.symbols.get('@REF1')!; // '@'
  expect(token).toBeDefined();
  expect(checkTokens(context, [token.data.identity])).toBe(3);

  // Check the resulting nodes.
  Helper.testParser(project, context, context.tokens);

  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  expect(checkNodes(context, [node.data.identity])).toBe(3);
});

test("Parse a 'NODE' pattern with a reference to itself", () => {
  const input = "node NODE as '@' & opt NODE;";
  const project = Helper.makeParser(new Lang.LiveCoder(), input);
  const context = new Core.Context('test');

  // Check the resulting tokens.
  Helper.testLexer(project, context, '@@@');

  const token = project.symbols.get('@REF1')!; // '@'
  expect(token).toBeDefined();
  expect(checkTokens(context, [token.data.identity])).toBe(3);

  // Check the resulting nodes.
  Helper.testParser(project, context, context.tokens);

  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  expect(checkNodes(context, [node.data.identity])).toBe(3);
});

test("Parse a 'NODE' pattern with an alias node that has a reference to itself", () => {
  const input = "alias node ALIAS as '@' & opt ALIAS; node NODE as ALIAS;";
  const project = Helper.makeParser(new Lang.LiveCoder(), input);
  const context = new Core.Context('test');

  // Check the resulting tokens.
  Helper.testLexer(project, context, '@@@');

  const token = project.symbols.get('@REF1')!; // '@'
  expect(token).toBeDefined();
  expect(checkTokens(context, [token.data.identity])).toBe(3);

  // Check the resulting nodes.
  Helper.testParser(project, context, context.tokens);

  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  expect(checkNodes(context, [node.data.identity])).toBe(1);
});

test("Parse a 'NODE' pattern with token map entry references", () => {
  const input =
    "token <auto> TOKEN as map { <100> A as 'a', <101> B as 'b' }; node <auto> NODE as map { <200> A as TOKEN.A, <201> B as TOKEN.B };";
  const project = Helper.makeParser(new Lang.LiveCoder(), input);
  const context = new Core.Context('test');

  // Check the resulting tokens.
  Helper.testLexer(project, context, 'abab');

  expect(checkTokens(context, [100, 101])).toBe(4);

  // Check the resulting nodes.
  Helper.testParser(project, context, context.tokens);

  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  expect(checkNodes(context, [200, 201])).toBe(4);
});

test("Parse a 'NODE' pattern with a whole node map reference", () => {
  const input = "alias node NODE1 as map { <200> A as 'a', <201> B as 'b' }; node <auto> NODE2 as NODE1 & '!';";
  const project = Helper.makeParser(new Lang.LiveCoder(), input);
  const context = new Core.Context('test');

  // Check the resulting tokens.
  const token1 = project.symbols.get('@REF1')!; // 'a'
  expect(token1).toBeDefined();

  const token2 = project.symbols.get('@REF2')!; // 'b'
  expect(token2).toBeDefined();

  const token3 = project.symbols.get('@REF3')!; // '!'
  expect(token3).toBeDefined();

  Helper.testLexer(project, context, 'a!b!');

  expect(checkTokens(context, [token1.data.identity, token2.data.identity, token3.data.identity])).toBe(4);

  // Check the resulting nodes.
  Helper.testParser(project, context, context.tokens);

  const node = project.symbols.get('NODE2')!;
  expect(node).toBeDefined();
  expect(checkNodes(context, [200, 201])).toBe(2);
});

test("Parse a 'NODE' pattern with an imported alias node pattern", () => {
  const input = "import './module2'; node NODE as EXTERNAL_NODE1;";
  const project = Helper.makeParser(new Lang.LiveCoder(), input);
  const context = new Core.Context('test');

  // Check the resulting tokens.
  Helper.testLexer(project, context, 'node1node1');

  // Check the resulting nodes.
  Helper.testParser(project, context, context.tokens);

  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  expect(checkNodes(context, [node.data.identity])).toBe(2);
});

test("Parse a 'NODE' pattern with an imported token pattern", () => {
  const input = "import './module2'; node NODE as EXTERNAL_ISOLATED_TOKEN2;";
  const project = Helper.makeParser(new Lang.LiveCoder(), input);
  const context = new Core.Context('test');

  // Check the resulting tokens.
  Helper.testLexer(project, context, 'token2token2');

  // Check the resulting nodes.
  Helper.testParser(project, context, context.tokens);

  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  expect(checkNodes(context, [node.data.identity])).toBe(2);
});
