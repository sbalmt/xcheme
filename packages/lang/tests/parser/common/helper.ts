import * as Core from '@xcheme/core';

import { Parser } from '../../../src/index';

/**
 * Validates whether or not the given skip node has the desired structure.
 * @param node Input node.
 * @param value Expected node value.
 * @param data Expected node fragment text.
 */
export const testSkipNode = (node: Core.Node, value: Parser.Nodes, data: string): void => {
  const stmt = node.next!;
  expect(stmt).toBeDefined();
  expect(stmt.value).toBe(Parser.Nodes.Skip);
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
  expect(ref.value).toBe(Parser.Nodes.Reference);
  expect(ref.fragment.data).toBe(data);
  expect(ref.left).toBeUndefined();
  expect(ref.right).toBeUndefined();
  expect(ref.next).toBeUndefined();
};
