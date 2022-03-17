import * as Lang from '../../src';

import * as Helper from './common/helper';
import * as Assert from './common/assert';

test("Consume an expected 'UNCASE' pattern", () => {
  Assert.tree(
    `
    skip uncase REF;`,
    Helper.getTree(Lang.Parser.Nodes.Uncase, 'REF')
  );
});
