import * as Lang from '../../src';

import * as Assert from './utils/assert';

test("Consume an expected 'NODE' pattern", () => {
  Assert.tree(
    `
    node NODE as REF;`,
    {
      type: Lang.Parser.Nodes.Node,
      right: {
        type: Lang.Parser.Nodes.Identifier,
        value: 'NODE',
        right: {
          type: Lang.Parser.Nodes.Reference,
          value: 'REF'
        }
      }
    }
  );
});

test("Consume an expected 'NODE' pattern with an identity", () => {
  Assert.tree(
    `
    node <2020> NODE as REF;`,
    {
      type: Lang.Parser.Nodes.Node,
      right: {
        type: Lang.Parser.Nodes.Identifier,
        value: 'NODE',
        left: {
          type: Lang.Parser.Nodes.Identity,
          value: '2020'
        },
        right: {
          type: Lang.Parser.Nodes.Reference,
          value: 'REF'
        }
      }
    }
  );
});

test("Consume an expected 'ALIAS NODE' pattern", () => {
  Assert.tree(
    `
    alias node ALIAS as REF;`,
    {
      type: Lang.Parser.Nodes.AliasNode,
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

test("Consume an expected 'ALIAS NODE' pattern with an identity", () => {
  Assert.tree(
    `
    alias node <2020> ALIAS as REF;`,
    {
      type: Lang.Parser.Nodes.AliasNode,
      right: {
        type: Lang.Parser.Nodes.Identifier,
        value: 'ALIAS',
        left: {
          type: Lang.Parser.Nodes.Identity,
          value: '2020'
        },
        right: {
          type: Lang.Parser.Nodes.Reference,
          value: 'REF'
        }
      }
    }
  );
});
