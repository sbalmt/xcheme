import * as Lang from '../../src';

import * as Assert from './utils/assert';

test('Consume an expected ACCESS pattern', () => {
  Assert.tree(
    `
    skip MAP.MEMBER;`,
    {
      type: Lang.Parser.Nodes.Skip,
      right: {
        type: Lang.Parser.Nodes.Access,
        left: {
          type: Lang.Parser.Nodes.Reference,
          value: 'MAP'
        },
        right: {
          type: Lang.Parser.Nodes.Reference,
          value: 'MEMBER'
        }
      }
    }
  );
});
