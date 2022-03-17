import * as Lang from '../../../src/index';
import * as Assert from './assert';

/**
 * Get a basic tree structure for the given operator and reference in a SKIP directive.
 * @param operator Node operator type.
 * @param reference Reference value.
 * @returns Returns the generated tree structure.
 */
export const basic = (operator: Lang.Parser.Nodes, reference: string): Assert.Tree => {
  return {
    type: Lang.Parser.Nodes.Skip,
    right: {
      type: operator,
      right: {
        type: Lang.Parser.Nodes.Reference,
        value: reference
      }
    }
  };
};

/**
 * Get a tree structure for the given operator, reference and state in a SKIP directive.
 * @param operator Node operator type.
 * @param reference Reference value.
 * @param state State content.
 * @returns Returns the generated tree structure.
 */
export const withState = (operator: Lang.Parser.Nodes, reference: string, state: string): Assert.Tree => {
  return {
    type: Lang.Parser.Nodes.Skip,
    right: {
      type: operator,
      right: {
        type: Lang.Parser.Nodes.State,
        value: state,
        right: {
          type: Lang.Parser.Nodes.Reference,
          value: reference
        }
      }
    }
  };
};

/**
 * Get a tree structure for the given operator, reference and identity in a SKIP directive.
 * @param operator Node operator type.
 * @param reference Reference value.
 * @param identity State content.
 * @returns Returns the generated tree structure.
 */
export const withIdentity = (operator: Lang.Parser.Nodes, reference: string, identity: string): Assert.Tree => {
  return {
    type: Lang.Parser.Nodes.Skip,
    right: {
      type: operator,
      right: {
        type: Lang.Parser.Nodes.Identity,
        value: identity,
        right: {
          type: Lang.Parser.Nodes.Reference,
          value: reference
        }
      }
    }
  };
};
