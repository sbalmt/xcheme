import * as Lang from '../../../src/index';
import * as Helper from '../helper';

test('IMPORT directive with dependent references', () => {
  const project = Helper.makeParser(
    new Lang.TextCoder(),
    `
    import './module2';`
  );
  expect(project.lexer).toBe(
    `const L1_ALIAS_TOKEN = new Core.ExpectUnitPattern('t', 'o', 'k', 'e', 'n', '2');` +
      `exports.Lexer = new Core.ExpectFlowPattern(` +
      /**/ `new Core.OptFlowPattern(` +
      /******/ `new Core.RepeatFlowPattern(` +
      /**********/ `new Core.ChooseFlowPattern(` +
      /**************/ `new Core.EmitTokenPattern(2, new Core.ExpectUnitPattern('n', 'o', 'd', 'e', '2')), ` +
      /**************/ `new Core.EmitTokenPattern(101, L1_ALIAS_TOKEN)` +
      /**********/ `)` +
      /******/ `)` +
      /**/ `), ` +
      /**/ `new Core.EndFlowPattern()` +
      `);`
  );
});

test('IMPORT directive with a dependent template reference', () => {
  const project = Helper.makeParser(
    new Lang.TextCoder(),
    `
    import './codes/modules/template';

    alias token ALIAS as '!';
    token <100> TOKEN as ALIAS_TOKEN <200, ALIAS>;`
  );
  expect(project.lexer).toBe(
    `const L0_ALIAS = new Core.ExpectUnitPattern('!');` +
      `exports.Lexer = new Core.ExpectFlowPattern(` +
      /**/ `new Core.OptFlowPattern(` +
      /******/ `new Core.RepeatFlowPattern(` +
      /**********/ `new Core.ChooseFlowPattern(` +
      /**************/ `new Core.EmitTokenPattern(100, ` +
      /******************/ `new Core.ExpectFlowPattern(` +
      /**********************/ `new Core.AppendNodePattern(200, 1, 1, new Core.ExpectUnitPattern('f', 'o', 'o')), ` +
      /**********************/ `L0_ALIAS` +
      /******************/ `)` +
      /**************/ `)` +
      /**********/ `)` +
      /******/ `)` +
      /**/ `), ` +
      /**/ `new Core.EndFlowPattern()` +
      `);`
  );
});

test('IMPORT directive with dependent and purged references', () => {
  const project = Helper.makeParser(
    new Lang.TextCoder(),
    `
    import './module4';`
  );
  expect(project.lexer).toBe(
    `const L1_ALIAS_TOKEN1 = new Core.ExpectUnitPattern('t', 'o', 'k', 'e', 'n', '1');` +
      `exports.Lexer = new Core.ExpectFlowPattern(` +
      /**/ `new Core.OptFlowPattern(` +
      /******/ `new Core.RepeatFlowPattern(` +
      /**********/ `new Core.ChooseFlowPattern(` +
      /**************/ `new Core.EmitTokenPattern(1, L1_ALIAS_TOKEN1), ` +
      /**************/ `new Core.EmitTokenPattern(2, ` +
      /******************/ `new Core.ExpectFlowPattern(` +
      /**********************/ `new Core.ExpectUnitPattern('t', 'o', 'k', 'e', 'n', '2'), ` +
      /**********************/ `L1_ALIAS_TOKEN1)` +
      /******************/ `)` +
      /**********/ `)` +
      /******/ `)` +
      /**/ `), ` +
      /**/ `new Core.EndFlowPattern()` +
      `);`
  );
});

test('IMPORT directive with multiple re-importation', () => {
  const project = Helper.makeParser(
    new Lang.TextCoder(),
    `
    import './module5';
    import './module6';`
  );
  expect(project.lexer).toBe(
    `exports.Lexer = new Core.ExpectFlowPattern(` +
      /**/ `new Core.OptFlowPattern(` +
      /******/ `new Core.RepeatFlowPattern(` +
      /**********/ `new Core.ChooseFlowPattern()` +
      /******/ `)` +
      /**/ `), ` +
      /**/ `new Core.EndFlowPattern()` +
      `);`
  );
});
