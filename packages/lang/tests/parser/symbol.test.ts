import * as Lang from '../../src';

import * as Helper from './utils/helper';
import * as Assert from './utils/assert';

test("Consume an expected 'SYMBOL' pattern", () => {
  Assert.tree(
    `
    skip symbol REF;`,
    Helper.basic(Lang.Parser.Nodes.Symbol, 'REF')
  );
});

test("Consume an expected 'SYMBOL' pattern with an identity", () => {
  Assert.tree(
    `
    skip symbol <1> REF;`,
    Helper.withIdentity(Lang.Parser.Nodes.Symbol, 'REF', '1')
  );
});
