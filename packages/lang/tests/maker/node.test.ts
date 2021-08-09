import * as Core from '@xcheme/core';
import * as Helper from './common/helper';

import { Errors, LiveCoder, TextCoder } from '../../src/index';

const checkTokens = (context: Core.Context, id: number): number => {
  let total = 0;
  for (const current of context.tokens) {
    expect(current.value).toBe(id);
    total++;
  }
  return total;
};

const checkNodes = (context: Core.Context, id: number): number => {
  let current = context.node;
  let total = 0;
  while ((current = current.next!)) {
    expect(current.value).toBe(id);
    total++;
  }
  return total;
};

test('Node referring an undefined identifier', () => {
  Helper.makeError(new LiveCoder(), 'node NODE as <TOKEN>;', [Errors.UNDEFINED_IDENTIFIER]);
});

test('Node referring an alias token (reference error)', () => {
  Helper.makeError(new LiveCoder(), "alias token TOKEN as '@'; node NODE as <TOKEN>;", [Errors.INVALID_TOKEN_REFERENCE]);
});

test('Node referring an unresolved token (reference error)', () => {
  Helper.makeError(new LiveCoder(), "node NODE as <TOKEN>; token TOKEN as '@';", [Errors.UNRESOLVED_TOKEN_REFERENCE]);
});

test("Parse a 'NODE' rule with a loose token reference", () => {
  const project = Helper.makeParser(new LiveCoder(), "node NODE as '@' & opt '@';");
  const context = new Core.Context('test');

  // Check the resulting tokens.
  Helper.testLexer(project, context, '@@@');

  const token = project.tokenEntries.get("'@'")!;
  expect(token).toBeDefined();
  expect(checkTokens(context, token.id)).toBe(3);

  // Check the resulting nodes.
  Helper.testParser(project, context, context.tokens);

  const node = project.nodeEntries.get('NODE')!;
  expect(node).toBeDefined();
  expect(checkNodes(context, node.id)).toBe(2);
});

test("Output a 'NODE' rule with a loose token reference", () => {
  const project = Helper.makeParser(new TextCoder(), "node NODE as '@' & opt '@';");

  // Check the output code.
  const token = project.tokenEntries.get("'@'")!;
  expect(token).toBeDefined();

  const node = project.nodeEntries.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.pattern).toBe(
    `new Core.EmitNodePattern(${node.id}, 1, ` +
      /**/ `new Core.ExpectFlowPattern(` +
      /******/ `new Core.ExpectUnitPattern(${token.id}), ` +
      /******/ `new Core.OptionFlowPattern(new Core.ExpectUnitPattern(${token.id}))` +
      /**/ `)` +
      `)`
  );
});

test("Parse a 'NODE' rule with a loose range rule", () => {
  const project = Helper.makeParser(new LiveCoder(), "node NODE as from '0' to '9';");
  const context = new Core.Context('test');

  // Check the resulting tokens.
  Helper.testLexer(project, context, '0123456789');

  const token = project.tokenEntries.get("'0'-'9'")!;
  expect(token).toBeDefined();
  expect(checkTokens(context, token.id)).toBe(10);

  // Check the resulting nodes.
  Helper.testParser(project, context, context.tokens);

  const node = project.nodeEntries.get('NODE')!;
  expect(node).toBeDefined();
  expect(checkNodes(context, node.id)).toBe(10);
});

test("Output a 'NODE' rule with a loose range rule", () => {
  const project = Helper.makeParser(new TextCoder(), "node NODE as from '0' to '9';");

  // Check the output code.
  const token = project.tokenEntries.get("'0'-'9'")!;
  expect(token).toBeDefined();

  const node = project.nodeEntries.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.pattern).toBe(`new Core.EmitNodePattern(${node.id}, 1, new Core.ExpectUnitPattern(${token.id}))`);
});

test("Parse a 'NODE' rule with a token reference", () => {
  const project = Helper.makeParser(new LiveCoder(), "token TOKEN as '@'; node NODE as <TOKEN>;");
  const context = new Core.Context('test');

  // Check the resulting tokens.
  Helper.testLexer(project, context, '@@@');

  const token = project.tokenEntries.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(checkTokens(context, token.id)).toBe(3);

  // Check the resulting nodes.
  Helper.testParser(project, context, context.tokens);

  const node = project.nodeEntries.get('NODE')!;
  expect(node).toBeDefined();
  expect(checkNodes(context, node.id)).toBe(3);
});

test("Output a 'NODE' rule with a token reference", () => {
  const project = Helper.makeParser(new TextCoder(), "token TOKEN as '@'; node NODE as <TOKEN>;");

  // Check the output code.
  const token = project.tokenEntries.get('TOKEN')!;
  expect(token).toBeDefined();

  const node = project.nodeEntries.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.pattern).toBe(`new Core.EmitNodePattern(${node.id}, 1, new Core.ExpectUnitPattern(${token.id}))`);
});

test("Parse a 'NODE' rule with an alias node reference", () => {
  const project = Helper.makeParser(new LiveCoder(), "alias node ALIAS as '@'; node NODE as <ALIAS>;");
  const context = new Core.Context('test');

  // Check the resulting tokens.
  Helper.testLexer(project, context, '@@@');

  const token = project.tokenEntries.get("'@'")!;
  expect(token).toBeDefined();
  expect(checkTokens(context, token.id)).toBe(3);

  // Check the resulting nodes.
  Helper.testParser(project, context, context.tokens);

  const node = project.nodeEntries.get('NODE')!;
  expect(node).toBeDefined();
  expect(checkNodes(context, node.id)).toBe(3);
});

test("Output a 'NODE' rule with an alias node reference", () => {
  const project = Helper.makeParser(new TextCoder(), "alias node ALIAS as '@'; node NODE as <ALIAS>;");

  // Check the output code.
  const node = project.nodeEntries.get('NODE')!;
  expect(node).toBeDefined();

  expect(node.pattern).toBe(`new Core.EmitNodePattern(${node.id}, 1, ALIAS)`);
});

test("Parse a 'NODE' rule with a reference to itself", () => {
  const project = Helper.makeParser(new LiveCoder(), "node NODE as '@' & opt <NODE>;");
  const context = new Core.Context('test');

  // Check the resulting tokens.
  Helper.testLexer(project, context, '@@@');

  const token = project.tokenEntries.get("'@'")!;
  expect(token).toBeDefined();
  expect(checkTokens(context, token.id)).toBe(3);

  // Check the resulting nodes.
  Helper.testParser(project, context, context.tokens);

  const node = project.nodeEntries.get('NODE')!;
  expect(node).toBeDefined();
  expect(checkNodes(context, node.id)).toBe(3);
});

test("Output a 'NODE' rule with a reference to itself", () => {
  const project = Helper.makeParser(new TextCoder(), "node NODE as '@' & opt <NODE>;");

  // Check the output code.
  const token = project.tokenEntries.get("'@'")!;
  expect(token).toBeDefined();

  const pointer = project.nodePointerEntries.get('NODE')!;
  expect(pointer).toBeDefined();
  expect(pointer.pattern).toBe(
    `new Core.EmitNodePattern(${pointer.id}, 1, ` +
      /**/ `new Core.ExpectFlowPattern(` +
      /******/ `new Core.ExpectUnitPattern(${token.id}), ` +
      /******/ `new Core.OptionFlowPattern(new Core.RunFlowPattern(() => NODE))` +
      /**/ `)` +
      `)`
  );

  const node = project.nodeEntries.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.pattern).toBe(`new Core.RunFlowPattern(() => NODE)`);
});

test("Parse a 'NODE' rule with an alias node that has a reference to itself", () => {
  const project = Helper.makeParser(new LiveCoder(), "alias node ALIAS as '@' & opt <ALIAS>; node NODE as <ALIAS>;");
  const context = new Core.Context('test');

  // Check the resulting tokens.
  Helper.testLexer(project, context, '@@@');

  const token = project.tokenEntries.get("'@'")!;
  expect(token).toBeDefined();
  expect(checkTokens(context, token.id)).toBe(3);

  // Check the resulting nodes.
  Helper.testParser(project, context, context.tokens);

  const node = project.nodeEntries.get('NODE')!;
  expect(node).toBeDefined();
  expect(checkNodes(context, node.id)).toBe(1);
});

test("Output a 'NODE' rule with an alias node that has a reference to itself", () => {
  const project = Helper.makeParser(new TextCoder(), "alias node ALIAS as '@' & opt <ALIAS>; node NODE as <ALIAS>;");

  // Check the output code.
  const token = project.tokenEntries.get("'@'")!;
  expect(token).toBeDefined();

  const pointer = project.nodePointerEntries.get('ALIAS')!;
  expect(pointer).toBeDefined();
  expect(pointer.pattern).toBe(
    `new Core.ExpectFlowPattern(` +
      /**/ `new Core.ExpectUnitPattern(${token.id}), ` +
      /******/ `new Core.OptionFlowPattern(new Core.RunFlowPattern(() => ALIAS)` +
      /**/ `)` +
      `)`
  );

  const node = project.nodeEntries.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.pattern).toBe(`new Core.EmitNodePattern(${node.id}, 1, ALIAS)`);
});
