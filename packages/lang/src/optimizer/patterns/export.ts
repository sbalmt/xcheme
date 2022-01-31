import * as Core from '@xcheme/core';

import * as Project from '../../core/project';
import * as Entries from '../../core/entries';
import * as Parser from '../../parser';

import { Errors } from '../../core/errors';

/**
 * Get an entry that corresponds to the specified symbol
 * @param project Project context.
 * @param symbol Entry symbol.
 * @returns Returns the corresponding entry or undefined when there are no entries matching the symbol name.
 */
const getEntry = (project: Project.Context, symbol: Core.Record): Entries.Entry | undefined => {
  const entry = project.local.get(symbol.fragment.data);
  if (!entry) {
    if (symbol.value === Parser.Symbols.Node || symbol.value === Parser.Symbols.AliasNode) {
      project.addError(symbol.node!, Errors.UNRESOLVED_NODE_REFERENCE);
    } else if (symbol.value === Parser.Symbols.Token || symbol.value === Parser.Symbols.AliasToken) {
      project.addError(symbol.node!, Errors.UNRESOLVED_TOKEN_REFERENCE);
    } else {
      project.addError(symbol.node!, Errors.INVALID_EXPORT);
    }
  }
  return entry;
};

/**
 * Resolve the export directive for the given node and update the specified project.
 * @param project Project context.
 * @param node Input node.
 */
export const resolve = (project: Project.Context, node: Core.Node): boolean => {
  const current = node.right!;
  if (current.value === Parser.Nodes.Identifier) {
    const identifier = current.fragment.data;
    const symbol = node.table.find(identifier);
    if (!symbol) {
      project.addError(current, Errors.UNDEFINED_IDENTIFIER);
    } else {
      const entry = getEntry(project, symbol);
      if (entry) {
        entry.exported = true;
      }
    }
    return true;
  }
  return false;
};
