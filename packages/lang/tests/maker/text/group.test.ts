import * as Helper from '../helper';
import * as Lang from '../../../src/index';

test('Output a group rule', () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "skip ('1' | '2') & 'x';");

  // Check the output code.
  const rule = project.local.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.identity).toBe(0);
  expect(rule.pattern).toBe(`new Core.ExpectFlowPattern(new Core.ChooseUnitPattern('1', '2'), new Core.ExpectUnitPattern('x'))`);
});
