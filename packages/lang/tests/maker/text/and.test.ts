import * as Lang from '../../../src/index';
import * as Helper from '../helper';

const assertRaw = (project: Lang.Project.Context, output: string): void => {
  const record = project.symbols.get('@SKIP0')!;
  expect(record).toBeDefined();
  expect(record.data.identity).toBe(0);
  expect(record.data.pattern).toBe(output);
};

const assetBasic = (project: Lang.Project.Context): void => {
  assertRaw(project, `new Core.ExpectUnitPattern('a', 'b', 'c')`);
};

const assetMerged = (project: Lang.Project.Context): void => {
  assertRaw(project, `new Core.ExpectUnitPattern('a', 'b', 'c', 'd')`);
};

const assetMultiMerged = (project: Lang.Project.Context): void => {
  assertRaw(
    project,
    `new Core.ExpectFlowPattern(` +
      /**/ `new Core.ExpectUnitPattern('a', 'b'), ` +
      /**/ `new Core.RepeatFlowPattern(new Core.ChooseUnitPattern('c', 'd')), ` +
      /**/ `new Core.ExpectUnitPattern('e', 'f')` +
      `)`
  );
};

test("Output an 'AND' pattern from the operator", () => {
  const input = "skip 'a' & 'bc';";
  assetBasic(Helper.makeParser(new Lang.TextCoder(), input));
});

test("Output an 'AND' pattern from the keyword", () => {
  const input = "skip 'a' and 'bc';";
  assetBasic(Helper.makeParser(new Lang.TextCoder(), input));
});

test("Output a merged 'AND' pattern", () => {
  const input = "skip 'a' & 'bc' & 'd';";
  assetMerged(Helper.makeParser(new Lang.TextCoder(), input));
});

test("Output a multi merged 'AND' pattern", () => {
  const input = "skip 'a' & 'b' & repeat ('c' | 'd') & 'ef';";
  assetMultiMerged(Helper.makeParser(new Lang.TextCoder(), input));
});
