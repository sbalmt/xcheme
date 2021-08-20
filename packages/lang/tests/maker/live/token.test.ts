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

test("Parse a 'TOKEN' rule", () => {
  const project = Helper.makeParser(new Lang.LiveCoder(), "token TOKEN as '@';");
  const context = new Core.Context('test');

  // Check the resulting tokens.
  Helper.testLexer(project, context, '@@@');

  const token = project.tokenEntries.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(checkTokens(context, token.identity)).toBe(3);
});

test("Parse a 'TOKEN' rule with an alias token reference", () => {
  const project = Helper.makeParser(new Lang.LiveCoder(), "alias token ALIAS as '@'; token TOKEN as ALIAS;");
  const context = new Core.Context('test');

  // Check the resulting tokens.
  Helper.testLexer(project, context, '@@@');

  const token = project.tokenEntries.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(checkTokens(context, token.identity)).toBe(3);
});

test("Parse a 'TOKEN' rule with a reference to itself", () => {
  const project = Helper.makeParser(new Lang.LiveCoder(), "token TOKEN as '@' & opt TOKEN;");
  const context = new Core.Context('test');

  // Check the resulting tokens.
  Helper.testLexer(project, context, '@@@');

  const token = project.tokenEntries.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(checkTokens(context, token.identity)).toBe(3);
});

test("Parse a 'TOKEN' rule with an alias token that has a reference to itself", () => {
  const project = Helper.makeParser(new Lang.LiveCoder(), "alias token ALIAS as '@' & opt ALIAS; token TOKEN as ALIAS;");
  const context = new Core.Context('test');

  // Check the resulting tokens.
  Helper.testLexer(project, context, '@@@');

  const token = project.tokenEntries.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(checkTokens(context, token.identity)).toBe(1);
});
