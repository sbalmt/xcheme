import * as Core from '@xcheme/core';

import * as Lang from '../../../src/index';
import * as Assert from './assert';

/**
 * Validates whether or not the given skip node has the desired structure.
 * @param node Input node.
 * @param value Expected node value.
 * @param data Expected node fragment text.
 */
export const testSkipNode = (node: Core.Node, value: Lang.Parser.Nodes, data: string): void => {
  const stmt = node.next!;
  expect(stmt).toBeDefined();
  expect(stmt.value).toBe(Lang.Parser.Nodes.Skip);
  expect(stmt.left).toBeUndefined();
  expect(stmt.right).toBeDefined();
  expect(stmt.next).toBeUndefined();

  const expr = stmt.right!;
  expect(expr).toBeDefined();
  expect(expr.value).toBe(value);
  expect(expr.left).toBeUndefined();
  expect(expr.right).toBeDefined();
  expect(expr.next).toBeUndefined();

  const ref = expr.right!;
  expect(ref).toBeDefined();
  expect(ref.value).toBe(Lang.Parser.Nodes.Reference);
  expect(ref.fragment.data).toBe(data);
  expect(ref.left).toBeUndefined();
  expect(ref.right).toBeUndefined();
  expect(ref.next).toBeUndefined();
};

/**
 * Get a new tree structure for the given operator, reference and identity in a SKIP directive.
 * @param operator Node operator type.
 * @param reference Reference value.
 * @param identity Identity content.
 * @returns Returns the generated tree structure.
 */
export const getTree = (operator: Lang.Parser.Nodes, reference: string, identity?: string): Assert.TreeStructure => {
  const ref = {
    type: Lang.Parser.Nodes.Reference,
    value: reference
  };
  return {
    type: Lang.Parser.Nodes.Skip,
    right: {
      type: operator,
      right: identity
        ? {
            type: Lang.Parser.Nodes.State,
            value: identity,
            right: ref
          }
        : ref
    }
  };
};
