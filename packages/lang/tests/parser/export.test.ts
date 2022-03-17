import * as Lang from '../../src';

import * as Assert from './common/assert';

test("Consume an expected 'EXPORT' pattern", () => {
  Assert.tree(
    `
    export NAME;`,
    {
      type: Lang.Parser.Nodes.Export,
      right: {
        type: Lang.Parser.Nodes.Identifier,
        value: 'NAME'
      }
    }
  );
});
