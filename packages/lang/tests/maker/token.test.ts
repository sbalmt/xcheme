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

test('Token referring an undefined identifier', () => {
  Helper.makeError(new LiveCoder(), 'token TOKEN as <ALIAS>;', [Errors.UNDEFINED_IDENTIFIER]);
});

test('Token referring a node (reference error)', () => {
  Helper.makeError(new LiveCoder(), "node NODE as '@'; token TOKEN as <NODE>;", [Errors.INVALID_NODE_REFERENCE]);
});

test('Token referring an alias node (reference error)', () => {
  Helper.makeError(new LiveCoder(), "alias node NODE as '@'; token TOKEN as <NODE>;", [Errors.INVALID_NODE_REFERENCE]);
});

test("Parse a 'TOKEN' rule", () => {
  const project = Helper.makeParser(new LiveCoder(), "token TOKEN as '@';");
  const context = new Core.Context('test');

  // Check the resulting tokens.
  Helper.testLexer(project, context, '@@@');

  const token = project.tokenEntries.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(checkTokens(context, token.id)).toBe(3);
});

test("Output a 'TOKEN' rule", () => {
  const project = Helper.makeParser(new TextCoder(), "token TOKEN as '@';");

  // Check the output code.
  const token = project.tokenEntries.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(token.pattern).toBe(`new Core.EmitTokenPattern(${token.id}, new Core.ExpectUnitPattern('@'))`);
});

test("Parse a 'TOKEN' rule with an alias token reference", () => {
  const project = Helper.makeParser(new LiveCoder(), "alias token ALIAS as '@'; token TOKEN as <ALIAS>;");
  const context = new Core.Context('test');

  // Check the resulting tokens.
  Helper.testLexer(project, context, '@@@');

  const token = project.tokenEntries.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(checkTokens(context, token.id)).toBe(3);
});

test("Output a 'TOKEN' rule with an alias token reference", () => {
  const project = Helper.makeParser(new TextCoder(), "alias token ALIAS as '@'; token TOKEN as <ALIAS>;");

  // Check the output code.
  const token = project.tokenEntries.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(token.pattern).toBe(`new Core.EmitTokenPattern(${token.id}, new Core.ExpectUnitPattern('@'))`);
});

test("Parse a 'TOKEN' rule with a reference to itself", () => {
  const project = Helper.makeParser(new LiveCoder(), "token TOKEN as '@' & opt <TOKEN>;");
  const context = new Core.Context('test');

  // Check the resulting tokens.
  Helper.testLexer(project, context, '@@@');

  const token = project.tokenEntries.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(checkTokens(context, token.id)).toBe(3);
});

test("Output a 'TOKEN' rule with a reference to itself", () => {
  const project = Helper.makeParser(new TextCoder(), "token TOKEN as '@' & opt <TOKEN>;");

  // Check the output code.
  const pointer = project.tokenPointerEntries.get('TOKEN')!;
  expect(pointer).toBeDefined();
  expect(pointer.pattern).toBe(
    `new Core.EmitTokenPattern(${pointer.id}, ` +
      /**/ `new Core.ExpectFlowPattern(` +
      /******/ `new Core.ExpectUnitPattern('@'), ` +
      /******/ `new Core.OptionFlowPattern(` +
      /**********/ `new Core.RunFlowPattern(() => TOKEN)` +
      /******/ `)` +
      /**/ `)` +
      `)`
  );

  const token = project.tokenEntries.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(token.pattern).toBe(`new Core.RunFlowPattern(() => TOKEN)`);
});

test("Parse a 'TOKEN' rule with an alias token that has a reference to itself", () => {
  const project = Helper.makeParser(new LiveCoder(), "alias token ALIAS as '@' & opt <ALIAS>; token TOKEN as <ALIAS>;");
  const context = new Core.Context('test');

  // Check the resulting tokens.
  Helper.testLexer(project, context, '@@@');

  const token = project.tokenEntries.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(checkTokens(context, token.id)).toBe(1);
});

test("Output a 'TOKEN' rule with an alias token that has a reference to itself", () => {
  const project = Helper.makeParser(new TextCoder(), "alias token ALIAS as '@' & opt <ALIAS>; token TOKEN as <ALIAS>;");

  // Check the output code.
  const pointer = project.tokenPointerEntries.get('ALIAS')!;
  expect(pointer).toBeDefined();
  expect(pointer.pattern).toBe(
    `new Core.ExpectFlowPattern(` +
      /**/ `new Core.ExpectUnitPattern('@'), ` +
      /**/ `new Core.OptionFlowPattern(` +
      /******/ `new Core.RunFlowPattern(() => ALIAS)` +
      /**/ `)` +
      `)`
  );

  const token = project.tokenEntries.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(token.pattern).toBe(`new Core.EmitTokenPattern(${token.id}, ALIAS)`);
});
