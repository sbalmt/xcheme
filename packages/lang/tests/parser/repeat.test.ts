import * as Lang from '../../src';

import * as Helper from './utils/helper';
import * as Assert from './utils/assert';

test('Consume an expected REPEAT pattern', () => {
  Assert.tree(
    `
    skip repeat REF;`,
    Helper.basic(Lang.Parser.Nodes.Repeat, 'REF')
  );
});
