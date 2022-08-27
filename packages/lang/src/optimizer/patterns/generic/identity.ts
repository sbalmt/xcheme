import * as Core from '@xcheme/core';

import * as Nodes from '../../../core/nodes';
import * as Records from '../../../core/records';
import * as Project from '../../../core/project';
import * as Types from '../../../core/types';
import * as Argument from './argument';
import * as Context from '../../context';

import { Errors } from '../../../core/errors';

/**
 * Consume the given parent and optimize its IDENTITY pattern.
 * @param project Project context.
 * @param node Identity node.
 * @param state Consumption state.
 */
export const consume = (project: Project.Context, node: Types.Node, state: Context.State): void => {
  const record = state.record!;
  Argument.consume(project, node, state);
  if (Records.isEmpty(record) && Nodes.isEmpty(node)) {
    if (record.data.type !== Types.Directives.Skip) {
      project.logs.emplace(Core.LogType.ERROR, record.fragment, Errors.UNDEFINED_IDENTITY);
    }
    project.logs.emplace(Core.LogType.ERROR, node.fragment, Errors.UNDEFINED_IDENTITY);
  }
};
