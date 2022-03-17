import * as Lang from '../../src';

import * as Assert from './utils/assert';

test("Consume an expected 'SKIP' pattern", () => {
  Assert.tree(
    `
    skip REF;`,
    {
      type: Lang.Parser.Nodes.Skip,
      right: {
        type: Lang.Parser.Nodes.Reference,
        value: 'REF'
      }
    }
  );
});
