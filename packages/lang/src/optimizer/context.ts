import * as Core from '@xcheme/core';

import * as Coder from '../core/coder/base';
import * as Project from '../core/project';
import * as Entries from '../core/entries';

/**
 * Context entry.
 */
type Entry = {
  /**
   * Entry types.
   */
  type: Entries.Types;
  /**
   * Entry origin.
   */
  origin: Entries.Origins;
  /**
   * Entry identifier.
   */
  identifier: string;
  /**
   * Entry identity.
   */
  identity: number;
  /**
   * Determines whether or not the entry is an alias.
   */
  alias: boolean;
  /**
   * Determines whether or not the entry has a dynamic identity.
   */
  dynamic: boolean;
  /**
   * Determines whether or not the entry can be exported.
   */
  exported: boolean;
};

/**
 * Context consumption state.
 */
export type State = {
  /**
   * Anchor node from the AST.
   */
  anchor: Core.Node;
  /**
   * Current entry.
   */
  entry: Entry;
};

/**
 * Get a new state entry based on the given entry model.
 * @param model Entry model.
 * @returns Returns the generated entry.
 */
export const getNewStateEntry = (model: Partial<Entry>): Entry => {
  return {
    type: model.type ?? Entries.Types.Unknown,
    origin: model.origin ?? Entries.Origins.User,
    identifier: model.identifier ?? '?',
    identity: model.identity ?? -1,
    alias: model.alias ?? false,
    dynamic: model.dynamic ?? false,
    exported: model.exported ?? false
  };
};

/**
 * Get a new state based on the given parameters.
 * @param anchor Anchor node.
 * @param identity Entry identity.
 * @returns Returns the new state.
 */
export const getNewState = (anchor: Core.Node, identity: number): State => {
  return {
    anchor,
    entry: getNewStateEntry({
      origin: Entries.Origins.User,
      identity
    })
  };
};

const counters = new WeakMap<Coder.Base, number>();

export const getCount = (project: Project.Context): number => {
  const counter = counters.get(project.coder) ?? project.options.initialIdentity ?? 0;
  counters.set(project.coder, counter + 1);
  return counter;
};
