import * as Lang from '../../src';

import * as Helper from './utils/helper';
import * as Assert from './utils/assert';

test("Consume an expected 'PREPEND' pattern", () => {
  Assert.tree(
    `
    skip prepend REF;`,
    Helper.basic(Lang.Parser.Nodes.Prepend, 'REF')
  );
});

test("Consume an expected 'PREPEND' pattern with an identity", () => {
  Assert.tree(
    `
    skip prepend <1> REF;`,
    Helper.identity(Lang.Parser.Nodes.Prepend, 'REF', '1')
  );
});

test("Consume an expected 'PREPEND' pattern with an auto identity", () => {
  Assert.tree(
    `
    skip prepend <auto> REF;`,
    Helper.identity(Lang.Parser.Nodes.Prepend, 'REF', 'auto')
  );
});

test("Consume an expected 'PREPEND LEFT' pattern", () => {
  Assert.tree(
    `
    skip prepend left REF_LEFT;`,
    Helper.basic(Lang.Parser.Nodes.PrependLeft, 'REF_LEFT')
  );
});

test("Consume an expected 'PREPEND LEFT' pattern ith an identity", () => {
  Assert.tree(
    `
    skip prepend <1> left REF_LEFT;`,
    Helper.identity(Lang.Parser.Nodes.PrependLeft, 'REF_LEFT', '1')
  );
});

test("Consume an expected 'PREPEND RIGHT' pattern", () => {
  Assert.tree(
    `
    skip prepend right REF_RIGHT;`,
    Helper.basic(Lang.Parser.Nodes.PrependRight, 'REF_RIGHT')
  );
});

test("Consume an expected 'PREPEND RIGHT' pattern with an identity", () => {
  Assert.tree(
    `
    skip prepend <1> right REF_RIGHT;`,
    Helper.identity(Lang.Parser.Nodes.PrependRight, 'REF_RIGHT', '1')
  );
});

test("Consume an expected 'PREPEND NEXT' pattern", () => {
  Assert.tree(
    `
    skip prepend next REF_NEXT;`,
    Helper.basic(Lang.Parser.Nodes.PrependNext, 'REF_NEXT')
  );
});

test("Consume an expected 'PREPEND NEXT' pattern with an identity", () => {
  Assert.tree(
    `
    skip prepend <1> next REF_NEXT;`,
    Helper.identity(Lang.Parser.Nodes.PrependNext, 'REF_NEXT', '1')
  );
});
