import * as Lang from '../../src';

import * as Helper from './utils/helper';
import * as Assert from './utils/assert';

test("Consume an expected 'UNCASE' pattern", () => {
  Assert.tree(
    `
    skip uncase REF;`,
    Helper.basic(Lang.Parser.Nodes.Uncase, 'REF')
  );
});
