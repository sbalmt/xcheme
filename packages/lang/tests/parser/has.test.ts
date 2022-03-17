import * as Lang from '../../src';

import * as Helper from './common/helper';
import * as Assert from './common/assert';

test("Consume an expected 'HAS' pattern", () => {
  Assert.tree(
    `
    skip has <1> REF;`,
    Helper.getTree(Lang.Parser.Nodes.Has, 'REF', '1')
  );
});
