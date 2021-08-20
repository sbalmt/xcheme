import * as Core from '@xcheme/core';
import * as Helper from '../helper';
import * as Lang from '../../../src/index';

const checkTokens = (context: Core.Context, identity: number): number => {
  let total = 0;
  for (const current of context.tokens) {
    expect(current.value).toBe(identity);
    total++;
  }
  return total;
};

const checkNodes = (context: Core.Context, identity: number): number => {
  let current = context.node;
  let total = 0;
  while ((current = current.next!)) {
    expect(current.value).toBe(identity);
    total++;
  }
  return total;
};

test("Parse a 'NODE' rule with a loose token reference", () => {
  const project = Helper.makeParser(new Lang.LiveCoder(), "node NODE as '@' & opt '@';");
  const context = new Core.Context('test');

  // Check the resulting tokens.
  Helper.testLexer(project, context, '@@@');

  const token = project.tokenEntries.get("'@'")!;
  expect(token).toBeDefined();
  expect(checkTokens(context, token.identity)).toBe(3);

  // Check the resulting nodes.
  Helper.testParser(project, context, context.tokens);

  const node = project.nodeEntries.get('NODE')!;
  expect(node).toBeDefined();
  expect(checkNodes(context, node.identity)).toBe(2);
});

test("Parse a 'NODE' rule with a loose range rule", () => {
  const project = Helper.makeParser(new Lang.LiveCoder(), "node NODE as from '0' to '9';");
  const context = new Core.Context('test');

  // Check the resulting tokens.
  Helper.testLexer(project, context, '0123456789');

  const token = project.tokenEntries.get("'0'-'9'")!;
  expect(token).toBeDefined();
  expect(checkTokens(context, token.identity)).toBe(10);

  // Check the resulting nodes.
  Helper.testParser(project, context, context.tokens);

  const node = project.nodeEntries.get('NODE')!;
  expect(node).toBeDefined();
  expect(checkNodes(context, node.identity)).toBe(10);
});

test("Parse a 'NODE' rule with a token reference", () => {
  const project = Helper.makeParser(new Lang.LiveCoder(), "token TOKEN as '@'; node NODE as TOKEN;");
  const context = new Core.Context('test');

  // Check the resulting tokens.
  Helper.testLexer(project, context, '@@@');

  const token = project.tokenEntries.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(checkTokens(context, token.identity)).toBe(3);

  // Check the resulting nodes.
  Helper.testParser(project, context, context.tokens);

  const node = project.nodeEntries.get('NODE')!;
  expect(node).toBeDefined();
  expect(checkNodes(context, node.identity)).toBe(3);
});

test("Parse a 'NODE' rule with an alias node reference", () => {
  const project = Helper.makeParser(new Lang.LiveCoder(), "alias node ALIAS as '@'; node NODE as ALIAS;");
  const context = new Core.Context('test');

  // Check the resulting tokens.
  Helper.testLexer(project, context, '@@@');

  const token = project.tokenEntries.get("'@'")!;
  expect(token).toBeDefined();
  expect(checkTokens(context, token.identity)).toBe(3);

  // Check the resulting nodes.
  Helper.testParser(project, context, context.tokens);

  const node = project.nodeEntries.get('NODE')!;
  expect(node).toBeDefined();
  expect(checkNodes(context, node.identity)).toBe(3);
});

test("Parse a 'NODE' rule with a reference to itself", () => {
  const project = Helper.makeParser(new Lang.LiveCoder(), "node NODE as '@' & opt NODE;");
  const context = new Core.Context('test');

  // Check the resulting tokens.
  Helper.testLexer(project, context, '@@@');

  const token = project.tokenEntries.get("'@'")!;
  expect(token).toBeDefined();
  expect(checkTokens(context, token.identity)).toBe(3);

  // Check the resulting nodes.
  Helper.testParser(project, context, context.tokens);

  const node = project.nodeEntries.get('NODE')!;
  expect(node).toBeDefined();
  expect(checkNodes(context, node.identity)).toBe(3);
});

test("Parse a 'NODE' rule with an alias node that has a reference to itself", () => {
  const project = Helper.makeParser(new Lang.LiveCoder(), "alias node ALIAS as '@' & opt ALIAS; node NODE as ALIAS;");
  const context = new Core.Context('test');

  // Check the resulting tokens.
  Helper.testLexer(project, context, '@@@');

  const token = project.tokenEntries.get("'@'")!;
  expect(token).toBeDefined();
  expect(checkTokens(context, token.identity)).toBe(3);

  // Check the resulting nodes.
  Helper.testParser(project, context, context.tokens);

  const node = project.nodeEntries.get('NODE')!;
  expect(node).toBeDefined();
  expect(checkNodes(context, node.identity)).toBe(1);
});
