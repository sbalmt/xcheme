import * as Core from '@xcheme/core';

import { Lexer, Parser } from '../../src/index';

test("Consume expected 'MAP' rule", () => {
  const context = new Core.Context('test');
  const text = "skip map { <1> A as 'a', B as 'b', 'c' };";

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
  expect(expression.value).toBe(Parser.Nodes.Map);
  expect(expression.left).toBeUndefined();
  expect(expression.right).toBeDefined();
  expect(expression.next).toBeUndefined();

  const first = expression.right!;
  expect(first).toBeDefined();
  expect(first.value).toBe(Parser.Nodes.Member);
  expect(first.left).toBeUndefined();
  expect(first.right).toBeDefined();
  expect(first.next).toBeDefined();

  const second = first.next!;
  expect(second).toBeDefined();
  expect(second.value).toBe(Parser.Nodes.Member);
  expect(second.left).toBeUndefined();
  expect(second.right).toBeDefined();
  expect(second.next).toBeDefined();

  const last = second.next!;
  expect(last).toBeDefined();
  expect(last.value).toBe(Parser.Nodes.Member);
  expect(last.left).toBeUndefined();
  expect(last.right).toBeDefined();
  expect(last.next).toBeUndefined();
});
