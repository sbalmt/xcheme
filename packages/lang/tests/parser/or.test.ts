import * as Lang from '../../src';

import * as Assert from './common/assert';

test("Consume an expected 'OR' pattern", () => {
  Assert.tree(
    `
    skip REF1 or REF2 | REF3;`,
    {
      type: Lang.Parser.Nodes.Skip,
      right: {
        type: Lang.Parser.Nodes.Or,
        left: {
          type: Lang.Parser.Nodes.Or,
          left: {
            type: Lang.Parser.Nodes.Reference,
            value: 'REF1'
          },
          right: {
            type: Lang.Parser.Nodes.Reference,
            value: 'REF2'
          }
        },
        right: {
          type: Lang.Parser.Nodes.Reference,
          value: 'REF3'
        }
      }
    }
  );
});
