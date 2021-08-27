import * as Core from '@xcheme/core';

import { Lexer, Parser } from '../../src/index';

test("Consume expected 'TOKEN'", () => {
  const context = new Core.Context('test');
  const text = 'token TOKEN as REF;';

  // Test the consumption.
  expect(Lexer.consumeText(text, context)).toBeTruthy();
  expect(Parser.consumeTokens(context.tokens, context)).toBeTruthy();

  // Check the resulting nodes.
  const directive = context.node.next!;
  expect(directive).toBeDefined();
  expect(directive.value).toBe(Parser.Nodes.Token);
  expect(directive.left).toBeUndefined();
  expect(directive.right).toBeDefined();
  expect(directive.next).toBeUndefined();

  const identifier = directive.right!;
  expect(identifier).toBeDefined();
  expect(identifier.value).toBe(Parser.Nodes.Identifier);
  expect(identifier.fragment.data).toBe('TOKEN');
  expect(identifier.left).toBeUndefined();
  expect(identifier.right).toBeDefined();
  expect(identifier.next).toBeUndefined();

  const expression = identifier.right!;
  expect(expression).toBeDefined();
  expect(expression.value).toBe(Parser.Nodes.Reference);
  expect(expression.fragment.data).toBe('REF');
  expect(expression.left).toBeUndefined();
  expect(expression.right).toBeUndefined();
  expect(expression.next).toBeUndefined();
});

test("Consume expected 'TOKEN' with an identity", () => {
  const context = new Core.Context('test');
  const text = 'token <1010> TOKEN as REF;';

  // Test the consumption.
  expect(Lexer.consumeText(text, context)).toBeTruthy();
  expect(Parser.consumeTokens(context.tokens, context)).toBeTruthy();

  // Check the resulting nodes.
  const directive = context.node.next!;
  expect(directive).toBeDefined();
  expect(directive.value).toBe(Parser.Nodes.Token);
  expect(directive.left).toBeUndefined();
  expect(directive.right).toBeDefined();
  expect(directive.next).toBeUndefined();

  const identifier = directive.right!;
  expect(identifier).toBeDefined();
  expect(identifier.value).toBe(Parser.Nodes.Identifier);
  expect(identifier.fragment.data).toBe('TOKEN');
  expect(identifier.left).toBeDefined();
  expect(identifier.right).toBeDefined();
  expect(identifier.next).toBeUndefined();

  const identity = identifier.left!;
  expect(identity).toBeDefined();
  expect(identity.value).toBe(Parser.Nodes.Identity);
  expect(identity.fragment.data).toBe('1010');
  expect(identity.left).toBeUndefined();
  expect(identity.right).toBeUndefined();
  expect(identity.next).toBeUndefined();

  const expression = identifier.right!;
  expect(expression).toBeDefined();
  expect(expression.value).toBe(Parser.Nodes.Reference);
  expect(expression.fragment.data).toBe('REF');
  expect(expression.left).toBeUndefined();
  expect(expression.right).toBeUndefined();
  expect(expression.next).toBeUndefined();
});

test("Consume expected 'ALIAS TOKEN' rule", () => {
  const context = new Core.Context('test');
  const text = 'alias token ALIAS as REF;';

  // Test the consumption.
  expect(Lexer.consumeText(text, context)).toBeTruthy();
  expect(Parser.consumeTokens(context.tokens, context)).toBeTruthy();

  // Check the resulting nodes.
  const directive = context.node.next!;
  expect(directive).toBeDefined();
  expect(directive.value).toBe(Parser.Nodes.AliasToken);
  expect(directive.left).toBeUndefined();
  expect(directive.right).toBeDefined();
  expect(directive.next).toBeUndefined();

  const identifier = directive.right!;
  expect(identifier).toBeDefined();
  expect(identifier.value).toBe(Parser.Nodes.Identifier);
  expect(identifier.fragment.data).toBe('ALIAS');
  expect(identifier.left).toBeUndefined();
  expect(identifier.right).toBeDefined();
  expect(identifier.next).toBeUndefined();

  const expression = identifier.right!;
  expect(expression).toBeDefined();
  expect(expression.value).toBe(Parser.Nodes.Reference);
  expect(expression.fragment.data).toBe('REF');
  expect(expression.left).toBeUndefined();
  expect(expression.right).toBeUndefined();
  expect(expression.next).toBeUndefined();
});

test("Consume expected 'ALIAS TOKEN' rule with an identity", () => {
  const context = new Core.Context('test');
  const text = 'alias token <1010> ALIAS as REF;';

  // Test the consumption.
  expect(Lexer.consumeText(text, context)).toBeTruthy();
  expect(Parser.consumeTokens(context.tokens, context)).toBeTruthy();

  // Check the resulting nodes.
  const directive = context.node.next!;
  expect(directive).toBeDefined();
  expect(directive.value).toBe(Parser.Nodes.AliasToken);
  expect(directive.left).toBeUndefined();
  expect(directive.right).toBeDefined();
  expect(directive.next).toBeUndefined();

  const identifier = directive.right!;
  expect(identifier).toBeDefined();
  expect(identifier.value).toBe(Parser.Nodes.Identifier);
  expect(identifier.fragment.data).toBe('ALIAS');
  expect(identifier.left).toBeDefined();
  expect(identifier.right).toBeDefined();
  expect(identifier.next).toBeUndefined();

  const identity = identifier.left!;
  expect(identity).toBeDefined();
  expect(identity.value).toBe(Parser.Nodes.Identity);
  expect(identity.fragment.data).toBe('1010');
  expect(identity.left).toBeUndefined();
  expect(identity.right).toBeUndefined();
  expect(identity.next).toBeUndefined();

  const expression = identifier.right!;
  expect(expression).toBeDefined();
  expect(expression.value).toBe(Parser.Nodes.Reference);
  expect(expression.fragment.data).toBe('REF');
  expect(expression.left).toBeUndefined();
  expect(expression.right).toBeUndefined();
  expect(expression.next).toBeUndefined();
});
