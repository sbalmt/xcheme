import * as Lang from '../../src';

import * as Assert from './utils/assert';

test("Consume an expected 'AND' pattern", () => {
  Assert.tree(
    `
    skip REF1 and REF2 & REF3;`,
    {
      type: Lang.Parser.Nodes.Skip,
      right: {
        type: Lang.Parser.Nodes.And,
        left: {
          type: Lang.Parser.Nodes.And,
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
