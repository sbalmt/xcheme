import * as Lang from '../../src';

import * as Helper from './utils/helper';
import * as Assert from './utils/assert';

test('Consume an expected PEEK pattern', () => {
  Assert.tree(
    `
    skip peek REF;`,
    Helper.basic(Lang.Parser.Nodes.Peek, 'REF')
  );
});
