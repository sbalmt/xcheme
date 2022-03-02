import * as Core from '@xcheme/core';

import { Lexer, Parser } from '../../src/index';

test("Consume an expected 'THEN' pattern (half condition)", () => {
  const context = new Core.Context('test');
  const text = 'skip REF then TRUE;';

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
  expect(expression.value).toBe(Parser.Nodes.Then);
  expect(expression.left).toBeDefined();
  expect(expression.right).toBeDefined();
  expect(expression.next).toBeUndefined();

  const condition = expression.left!;
  expect(condition).toBeDefined();
  expect(condition.value).toBe(Parser.Nodes.Reference);
  expect(condition.fragment.data).toBe('REF');
  expect(condition.left).toBeUndefined();
  expect(condition.right).toBeUndefined();
  expect(condition.next).toBeUndefined();

  const reference = expression.right!;
  expect(reference).toBeDefined();
  expect(reference.value).toBe(Parser.Nodes.Reference);
  expect(reference.fragment.data).toBe('TRUE');
  expect(reference.left).toBeUndefined();
  expect(reference.right).toBeUndefined();
  expect(reference.next).toBeUndefined();
});

test("Consume an expected 'THEN/ELSE' pattern (full condition)", () => {
  const context = new Core.Context('test');
  const text = 'skip REF then TRUE else FALSE;';

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
  expect(expression.value).toBe(Parser.Nodes.Then);
  expect(expression.left).toBeDefined();
  expect(expression.right).toBeDefined();
  expect(expression.next).toBeUndefined();

  const condition = expression.left!;
  expect(condition).toBeDefined();
  expect(condition.value).toBe(Parser.Nodes.Reference);
  expect(condition.fragment.data).toBe('REF');
  expect(condition.left).toBeUndefined();
  expect(condition.right).toBeUndefined();
  expect(condition.next).toBeUndefined();

  const options = expression.right!;
  expect(options).toBeDefined();
  expect(options.value).toBe(Parser.Nodes.Else);
  expect(options.left).toBeDefined();
  expect(options.right).toBeDefined();
  expect(options.next).toBeUndefined();

  const reference1 = options.left!;
  expect(reference1).toBeDefined();
  expect(reference1.value).toBe(Parser.Nodes.Reference);
  expect(reference1.fragment.data).toBe('TRUE');
  expect(reference1.left).toBeUndefined();
  expect(reference1.right).toBeUndefined();
  expect(reference1.next).toBeUndefined();

  const reference2 = options.right!;
  expect(reference2).toBeDefined();
  expect(reference2.value).toBe(Parser.Nodes.Reference);
  expect(reference2.fragment.data).toBe('FALSE');
  expect(reference2.left).toBeUndefined();
  expect(reference2.right).toBeUndefined();
  expect(reference2.next).toBeUndefined();
});
