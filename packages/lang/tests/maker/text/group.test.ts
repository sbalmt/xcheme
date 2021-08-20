import * as Helper from '../helper';
import * as Lang from '../../../src/index';

test('Output a group rule', () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "skip ('1' | '2') & 'x';");

  // Check the output code.
  const rule = project.skipEntries.get('SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.pattern).toBe(`new Core.ExpectFlowPattern(new Core.ChooseUnitPattern('1', '2'), new Core.ExpectUnitPattern('x'))`);
});
