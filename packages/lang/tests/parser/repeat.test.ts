import * as Lang from '../../src';

import * as Helper from './common/helper';
import * as Assert from './common/assert';

test("Consume an expected 'REPEAT' pattern", () => {
  Assert.tree(
    `
    skip repeat REF;`,
    Helper.getTree(Lang.Parser.Nodes.Repeat, 'REF')
  );
});
