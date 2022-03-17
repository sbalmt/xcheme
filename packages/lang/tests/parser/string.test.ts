import * as Lang from '../../src';

import * as Assert from './common/assert';

test('Consume an expected string pattern', () => {
  Assert.tree(
    `
    skip 'test';`,
    {
      type: Lang.Parser.Nodes.Skip,
      right: {
        type: Lang.Parser.Nodes.String,
        value: "'test'"
      }
    }
  );
});
