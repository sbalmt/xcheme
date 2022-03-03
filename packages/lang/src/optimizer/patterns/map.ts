import * as Core from '@xcheme/core';

import * as Member from '../../core/nodes/member';
import * as Sequential from '../../core/nodes/sequential';
import * as Identified from '../../core/nodes/identified';
import * as Project from '../../core/project';
import * as Symbols from '../../core/symbols';
import * as Parser from '../../parser';
import * as Identity from '../identity';
import * as Context from '../context';
import * as Loose from '../loose';

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
    if (node.value === Parser.Nodes.String || node instanceof Identified.Node || node instanceof Sequential.Node) {
      if (parent) {
        const right = parent.right!;
        parent.setChild(Core.Nodes.Left, void 0);
        parent.setChild(Core.Nodes.Right, void 0);
        parent.swap(right);
      }
      return node;
    }
    if (node.left) {
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
export const consume = (
  project: Project.Context,
  direction: Core.Nodes,
  parent: Core.Node,
  state: Context.State
): void => {
  let member = parent.getChild(direction)!.right;
  state.record!.data.dynamic = true;
  while (member) {
    const expression = member.right!;
    if (expression.value === Parser.Nodes.Identifier) {
      if (state.type === Symbols.Types.Skip) {
        project.addError(expression.fragment, Errors.UNSUPPORTED_IDENTITY);
        break;
      }
      const record = state.record;
      const identifier = `${record!.data.identifier}@${expression.fragment.data}`;
      if (project.symbols.has(identifier)) {
        project.addError(expression.fragment, Errors.DUPLICATE_IDENTIFIER);
      } else {
        const identity = state.identity;
        state.identity = Identity.resolve(expression) ?? state.identity;
        state.record = member.table.get(expression.fragment.data)!;
        Context.setMetadata(project, identifier, state.record!, state);
        Expression.consume(project, Core.Nodes.Right, expression, state);
        const candidate = getCandidate(expression.right!);
        if (!candidate) {
          project.addError(member.fragment, Errors.INVALID_MAP_ENTRY);
        } else {
          if (candidate.value === Parser.Nodes.String) {
            Loose.collision(project, candidate.fragment.data, candidate);
          }
          const replacement = new Member.Node(expression.right!, state.record!, candidate);
          member.setChild(Core.Nodes.Right, replacement);
          project.symbols.add(state.record);
        }
        state.identity = identity;
        state.record = record;
      }
    } else {
      Expression.consume(project, Core.Nodes.Right, member, state);
      const candidate = getCandidate(member.right!);
      if (!candidate) {
        project.addError(member.fragment, Errors.INVALID_MAP_ENTRY);
      } else {
        if (candidate.value === Parser.Nodes.String) {
          Loose.collision(project, candidate.fragment.data, candidate);
        }
        const replacement = new Member.Node(member.right!, state.record!, candidate);
        member.setChild(Core.Nodes.Right, replacement);
      }
    }
    member = member.next!;
  }
};
