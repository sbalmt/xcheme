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
  /**
   * Entry dependencies.
   */
  dependencies: Entries.Entry[];
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
 * Get a new state based on the given parameters.
 * @param anchor Anchor node.
 * @param identity Entry identity.
 * @returns Returns the new state.
 */
export const getNewState = (anchor: Core.Node, identity: number): State => {
  return {
    anchor,
    entry: {
      type: Entries.Types.Unknown,
      origin: Entries.Origins.User,
      identifier: '?',
      identity,
      alias: false,
      dynamic: false,
      exported: false,
      dependencies: []
    }
  };
};

const counters = new WeakMap<Coder.Base, number>();

export const getCount = (project: Project.Context): number => {
  const counter = counters.get(project.coder) ?? project.options.initialIdentity ?? 0;
  counters.set(project.coder, counter + 1);
  return counter;
};
