import * as Helper from '../helper';
import * as Lang from '../../../src/index';

test("Output an 'ERROR' rule", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "skip error <1> '@';");

  // Check the output code.
  const rule = project.skipEntries.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.identity).toBe(0);
  expect(rule.pattern).toBe(`new Core.EmitErrorPattern(1, new Core.ExpectUnitPattern('@'))`);
});
