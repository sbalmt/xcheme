import * as Core from '@xcheme/core';

import { Lexer, Parser } from '../../src/index';

test("Consume expected 'AND' rule", () => {
  const context = new Core.Context('test');
  const text = 'skip <REFERENCE1> and <REFERENCE2> and <REFERENCE3>;';

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

  const expr2 = stmt.right!;
  expect(expr2).toBeDefined();
  expect(expr2.value).toBe(Parser.Nodes.And);
  expect(expr2.left).toBeDefined();
  expect(expr2.right).toBeDefined();
  expect(expr2.next).toBeUndefined();

  const expr1 = expr2.left!;
  expect(expr1).toBeDefined();
  expect(expr1.value).toBe(Parser.Nodes.And);
  expect(expr1.left).toBeDefined();
  expect(expr1.right).toBeDefined();
  expect(expr1.next).toBeUndefined();

  const ref1 = expr1.left!;
  expect(ref1).toBeDefined();
  expect(ref1.value).toBe(Parser.Nodes.Reference);
  expect(ref1.fragment.data).toBe('REFERENCE1');
  expect(ref1.left).toBeUndefined();
  expect(ref1.right).toBeUndefined();
  expect(ref1.next).toBeUndefined();

  const ref2 = expr1.right!;
  expect(ref2).toBeDefined();
  expect(ref2.value).toBe(Parser.Nodes.Reference);
  expect(ref2.fragment.data).toBe('REFERENCE2');
  expect(ref2.left).toBeUndefined();
  expect(ref2.right).toBeUndefined();
  expect(ref2.next).toBeUndefined();

  const ref3 = expr2.right!;
  expect(ref3).toBeDefined();
  expect(ref3.value).toBe(Parser.Nodes.Reference);
  expect(ref3.fragment.data).toBe('REFERENCE3');
  expect(ref3.left).toBeUndefined();
  expect(ref3.right).toBeUndefined();
  expect(ref3.next).toBeUndefined();
});
