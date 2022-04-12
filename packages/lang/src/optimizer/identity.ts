import * as Core from '@xcheme/core';

import * as Project from '../core/project';
import * as Types from '../core/types';
import * as Parser from '../parser';
import * as Context from './context';

import { Errors } from '../core/errors';

/**
 * Resolve the identity in the given node.
 * @param node Identity node.
 * @returns Returns the resolved identity number.
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
 * Consume the identity in the given node.
 * @param project Project context.
 * @param node Identity node.
 * @param state Consumption state.
 * @param def Default identity for nodes without an identity.
 * @returns Returns the identity number.
 */
export const consume = (
  project: Project.Context,
  node: Types.Node | undefined,
  state: Context.State,
  def: number = NaN
): number => {
  const identity = node?.left;
  if (identity) {
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
  return def;
};
