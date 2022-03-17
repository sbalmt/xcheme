import * as Lang from '../../../src/index';
import * as Assert from './assert';

/**
 * Get a new tree structure for the given operator, reference and identity in a SKIP directive.
 * @param operator Node operator type.
 * @param reference Reference value.
 * @param identity Identity content.
 * @returns Returns the generated tree structure.
 */
export const getTree = (operator: Lang.Parser.Nodes, reference: string, identity?: string): Assert.Tree => {
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
