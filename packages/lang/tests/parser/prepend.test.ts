import * as Lang from '../../src';

import * as Helper from './common/helper';
import * as Assert from './common/assert';

test("Consume an expected 'PREPEND' pattern", () => {
  Assert.tree(
    `
    skip prepend REF;`,
    Helper.getTree(Lang.Parser.Nodes.Prepend, 'REF')
  );
});

test("Consume an expected 'PREPEND' pattern with an identity", () => {
  Assert.tree(
    `
    skip prepend <1> REF;`,
    Helper.getTree(Lang.Parser.Nodes.Prepend, 'REF', '1')
  );
});

test("Consume an expected 'PREPEND LEFT' pattern", () => {
  Assert.tree(
    `
    skip prepend left REF_LEFT;`,
    Helper.getTree(Lang.Parser.Nodes.PrependLeft, 'REF_LEFT')
  );
});

test("Consume an expected 'PREPEND LEFT' pattern ith an identity", () => {
  Assert.tree(
    `
    skip prepend <1> left REF_LEFT;`,
    Helper.getTree(Lang.Parser.Nodes.PrependLeft, 'REF_LEFT', '1')
  );
});

test("Consume an expected 'PREPEND RIGHT' pattern", () => {
  Assert.tree(
    `
    skip prepend right REF_RIGHT;`,
    Helper.getTree(Lang.Parser.Nodes.PrependRight, 'REF_RIGHT')
  );
});

test("Consume an expected 'PREPEND RIGHT' pattern with an identity", () => {
  Assert.tree(
    `
    skip prepend <1> right REF_RIGHT;`,
    Helper.getTree(Lang.Parser.Nodes.PrependRight, 'REF_RIGHT', '1')
  );
});

test("Consume an expected 'PREPEND NEXT' pattern", () => {
  Assert.tree(
    `
    skip prepend next REF_NEXT;`,
    Helper.getTree(Lang.Parser.Nodes.PrependNext, 'REF_NEXT')
  );
});

test("Consume an expected 'PREPEND NEXT' pattern with an identity", () => {
  Assert.tree(
    `
    skip prepend <1> next REF_NEXT;`,
    Helper.getTree(Lang.Parser.Nodes.PrependNext, 'REF_NEXT', '1')
  );
});
