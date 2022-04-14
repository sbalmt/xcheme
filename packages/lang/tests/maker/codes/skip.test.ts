import * as Lang from '../../../src/index';
import * as Helper from '../helper';

test('SKIP and TOKEN directives precedence', () => {
  const project = Helper.makeParser(
    new Lang.TextCoder(),
    `
    token <100> TOKEN as 'foo';
    skip 'bar';`
  );
  expect(project.lexer).toBe(
    `exports.Lexer = new Core.ExpectFlowPattern(` +
      /**/ `new Core.OptFlowPattern(` +
      /******/ `new Core.RepeatFlowPattern(` +
      /**********/ `new Core.ChooseFlowPattern(` +
      /**************/ `new Core.ExpectUnitPattern('b', 'a', 'r'), ` +
      /**************/ `new Core.EmitTokenPattern(100, new Core.ExpectUnitPattern('f', 'o', 'o'))` +
      /**********/ `)` +
      /******/ `)` +
      /**/ `), ` +
      /**/ `new Core.EndFlowPattern()` +
      `);`
  );
});
