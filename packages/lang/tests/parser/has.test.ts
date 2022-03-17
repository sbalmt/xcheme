import * as Lang from '../../src';

import * as Helper from './utils/helper';
import * as Assert from './utils/assert';

test("Consume an expected 'HAS' pattern", () => {
  Assert.tree(
    `
    skip has <1> REF;`,
    Helper.withState(Lang.Parser.Nodes.Has, 'REF', '1')
  );
});
