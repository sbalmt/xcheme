import * as Core from '@xcheme/core';

import { Lexer, Parser } from '../../src/index';

test("Consume expected 'PIVOT' rule", () => {
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
