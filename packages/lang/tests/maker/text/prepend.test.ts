import * as Helper from '../helper';
import * as Lang from '../../../src/index';

test("Output a 'PREPEND' rule", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "skip prepend '@';");

  // Check the output code.
  const rule = project.skipEntries.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.identity).toBe(0);
  expect(rule.pattern).toBe(`new Core.PrependNodePattern(0, 1, 1, new Core.ExpectUnitPattern('@'))`);
});

test("Output a 'PREPEND NEXT' rule", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "skip prepend next '@';");

  // Check the output code.
  const rule = project.skipEntries.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.identity).toBe(0);
  expect(rule.pattern).toBe(`new Core.PrependNodePattern(0, 1, 2, new Core.ExpectUnitPattern('@'))`);
});
