import * as Core from '@xcheme/core';

import { Lexer, Parser } from '../../src/index';

test("Consume expected 'EXPORT' rule", () => {
  const context = new Core.Context('test');
  const text = "export NAME;";

  // Test the consumption.
  expect(Lexer.consumeText(text, context)).toBeTruthy();
  expect(Parser.consumeTokens(context.tokens, context)).toBeTruthy();

  // Check the resulting nodes.
  const directive = context.node.next!;
  expect(directive).toBeDefined();
  expect(directive.value).toBe(Parser.Nodes.Export);
  expect(directive.left).toBeUndefined();
  expect(directive.right).toBeDefined();
  expect(directive.next).toBeUndefined();

  const expression = directive.right!;
  expect(expression).toBeDefined();
  expect(expression.value).toBe(Parser.Nodes.Identifier);
  expect(expression.fragment.data).toBe('NAME');
  expect(expression.left).toBeUndefined();
  expect(expression.right).toBeUndefined();
  expect(expression.next).toBeUndefined();
});
