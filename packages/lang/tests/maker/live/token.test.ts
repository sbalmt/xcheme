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

test("Parse a 'TOKEN' pattern", () => {
  const input = "token TOKEN as '@';";
  const project = Helper.makeParser(new Lang.LiveCoder(), input);
  const context = new Core.Context('test');

  // Check the resulting tokens.
  Helper.testLexer(project, context, '@@@');

  const token = project.symbols.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(checkTokens(context, [token.data.identity])).toBe(3);
});

test("Parse a 'TOKEN' pattern with an alias token reference", () => {
  const input = "alias token ALIAS as '@'; token TOKEN as ALIAS;";
  const project = Helper.makeParser(new Lang.LiveCoder(), input);
  const context = new Core.Context('test');

  // Check the resulting tokens.
  Helper.testLexer(project, context, '@@@');

  const token = project.symbols.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(checkTokens(context, [token.data.identity])).toBe(3);
});

test("Parse a 'TOKEN' pattern with a reference to itself", () => {
  const input = "token TOKEN as '@' & opt TOKEN;";
  const project = Helper.makeParser(new Lang.LiveCoder(), input);
  const context = new Core.Context('test');

  // Check the resulting tokens.
  Helper.testLexer(project, context, '@@@');

  const token = project.symbols.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(checkTokens(context, [token.data.identity])).toBe(3);
});

test("Parse a 'TOKEN' pattern with an alias token that has a reference to itself", () => {
  const input = "alias token ALIAS as '@' & opt ALIAS; token TOKEN as ALIAS;";
  const project = Helper.makeParser(new Lang.LiveCoder(), input);
  const context = new Core.Context('test');

  // Check the resulting tokens.
  Helper.testLexer(project, context, '@@@');

  const token = project.symbols.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(checkTokens(context, [token.data.identity])).toBe(1);
});

test("Parse a 'TOKEN' pattern with a whole token map reference", () => {
  const input = "alias token TOKEN1 as map { <100> A as 'a', <101> B as 'b' }; token <auto> TOKEN2 as TOKEN1 & '!';";
  const project = Helper.makeParser(new Lang.LiveCoder(), input);
  const context = new Core.Context('test');

  // Check the resulting tokens.
  Helper.testLexer(project, context, 'a!b!');

  expect(checkTokens(context, [100, 101])).toBe(2);
});

test("Parse a 'TOKEN' pattern with an imported alias token pattern", () => {
  const input = "import './module2'; token TOKEN as EXTERNAL_TOKEN1;";
  const project = Helper.makeParser(new Lang.LiveCoder(), input);
  const context = new Core.Context('test');

  // Check the resulting tokens.
  Helper.testLexer(project, context, 'token1token1');

  const token = project.symbols.get('TOKEN')!;
  expect(token).toBeDefined();

  expect(checkTokens(context, [token.data.identity])).toBe(2);
});
