import * as Lang from '../../../src/index';
import * as Helper from '../helper';

test('Output a group pattern', () => {
  const input = "skip ('1' | '2') & 'x';";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the output code.
  const rule = project.symbols.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.data.identity).toBe(0);
  expect(rule.data.pattern).toBe(
    `new Core.ExpectFlowPattern(new Core.ChooseUnitPattern('1', '2'), new Core.ExpectUnitPattern('x'))`
  );
});
