import * as Lang from '../../src';

import * as Assert from './utils/assert';

test("Consume an expected 'THEN' pattern (half condition)", () => {
  Assert.tree(
    `
    skip REF then TRUE;`,
    {
      type: Lang.Parser.Nodes.Skip,
      right: {
        type: Lang.Parser.Nodes.Then,
        left: {
          type: Lang.Parser.Nodes.Reference,
          value: 'REF'
        },
        right: {
          type: Lang.Parser.Nodes.Reference,
          value: 'TRUE'
        }
      }
    }
  );
});

test("Consume an expected 'THEN/ELSE' pattern (full condition)", () => {
  Assert.tree(
    `
    skip REF then TRUE else FALSE;`,
    {
      type: Lang.Parser.Nodes.Skip,
      right: {
        type: Lang.Parser.Nodes.Then,
        left: {
          type: Lang.Parser.Nodes.Reference,
          value: 'REF'
        },
        right: {
          type: Lang.Parser.Nodes.Else,
          left: {
            type: Lang.Parser.Nodes.Reference,
            value: 'TRUE'
          },
          right: {
            type: Lang.Parser.Nodes.Reference,
            value: 'FALSE'
          }
        }
      }
    }
  );
});
