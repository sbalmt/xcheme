import * as Lang from '../../../src/index';
import * as Helper from '../helper';

const assertRaw = (project: Lang.Project.Context, output: string): void => {
  const record = project.symbols.get('@SKIP0')!;
  expect(record).toBeDefined();
  expect(record.data.identity).toBe(0);
  expect(record.data.pattern).toBe(output);
};

const assetBasic = (project: Lang.Project.Context): void => {
  assertRaw(project, `new Core.ExpectUnitPattern('@')`);
};

const assetReference = (project: Lang.Project.Context): void => {
  assertRaw(project, `new Core.RunFlowPattern(() => L0_ALIAS)`);
};

test("Output a 'SKIP' pattern", () => {
  const input = "skip '@';";
  assetBasic(Helper.makeParser(new Lang.TextCoder(), input));
});

test("Output a 'SKIP' pattern with an alias token reference", () => {
  const input = "skip ALIAS; alias token ALIAS as '@';";
  assetReference(Helper.makeParser(new Lang.TextCoder(), input));
});
