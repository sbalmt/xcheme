import * as Core from '@xcheme/core';
import * as Lexer from '@xcheme/lexer';

import { Nodes } from '../nodes';
import { Symbols } from '../symbols';
import { Arguments } from './arguments';
import { Expression } from './expression';

import { getDirectiveExpression } from './expression-directive';

/**
 * Alias parameters list pattern.
 */
const AliasParameterList: Core.Pattern<Core.Metadata.Types> = new Core.ExpectFlowPattern(
  new Core.EmitSymbolPattern(Symbols.AliasParameter, new Core.ExpectUnitPattern(Lexer.Tokens.Identifier)),
  new Core.OptFlowPattern(
    new Core.ExpectUnitPattern(Lexer.Tokens.Comma),
    new Core.RunFlowPattern(() => AliasParameterList)
  )
);

/**
 * Alias directives route.
 */
export const AliasDirectives = new Core.FlowRoute(
  new Core.ExpectFlowPattern(
    new Core.OptFlowPattern(
      new Core.ScopeSymbolPattern(
        new Core.ExpectUnitPattern(Lexer.Tokens.OpenChevron),
        AliasParameterList,
        new Core.ExpectUnitPattern(Lexer.Tokens.CloseChevron)
      )
    ),
    new Core.MapFlowPattern(
      new Core.SetValueRoute(
        Nodes.AliasToken,
        getDirectiveExpression(Symbols.AliasToken, Arguments, Expression),
        Lexer.Tokens.Token
      ),
      new Core.SetValueRoute(
        Nodes.AliasNode,
        getDirectiveExpression(Symbols.AliasNode, Arguments, Expression),
        Lexer.Tokens.Node
      )
    )
  ),
  Lexer.Tokens.Alias
);
