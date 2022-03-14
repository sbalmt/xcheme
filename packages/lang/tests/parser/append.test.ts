import * as Core from '@xcheme/core';
import * as Helper from './common/helper';

import { Lexer, Parser } from '../../src/index';

test("Consume an expected 'APPEND' pattern", () => {
  const context = new Core.Context('test');
  const text = 'skip append REF;';

  // Test the consumption.
  expect(Lexer.consumeText(text, context)).toBeTruthy();
  expect(Parser.consumeTokens(context.tokens, context)).toBeTruthy();

  // Check the resulting nodes.
  Helper.testSkipNode(context.node, Parser.Nodes.Append, 'REF');
});

test("Consume an expected 'APPEND' pattern with an identity", () => {
  Helper.tree(
    `
    skip append <1> REF;`,
    {
      type: Parser.Nodes.Skip,
      right: {
        type: Parser.Nodes.Append,
        right: {
          type: Parser.Nodes.State,
          value: '1',
          right: {
            type: Parser.Nodes.Reference,
            value: 'REF'
          }
        }
      }
    }
  );
});

test("Consume an expected 'APPEND NEXT' pattern", () => {
  const context = new Core.Context('test');
  const text = 'skip append next REF_NEXT;';

  // Test the consumption.
  expect(Lexer.consumeText(text, context)).toBeTruthy();
  expect(Parser.consumeTokens(context.tokens, context)).toBeTruthy();

  // Check the resulting nodes.
  Helper.testSkipNode(context.node, Parser.Nodes.AppendNext, 'REF_NEXT');
});

test("Consume an expected 'APPEND LEFT' pattern", () => {
  const context = new Core.Context('test');
  const text = 'skip append left REF_LEFT;';

  // Test the consumption.
  expect(Lexer.consumeText(text, context)).toBeTruthy();
  expect(Parser.consumeTokens(context.tokens, context)).toBeTruthy();

  // Check the resulting nodes.
  Helper.testSkipNode(context.node, Parser.Nodes.AppendLeft, 'REF_LEFT');
});

test("Consume an expected 'APPEND RIGHT' pattern", () => {
  const context = new Core.Context('test');
  const text = 'skip append right REF_RIGHT;';

  // Test the consumption.
  expect(Lexer.consumeText(text, context)).toBeTruthy();
  expect(Parser.consumeTokens(context.tokens, context)).toBeTruthy();

  // Check the resulting nodes.
  Helper.testSkipNode(context.node, Parser.Nodes.AppendRight, 'REF_RIGHT');
});
