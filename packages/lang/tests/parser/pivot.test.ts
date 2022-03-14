import * as Core from '@xcheme/core';
import * as Helper from './common/helper';

import { Lexer, Parser } from '../../src/index';

test("Consume an expected 'PIVOT' pattern", () => {
  const context = new Core.Context('test');
  const text = 'skip pivot REF;';

  // Test the consumption.
  expect(Lexer.consumeText(text, context)).toBeTruthy();
  expect(Parser.consumeTokens(context.tokens, context)).toBeTruthy();

  // Check the resulting nodes.
  const directive = context.node.next!;
  expect(directive).toBeDefined();
  expect(directive.value).toBe(Parser.Nodes.Skip);
  expect(directive.left).toBeUndefined();
  expect(directive.right).toBeDefined();
  expect(directive.next).toBeUndefined();

  const expression = directive.right!;
  expect(expression).toBeDefined();
  expect(expression.value).toBe(Parser.Nodes.Pivot);
  expect(expression.left).toBeUndefined();
  expect(expression.right).toBeDefined();
  expect(expression.next).toBeUndefined();

  const reference = expression.right!;
  expect(reference).toBeDefined();
  expect(reference.value).toBe(Parser.Nodes.Reference);
  expect(reference.fragment.data).toBe('REF');
  expect(reference.left).toBeUndefined();
  expect(reference.right).toBeUndefined();
  expect(reference.next).toBeUndefined();
});

test("Consume an expected 'PIVOT' pattern with an identity", () => {
  Helper.tree(
    `
    skip pivot <1> REF;`,
    {
      type: Parser.Nodes.Skip,
      right: {
        type: Parser.Nodes.Pivot,
        right: {
          type: Parser.Nodes.State,
          value: '1',
          right: {
            type: Parser.Nodes.Reference,
            value: 'REF'
          }
        }
      }
    }
  );
});
