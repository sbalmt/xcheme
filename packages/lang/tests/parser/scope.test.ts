import * as Lang from '../../src';

import * as Helper from './utils/helper';
import * as Assert from './utils/assert';

test("Consume an expected 'SCOPE' pattern", () => {
  Assert.tree(
    `
    skip scope REF;`,
    Helper.basic(Lang.Parser.Nodes.Scope, 'REF')
  );
});
