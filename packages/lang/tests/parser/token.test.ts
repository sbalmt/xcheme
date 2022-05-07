import * as Lang from '../../src';

import * as Assert from './utils/assert';

test('Consume an expected TOKEN pattern', () => {
  Assert.tree(
    `
    token TOKEN as REF;`,
    {
      type: Lang.Parser.Nodes.Token,
      right: {
        type: Lang.Parser.Nodes.Identifier,
        value: 'TOKEN',
        right: {
          type: Lang.Parser.Nodes.Reference,
          value: 'REF'
        }
      }
    }
  );
});

test('Consume an expected TOKEN pattern with an identity', () => {
  Assert.tree(
    `
    token <100> TOKEN as REF;`,
    {
      type: Lang.Parser.Nodes.Token,
      right: {
        type: Lang.Parser.Nodes.Identifier,
        value: 'TOKEN',
        left: {
          type: Lang.Parser.Nodes.Arguments,
          left: {
            type: Lang.Parser.Nodes.Identity,
            value: '100'
          }
        },
        right: {
          type: Lang.Parser.Nodes.Reference,
          value: 'REF'
        }
      }
    }
  );
});

test('Consume an expected ALIAS TOKEN pattern', () => {
  Assert.tree(
    `
    alias token ALIAS as REF;`,
    {
      type: Lang.Parser.Nodes.AliasToken,
      right: {
        type: Lang.Parser.Nodes.Identifier,
        value: 'ALIAS',
        right: {
          type: Lang.Parser.Nodes.Reference,
          value: 'REF'
        }
      }
    }
  );
});

test('Consume an expected ALIAS TOKEN pattern with an identity', () => {
  Assert.tree(
    `
    alias token <100> ALIAS as REF;`,
    {
      type: Lang.Parser.Nodes.AliasToken,
      right: {
        type: Lang.Parser.Nodes.Identifier,
        value: 'ALIAS',
        left: {
          type: Lang.Parser.Nodes.Arguments,
          left: {
            type: Lang.Parser.Nodes.Identity,
            value: '100'
          }
        },
        right: {
          type: Lang.Parser.Nodes.Reference,
          value: 'REF'
        }
      }
    }
  );
});
