import * as Lang from '../../src';

import * as Helper from './utils/helper';
import * as Assert from './utils/assert';

test('Consume an expected OPT pattern', () => {
  Assert.tree(
    `
    skip opt REF;`,
    Helper.basic(Lang.Parser.Nodes.Opt, 'REF')
  );
});
