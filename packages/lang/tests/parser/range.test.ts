import * as Core from '@xcheme/core';

import { Lexer, Parser } from '../../src/index';

test("Consume expected 'FROM'...'TO' rule", () => {
  const context = new Core.Context('test');
  const text = "skip from '0' to '9';";

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
  expect(expression.value).toBe(Parser.Nodes.Range);

  expect(expression.left).toBeDefined();
  expect(expression.right).toBeDefined();
  expect(expression.next).toBeUndefined();

  const from = expression.left!;
  expect(from).toBeDefined();
  expect(from.value).toBe(Parser.Nodes.String);
  expect(from.fragment.data).toBe("'0'");
  expect(from.left).toBeUndefined();
  expect(from.right).toBeUndefined();
  expect(from.next).toBeUndefined();

  const to = expression.right!;
  expect(to).toBeDefined();
  expect(to.value).toBe(Parser.Nodes.String);
  expect(to.fragment.data).toBe("'9'");
  expect(to.left).toBeUndefined();
  expect(to.right).toBeUndefined();
  expect(to.next).toBeUndefined();
});
