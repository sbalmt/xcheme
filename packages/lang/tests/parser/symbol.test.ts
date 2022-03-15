import * as Lang from '../../src';

import * as Helper from './common/helper';
import * as Assert from './common/assert';

test("Consume an expected 'SYMBOL' pattern", () => {
  Assert.tree(
    `
    skip symbol REF;`,
    Helper.getTree(Lang.Parser.Nodes.Symbol, 'REF')
  );
});

test("Consume an expected 'SYMBOL' pattern with an identity", () => {
  Assert.tree(
    `
    skip symbol <1> REF;`,
    Helper.getTree(Lang.Parser.Nodes.Symbol, 'REF', '1')
  );
});
