import * as Lang from '../../src';

import * as Assert from './common/assert';

test('Consume an expected group pattern', () => {
  Assert.tree(
    `
    skip (REF);`,
    {
      type: Lang.Parser.Nodes.Skip,
      right: {
        type: Lang.Parser.Nodes.Reference,
        value: 'REF'
      }
    }
  );
});
