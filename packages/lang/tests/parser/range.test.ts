import * as Core from '@xcheme/core';

import { Lexer, Parser } from '../../src/index';

test("Consume expected 'FROM'...'TO' rule", () => {
  const context = new Core.Context('test');
  const text = "skip from '0' to '9';";

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
  expect(expr.value).toBe(Parser.Nodes.Range);

  expect(expr.left).toBeDefined();
  expect(expr.right).toBeDefined();
  expect(expr.next).toBeUndefined();

  const from = expr.left!;
  expect(from).toBeDefined();
  expect(from.value).toBe(Parser.Nodes.Alphabet);
  expect(from.fragment.data).toBe("'0'");
  expect(from.left).toBeUndefined();
  expect(from.right).toBeUndefined();
  expect(from.next).toBeUndefined();

  const to = expr.right!;
  expect(to).toBeDefined();
  expect(to.value).toBe(Parser.Nodes.Alphabet);
  expect(to.fragment.data).toBe("'9'");
  expect(to.left).toBeUndefined();
  expect(to.right).toBeUndefined();
  expect(to.next).toBeUndefined();
});
