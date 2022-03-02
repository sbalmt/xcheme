import * as Core from '@xcheme/core';

import { Lexer, Parser } from '../../src/index';

test("Consume an expected 'NODE' pattern", () => {
  const context = new Core.Context('test');
  const text = 'node NODE as REF;';

  // Test the consumption.
  expect(Lexer.consumeText(text, context)).toBeTruthy();
  expect(Parser.consumeTokens(context.tokens, context)).toBeTruthy();

  // Check the resulting nodes.
  const directive = context.node.next!;
  expect(directive).toBeDefined();
  expect(directive.value).toBe(Parser.Nodes.Node);
  expect(directive.left).toBeUndefined();
  expect(directive.right).toBeDefined();
  expect(directive.next).toBeUndefined();

  const identifier = directive.right!;
  expect(identifier).toBeDefined();
  expect(identifier.value).toBe(Parser.Nodes.Identifier);
  expect(identifier.fragment.data).toBe('NODE');
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

test("Consume an expected 'NODE' pattern with an identity", () => {
  const context = new Core.Context('test');
  const text = 'node <2020> NODE as REF;';

  // Test the consumption.
  expect(Lexer.consumeText(text, context)).toBeTruthy();
  expect(Parser.consumeTokens(context.tokens, context)).toBeTruthy();

  // Check the resulting nodes.
  const directive = context.node.next!;
  expect(directive).toBeDefined();
  expect(directive.value).toBe(Parser.Nodes.Node);
  expect(directive.left).toBeUndefined();
  expect(directive.right).toBeDefined();
  expect(directive.next).toBeUndefined();

  const identifier = directive.right!;
  expect(identifier).toBeDefined();
  expect(identifier.value).toBe(Parser.Nodes.Identifier);
  expect(identifier.fragment.data).toBe('NODE');
  expect(identifier.left).toBeDefined();
  expect(identifier.right).toBeDefined();
  expect(identifier.next).toBeUndefined();

  const identity = identifier.left!;
  expect(identity).toBeDefined();
  expect(identity.value).toBe(Parser.Nodes.Identity);
  expect(identity.fragment.data).toBe('2020');
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

test("Consume an expected 'ALIAS NODE' pattern", () => {
  const context = new Core.Context('test');
  const text = 'alias node ALIAS as REF;';

  // Test the consumption.
  expect(Lexer.consumeText(text, context)).toBeTruthy();
  expect(Parser.consumeTokens(context.tokens, context)).toBeTruthy();

  // Check the resulting nodes.
  const directive = context.node.next!;
  expect(directive).toBeDefined();
  expect(directive.value).toBe(Parser.Nodes.AliasNode);
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

test("Consume an expected 'ALIAS NODE' pattern with an identity", () => {
  const context = new Core.Context('test');
  const text = 'alias node <2020> ALIAS as REF;';

  // Test the consumption.
  expect(Lexer.consumeText(text, context)).toBeTruthy();
  expect(Parser.consumeTokens(context.tokens, context)).toBeTruthy();

  // Check the resulting nodes.
  const directive = context.node.next!;
  expect(directive).toBeDefined();
  expect(directive.value).toBe(Parser.Nodes.AliasNode);
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
  expect(identity.fragment.data).toBe('2020');
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
