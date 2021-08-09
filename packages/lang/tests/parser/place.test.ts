import * as Core from '@xcheme/core';
import * as Helper from './common/helper';

import { Lexer, Parser } from '../../src/index';

test("Consume expected 'PLACE' rule", () => {
  const context = new Core.Context('test');
  const text = 'skip place REF;';

  // Test the consumption.
  expect(Lexer.consumeText(text, context)).toBeTruthy();
  expect(Parser.consumeTokens(context.tokens, context)).toBeTruthy();

  // Check the resulting nodes.
  Helper.testSkipNode(context.node, Parser.Nodes.Place, 'REF');
});

test("Consume expected 'PLACE NEXT' rule", () => {
  const context = new Core.Context('test');
  const text = 'skip place next REF_NEXT;';

  // Test the consumption.
  expect(Lexer.consumeText(text, context)).toBeTruthy();
  expect(Parser.consumeTokens(context.tokens, context)).toBeTruthy();

  // Check the resulting nodes.
  Helper.testSkipNode(context.node, Parser.Nodes.PlaceNext, 'REF_NEXT');
});

test("Consume expected 'PLACE LEFT' rule", () => {
  const context = new Core.Context('test');
  const text = 'skip place left REF_LEFT;';

  // Test the consumption.
  expect(Lexer.consumeText(text, context)).toBeTruthy();
  expect(Parser.consumeTokens(context.tokens, context)).toBeTruthy();

  // Check the resulting nodes.
  Helper.testSkipNode(context.node, Parser.Nodes.PlaceLeft, 'REF_LEFT');
});

test("Consume expected 'PLACE RIGHT' rule", () => {
  const context = new Core.Context('test');
  const text = 'skip place right REF_RIGHT;';

  // Test the consumption.
  expect(Lexer.consumeText(text, context)).toBeTruthy();
  expect(Parser.consumeTokens(context.tokens, context)).toBeTruthy();

  // Check the resulting nodes.
  Helper.testSkipNode(context.node, Parser.Nodes.PlaceRight, 'REF_RIGHT');
});
