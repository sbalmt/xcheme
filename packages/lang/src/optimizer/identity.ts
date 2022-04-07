import * as Core from '@xcheme/core';

import * as Project from '../core/project';
import * as Types from '../core/types';
import * as Parser from '../parser';
import * as Context from './context';

import { Errors } from '../core/errors';

/**
 * Resolve the current identity for the given node.
 * @param node Input node.
 * @returns Returns the resolved identity number or NaN when the node doesn't have an identity.
 */
const resolve = (node: Types.Node): number => {
  const value = node.fragment.data;
  if (value === 'auto') {
    return Core.Source.Output;
  }
  const identity = parseInt(value);
  if (!isNaN(identity)) {
    return identity;
  }
  return NaN;
};

/**
 * Consume the current identity for the given node.
 * @param project Project context.
 * @param node Identity node.
 * @param state Consumption state.
 * @param initial Default result for nodes that doesn't have an identity.
 * @returns Returns the node identity number or NaN when the node doesn't have an identity.
 */
export const consume = (
  project: Project.Context,
  node: Types.Node | undefined,
  state: Context.State,
  initial: number = NaN
): number => {
  if (node) {
    const identity = node.left!;
    if (identity.next) {
      project.addError(identity.next.fragment, Errors.UNEXPECTED_EXTRA_ARGUMENT);
    }
    if (identity.value === Parser.Nodes.Identity) {
      return resolve(identity);
    }
    if (!state.template) {
      project.addError(identity.fragment, Errors.UNEXPECTED_ARGUMENT);
    }
  }
  return initial;
};
