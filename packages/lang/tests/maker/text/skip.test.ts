import * as Helper from '../helper';
import * as Lang from '../../../src/index';

test("Output a 'SKIP' rule", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "skip '@';");

  // Check the output code.
  const rule = project.skipEntries.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.pattern).toBe("new Core.ExpectUnitPattern('@')");
});

test("Output a 'SKIP' rule with an alias token reference", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "skip ALIAS; alias token ALIAS as '@';");

  // Check the output code.
  const rule = project.skipEntries.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.pattern).toBe('new Core.RunFlowPattern(() => ALIAS)');
});
