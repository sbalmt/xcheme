import * as Core from '@xcheme/core';
import * as Lexer from '@xcheme/lexer';

import * as Parser from '../../src/index';

/**
 * Tree structure.
 */
export type Tree = {
  /**
   * Node type.
   */
  type: Parser.Nodes;
  /**
   * Node value.
   */
  value?: string;
  /**
   * Left structure.
   */
  left?: Tree;
  /**
   * Right structure.
   */
  right?: Tree;
  /**
   * Next structure.
   */
  next?: Tree;
};

/**
 * Get a new parameter list tree for the given parameters list.
 * @param parameters Parameters list.
 * @returns Returns the generated parameter list tree.
 */
const getParametersList = (parameters: string[]): Tree | undefined => {
  let first: Tree | undefined, previous: Tree | undefined;
  for (const name of parameters) {
    const current = {
      type: Parser.Nodes.Identifier,
      value: name
    };
    if (previous) {
      previous.next = current;
    } else {
      first = current;
    }
    previous = current;
  }
  return first;
};

/**
 * Get a new parameters tree for the given parameters list.
 * @param parameters Parameters list.
 * @returns Returns the generated parameters tree.
 */
const getParameters = (parameters?: string[]): Tree | undefined => {
  if (parameters && parameters.length > 0) {
    return {
      type: Parser.Nodes.Parameters,
      left: getParametersList(parameters)
    };
  }
  return void 0;
};

/**
 * Get a new expression tree for the given directive statement.
 * @param type Directive type.
 * @param expression Expression tree structure.
 * @param identifier Optional directive identifier.
 * @param identity Optional directive identity.
 * @param parameters Optional parameters.
 * @returns Returns the generated expression tree.
 */
const getDirective = (
  type: Parser.Nodes,
  expression: Tree,
  identifier?: string,
  identity?: string,
  parameters?: string[]
): Tree => {
  return {
    type,
    right: identifier
      ? {
          type: Parser.Nodes.Identifier,
          value: identifier,
          left: identity
            ? {
                type: Parser.Nodes.Arguments,
                left: {
                  type: parameters?.includes(identity) ? Parser.Nodes.Reference : Parser.Nodes.Identity,
                  value: identity
                },
                next: getParameters(parameters)
              }
            : getParameters(parameters),
          right: expression
        }
      : expression
  };
};

/**
 * Check whether or not the specified input node matches the specified tree structure.
 * @param node Input node.
 * @param tree Tree structure.
 */
const matchTree = <T extends Core.Metadata.Types>(node: Core.Node<T>, tree: Tree): void => {
  expect(node.value).toBe(tree.type);
  if (tree.value) {
    expect(node.fragment.data).toBe(tree.value);
  }
  if (tree.left) {
    expect(node.left).toBeDefined();
    matchTree(node.left!, tree.left);
  } else {
    expect(node.left).toBeUndefined();
  }
  if (tree.right) {
    expect(node.right).toBeDefined();
    matchTree(node.right!, tree.right);
  } else {
    expect(node.right).toBeUndefined();
  }
  if (tree.next) {
    expect(node.next).toBeDefined();
    matchTree(node.next!, tree.next);
  } else {
    expect(node.next).toBeUndefined();
  }
};

/**
 * Assert the specified source code can generate the specified tree structure.
 * @param code Source code.
 * @param tree Tree structure.
 */
export const tree = (code: string, tree: Tree): void => {
  const context = new Core.Context('test');
  expect(Lexer.consumeText(code, context)).toBeTruthy();
  expect(Parser.consumeTokens(context.tokens, context)).toBeTruthy();
  expect(context.node.next).toBeDefined();
  matchTree(context.node.next!, tree);
};

/**
 * Assert the specified source code can generate a skip directive with the given expression tree.
 * @param code Source code.
 * @param expression Expression tree.
 */
export const skip = (code: string, expression: Tree): void => {
  tree(code, getDirective(Parser.Nodes.Skip, expression));
};

/**
 * Assert the specified source code can generate a token directive with the given expression tree.
 * @param code Source code.
 * @param identifier Directive identifier.
 * @param identity Directive identity.
 * @param expression Expression tree.
 */
export const token = (
  code: string,
  identifier: string | undefined,
  identity: string | undefined,
  expression: Tree
): void => {
  tree(code, getDirective(Parser.Nodes.Token, expression, identifier, identity));
};

/**
 * Assert the specified source code can generate a node directive with the given expression tree.
 * @param code Source code.
 * @param identifier Directive identifier.
 * @param identity Directive identity.
 * @param expression Expression tree.
 */
export const node = (
  code: string,
  identifier: string | undefined,
  identity: string | undefined,
  expression: Tree
): void => {
  tree(code, getDirective(Parser.Nodes.Node, expression, identifier, identity));
};

/**
 * Assert the specified source code can generate an alias token directive with the given expression tree.
 * @param code Source code.
 * @param identifier Directive identifier.
 * @param identity Directive identity.
 * @param expression Expression tree.
 * @param parameters Optional parameters.
 */
export const aliasToken = (
  code: string,
  identifier: string | undefined,
  identity: string | undefined,
  expression: Tree,
  parameters?: string[]
): void => {
  tree(code, getDirective(Parser.Nodes.AliasToken, expression, identifier, identity, parameters));
};

/**
 * Assert the specified source code can generate an alias node directive with the given expression tree.
 * @param code Source code.
 * @param identifier Directive identifier.
 * @param identity Directive identity.
 * @param expression Expression tree.
 * @param parameters Optional parameters.
 */
export const aliasNode = (
  code: string,
  identifier: string | undefined,
  identity: string | undefined,
  expression: Tree,
  parameters?: string[]
): void => {
  tree(code, getDirective(Parser.Nodes.AliasNode, expression, identifier, identity, parameters));
};

/**
 * Assert the specified source code can generate an exported expression with the given expression tree.
 * @param code Source code.
 * @param expression Expression tree.
 */
export const exportExpression = (code: string, expression: Tree): void => {
  tree(code, {
    type: Parser.Nodes.Export,
    right: expression
  });
};

/**
 * Assert the specified source code can generate an exported token directive with the given expression tree.
 * @param code Source code.
 * @param identifier Directive identifier.
 * @param identity Directive identity.
 * @param expression Expression tree.
 */
export const exportToken = (
  code: string,
  identifier: string | undefined,
  identity: string | undefined,
  expression: Tree
): void => {
  exportExpression(code, getDirective(Parser.Nodes.Token, expression, identifier, identity));
};

/**
 * Assert the specified source code can generate an exported node directive with the given expression tree.
 * @param code Source code.
 * @param identifier Directive identifier.
 * @param identity Directive identity.
 * @param expression Expression tree.
 */
export const exportNode = (
  code: string,
  identifier: string | undefined,
  identity: string | undefined,
  expression: Tree
): void => {
  exportExpression(code, getDirective(Parser.Nodes.Node, expression, identifier, identity));
};

/**
 * Assert the specified source code can generate an exported alias token directive with the given expression tree.
 * @param code Source code.
 * @param identifier Directive identifier.
 * @param identity Directive identity.
 * @param expression Expression tree.
 * @param parameters Optional parameters.
 */
export const exportAliasToken = (
  code: string,
  identifier: string | undefined,
  identity: string | undefined,
  expression: Tree,
  parameters?: string[]
): void => {
  exportExpression(code, getDirective(Parser.Nodes.AliasToken, expression, identifier, identity, parameters));
};

/**
 * Assert the specified source code can generate an exported alias node directive with the given expression tree.
 * @param code Source code.
 * @param identifier Directive identifier.
 * @param identity Directive identity.
 * @param expression Expression tree.
 * @param parameters Optional parameters.
 */
export const exportAliasNode = (
  code: string,
  identifier: string | undefined,
  identity: string | undefined,
  expression: Tree,
  parameters?: string[]
): void => {
  exportExpression(code, getDirective(Parser.Nodes.AliasNode, expression, identifier, identity, parameters));
};
