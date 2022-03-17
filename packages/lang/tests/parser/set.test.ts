import * as Lang from '../../src';

import * as Helper from './common/helper';
import * as Assert from './common/assert';

test("Consume an expected 'SET' pattern", () => {
  Assert.tree(
    `
    skip set <1> REF;`,
    Helper.getTree(Lang.Parser.Nodes.Set, 'REF', '1')
  );
});
