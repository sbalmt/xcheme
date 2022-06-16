import * as Core from '@xcheme/core';

import { WhiteSpace } from './patterns/whitespace';
import { CommentLine } from './patterns/comment-line';
import { CommentBlock } from './patterns/comment-block';
import { Keyword } from './patterns/keyword';
import { Symbol } from './patterns/symbol';
import { Integer } from './patterns/integer';
import { String } from './patterns/string';
import { Identifier } from './patterns/identifier';

/**
 * Lexer pattern.
 */
export const Lexer = new Core.ExpectFlowPattern(
  new Core.OptFlowPattern(
    new Core.RepeatFlowPattern(
      new Core.ChooseFlowPattern(
        WhiteSpace,
        CommentLine,
        CommentBlock,
        new Core.EmitTokenPattern(
          Core.TextSource.Output,
          new Core.ChooseFlowPattern(Keyword, Symbol, Integer, String, Identifier)
        )
      )
    )
  ),
  new Core.EndFlowPattern()
);
