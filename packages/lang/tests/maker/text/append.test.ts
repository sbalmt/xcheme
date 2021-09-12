import * as Helper from '../helper';
import * as Lang from '../../../src/index';

test("Output an 'APPEND' rule", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "skip append '@';");

  // Check the output code.
  const rule = project.skipEntries.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.pattern).toBe(`new Core.AppendNodePattern(0, 1, 1, new Core.ExpectUnitPattern('@'))`);
});

test("Output an 'APPEND NEXT' rule", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "skip append next '@';");

  // Check the output code.
  const rule = project.skipEntries.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.pattern).toBe(`new Core.AppendNodePattern(0, 1, 2, new Core.ExpectUnitPattern('@'))`);
});
