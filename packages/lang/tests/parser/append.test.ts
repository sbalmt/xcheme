import * as Lang from '../../src';

import * as Helper from './utils/helper';
import * as Assert from './utils/assert';

test("Consume an expected 'APPEND' pattern", () => {
  Assert.tree(
    `
    skip append REF;`,
    Helper.basic(Lang.Parser.Nodes.Append, 'REF')
  );
});

test("Consume an expected 'APPEND' pattern with an identity", () => {
  Assert.tree(
    `
    skip append <1> REF;`,
    Helper.identity(Lang.Parser.Nodes.Append, 'REF', '1')
  );
});

test("Consume an expected 'APPEND' pattern with an auto identity", () => {
  Assert.tree(
    `
    skip append <auto> REF;`,
    Helper.identity(Lang.Parser.Nodes.Append, 'REF', 'auto')
  );
});

test("Consume an expected 'APPEND LEFT' pattern", () => {
  Assert.tree(
    `
    skip append left REF_LEFT;`,
    Helper.basic(Lang.Parser.Nodes.AppendLeft, 'REF_LEFT')
  );
});

test("Consume an expected 'APPEND LEFT' pattern ith an identity", () => {
  Assert.tree(
    `
    skip append <1> left REF_LEFT;`,
    Helper.identity(Lang.Parser.Nodes.AppendLeft, 'REF_LEFT', '1')
  );
});

test("Consume an expected 'APPEND RIGHT' pattern", () => {
  Assert.tree(
    `
    skip append right REF_RIGHT;`,
    Helper.basic(Lang.Parser.Nodes.AppendRight, 'REF_RIGHT')
  );
});

test("Consume an expected 'APPEND RIGHT' pattern with an identity", () => {
  Assert.tree(
    `
    skip append <1> right REF_RIGHT;`,
    Helper.identity(Lang.Parser.Nodes.AppendRight, 'REF_RIGHT', '1')
  );
});

test("Consume an expected 'APPEND NEXT' pattern", () => {
  Assert.tree(
    `
    skip append next REF_NEXT;`,
    Helper.basic(Lang.Parser.Nodes.AppendNext, 'REF_NEXT')
  );
});

test("Consume an expected 'APPEND NEXT' pattern with an identity", () => {
  Assert.tree(
    `
    skip append <1> next REF_NEXT;`,
    Helper.identity(Lang.Parser.Nodes.AppendNext, 'REF_NEXT', '1')
  );
});
