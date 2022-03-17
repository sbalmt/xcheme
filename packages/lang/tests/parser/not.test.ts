import * as Lang from '../../src';

import * as Helper from './common/helper';
import * as Assert from './common/assert';

test("Consume an expected 'NOT' pattern", () => {
  Assert.tree(
    `
    skip not REF;`,
    Helper.getTree(Lang.Parser.Nodes.Not, 'REF')
  );
});
