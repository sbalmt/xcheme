import * as Helper from '../helper';
import * as Lang from '../../../src/index';

test("Output a 'TOKEN' rule", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "token TOKEN as '@';");

  // Check the output code.
  const token = project.tokenEntries.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(token.pattern).toBe(`new Core.EmitTokenPattern(${token.identity}, new Core.ExpectUnitPattern('@'))`);
});

test("Output a 'TOKEN' rule with an alias token reference", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "alias token ALIAS as '@'; token TOKEN as ALIAS;");

  // Check the output code.
  const pointer = project.tokenPointerEntries.get('ALIAS')!;
  expect(pointer).toBeDefined();
  expect(pointer.pattern).toBe(`new Core.ExpectUnitPattern('@')`);

  const token = project.tokenEntries.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(token.pattern).toBe(`new Core.EmitTokenPattern(${token.identity}, ALIAS)`);
});

test("Output a 'TOKEN' rule with a reference to itself", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "token TOKEN as '@' & opt TOKEN;");

  // Check the output code.
  const pointer = project.tokenPointerEntries.get('TOKEN')!;
  expect(pointer).toBeDefined();
  expect(pointer.pattern).toBe(
    `new Core.EmitTokenPattern(${pointer.identity}, ` +
      /**/ `new Core.ExpectFlowPattern(` +
      /******/ `new Core.ExpectUnitPattern('@'), ` +
      /******/ `new Core.OptFlowPattern(` +
      /**********/ `new Core.RunFlowPattern(() => TOKEN)` +
      /******/ `)` +
      /**/ `)` +
      `)`
  );

  const token = project.tokenEntries.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(token.pattern).toBe(`new Core.RunFlowPattern(() => TOKEN)`);
});

test("Output a 'TOKEN' rule with an alias token that has a reference to itself", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "alias token ALIAS as '@' & opt ALIAS; token TOKEN as ALIAS;");

  // Check the output code.
  const pointer = project.tokenPointerEntries.get('ALIAS')!;
  expect(pointer).toBeDefined();
  expect(pointer.pattern).toBe(
    `new Core.ExpectFlowPattern(` +
      /**/ `new Core.ExpectUnitPattern('@'), ` +
      /**/ `new Core.OptFlowPattern(` +
      /******/ `new Core.RunFlowPattern(() => ALIAS)` +
      /**/ `)` +
      `)`
  );

  const token = project.tokenEntries.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(token.pattern).toBe(`new Core.EmitTokenPattern(${token.identity}, ALIAS)`);
});
