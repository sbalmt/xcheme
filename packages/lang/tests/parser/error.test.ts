import * as Lang from '../../src';

import * as Helper from './common/helper';
import * as Assert from './common/assert';

test("Consume an expected 'ERROR' pattern", () => {
  Assert.tree(
    `
    skip error <1> REF;`,
    Helper.getTree(Lang.Parser.Nodes.Error, 'REF', '1')
  );
});
