import * as Core from '@xcheme/core';

import * as Project from './project';
import * as Counter from './counter';

/**
 * Core source type.
 */
export type Source = Core.Source<Metadata>;

/**
 * Core context type.
 */
export type Context = Core.Context<Metadata>;

/**
 * Core table type.
 */
export type Table = Core.Table<Metadata>;

/**
 * Core token type.
 */
export type Token = Core.Token<Metadata>;

/**
 * Core token list type.
 */
export type TokenList = Core.TokenList<Metadata>;

/**
 * Core node type.
 */
export type Node = Core.Node<Metadata>;

/**
 * Core record type.
 */
export type Record = Core.Record<Metadata>;

/**
 * Core pattern type.
 */
export type Pattern = Core.Pattern<Metadata>;

/**
 * Core route type.
 */
export type Route = Core.Route<Metadata>;

/**
 * Required record metadata.
 */
type RecordData = {
  /**
   * Record type.
   */
  type: Directives;
  /**
   * Record origin.
   */
  origin: Origins;
  /**
   * Record identifier.
   */
  identifier: string;
  /**
   * Record identity.
   */
  identity: number;
  /**
   * Determines whether or not the record is a template.
   */
  template: boolean;
};

/**
 * Core metadata type.
 */
export type Metadata = {
  /**
   * Token metadata.
   */
  token: never;
  /**
   * Node metadata.
   */
  node: {
    /**
     * Node type.
     */
    type: Nodes;
    /**
     * Node record.
     */
    record?: Record;
    /**
     * Node identity.
     */
    identity?: number;
    /**
     * Node sequence.
     */
    sequence?: Node[];
    /**
     * Node route.
     */
    route?: Node;
  };
  /**
   * Record metadata.
   */
  record: RecordData & {
    /**
     * Record order.
     */
    order: number;
    /**
     * Record name.
     */
    name: string;
    /**
     * Record location.
     */
    location: string;
    /**
     * Determines whether or not the record is imported.
     */
    imported: boolean;
    /**
     * Determines whether or not the record is exported.
     */
    exported: boolean;
    /**
     * Array of dependencies.
     */
    dependencies: Record[];
    /**
     * Array of dependents.
     */
    dependents: Record[];
    /**
     * Record pattern.
     */
    pattern: Pattern | string | undefined;
  };
};

/**
 * Directive types.
 */
export const enum Directives {
  Unknown,
  Skip,
  Token,
  Node
}

/**
 * Origins types.
 */
export const enum Origins {
  User,
  Loose
}

/**
 * Node types.
 */
export const enum Nodes {
  Directive,
  Reference,
  Argument,
  MemberRoute,
  StringSequence,
  ReferenceSequence
}

/**
 * Global order counter.
 */
const orderCounter = new Counter.Context();

/**
 * Assign the specified metadata in the given node.
 * @param node Input node.
 * @param data Input metadata.
 * @returns Returns the given node.
 */
export const assignNode = (node: Node, data: Metadata['node']): Node => {
  node.assign({
    type: data.type,
    record: data.record,
    identity: data.identity,
    sequence: data.sequence,
    route: data.route
  });
  return node;
};

/**
 * Assign the specified metadata in the given record.
 * @param project Project context.
 * @param record Input record.
 * @param data Input metadata.
 * @returns Returns the given record.
 */
export const assignRecord = (project: Project.Context, record: Record, data: RecordData): Record => {
  record.assign({
    type: data.type,
    origin: data.origin,
    order: orderCounter.increment(project.coder),
    name: `L${project.id}:${data.identifier}`,
    template: data.template,
    identifier: data.identifier,
    identity: data.identity,
    location: project.name,
    imported: false,
    exported: false,
    dependencies: [],
    dependents: [],
    pattern: void 0
  });
  return record;
};
