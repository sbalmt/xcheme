import * as Lang from '../../src/index';
import * as Helper from '../helper';

test('NODE referencing a NODE that has a reference to itself', () => {
  const project = Helper.makeParser(
    new Lang.TextCoder(),
    `
    node <200> NODE_1 as 'foo' & opt NODE_1;
    node <201> NODE_2 as 'bar' & NODE_1;`
  );
  expect(project.parser).toBe(
    `const L0_NODE_1 = new Core.EmitNodePattern(200, 1, ` +
      /**/ `new Core.ExpectFlowPattern(` +
      /******/ `new Core.ExpectUnitPattern(0), ` +
      /******/ `new Core.OptFlowPattern(new Core.RunFlowPattern(() => L0_NODE_1))` +
      /**/ `)` +
      `);` +
      `exports.Parser = new Core.ExpectFlowPattern(` +
      /**/ `new Core.OptFlowPattern(` +
      /******/ `new Core.RepeatFlowPattern(` +
      /**********/ `new Core.ChooseFlowPattern(` +
      /**************/ `L0_NODE_1, ` +
      /**************/ `new Core.EmitNodePattern(201, 1, ` +
      /******************/ `new Core.ExpectFlowPattern(` +
      /**********************/ `new Core.ExpectUnitPattern(1), ` +
      /**********************/ `L0_NODE_1` +
      /******************/ `)` +
      /**************/ `)` +
      /**********/ `)` +
      /******/ `)` +
      /**/ `), ` +
      /**/ `new Core.EndFlowPattern()` +
      `);`
  );
});

test('NODE referencing a pre-declared NODE (single time)', () => {
  const project = Helper.makeParser(
    new Lang.TextCoder(),
    `
    node <200> NODE_1 as 'foo';
    node <201> NODE_2 as 'bar' & NODE_1;`
  );
  expect(project.parser).toBe(
    `exports.Parser = new Core.ExpectFlowPattern(` +
      /**/ `new Core.OptFlowPattern(` +
      /******/ `new Core.RepeatFlowPattern(` +
      /**********/ `new Core.ChooseFlowPattern(` +
      /**************/ `new Core.EmitNodePattern(200, 1, new Core.ExpectUnitPattern(0)), ` +
      /**************/ `new Core.EmitNodePattern(201, 1, ` +
      /******************/ `new Core.ExpectFlowPattern(` +
      /**********************/ `new Core.ExpectUnitPattern(1), ` +
      /**********************/ `new Core.EmitNodePattern(200, 1, new Core.ExpectUnitPattern(0))` +
      /******************/ `)` +
      /**************/ `)` +
      /**********/ `)` +
      /******/ `)` +
      /**/ `), ` +
      /**/ `new Core.EndFlowPattern()` +
      `);`
  );
});

test('NODE referencing a pre-declared NODE (multiple times)', () => {
  const project = Helper.makeParser(
    new Lang.TextCoder(),
    `
    node <200> NODE_1 as 'foo';
    node <201> NODE_2 as 'bar' & NODE_1;
    node <202> NODE_3 as 'baz' & NODE_1;`
  );
  expect(project.parser).toBe(
    `const L0_NODE_1 = new Core.EmitNodePattern(200, 1, new Core.ExpectUnitPattern(0));` +
      `exports.Parser = new Core.ExpectFlowPattern(` +
      /**/ `new Core.OptFlowPattern(` +
      /******/ `new Core.RepeatFlowPattern(` +
      /**********/ `new Core.ChooseFlowPattern(` +
      /**************/ `L0_NODE_1, ` +
      /**************/ `new Core.EmitNodePattern(201, 1, ` +
      /******************/ `new Core.ExpectFlowPattern(new Core.ExpectUnitPattern(1), L0_NODE_1)` +
      /**************/ `), ` +
      /**************/ `new Core.EmitNodePattern(202, 1, ` +
      /******************/ `new Core.ExpectFlowPattern(new Core.ExpectUnitPattern(2), L0_NODE_1)` +
      /**************/ `)` +
      /**********/ `)` +
      /******/ `)` +
      /**/ `), ` +
      /**/ `new Core.EndFlowPattern()` +
      `);`
  );
});

test('NODE referencing a post-declared NODE (single time)', () => {
  const project = Helper.makeParser(
    new Lang.TextCoder(),
    `
    node <200> NODE_1 as 'foo' & NODE_2;
    node <201> NODE_2 as 'bar';`
  );
  expect(project.parser).toBe(
    `const L0_NODE_2 = new Core.EmitNodePattern(201, 1, new Core.ExpectUnitPattern(1));` +
      `exports.Parser = new Core.ExpectFlowPattern(` +
      /**/ `new Core.OptFlowPattern(` +
      /******/ `new Core.RepeatFlowPattern(` +
      /**********/ `new Core.ChooseFlowPattern(` +
      /**************/ `new Core.EmitNodePattern(200, 1, ` +
      /******************/ `new Core.ExpectFlowPattern(` +
      /**********************/ `new Core.ExpectUnitPattern(0), ` +
      /**********************/ `new Core.RunFlowPattern(() => L0_NODE_2)` +
      /******************/ `)` +
      /**************/ `), ` +
      /**************/ `L0_NODE_2` +
      /**********/ `)` +
      /******/ `)` +
      /**/ `), ` +
      /**/ `new Core.EndFlowPattern()` +
      `);`
  );
});

test('NODE referencing a post-declared NODE (multiple times)', () => {
  const project = Helper.makeParser(
    new Lang.TextCoder(),
    `
    node <200> NODE_1 as 'foo' & NODE_3;
    node <201> NODE_2 as 'bar' & NODE_3;
    node <202> NODE_3 as 'baz';`
  );
  expect(project.parser).toBe(
    `const L0_NODE_3 = new Core.EmitNodePattern(202, 1, new Core.ExpectUnitPattern(2));` +
      `exports.Parser = new Core.ExpectFlowPattern(` +
      /**/ `new Core.OptFlowPattern(` +
      /******/ `new Core.RepeatFlowPattern(` +
      /**********/ `new Core.ChooseFlowPattern(` +
      /**************/ `new Core.EmitNodePattern(200, 1, ` +
      /******************/ `new Core.ExpectFlowPattern(new Core.ExpectUnitPattern(0), new Core.RunFlowPattern(() => L0_NODE_3))` +
      /**************/ `), ` +
      /**************/ `new Core.EmitNodePattern(201, 1, ` +
      /******************/ `new Core.ExpectFlowPattern(new Core.ExpectUnitPattern(1), new Core.RunFlowPattern(() => L0_NODE_3))` +
      /**************/ `), ` +
      /**************/ `L0_NODE_3` +
      /**********/ `)` +
      /******/ `)` +
      /**/ `), ` +
      /**/ `new Core.EndFlowPattern()` +
      `);`
  );
});

test('NODE referencing an ALIAS NODE that has a reference to itself', () => {
  const project = Helper.makeParser(
    new Lang.TextCoder(),
    `
    alias node ALIAS as 'foo' & opt ALIAS;
    node <200> NODE  as 'bar' & ALIAS;`
  );
  expect(project.parser).toBe(
    `const L0_ALIAS = new Core.ExpectFlowPattern(` +
      /**/ `new Core.ExpectUnitPattern(0), ` +
      /**/ `new Core.OptFlowPattern(new Core.RunFlowPattern(() => L0_ALIAS))` +
      `);` +
      `exports.Parser = new Core.ExpectFlowPattern(` +
      /**/ `new Core.OptFlowPattern(` +
      /******/ `new Core.RepeatFlowPattern(` +
      /**********/ `new Core.ChooseFlowPattern(` +
      /**************/ `new Core.EmitNodePattern(200, 1, ` +
      /******************/ `new Core.ExpectFlowPattern(` +
      /**********************/ `new Core.ExpectUnitPattern(1), ` +
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

test('NODE referencing a pre-declared ALIAS NODE (single time)', () => {
  const project = Helper.makeParser(
    new Lang.TextCoder(),
    `
    alias node ALIAS as 'foo';
    node <200> NODE  as 'bar' & ALIAS;`
  );
  expect(project.parser).toBe(
    `exports.Parser = new Core.ExpectFlowPattern(` +
      /**/ `new Core.OptFlowPattern(` +
      /******/ `new Core.RepeatFlowPattern(` +
      /**********/ `new Core.ChooseFlowPattern(` +
      /**************/ `new Core.EmitNodePattern(200, 1, ` +
      /******************/ `new Core.ExpectFlowPattern(` +
      /**********************/ `new Core.ExpectUnitPattern(1), ` +
      /**********************/ `new Core.ExpectUnitPattern(0)` +
      /******************/ `)` +
      /**************/ `)` +
      /**********/ `)` +
      /******/ `)` +
      /**/ `), ` +
      /**/ `new Core.EndFlowPattern()` +
      `);`
  );
});

test('NODE referencing a pre-declared ALIAS NODE (multiple times)', () => {
  const project = Helper.makeParser(
    new Lang.TextCoder(),
    `
    alias node ALIAS as 'foo';
    node <200> NODE_1 as 'bar' & ALIAS;
    node <201> NODE_2 as 'baz' & ALIAS;`
  );
  expect(project.parser).toBe(
    `const L0_ALIAS = new Core.ExpectUnitPattern(0);` +
      `exports.Parser = new Core.ExpectFlowPattern(` +
      /**/ `new Core.OptFlowPattern(` +
      /******/ `new Core.RepeatFlowPattern(` +
      /**********/ `new Core.ChooseFlowPattern(` +
      /**************/ `new Core.EmitNodePattern(200, 1, ` +
      /******************/ `new Core.ExpectFlowPattern(new Core.ExpectUnitPattern(1), L0_ALIAS)` +
      /**************/ `), ` +
      /**************/ `new Core.EmitNodePattern(201, 1, ` +
      /******************/ `new Core.ExpectFlowPattern(new Core.ExpectUnitPattern(2), L0_ALIAS)` +
      /**************/ `)` +
      /**********/ `)` +
      /******/ `)` +
      /**/ `), ` +
      /**/ `new Core.EndFlowPattern()` +
      `);`
  );
});

test('NODE referencing a post-declared ALIAS NODE (single time)', () => {
  const project = Helper.makeParser(
    new Lang.TextCoder(),
    `
    node <200> NODE  as 'foo' & ALIAS;
    alias node ALIAS as 'bar';`
  );
  expect(project.parser).toBe(
    `const L0_ALIAS = new Core.ExpectUnitPattern(1);` +
      `exports.Parser = new Core.ExpectFlowPattern(` +
      /**/ `new Core.OptFlowPattern(` +
      /******/ `new Core.RepeatFlowPattern(` +
      /**********/ `new Core.ChooseFlowPattern(` +
      /**************/ `new Core.EmitNodePattern(200, 1, ` +
      /******************/ `new Core.ExpectFlowPattern(` +
      /**********************/ `new Core.ExpectUnitPattern(0), ` +
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

test('NODE referencing a post-declared ALIAS NODE (multiple times)', () => {
  const project = Helper.makeParser(
    new Lang.TextCoder(),
    `
    node <200> NODE_1 as 'foo' & ALIAS;
    node <201> NODE_2 as 'bar' & ALIAS;
    alias node ALIAS as 'baz';`
  );
  expect(project.parser).toBe(
    `const L0_ALIAS = new Core.ExpectUnitPattern(2);` +
      `exports.Parser = new Core.ExpectFlowPattern(` +
      /**/ `new Core.OptFlowPattern(` +
      /******/ `new Core.RepeatFlowPattern(` +
      /**********/ `new Core.ChooseFlowPattern(` +
      /**************/ `new Core.EmitNodePattern(200, 1, ` +
      /******************/ `new Core.ExpectFlowPattern(new Core.ExpectUnitPattern(0), new Core.RunFlowPattern(() => L0_ALIAS))` +
      /**************/ `), ` +
      /**************/ `new Core.EmitNodePattern(201, 1, ` +
      /******************/ `new Core.ExpectFlowPattern(new Core.ExpectUnitPattern(1), new Core.RunFlowPattern(() => L0_ALIAS))` +
      /**************/ `)` +
      /**********/ `)` +
      /******/ `)` +
      /**/ `), ` +
      /**/ `new Core.EndFlowPattern()` +
      `);`
  );
});

test('NODE referencing a template ALIAS NODE that has a reference to itself', () => {
  const project = Helper.makeParser(
    new Lang.TextCoder(),
    `
    alias <X>
    node TEMPLATE as 'foo' & opt TEMPLATE <X>;

    node <200> NODE as 'bar' & TEMPLATE <100>;`
  );
  expect(project.parser).toBe(
    `const L0_TEMPLATE_100 = new Core.ExpectFlowPattern(` +
      /**/ `new Core.ExpectUnitPattern(1), ` +
      /**/ `new Core.OptFlowPattern(new Core.RunFlowPattern(() => L0_TEMPLATE_100))` +
      `);` +
      `exports.Parser = new Core.ExpectFlowPattern(` +
      /**/ `new Core.OptFlowPattern(` +
      /******/ `new Core.RepeatFlowPattern(` +
      /**********/ `new Core.ChooseFlowPattern(` +
      /**************/ `new Core.EmitNodePattern(200, 1, ` +
      /******************/ `new Core.ExpectFlowPattern(` +
      /**********************/ `new Core.ExpectUnitPattern(0), ` +
      /**********************/ `L0_TEMPLATE_100` +
      /******************/ `)` +
      /**************/ `)` +
      /**********/ `)` +
      /******/ `)` +
      /**/ `), ` +
      /**/ `new Core.EndFlowPattern()` +
      `);`
  );
});

test('NODE referencing a template ALIAS NODE and passing itself as an argument', () => {
  const project = Helper.makeParser(
    new Lang.TextCoder(),
    `
    alias <X>
    node TEMPLATE as 'foo' & opt X;

    node <200> NODE as 'bar' & TEMPLATE <NODE>;`
  );
  expect(project.parser).toBe(
    `const L0_TEMPLATE_NODE = new Core.ExpectFlowPattern(` +
      /**/ `new Core.ExpectUnitPattern(1), ` +
      /**/ `new Core.OptFlowPattern(new Core.RunFlowPattern(() => L0_NODE))` +
      `);` +
      `const L0_NODE = new Core.EmitNodePattern(200, 1, ` +
      /**/ `new Core.ExpectFlowPattern(` +
      /******/ `new Core.ExpectUnitPattern(0), ` +
      /******/ `L0_TEMPLATE_NODE` +
      /**/ `)` +
      `);` +
      `exports.Parser = new Core.ExpectFlowPattern(` +
      /**/ `new Core.OptFlowPattern(` +
      /******/ `new Core.RepeatFlowPattern(` +
      /**********/ `new Core.ChooseFlowPattern(` +
      /**************/ `L0_NODE` +
      /**********/ `)` +
      /******/ `)` +
      /**/ `), ` +
      /**/ `new Core.EndFlowPattern()` +
      `);`
  );
});
