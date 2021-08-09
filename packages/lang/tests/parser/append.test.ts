import * as Core from '@xcheme/core';
import * as Helper from './common/helper';

import { Lexer, Parser } from '../../src/index';

test("Consume expected 'APPEND' rule", () => {
  const context = new Core.Context('test');
  const text = 'skip append REF;';

  // Test the consumption.
  expect(Lexer.consumeText(text, context)).toBeTruthy();
  expect(Parser.consumeTokens(context.tokens, context)).toBeTruthy();

  // Check the resulting nodes.
  Helper.testSkipNode(context.node, Parser.Nodes.Append, 'REF');
});

test("Consume expected 'APPEND NEXT' rule", () => {
  const context = new Core.Context('test');
  const text = 'skip append next REF_NEXT;';

  // Test the consumption.
  expect(Lexer.consumeText(text, context)).toBeTruthy();
  expect(Parser.consumeTokens(context.tokens, context)).toBeTruthy();

  // Check the resulting nodes.
  Helper.testSkipNode(context.node, Parser.Nodes.AppendNext, 'REF_NEXT');
});

test("Consume expected 'APPEND LEFT' rule", () => {
  const context = new Core.Context('test');
  const text = 'skip append left REF_LEFT;';

  // Test the consumption.
  expect(Lexer.consumeText(text, context)).toBeTruthy();
  expect(Parser.consumeTokens(context.tokens, context)).toBeTruthy();

  // Check the resulting nodes.
  Helper.testSkipNode(context.node, Parser.Nodes.AppendLeft, 'REF_LEFT');
});

test("Consume expected 'APPEND RIGHT' rule", () => {
  const context = new Core.Context('test');
  const text = 'skip append right REF_RIGHT;';

  // Test the consumption.
  expect(Lexer.consumeText(text, context)).toBeTruthy();
  expect(Parser.consumeTokens(context.tokens, context)).toBeTruthy();

  // Check the resulting nodes.
  Helper.testSkipNode(context.node, Parser.Nodes.AppendRight, 'REF_RIGHT');
});
