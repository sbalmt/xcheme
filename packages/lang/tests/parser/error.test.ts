import * as Core from '@xcheme/core';

import { Lexer, Parser } from '../../src/index';

test("Consume expected 'ERROR' rule", () => {
  const context = new Core.Context('test');
  const text = 'skip error <1> REF;';

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
  expect(expression.value).toBe(Parser.Nodes.Error);
  expect(expression.left).toBeUndefined();
  expect(expression.right).toBeDefined();
  expect(expression.next).toBeUndefined();

  const state = expression.right!;
  expect(state).toBeDefined();
  expect(state.value).toBe(Parser.Nodes.Identity);
  expect(state.fragment.data).toBe('1');
  expect(state.left).toBeUndefined();
  expect(state.right).toBeDefined();
  expect(state.next).toBeUndefined();

  const reference = state.right!;
  expect(reference).toBeDefined();
  expect(reference.value).toBe(Parser.Nodes.Reference);
  expect(reference.fragment.data).toBe('REF');
  expect(reference.left).toBeUndefined();
  expect(reference.right).toBeUndefined();
  expect(reference.next).toBeUndefined();
});
