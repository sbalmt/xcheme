import * as Lang from '../../src';

import * as Helper from './utils/helper';
import * as Assert from './utils/assert';

test('Consume an expected ERROR pattern', () => {
  Assert.tree(
    `
    skip error <1> REF;`,
    Helper.identity(Lang.Parser.Nodes.Error, 'REF', '1')
  );
});
