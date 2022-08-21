import * as Core from '@xcheme/core';
import * as Lexer from '@xcheme/lexer';

import { Nodes } from '../nodes';
import { TokenDirective } from './directive-token';
import { NodeDirective } from './directive-node';
import { AliasDirectives } from './directive-alias';

/**
 * Export directive route.
 */
export const ExportDirective = new Core.SetValueRoute(
  Nodes.Export,
  new Core.AppendNodePattern(
    Core.Source.Output,
    Core.NodeDirection.Right,
    Core.NodeDirection.Right,
    new Core.MapFlowPattern(
      TokenDirective,
      NodeDirective,
      AliasDirectives,
      new Core.SetValueRoute(Nodes.Identifier, Lexer.Tokens.Identifier)
    )
  ),
  Lexer.Tokens.Export
);
