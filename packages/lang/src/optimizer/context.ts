import * as Core from '@xcheme/core';

import * as Project from '../core/project';
import * as Counter from '../core/counter';
import * as Symbols from '../core/symbols';

/**
 * Global order counter.
 */
const orderCounter = new Counter.Context();

/**
 * Context node.
 */
export type Node = {
  /**
   * Node direction.
   */
  direction: Core.Nodes;
  /**
   * Node parent.
   */
  parent: Core.Node;
};

/**
 * Context consumption state.
 */
export type State = {
  /**
   * State type.
   */
  type: Symbols.Types;
  /**
   * State origin.
   */
  origin: Symbols.Origins;
  /**
   * State identity.
   */
  identity: number;
  /**
   * Anchor AST node.
   */
  anchor: Core.Node;
  /**
   * State record.
   */
  record?: Core.Record;
};

/**
 * Get a new state based on the given parameters.
 * @param anchor Anchor node.
 * @param identity Initial identity.
 * @returns Returns the new state.
 */
export const getNewState = (anchor: Core.Node, identity?: number): State => {
  return {
    type: Symbols.Types.Unknown,
    origin: Symbols.Origins.User,
    identity: identity ?? NaN,
    anchor
  };
};

/**
 * Set the record's metadata based on the given identifier and consumption state.
 * @param project Project context.
 * @param identifier Record identifier.
 * @param record Target record.
 * @param state Consumption state.
 * @returns Returns the given symbol record.
 */
export const setMetadata = (
  project: Project.Context,
  identifier: string,
  record: Core.Record,
  state: State
): Core.Record => {
  Object.assign<any, Symbols.Metadata>(record.data, {
    type: state.type,
    origin: state.origin,
    order: orderCounter.increment(project.coder),
    name: `L${project.id}:${identifier}`,
    identifier,
    identity: state.identity,
    location: project.name,
    imported: false,
    exported: false,
    dependencies: [],
    dependents: [],
    pattern: void 0
  });
  return record;
};
