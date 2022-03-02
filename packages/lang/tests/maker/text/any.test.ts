import * as Lang from '../../../src/index';
import * as Helper from '../helper';

const assetBasic = (project: Lang.Project.Context): void => {
  const record = project.symbols.get('@SKIP0')!;
  expect(record).toBeDefined();
  expect(record.data.identity).toBe(0);
  expect(record.data.pattern).toBe(`new Core.AnyUnitPattern()`);
};

test("Output an 'ANY' pattern from the operator", () => {
  const input = 'skip *;';
  assetBasic(Helper.makeParser(new Lang.TextCoder(), input));
});

test("Output an 'ANY' pattern from the keyword", () => {
  const input = 'skip any;';
  assetBasic(Helper.makeParser(new Lang.TextCoder(), input));
});
