import * as Lang from '../../src';

import * as Helper from './common/helper';
import * as Assert from './common/assert';

test("Consume an expected 'PEEK' pattern", () => {
  Assert.tree(
    `
    skip peek REF;`,
    Helper.getTree(Lang.Parser.Nodes.Peek, 'REF')
  );
});
