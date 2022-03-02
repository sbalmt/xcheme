import * as Core from '@xcheme/core';
import * as Helper from './common/helper';

import { Lexer, Parser } from '../../src/index';

test("Consume an expected 'PREPEND' pattern", () => {
  const context = new Core.Context('test');
  const text = 'skip prepend REF;';

  // Test the consumption.
  expect(Lexer.consumeText(text, context)).toBeTruthy();
  expect(Parser.consumeTokens(context.tokens, context)).toBeTruthy();

  // Check the resulting nodes.
  Helper.testSkipNode(context.node, Parser.Nodes.Prepend, 'REF');
});

test("Consume an expected 'PREPEND NEXT' pattern", () => {
  const context = new Core.Context('test');
  const text = 'skip prepend next REF_NEXT;';

  // Test the consumption.
  expect(Lexer.consumeText(text, context)).toBeTruthy();
  expect(Parser.consumeTokens(context.tokens, context)).toBeTruthy();

  // Check the resulting nodes.
  Helper.testSkipNode(context.node, Parser.Nodes.PrependNext, 'REF_NEXT');
});

test("Consume an expected 'PREPEND LEFT' pattern", () => {
  const context = new Core.Context('test');
  const text = 'skip prepend left REF_LEFT;';

  // Test the consumption.
  expect(Lexer.consumeText(text, context)).toBeTruthy();
  expect(Parser.consumeTokens(context.tokens, context)).toBeTruthy();

  // Check the resulting nodes.
  Helper.testSkipNode(context.node, Parser.Nodes.PrependLeft, 'REF_LEFT');
});

test("Consume an expected 'PREPEND RIGHT' pattern", () => {
  const context = new Core.Context('test');
  const text = 'skip prepend right REF_RIGHT;';

  // Test the consumption.
  expect(Lexer.consumeText(text, context)).toBeTruthy();
  expect(Parser.consumeTokens(context.tokens, context)).toBeTruthy();

  // Check the resulting nodes.
  Helper.testSkipNode(context.node, Parser.Nodes.PrependRight, 'REF_RIGHT');
});
