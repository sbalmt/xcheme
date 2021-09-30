import * as Helper from '../helper';
import * as Lang from '../../../src/index';

test('Output a range rule', () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "skip from '0' to '9';");

  // Check the output code.
  const rule = project.skipEntries.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.identity).toBe(0);
  expect(rule.pattern).toBe("new Core.RangeUnitPattern('0', '9')");
});
