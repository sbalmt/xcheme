import * as Core from '@xcheme/core';

import { Lexer, Parser } from '../../src/index';

test("Consume expected 'PLACE' rule", () => {
  const context = new Core.Context('test');
  const text = 'skip place REF;';

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
  expect(expr.value).toBe(Parser.Nodes.Place);
  expect(expr.left).toBeUndefined();
  expect(expr.right).toBeDefined();
  expect(expr.next).toBeUndefined();

  const ref = expr.right!;
  expect(ref).toBeDefined();
  expect(ref.value).toBe(Parser.Nodes.Reference);
  expect(ref.fragment.data).toBe('REF');
  expect(ref.left).toBeUndefined();
  expect(ref.right).toBeUndefined();
  expect(ref.next).toBeUndefined();
});

test("Consume expected 'place next' rule", () => {
  const context = new Core.Context('test');
  const text = 'skip place next REF;';

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
  expect(expr.value).toBe(Parser.Nodes.PlaceNext);
  expect(expr.left).toBeUndefined();
  expect(expr.right).toBeDefined();
  expect(expr.next).toBeUndefined();

  const ref = expr.right!;
  expect(ref).toBeDefined();
  expect(ref.value).toBe(Parser.Nodes.Reference);
  expect(ref.fragment.data).toBe('REF');
  expect(ref.left).toBeUndefined();
  expect(ref.right).toBeUndefined();
  expect(ref.next).toBeUndefined();
});
