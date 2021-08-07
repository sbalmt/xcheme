import * as Core from '@xcheme/core';

import { Lexer, Parser } from '../../src/index';

test("Consume expected 'THEN' rule (half condition)", () => {
  const context = new Core.Context('test');
  const text = 'skip <REFERENCE> then <TRUE>;';

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
  expect(expr.value).toBe(Parser.Nodes.Then);
  expect(expr.left).toBeDefined();
  expect(expr.right).toBeDefined();
  expect(expr.next).toBeUndefined();

  const cond = expr.left!;
  expect(cond).toBeDefined();
  expect(cond.value).toBe(Parser.Nodes.Reference);
  expect(cond.left).toBeUndefined();
  expect(cond.right).toBeUndefined();
  expect(cond.next).toBeUndefined();

  const ref = expr.right!;
  expect(ref).toBeDefined();
  expect(ref.value).toBe(Parser.Nodes.Reference);
  expect(ref.fragment.data).toBe('TRUE');
  expect(ref.left).toBeUndefined();
  expect(ref.right).toBeUndefined();
  expect(ref.next).toBeUndefined();
});

test("Consume expected 'THEN' rule with 'ELSE' rule (full condition)", () => {
  const context = new Core.Context('test');
  const text = 'skip <REFERENCE> then <TRUE> else <FALSE>;';

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
  expect(expr.value).toBe(Parser.Nodes.Then);
  expect(expr.left).toBeDefined();
  expect(expr.right).toBeDefined();
  expect(expr.next).toBeUndefined();

  const cond = expr.left!;
  expect(cond).toBeDefined();
  expect(cond.value).toBe(Parser.Nodes.Reference);
  expect(cond.left).toBeUndefined();
  expect(cond.right).toBeUndefined();
  expect(cond.next).toBeUndefined();

  const options = expr.right!;
  expect(options).toBeDefined();
  expect(options.value).toBe(Parser.Nodes.Else);
  expect(options.left).toBeDefined();
  expect(options.right).toBeDefined();
  expect(options.next).toBeUndefined();

  const ref1 = options.left!;
  expect(ref1).toBeDefined();
  expect(ref1.value).toBe(Parser.Nodes.Reference);
  expect(ref1.fragment.data).toBe('TRUE');
  expect(ref1.left).toBeUndefined();
  expect(ref1.right).toBeUndefined();
  expect(ref1.next).toBeUndefined();

  const ref2 = options.right!;
  expect(ref2).toBeDefined();
  expect(ref2.value).toBe(Parser.Nodes.Reference);
  expect(ref2.fragment.data).toBe('FALSE');
  expect(ref2.left).toBeUndefined();
  expect(ref2.right).toBeUndefined();
  expect(ref2.next).toBeUndefined();
});
