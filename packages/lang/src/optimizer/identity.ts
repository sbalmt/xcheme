import * as Core from '@xcheme/core';
import * as Parser from '@xcheme/parser';

import * as Project from '../core/project';
import * as Types from '../core/types';

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
 * @param template Determines whether or not the identity given can be a template.
 * @param value Default identity value for nodes without an identity.
 * @returns Returns the identity number.
 */
export const consume = (
  project: Project.Context,
  node: Types.Node | undefined,
  template: boolean,
  value?: (() => number) | number
): number => {
  if (node?.value === Parser.Nodes.Arguments) {
    const identity = node.left;
    if (identity) {
      if (identity.next) {
        project.logs.emplace(Core.LogType.ERROR, identity.next.fragment, Errors.UNEXPECTED_EXTRA_ARGUMENT);
      }
      if (identity.value === Parser.Nodes.Identity) {
        return resolve(identity);
      }
      if (!template) {
        project.logs.emplace(Core.LogType.ERROR, identity.fragment, Errors.UNEXPECTED_ARGUMENT);
      }
    }
  }
  if (value instanceof Function) {
    return value();
  }
  if (value === void 0) {
    return NaN;
  }
  return value;
};
