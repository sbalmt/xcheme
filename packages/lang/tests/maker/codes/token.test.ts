import * as Lang from '../../../src/index';
import * as Helper from '../helper';

test('TOKEN referencing a TOKEN that has a reference to itself', () => {
  const project = Helper.makeParser(
    new Lang.TextCoder(),
    `
    token <100> TOKEN_1 as 'foo' & opt TOKEN_1;
    token <101> TOKEN_2 as 'bar' & TOKEN_1;`
  );
  expect(project.lexer).toBe(
    `const L0_TOKEN_1 = new Core.EmitTokenPattern(100, ` +
      /**/ `new Core.ExpectFlowPattern(` +
      /******/ `new Core.ExpectUnitPattern('f', 'o', 'o'), ` +
      /******/ `new Core.OptFlowPattern(new Core.RunFlowPattern(() => L0_TOKEN_1))` +
      /**/ `)` +
      `);` +
      `exports.Lexer = new Core.ExpectFlowPattern(` +
      /**/ `new Core.OptFlowPattern(` +
      /******/ `new Core.RepeatFlowPattern(` +
      /**********/ `new Core.ChooseFlowPattern(` +
      /**************/ `L0_TOKEN_1, ` +
      /**************/ `new Core.EmitTokenPattern(101, ` +
      /******************/ `new Core.ExpectFlowPattern(` +
      /**********************/ `new Core.ExpectUnitPattern('b', 'a', 'r'), ` +
      /**********************/ `L0_TOKEN_1` +
      /******************/ `)` +
      /**************/ `)` +
      /**********/ `)` +
      /******/ `)` +
      /**/ `), ` +
      /**/ `new Core.EndFlowPattern()` +
      `);`
  );
});

test('TOKEN referencing a pre-declared TOKEN (single time)', () => {
  const project = Helper.makeParser(
    new Lang.TextCoder(),
    `
    token <100> TOKEN_1 as 'foo';
    token <101> TOKEN_2 as 'bar' & TOKEN_1;`
  );
  expect(project.lexer).toBe(
    `exports.Lexer = new Core.ExpectFlowPattern(` +
      /**/ `new Core.OptFlowPattern(` +
      /******/ `new Core.RepeatFlowPattern(` +
      /**********/ `new Core.ChooseFlowPattern(` +
      /**************/ `new Core.EmitTokenPattern(100, new Core.ExpectUnitPattern('f', 'o', 'o')), ` +
      /**************/ `new Core.EmitTokenPattern(101, ` +
      /******************/ `new Core.ExpectFlowPattern(` +
      /**********************/ `new Core.ExpectUnitPattern('b', 'a', 'r'), ` +
      /**********************/ `new Core.EmitTokenPattern(100, new Core.ExpectUnitPattern('f', 'o', 'o'))` +
      /******************/ `)` +
      /**************/ `)` +
      /**********/ `)` +
      /******/ `)` +
      /**/ `), ` +
      /**/ `new Core.EndFlowPattern()` +
      `);`
  );
});

test('TOKEN referencing a pre-declared TOKEN (multiple times)', () => {
  const project = Helper.makeParser(
    new Lang.TextCoder(),
    `
    token <100> TOKEN_1 as 'foo';
    token <101> TOKEN_2 as 'bar' & TOKEN_1;
    token <102> TOKEN_3 as 'baz' & TOKEN_1;`
  );
  expect(project.lexer).toBe(
    `const L0_TOKEN_1 = new Core.EmitTokenPattern(100, new Core.ExpectUnitPattern('f', 'o', 'o'));` +
      `exports.Lexer = new Core.ExpectFlowPattern(` +
      /**/ `new Core.OptFlowPattern(` +
      /******/ `new Core.RepeatFlowPattern(` +
      /**********/ `new Core.ChooseFlowPattern(` +
      /**************/ `L0_TOKEN_1, ` +
      /**************/ `new Core.EmitTokenPattern(101, ` +
      /******************/ `new Core.ExpectFlowPattern(new Core.ExpectUnitPattern('b', 'a', 'r'), L0_TOKEN_1)` +
      /**************/ `), ` +
      /**************/ `new Core.EmitTokenPattern(102, ` +
      /******************/ `new Core.ExpectFlowPattern(new Core.ExpectUnitPattern('b', 'a', 'z'), L0_TOKEN_1)` +
      /**************/ `)` +
      /**********/ `)` +
      /******/ `)` +
      /**/ `), ` +
      /**/ `new Core.EndFlowPattern()` +
      `);`
  );
});

test('TOKEN referencing a post-declared TOKEN (single time)', () => {
  const project = Helper.makeParser(
    new Lang.TextCoder(),
    `
    token <100> TOKEN_1 as 'foo' & TOKEN_2;
    token <101> TOKEN_2 as 'bar';`
  );
  expect(project.lexer).toBe(
    `const L0_TOKEN_2 = new Core.EmitTokenPattern(101, new Core.ExpectUnitPattern('b', 'a', 'r'));` +
      `exports.Lexer = new Core.ExpectFlowPattern(` +
      /**/ `new Core.OptFlowPattern(` +
      /******/ `new Core.RepeatFlowPattern(` +
      /**********/ `new Core.ChooseFlowPattern(` +
      /**************/ `new Core.EmitTokenPattern(100, ` +
      /******************/ `new Core.ExpectFlowPattern(` +
      /**********************/ `new Core.ExpectUnitPattern('f', 'o', 'o'), ` +
      /**********************/ `new Core.RunFlowPattern(() => L0_TOKEN_2)` +
      /******************/ `)` +
      /**************/ `), ` +
      /**************/ `L0_TOKEN_2` +
      /**********/ `)` +
      /******/ `)` +
      /**/ `), ` +
      /**/ `new Core.EndFlowPattern()` +
      `);`
  );
});

test('TOKEN referencing a post-declared TOKEN (multiple times)', () => {
  const project = Helper.makeParser(
    new Lang.TextCoder(),
    `
    token <100> TOKEN_1 as 'foo' & TOKEN_3;
    token <101> TOKEN_2 as 'bar' & TOKEN_3;
    token <102> TOKEN_3 as 'baz';`
  );
  expect(project.lexer).toBe(
    `const L0_TOKEN_3 = new Core.EmitTokenPattern(102, new Core.ExpectUnitPattern('b', 'a', 'z'));` +
      `exports.Lexer = new Core.ExpectFlowPattern(` +
      /**/ `new Core.OptFlowPattern(` +
      /******/ `new Core.RepeatFlowPattern(` +
      /**********/ `new Core.ChooseFlowPattern(` +
      /**************/ `new Core.EmitTokenPattern(100, ` +
      /******************/ `new Core.ExpectFlowPattern(new Core.ExpectUnitPattern('f', 'o', 'o'), new Core.RunFlowPattern(() => L0_TOKEN_3))` +
      /**************/ `), ` +
      /**************/ `new Core.EmitTokenPattern(101, ` +
      /******************/ `new Core.ExpectFlowPattern(new Core.ExpectUnitPattern('b', 'a', 'r'), new Core.RunFlowPattern(() => L0_TOKEN_3))` +
      /**************/ `), ` +
      /**************/ `L0_TOKEN_3` +
      /**********/ `)` +
      /******/ `)` +
      /**/ `), ` +
      /**/ `new Core.EndFlowPattern()` +
      `);`
  );
});

test('TOKEN referencing an ALIAS TOKEN that has a reference to itself', () => {
  const project = Helper.makeParser(
    new Lang.TextCoder(),
    `
    alias token ALIAS as 'foo' & opt ALIAS;
    token <100> TOKEN as 'bar' & ALIAS;`
  );
  expect(project.lexer).toBe(
    `const L0_ALIAS = new Core.ExpectFlowPattern(` +
      /**/ `new Core.ExpectUnitPattern('f', 'o', 'o'), ` +
      /**/ `new Core.OptFlowPattern(new Core.RunFlowPattern(() => L0_ALIAS))` +
      `);` +
      `exports.Lexer = new Core.ExpectFlowPattern(` +
      /**/ `new Core.OptFlowPattern(` +
      /******/ `new Core.RepeatFlowPattern(` +
      /**********/ `new Core.ChooseFlowPattern(` +
      /**************/ `new Core.EmitTokenPattern(100, ` +
      /******************/ `new Core.ExpectFlowPattern(` +
      /**********************/ `new Core.ExpectUnitPattern('b', 'a', 'r'), ` +
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

test('TOKEN referencing a pre-declared ALIAS TOKEN (single time)', () => {
  const project = Helper.makeParser(
    new Lang.TextCoder(),
    `
    alias token ALIAS as 'foo';
    token <100> TOKEN as 'bar' & ALIAS;`
  );
  expect(project.lexer).toBe(
    `exports.Lexer = new Core.ExpectFlowPattern(` +
      /**/ `new Core.OptFlowPattern(` +
      /******/ `new Core.RepeatFlowPattern(` +
      /**********/ `new Core.ChooseFlowPattern(` +
      /**************/ `new Core.EmitTokenPattern(100, ` +
      /******************/ `new Core.ExpectFlowPattern(` +
      /**********************/ `new Core.ExpectUnitPattern('b', 'a', 'r'), ` +
      /**********************/ `new Core.ExpectUnitPattern('f', 'o', 'o')` +
      /******************/ `)` +
      /**************/ `)` +
      /**********/ `)` +
      /******/ `)` +
      /**/ `), ` +
      /**/ `new Core.EndFlowPattern()` +
      `);`
  );
});

test('TOKEN referencing a pre-declared ALIAS TOKEN (multiple times)', () => {
  const project = Helper.makeParser(
    new Lang.TextCoder(),
    `
    alias token ALIAS as 'foo';
    token <100> TOKEN_1 as 'bar' & ALIAS;
    token <101> TOKEN_2 as 'baz' & ALIAS;`
  );
  expect(project.lexer).toBe(
    `const L0_ALIAS = new Core.ExpectUnitPattern('f', 'o', 'o');` +
      `exports.Lexer = new Core.ExpectFlowPattern(` +
      /**/ `new Core.OptFlowPattern(` +
      /******/ `new Core.RepeatFlowPattern(` +
      /**********/ `new Core.ChooseFlowPattern(` +
      /**************/ `new Core.EmitTokenPattern(100, ` +
      /******************/ `new Core.ExpectFlowPattern(new Core.ExpectUnitPattern('b', 'a', 'r'), L0_ALIAS)` +
      /**************/ `), ` +
      /**************/ `new Core.EmitTokenPattern(101, ` +
      /******************/ `new Core.ExpectFlowPattern(new Core.ExpectUnitPattern('b', 'a', 'z'), L0_ALIAS)` +
      /**************/ `)` +
      /**********/ `)` +
      /******/ `)` +
      /**/ `), ` +
      /**/ `new Core.EndFlowPattern()` +
      `);`
  );
});

test('TOKEN referencing a post-declared ALIAS TOKEN (single time)', () => {
  const project = Helper.makeParser(
    new Lang.TextCoder(),
    `
    token <100> TOKEN as 'foo' & ALIAS;
    alias token ALIAS as 'bar';`
  );
  expect(project.lexer).toBe(
    `const L0_ALIAS = new Core.ExpectUnitPattern('b', 'a', 'r');` +
      `exports.Lexer = new Core.ExpectFlowPattern(` +
      /**/ `new Core.OptFlowPattern(` +
      /******/ `new Core.RepeatFlowPattern(` +
      /**********/ `new Core.ChooseFlowPattern(` +
      /**************/ `new Core.EmitTokenPattern(100, ` +
      /******************/ `new Core.ExpectFlowPattern(` +
      /**********************/ `new Core.ExpectUnitPattern('f', 'o', 'o'), ` +
      /**********************/ `new Core.RunFlowPattern(() => L0_ALIAS)` +
      /******************/ `)` +
      /**************/ `)` +
      /**********/ `)` +
      /******/ `)` +
      /**/ `), ` +
      /**/ `new Core.EndFlowPattern()` +
      `);`
  );
});

test('TOKEN referencing a post-declared ALIAS TOKEN (multiple times)', () => {
  const project = Helper.makeParser(
    new Lang.TextCoder(),
    `
    token <100> TOKEN_1 as 'foo' & ALIAS;
    token <101> TOKEN_2 as 'bar' & ALIAS;
    alias token ALIAS as 'baz';`
  );
  expect(project.lexer).toBe(
    `const L0_ALIAS = new Core.ExpectUnitPattern('b', 'a', 'z');` +
      `exports.Lexer = new Core.ExpectFlowPattern(` +
      /**/ `new Core.OptFlowPattern(` +
      /******/ `new Core.RepeatFlowPattern(` +
      /**********/ `new Core.ChooseFlowPattern(` +
      /**************/ `new Core.EmitTokenPattern(100, ` +
      /******************/ `new Core.ExpectFlowPattern(new Core.ExpectUnitPattern('f', 'o', 'o'), new Core.RunFlowPattern(() => L0_ALIAS))` +
      /**************/ `), ` +
      /**************/ `new Core.EmitTokenPattern(101, ` +
      /******************/ `new Core.ExpectFlowPattern(new Core.ExpectUnitPattern('b', 'a', 'r'), new Core.RunFlowPattern(() => L0_ALIAS))` +
      /**************/ `)` +
      /**********/ `)` +
      /******/ `)` +
      /**/ `), ` +
      /**/ `new Core.EndFlowPattern()` +
      `);`
  );
});

test('TOKEN referencing a template ALIAS TOKEN that has a reference to itself', () => {
  const project = Helper.makeParser(
    new Lang.TextCoder(),
    `
    alias <X>
    token TEMPLATE as 'foo' & opt TEMPLATE <X>;

    token <100> TOKEN as 'bar' & TEMPLATE <200>;`
  );
  expect(project.lexer).toBe(
    `const L0_TEMPLATE_200 = new Core.ExpectFlowPattern(` +
      /**/ `new Core.ExpectUnitPattern('f', 'o', 'o'), ` +
      /**/ `new Core.OptFlowPattern(new Core.RunFlowPattern(() => L0_TEMPLATE_200))` +
      `);` +
      `exports.Lexer = new Core.ExpectFlowPattern(` +
      /**/ `new Core.OptFlowPattern(` +
      /******/ `new Core.RepeatFlowPattern(` +
      /**********/ `new Core.ChooseFlowPattern(` +
      /**************/ `new Core.EmitTokenPattern(100, ` +
      /******************/ `new Core.ExpectFlowPattern(` +
      /**********************/ `new Core.ExpectUnitPattern('b', 'a', 'r'), ` +
      /**********************/ `L0_TEMPLATE_200` +
      /******************/ `)` +
      /**************/ `)` +
      /**********/ `)` +
      /******/ `)` +
      /**/ `), ` +
      /**/ `new Core.EndFlowPattern()` +
      `);`
  );
});

test('TOKEN referencing a template ALIAS TOKEN and passing itself as an argument', () => {
  const project = Helper.makeParser(
    new Lang.TextCoder(),
    `
    alias <X>
    token TEMPLATE as 'foo' & opt X;

    token <100> TOKEN as 'bar' & TEMPLATE <TOKEN>;`
  );
  expect(project.lexer).toBe(
    `const L0_TEMPLATE_TOKEN = new Core.ExpectFlowPattern(` +
      /**/ `new Core.ExpectUnitPattern('f', 'o', 'o'), ` +
      /**/ `new Core.OptFlowPattern(new Core.RunFlowPattern(() => L0_TOKEN))` +
      `);` +
      `const L0_TOKEN = new Core.EmitTokenPattern(100, ` +
      /**/ `new Core.ExpectFlowPattern(` +
      /******/ `new Core.ExpectUnitPattern('b', 'a', 'r'), ` +
      /******/ `L0_TEMPLATE_TOKEN` +
      /**/ `)` +
      `);` +
      `exports.Lexer = new Core.ExpectFlowPattern(` +
      /**/ `new Core.OptFlowPattern(` +
      /******/ `new Core.RepeatFlowPattern(` +
      /**********/ `new Core.ChooseFlowPattern(` +
      /**************/ `L0_TOKEN` +
      /**********/ `)` +
      /******/ `)` +
      /**/ `), ` +
      /**/ `new Core.EndFlowPattern()` +
      `);`
  );
});
