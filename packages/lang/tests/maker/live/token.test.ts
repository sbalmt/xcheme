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

test("Parse a 'TOKEN' rule", () => {
  const project = Helper.makeParser(new Lang.LiveCoder(), "token TOKEN as '@';");
  const context = new Core.Context('test');

  // Check the resulting tokens.
  Helper.testLexer(project, context, '@@@');

  const token = project.local.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(checkTokens(context, [token.identity])).toBe(3);
});

test("Parse a 'TOKEN' rule with an alias token reference", () => {
  const project = Helper.makeParser(new Lang.LiveCoder(), "alias token ALIAS as '@'; token TOKEN as ALIAS;");
  const context = new Core.Context('test');

  // Check the resulting tokens.
  Helper.testLexer(project, context, '@@@');

  const token = project.local.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(checkTokens(context, [token.identity])).toBe(3);
});

test("Parse a 'TOKEN' rule with a reference to itself", () => {
  const project = Helper.makeParser(new Lang.LiveCoder(), "token TOKEN as '@' & opt TOKEN;");
  const context = new Core.Context('test');

  // Check the resulting tokens.
  Helper.testLexer(project, context, '@@@');

  const token = project.local.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(checkTokens(context, [token.identity])).toBe(3);
});

test("Parse a 'TOKEN' rule with an alias token that has a reference to itself", () => {
  const project = Helper.makeParser(new Lang.LiveCoder(), "alias token ALIAS as '@' & opt ALIAS; token TOKEN as ALIAS;");
  const context = new Core.Context('test');

  // Check the resulting tokens.
  Helper.testLexer(project, context, '@@@');

  const token = project.local.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(checkTokens(context, [token.identity])).toBe(1);
});

test("Parse a 'TOKEN' rule with a whole token map reference", () => {
  const project = Helper.makeParser(
    new Lang.LiveCoder(),
    "alias token TOKEN1 as map { <100> A as 'a', <101> B as 'b' }; token <auto> TOKEN2 as TOKEN1 & '!';"
  );
  const context = new Core.Context('test');

  // Check the resulting tokens.
  Helper.testLexer(project, context, 'a!b!');

  expect(checkTokens(context, [100, 101])).toBe(2);
});

test("Parse a 'TOKEN' rule with an imported alias pattern", () => {
  const project = Helper.makeParser(new Lang.LiveCoder(), "import './module2'; token TOKEN as EXTERNAL_TOKEN1;");
  const context = new Core.Context('test');

  // Check the resulting tokens.
  Helper.testLexer(project, context, 'token1token1');

  const token = project.local.get('TOKEN')!;
  expect(token).toBeDefined();

  expect(checkTokens(context, [token.identity])).toBe(2);
});
