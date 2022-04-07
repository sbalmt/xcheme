import * as Lang from '../../src';

import * as Assert from './utils/assert';

test("Consume an expected 'MAP' pattern", () => {
  Assert.tree(
    `
    skip map {
      <50> A as 'a',
           B as 'b',
                'c',
                D
    };`,
    {
      type: Lang.Parser.Nodes.Skip,
      right: {
        type: Lang.Parser.Nodes.Map,
        right: {
          type: Lang.Parser.Nodes.MapMember,
          right: {
            type: Lang.Parser.Nodes.Identifier,
            value: 'A',
            left: {
              type: Lang.Parser.Nodes.Arguments,
              left: {
                type: Lang.Parser.Nodes.Identity,
                value: '50'
              }
            },
            right: {
              type: Lang.Parser.Nodes.String,
              value: "'a'"
            }
          },
          next: {
            type: Lang.Parser.Nodes.MapMember,
            right: {
              type: Lang.Parser.Nodes.Identifier,
              value: 'B',
              right: {
                type: Lang.Parser.Nodes.String,
                value: "'b'"
              }
            },
            next: {
              type: Lang.Parser.Nodes.MapMember,
              right: {
                type: Lang.Parser.Nodes.String,
                value: "'c'"
              },
              next: {
                type: Lang.Parser.Nodes.MapMember,
                right: {
                  type: Lang.Parser.Nodes.Reference,
                  value: 'D'
                }
              }
            }
          }
        }
      }
    }
  );
});
