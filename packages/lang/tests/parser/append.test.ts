import * as Lang from '../../src';

import * as Helper from './common/helper';
import * as Assert from './common/assert';

test("Consume an expected 'APPEND' pattern", () => {
  Assert.tree(
    `
    skip append REF;`,
    Helper.getTree(Lang.Parser.Nodes.Append, 'REF')
  );
});

test("Consume an expected 'APPEND' pattern with an identity", () => {
  Assert.tree(
    `
    skip append <1> REF;`,
    Helper.getTree(Lang.Parser.Nodes.Append, 'REF', '1')
  );
});

test("Consume an expected 'APPEND LEFT' pattern", () => {
  Assert.tree(
    `
    skip append left REF_LEFT;`,
    Helper.getTree(Lang.Parser.Nodes.AppendLeft, 'REF_LEFT')
  );
});

test("Consume an expected 'APPEND LEFT' pattern ith an identity", () => {
  Assert.tree(
    `
    skip append <1> left REF_LEFT;`,
    Helper.getTree(Lang.Parser.Nodes.AppendLeft, 'REF_LEFT', '1')
  );
});

test("Consume an expected 'APPEND RIGHT' pattern", () => {
  Assert.tree(
    `
    skip append right REF_RIGHT;`,
    Helper.getTree(Lang.Parser.Nodes.AppendRight, 'REF_RIGHT')
  );
});

test("Consume an expected 'APPEND RIGHT' pattern with an identity", () => {
  Assert.tree(
    `
    skip append <1> right REF_RIGHT;`,
    Helper.getTree(Lang.Parser.Nodes.AppendRight, 'REF_RIGHT', '1')
  );
});

test("Consume an expected 'APPEND NEXT' pattern", () => {
  Assert.tree(
    `
    skip append next REF_NEXT;`,
    Helper.getTree(Lang.Parser.Nodes.AppendNext, 'REF_NEXT')
  );
});

test("Consume an expected 'APPEND NEXT' pattern with an identity", () => {
  Assert.tree(
    `
    skip append <1> next REF_NEXT;`,
    Helper.getTree(Lang.Parser.Nodes.AppendNext, 'REF_NEXT', '1')
  );
});
