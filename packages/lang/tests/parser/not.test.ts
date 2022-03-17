import * as Lang from '../../src';

import * as Helper from './utils/helper';
import * as Assert from './utils/assert';

test("Consume an expected 'NOT' pattern", () => {
  Assert.tree(
    `
    skip not REF;`,
    Helper.basic(Lang.Parser.Nodes.Not, 'REF')
  );
});
