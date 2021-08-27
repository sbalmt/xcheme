import * as Core from '@xcheme/core';

import { Lexer, Parser } from '../../src/index';

test("Consume expected 'AND' rule", () => {
  const context = new Core.Context('test');
  const text = 'skip REF1 and REF2 and REF3;';

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

  const expression2 = directive.right!;
  expect(expression2).toBeDefined();
  expect(expression2.value).toBe(Parser.Nodes.And);
  expect(expression2.left).toBeDefined();
  expect(expression2.right).toBeDefined();
  expect(expression2.next).toBeUndefined();

  const expression1 = expression2.left!;
  expect(expression1).toBeDefined();
  expect(expression1.value).toBe(Parser.Nodes.And);
  expect(expression1.left).toBeDefined();
  expect(expression1.right).toBeDefined();
  expect(expression1.next).toBeUndefined();

  const reference1 = expression1.left!;
  expect(reference1).toBeDefined();
  expect(reference1.value).toBe(Parser.Nodes.Reference);
  expect(reference1.fragment.data).toBe('REF1');
  expect(reference1.left).toBeUndefined();
  expect(reference1.right).toBeUndefined();
  expect(reference1.next).toBeUndefined();

  const reference2 = expression1.right!;
  expect(reference2).toBeDefined();
  expect(reference2.value).toBe(Parser.Nodes.Reference);
  expect(reference2.fragment.data).toBe('REF2');
  expect(reference2.left).toBeUndefined();
  expect(reference2.right).toBeUndefined();
  expect(reference2.next).toBeUndefined();

  const reference3 = expression2.right!;
  expect(reference3).toBeDefined();
  expect(reference3.value).toBe(Parser.Nodes.Reference);
  expect(reference3.fragment.data).toBe('REF3');
  expect(reference3.left).toBeUndefined();
  expect(reference3.right).toBeUndefined();
  expect(reference3.next).toBeUndefined();
});
