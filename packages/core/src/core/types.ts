/**
 * Data types.
 */
export type Types = {
  /**
   * Token data.
   */
  token: unknown;
  /**
   * Node data.
   */
  node: unknown;
  /**
   * Record data.
   */
  record: unknown;
};

/**
 * Token type.
 */
export type TokenType<T> = T extends Types ? T['token'] : never;

/**
 * Node type.
 */
export type NodeType<T> = T extends Types ? T['node'] : never;

/**
 * Record type.
 */
export type RecordType<T> = T extends Types ? T['record'] : never;
