import * as Lang from '../../src';

import * as Helper from './common/helper';
import * as Assert from './common/assert';

test("Consume an expected 'SCOPE' pattern", () => {
  Assert.tree(
    `
    skip scope REF;`,
    Helper.getTree(Lang.Parser.Nodes.Scope, 'REF')
  );
});
