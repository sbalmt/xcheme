import * as Lang from '../../src';

import * as Assert from './utils/assert';

test('Consume an expected IMPORT pattern', () => {
  Assert.tree(
    `
    import 'module';`,
    {
      type: Lang.Parser.Nodes.Import,
      right: {
        type: Lang.Parser.Nodes.String,
        value: "'module'"
      }
    }
  );
});
