import * as Core from '@xcheme/core';
import * as Helper from '../helper';
import * as Lang from '../../../src/index';

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

test("Parse a 'NODE' rule with a loose token reference", () => {
  const project = Helper.makeParser(new Lang.LiveCoder(), "node NODE as '@' & opt '@';");
  const context = new Core.Context('test');

  // Check the resulting tokens.
  Helper.testLexer(project, context, '@@@');

  const token = project.tokenEntries.get('@REF1')!; // '@'
  expect(token).toBeDefined();
  expect(checkTokens(context, [token.identity])).toBe(3);

  // Check the resulting nodes.
  Helper.testParser(project, context, context.tokens);

  const node = project.nodeEntries.get('NODE')!;
  expect(node).toBeDefined();
  expect(checkNodes(context, [node.identity])).toBe(2);
});

test("Parse a 'NODE' rule with a loose token range rule", () => {
  const project = Helper.makeParser(new Lang.LiveCoder(), "node NODE as from '0' to '9';");
  const context = new Core.Context('test');

  // Check the resulting tokens.
  Helper.testLexer(project, context, '0123456789');

  const token = project.tokenEntries.get('@REF1')!;
  expect(token).toBeDefined();
  expect(checkTokens(context, [token.identity])).toBe(10);

  // Check the resulting nodes.
  Helper.testParser(project, context, context.tokens);

  const node = project.nodeEntries.get('NODE')!;
  expect(node).toBeDefined();
  expect(checkNodes(context, [node.identity])).toBe(10);
});

test("Parse a 'NODE' rule with a loose token map rule", () => {
  const project = Helper.makeParser(new Lang.LiveCoder(), "node NODE as map { 'a', 'b' };");
  const context = new Core.Context('test');

  // Check the resulting tokens.
  Helper.testLexer(project, context, 'abba');

  const token1 = project.tokenEntries.get('@REF1')!;
  const token2 = project.tokenEntries.get('@REF2')!;

  expect(token1).toBeDefined();
  expect(token2).toBeDefined();

  expect(checkTokens(context, [token1.identity, token2.identity])).toBe(4);

  // Check the resulting nodes.
  Helper.testParser(project, context, context.tokens);

  const node = project.nodeEntries.get('NODE')!;
  expect(node).toBeDefined();
  expect(checkNodes(context, [0])).toBe(4);
});

test("Parse a 'NODE' rule with a token reference", () => {
  const project = Helper.makeParser(new Lang.LiveCoder(), "token TOKEN as '@'; node NODE as TOKEN;");
  const context = new Core.Context('test');

  // Check the resulting tokens.
  Helper.testLexer(project, context, '@@@');

  const token = project.tokenEntries.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(checkTokens(context, [token.identity])).toBe(3);

  // Check the resulting nodes.
  Helper.testParser(project, context, context.tokens);

  const node = project.nodeEntries.get('NODE')!;
  expect(node).toBeDefined();
  expect(checkNodes(context, [node.identity])).toBe(3);
});

test("Parse a 'NODE' rule with an alias node reference", () => {
  const project = Helper.makeParser(new Lang.LiveCoder(), "alias node ALIAS as '@'; node NODE as ALIAS;");
  const context = new Core.Context('test');

  // Check the resulting tokens.
  Helper.testLexer(project, context, '@@@');

  const token = project.tokenEntries.get('@REF1')!; // '@'
  expect(token).toBeDefined();
  expect(checkTokens(context, [token.identity])).toBe(3);

  // Check the resulting nodes.
  Helper.testParser(project, context, context.tokens);

  const node = project.nodeEntries.get('NODE')!;
  expect(node).toBeDefined();
  expect(checkNodes(context, [node.identity])).toBe(3);
});

test("Parse a 'NODE' rule with a reference to itself", () => {
  const project = Helper.makeParser(new Lang.LiveCoder(), "node NODE as '@' & opt NODE;");
  const context = new Core.Context('test');

  // Check the resulting tokens.
  Helper.testLexer(project, context, '@@@');

  const token = project.tokenEntries.get('@REF1')!; // '@'
  expect(token).toBeDefined();
  expect(checkTokens(context, [token.identity])).toBe(3);

  // Check the resulting nodes.
  Helper.testParser(project, context, context.tokens);

  const node = project.nodeEntries.get('NODE')!;
  expect(node).toBeDefined();
  expect(checkNodes(context, [node.identity])).toBe(3);
});

test("Parse a 'NODE' rule with an alias node that has a reference to itself", () => {
  const project = Helper.makeParser(new Lang.LiveCoder(), "alias node ALIAS as '@' & opt ALIAS; node NODE as ALIAS;");
  const context = new Core.Context('test');

  // Check the resulting tokens.
  Helper.testLexer(project, context, '@@@');

  const token = project.tokenEntries.get('@REF1')!; // '@'
  expect(token).toBeDefined();
  expect(checkTokens(context, [token.identity])).toBe(3);

  // Check the resulting nodes.
  Helper.testParser(project, context, context.tokens);

  const node = project.nodeEntries.get('NODE')!;
  expect(node).toBeDefined();
  expect(checkNodes(context, [node.identity])).toBe(1);
});

test("Parse a 'NODE' rule with token map entry references", () => {
  const project = Helper.makeParser(
    new Lang.LiveCoder(),
    "token TOKEN as map { <100> A as 'a', <101> B as 'b' }; node NODE as map { <200> A as TOKEN.A, <201> B as TOKEN.B };"
  );
  const context = new Core.Context('test');

  // Check the resulting tokens.
  Helper.testLexer(project, context, 'abab');

  expect(checkTokens(context, [100, 101])).toBe(4);

  // Check the resulting nodes.
  Helper.testParser(project, context, context.tokens);

  const node = project.nodeEntries.get('NODE')!;
  expect(node).toBeDefined();
  expect(checkNodes(context, [200, 201])).toBe(4);
});

test("Parse a 'NODE' rule with a whole node map reference", () => {
  const project = Helper.makeParser(
    new Lang.LiveCoder(),
    "alias node NODE1 as map { <200> A as 'a', <201> B as 'b' }; node NODE2 as NODE1 & '!';"
  );
  const context = new Core.Context('test');

  // Check the resulting tokens.
  const token1 = project.tokenEntries.get('@REF1')!; // 'a'
  const token2 = project.tokenEntries.get('@REF2')!; // 'b'
  const token3 = project.tokenEntries.get('@REF4')!; // '!'

  expect(token1).toBeDefined();
  expect(token2).toBeDefined();
  expect(token3).toBeDefined();

  Helper.testLexer(project, context, 'a!b!');

  expect(checkTokens(context, [token1.identity, token2.identity, token3.identity])).toBe(4);

  // Check the resulting nodes.
  Helper.testParser(project, context, context.tokens);

  const node = project.nodeEntries.get('NODE2')!;
  expect(node).toBeDefined();
  expect(checkNodes(context, [200, 201])).toBe(2);
});

test("Parse a 'NODE' rule with a whole node map reference and other patterns", () => {
  const project = Helper.makeParser(
    new Lang.LiveCoder(),
    "alias node NODE1 as map { <200> A as 'a', <201> B as 'b' }; node <202> NODE2 as NODE1 | '!';"
  );
  const context = new Core.Context('test');

  // Check the resulting tokens.
  const token1 = project.tokenEntries.get('@REF1')!; // 'a'
  const token2 = project.tokenEntries.get('@REF2')!; // 'b'
  const token3 = project.tokenEntries.get('@REF4')!; // '!'

  expect(token1).toBeDefined();
  expect(token2).toBeDefined();
  expect(token3).toBeDefined();

  Helper.testLexer(project, context, 'a!b!');

  expect(checkTokens(context, [token1.identity, token2.identity, token3.identity])).toBe(4);

  // Check the resulting nodes.
  Helper.testParser(project, context, context.tokens);

  const node = project.nodeEntries.get('NODE2')!;
  expect(node).toBeDefined();
  expect(checkNodes(context, [200, 201, 202])).toBe(4);
});
