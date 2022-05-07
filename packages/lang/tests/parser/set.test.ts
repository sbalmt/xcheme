import * as Lang from '../../src';

import * as Helper from './utils/helper';
import * as Assert from './utils/assert';

test('Consume an expected SET pattern', () => {
  Assert.tree(
    `
    skip set <1> REF;`,
    Helper.identity(Lang.Parser.Nodes.Set, 'REF', '1')
  );
});
