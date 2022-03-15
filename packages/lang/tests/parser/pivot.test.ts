import * as Lang from '../../src';

import * as Helper from './common/helper';
import * as Assert from './common/assert';

test("Consume an expected 'PIVOT' pattern", () => {
  Assert.tree(
    `
    skip pivot REF;`,
    Helper.getTree(Lang.Parser.Nodes.Pivot, 'REF')
  );
});

test("Consume an expected 'PIVOT' pattern with an identity", () => {
  Assert.tree(
    `
    skip pivot <1> REF;`,
    Helper.getTree(Lang.Parser.Nodes.Pivot, 'REF', '1')
  );
});
