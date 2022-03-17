import * as Lang from '../../src';

import * as Assert from './utils/assert';

test("Consume an expected 'FROM/TO' pattern", () => {
  Assert.tree(
    `
    skip from '0' to '9';`,
    {
      type: Lang.Parser.Nodes.Skip,
      right: {
        type: Lang.Parser.Nodes.Range,
        left: {
          type: Lang.Parser.Nodes.String,
          value: "'0'"
        },
        right: {
          type: Lang.Parser.Nodes.String,
          value: "'9'"
        }
      }
    }
  );
});
