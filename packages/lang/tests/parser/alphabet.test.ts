import * as Core from '@xcheme/core';

import { Lexer, Parser } from '../../src/index';

test("Consume expected alphabet", () => {
  const context = new Core.Context('test');
  const text = "skip 'test';";

  // Test the consumption.
  expect(Lexer.consumeText(text, context)).toBeTruthy();
  expect(Parser.consumeTokens(context.tokens, context)).toBeTruthy();

  // Check the resulting nodes.
  const stmt = context.node.next!;
  expect(stmt).toBeDefined();
  expect(stmt.value).toBe(Parser.Nodes.Skip);
  expect(stmt.left).toBeUndefined();
  expect(stmt.right).toBeDefined();
  expect(stmt.next).toBeUndefined();

  const expr = stmt.right!;
  expect(expr).toBeDefined();
  expect(expr.value).toBe(Parser.Nodes.Alphabet);
  expect(expr.fragment.data).toBe("'test'");
  expect(expr.left).toBeUndefined();
  expect(expr.right).toBeUndefined();
  expect(expr.next).toBeUndefined();
});
