import * as Core from '@xcheme/core';

import * as Lang from '../../../src/index';

/**
 * Tree structure.
 */
export type Tree = {
  /**
   * Node type.
   */
  type: Lang.Parser.Nodes;
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
 * Assert the specified source code can generate the specified tree structure.
 * @param code Source code.
 * @param tree Tree structure.
 */
export const tree = (code: string, tree: Tree): void => {
  const context = new Core.Context<Lang.Types.Metadata>('test');
  expect(Lang.Lexer.consumeText(code, context)).toBeTruthy();
  expect(Lang.Parser.consumeTokens(context.tokens, context)).toBeTruthy();
  expect(context.node.next).toBeDefined();
  match(context.node.next!, tree);
};

/**
 * Check whether or not the specified input node matches the specified tree structure.
 * @param node Input node.
 * @param tree Tree structure.
 */
const match = (node: Lang.Types.Node, tree: Tree): void => {
  expect(node.value).toBe(tree.type);
  if (tree.value) {
    expect(node.fragment.data).toBe(tree.value);
  }
  if (tree.left) {
    expect(node.left).toBeDefined();
    match(node.left!, tree.left);
  } else {
    expect(node.left).toBeUndefined();
  }
  if (tree.right) {
    expect(node.right).toBeDefined();
    match(node.right!, tree.right);
  } else {
    expect(node.right).toBeUndefined();
  }
  if (tree.next) {
    expect(node.next).toBeDefined();
    match(node.next!, tree.next);
  } else {
    expect(node.next).toBeUndefined();
  }
};
