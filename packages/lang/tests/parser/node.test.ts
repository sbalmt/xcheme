import * as Core from '@xcheme/core';

import { Lexer, Parser } from '../../src/index';

test("Consume expected 'ALIAS NODE' rule", () => {
  const context = new Core.Context('test');
  const text = 'alias node TOKEN as <REFERENCE>;';

  // Test the consumption.
  expect(Lexer.consumeText(text, context)).toBeTruthy();
  expect(Parser.consumeTokens(context.tokens, context)).toBeTruthy();

  // Check the resulting nodes.
  const stmt = context.node.next!;
  expect(stmt).toBeDefined();
  expect(stmt.value).toBe(Parser.Nodes.AliasNode);
  expect(stmt.left).toBeUndefined();
  expect(stmt.right).toBeDefined();
  expect(stmt.next).toBeUndefined();

  const iden = stmt.right!;
  expect(iden).toBeDefined();
  expect(iden.value).toBe(Parser.Nodes.Identifier);
  expect(iden.left).toBeUndefined();
  expect(iden.right).toBeDefined();
  expect(iden.next).toBeUndefined();

  const expr = iden.right!;
  expect(expr).toBeDefined();
  expect(expr.value).toBe(Parser.Nodes.Reference);
  expect(expr.fragment.data).toBe('REFERENCE');
  expect(expr.left).toBeUndefined();
  expect(expr.right).toBeUndefined();
  expect(expr.next).toBeUndefined();
});

test("Consume expected 'NODE' rule", () => {
  const context = new Core.Context('test');
  const text = 'node TOKEN as <REFERENCE>;';

  // Test the consumption.
  expect(Lexer.consumeText(text, context)).toBeTruthy();
  expect(Parser.consumeTokens(context.tokens, context)).toBeTruthy();

  // Check the resulting nodes.
  const stmt = context.node.next!;
  expect(stmt).toBeDefined();
  expect(stmt.value).toBe(Parser.Nodes.Node);
  expect(stmt.left).toBeUndefined();
  expect(stmt.right).toBeDefined();
  expect(stmt.next).toBeUndefined();

  const iden = stmt.right!;
  expect(iden).toBeDefined();
  expect(iden.value).toBe(Parser.Nodes.Identifier);
  expect(iden.left).toBeUndefined();
  expect(iden.right).toBeDefined();
  expect(iden.next).toBeUndefined();

  const expr = iden.right!;
  expect(expr).toBeDefined();
  expect(expr.value).toBe(Parser.Nodes.Reference);
  expect(expr.fragment.data).toBe('REFERENCE');
  expect(expr.left).toBeUndefined();
  expect(expr.right).toBeUndefined();
  expect(expr.next).toBeUndefined();
});
