import * as Core from '@xcheme/core';

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
  node: never;
  /**
   * Record metadata.
   */
  record: {
    /**
     * Record type.
     */
    type: Directives;
    /**
     * Record origin.
     */
    origin: Origins;
    /**
     * Record order.
     */
    order: number;
    /**
     * Record name.
     */
    name: string;
    /**
     * Record identifier.
     */
    identifier: string;
    /**
     * Record identity.
     */
    identity: number;
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
