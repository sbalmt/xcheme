import * as Core from '@xcheme/core';
import * as Helper from './common/helper';

import { Lexer, Parser } from '../../src/index';

test("Consume an expected 'PLACE' pattern", () => {
  const context = new Core.Context('test');
  const text = 'skip place REF;';

  // Test the consumption.
  expect(Lexer.consumeText(text, context)).toBeTruthy();
  expect(Parser.consumeTokens(context.tokens, context)).toBeTruthy();

  // Check the resulting nodes.
  Helper.testSkipNode(context.node, Parser.Nodes.Place, 'REF');
});

test("Consume an expected 'PLACE NEXT' pattern", () => {
  const context = new Core.Context('test');
  const text = 'skip place next REF_NEXT;';

  // Test the consumption.
  expect(Lexer.consumeText(text, context)).toBeTruthy();
  expect(Parser.consumeTokens(context.tokens, context)).toBeTruthy();

  // Check the resulting nodes.
  Helper.testSkipNode(context.node, Parser.Nodes.PlaceNext, 'REF_NEXT');
});

test("Consume an expected 'PLACE LEFT' pattern", () => {
  const context = new Core.Context('test');
  const text = 'skip place left REF_LEFT;';

  // Test the consumption.
  expect(Lexer.consumeText(text, context)).toBeTruthy();
  expect(Parser.consumeTokens(context.tokens, context)).toBeTruthy();

  // Check the resulting nodes.
  Helper.testSkipNode(context.node, Parser.Nodes.PlaceLeft, 'REF_LEFT');
});

test("Consume an expected 'PLACE RIGHT' pattern", () => {
  const context = new Core.Context('test');
  const text = 'skip place right REF_RIGHT;';

  // Test the consumption.
  expect(Lexer.consumeText(text, context)).toBeTruthy();
  expect(Parser.consumeTokens(context.tokens, context)).toBeTruthy();

  // Check the resulting nodes.
  Helper.testSkipNode(context.node, Parser.Nodes.PlaceRight, 'REF_RIGHT');
});
