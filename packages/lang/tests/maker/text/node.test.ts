import * as Helper from '../helper';
import * as Lang from '../../../src/index';

test("Output a 'NODE' rule with a loose token reference", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "node NODE as '@' & '@' & opt '@';");

  // Check the output code.
  const token = project.tokenEntries.get('@REF1')!; // '@'
  expect(token).toBeDefined();

  const node = project.nodeEntries.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.pattern).toBe(
    `new Core.EmitNodePattern(${node.identity}, 1, ` +
      /**/ `new Core.ExpectFlowPattern(` +
      /******/ `new Core.ExpectUnitPattern(${token.identity}, ${token.identity}), ` +
      /******/ `new Core.OptFlowPattern(new Core.ExpectUnitPattern(${token.identity}))` +
      /**/ `)` +
      `)`
  );
});

test("Output a 'NODE' rule with a loose range rule", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "node NODE as from '0' to '9';");

  // Check the output code.
  const token = project.tokenEntries.get("@REF1")!;
  expect(token).toBeDefined();

  const node = project.nodeEntries.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.pattern).toBe(`new Core.EmitNodePattern(${node.identity}, 1, new Core.ExpectUnitPattern(${token.identity}))`);
});

test("Output a 'NODE' rule with a token reference", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "token TOKEN as '@'; node NODE as TOKEN;");

  // Check the output code.
  const token = project.tokenEntries.get('TOKEN')!;
  expect(token).toBeDefined();

  const node = project.nodeEntries.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.pattern).toBe(`new Core.EmitNodePattern(${node.identity}, 1, new Core.ExpectUnitPattern(${token.identity}))`);
});

test("Output a 'NODE' rule with an alias node reference", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "alias node ALIAS as '@'; node NODE as ALIAS;");

  // Check the output code.
  const node = project.nodeEntries.get('NODE')!;
  expect(node).toBeDefined();

  expect(node.pattern).toBe(`new Core.EmitNodePattern(${node.identity}, 1, ALIAS)`);
});

test("Output a 'NODE' rule with a reference to itself", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "node NODE as '@' & opt NODE;");

  // Check the output code.
  const token = project.tokenEntries.get('@REF1')!; // '@'
  expect(token).toBeDefined();

  const pointer = project.nodePointerEntries.get('NODE')!;
  expect(pointer).toBeDefined();
  expect(pointer.pattern).toBe(
    `new Core.EmitNodePattern(${pointer.identity}, 1, ` +
      /**/ `new Core.ExpectFlowPattern(` +
      /******/ `new Core.ExpectUnitPattern(${token.identity}), ` +
      /******/ `new Core.OptFlowPattern(new Core.RunFlowPattern(() => NODE))` +
      /**/ `)` +
      `)`
  );

  const node = project.nodeEntries.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.pattern).toBe(`new Core.RunFlowPattern(() => NODE)`);
});

test("Output a 'NODE' rule with an alias node that has a reference to itself", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "alias node ALIAS as '@' & opt ALIAS; node NODE as ALIAS;");

  // Check the output code.
  const token = project.tokenEntries.get('@REF1')!; // '@'
  expect(token).toBeDefined();

  const pointer = project.nodePointerEntries.get('ALIAS')!;
  expect(pointer).toBeDefined();
  expect(pointer.pattern).toBe(
    `new Core.ExpectFlowPattern(` +
      /**/ `new Core.ExpectUnitPattern(${token.identity}), ` +
      /******/ `new Core.OptFlowPattern(new Core.RunFlowPattern(() => ALIAS)` +
      /**/ `)` +
      `)`
  );

  const node = project.nodeEntries.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.pattern).toBe(`new Core.EmitNodePattern(${node.identity}, 1, ALIAS)`);
});
