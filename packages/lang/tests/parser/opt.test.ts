import * as Lang from '../../src';

import * as Helper from './common/helper';
import * as Assert from './common/assert';

test("Consume an expected 'OPT' pattern", () => {
  Assert.tree(
    `
    skip opt REF;`,
    Helper.getTree(Lang.Parser.Nodes.Opt, 'REF')
  );
});
