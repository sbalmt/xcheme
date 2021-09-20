import * as Core from '@xcheme/core';

import * as Parser from '../../parser';
import * as Member from '../nodes/member';
import * as Mergeable from '../nodes/mergeable';
import * as Identity from '../nodes/identity';
import * as Reference from '../reference';
import * as Context from '../context';

import { Errors } from '../../core/errors';
import { Project } from '../../core/project';

import * as Expression from './expression';

/**
 * Get the candidate node based on the given input node.
 * @param node Input node.
 * @param parent Node parent.
 * @returns Returns the candidate node or undefined when there's no candidates.
 */
const getCandidate = (node: Core.Node, parent?: Core.Node): Core.Node | undefined => {
  if (node.value !== Parser.Nodes.Then && node.value !== Parser.Nodes.Or) {
    if (node.value === Parser.Nodes.String || node instanceof Identity.Node || node instanceof Mergeable.Node) {
      if (parent !== void 0) {
        const right = parent.right!;
        parent.setChild(Core.Nodes.Left, void 0);
        parent.setChild(Core.Nodes.Right, void 0);
        parent.swap(right);
      }
      return node;
    }
    if (node.left !== void 0) {
      return getCandidate(node.left);
    }
  }
  return void 0;
};

/**
 * Consume the specified input node optimizing its map pattern.
 * @param project Input project.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Context state.
 */
export const consume = (project: Project, direction: Core.Nodes, parent: Core.Node, state: Context.State): void => {
  let member = parent.getChild(direction)!.right;
  const counter = state.counter;
  state.entry.dynamic = true;
  while (member !== void 0) {
    const expression = member.right!;
    if (expression.value === Parser.Nodes.Identifier) {
      if (state.type === Context.Types.Skip) {
        project.errors.push(new Core.Error(expression.fragment, Errors.UNSUPPORTED_IDENTITY));
        break;
      }
      const entry = state.entry;
      state.entry = {
        type: Reference.Types.User,
        identity: expression.left !== void 0 ? parseInt(expression.left.fragment.data) : NaN || state.entry.identity,
        identifier: `${state.entry.identifier}@${expression.fragment.data}`,
        dynamic: false
      };
      Expression.consume(project, Core.Nodes.Right, expression, state);
      const candidate = getCandidate(expression.right!);
      if (candidate !== void 0) {
        const replacement = new Member.Node(expression.right!, state.entry.identity, state.entry.dynamic, candidate);
        member.setChild(Core.Nodes.Right, replacement);
      } else {
        project.errors.push(new Core.Error(member.fragment, Errors.INVALID_MAP_ENTRY));
      }
      state.references[state.entry.identifier] = state.entry;
      state.entry = entry;
    } else {
      Expression.consume(project, Core.Nodes.Right, member, state);
      const candidate = getCandidate(member.right!);
      if (candidate !== void 0) {
        member.setChild(Core.Nodes.Right, new Member.Node(member.right!, counter, false, candidate));
      } else {
        project.errors.push(new Core.Error(member.fragment, Errors.INVALID_MAP_ENTRY));
      }
    }
    member = member.next!;
  }
};
