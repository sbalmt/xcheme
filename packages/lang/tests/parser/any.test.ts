import * as Lang from '../../src';

import * as Assert from './common/assert';

test("Consume an expected 'ANY' pattern", () => {
  Assert.tree(
    `
    skip any;`,
    {
      type: Lang.Parser.Nodes.Skip,
      right: {
        type: Lang.Parser.Nodes.Any
      }
    }
  );
});
