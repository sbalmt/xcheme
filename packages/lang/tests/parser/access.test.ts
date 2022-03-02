import * as Core from '@xcheme/core';

import { Lexer, Parser } from '../../src/index';

test("Consume an expected 'ACCESS' pattern", () => {
  const context = new Core.Context('test');
  const text = 'skip MAP.MEMBER;';

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
  expect(expression.value).toBe(Parser.Nodes.Access);
  expect(expression.left).toBeDefined();
  expect(expression.right).toBeDefined();
  expect(expression.next).toBeUndefined();

  const reference1 = expression.left!;
  expect(reference1).toBeDefined();
  expect(reference1.value).toBe(Parser.Nodes.Reference);
  expect(reference1.fragment.data).toBe('MAP');
  expect(reference1.left).toBeUndefined();
  expect(reference1.right).toBeUndefined();
  expect(reference1.next).toBeUndefined();

  const reference2 = expression.right!;
  expect(reference2).toBeDefined();
  expect(reference2.value).toBe(Parser.Nodes.Reference);
  expect(reference2.fragment.data).toBe('MEMBER');
  expect(reference2.left).toBeUndefined();
  expect(reference2.right).toBeUndefined();
  expect(reference2.next).toBeUndefined();
});
