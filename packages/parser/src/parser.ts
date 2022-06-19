import * as Core from '@xcheme/core';
import * as Lexer from '@xcheme/lexer';

import { SkipDirective } from './patterns/directive-skip';
import { TokenDirective } from './patterns/directive-token';
import { NodeDirective } from './patterns/directive-node';
import { AliasDirectives } from './patterns/directive-alias';
import { ExportDirective } from './patterns/directive-export';
import { ImportDirective } from './patterns/directive-import';

/**
 * Parser pattern.
 */
export const Parser = new Core.ExpectFlowPattern(
  new Core.OptFlowPattern(
    new Core.RepeatFlowPattern(
      new Core.EmitNodePattern(
        Core.Source.Output,
        Core.Nodes.Right,
        new Core.MapFlowPattern(
          SkipDirective,
          TokenDirective,
          NodeDirective,
          AliasDirectives,
          ExportDirective,
          ImportDirective
        ),
        new Core.ExpectUnitPattern(Lexer.Tokens.Semicolon)
      )
    )
  ),
  new Core.EndFlowPattern()
);
