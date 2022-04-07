import * as Lang from '../../src';

import * as Helper from './utils/helper';
import * as Assert from './utils/assert';

test("Consume an expected 'PIVOT' pattern", () => {
  Assert.tree(
    `
    skip pivot REF;`,
    Helper.basic(Lang.Parser.Nodes.Pivot, 'REF')
  );
});

test("Consume an expected 'PIVOT' pattern with an identity", () => {
  Assert.tree(
    `
    skip pivot <1> REF;`,
    Helper.identity(Lang.Parser.Nodes.Pivot, 'REF', '1')
  );
});

test("Consume an expected 'PIVOT' pattern with an auto identity", () => {
  Assert.tree(
    `
    skip pivot <auto> REF;`,
    Helper.identity(Lang.Parser.Nodes.Pivot, 'REF', 'auto')
  );
});
