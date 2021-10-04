import * as Core from '@xcheme/core';

import * as Member from '../../core/nodes/member';
import * as Mergeable from '../../core/nodes/mergeable';
import * as Identity from '../../core/nodes/identity';
import * as Project from '../../core/project';
import * as Entries from '../../core/entries';
import * as Parser from '../../parser';
import * as Context from '../context';

import { Errors } from '../../core/errors';

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
      return getCandidate(node.left, node);
    }
  }
  return void 0;
};

/**
 * Consume a child node from the AST on the given parent and optimize the map pattern.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Context state.
 */
export const consume = (project: Project.Context, direction: Core.Nodes, parent: Core.Node, state: Context.State): void => {
  let member = parent.getChild(direction)!.right;
  state.entry.dynamic = true;
  while (member !== void 0) {
    const expression = member.right!;
    if (expression.value === Parser.Nodes.Identifier) {
      if (state.type === Context.Types.Skip) {
        project.addError(expression, Errors.UNSUPPORTED_IDENTITY);
        break;
      }
      const entry = state.entry;
      state.entry = {
        origin: Entries.Origins.User,
        identity: expression.left !== void 0 ? parseInt(expression.left.fragment.data) : NaN || state.entry.identity,
        identifier: `${state.entry.identifier}@${expression.fragment.data}`,
        alias: false,
        dynamic: false
      };
      Expression.consume(project, Core.Nodes.Right, expression, state);
      const candidate = getCandidate(expression.right!);
      if (candidate !== void 0) {
        const replacement = new Member.Node(expression.right!, state.entry.identity, state.entry.dynamic, candidate);
        member.setChild(Core.Nodes.Right, replacement);
      } else {
        project.addError(member, Errors.INVALID_MAP_ENTRY);
      }
      if (state.type === Context.Types.Token) {
        project.tokenEntries.add(state.entry.origin, state.entry.identifier, state.entry.identity, state.entry);
      } else {
        project.nodeEntries.add(state.entry.origin, state.entry.identifier, state.entry.identity, state.entry);
      }
      state.entry = entry;
    } else {
      Expression.consume(project, Core.Nodes.Right, member, state);
      const candidate = getCandidate(member.right!);
      if (candidate !== void 0) {
        member.setChild(Core.Nodes.Right, new Member.Node(member.right!, state.entry.identity, false, candidate));
      } else {
        project.addError(member, Errors.INVALID_MAP_ENTRY);
      }
    }
    member = member.next!;
  }
};
