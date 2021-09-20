/**
 * Reference types.
 */
export const enum Types {
  Undefined,
  User,
  Loose
}

/**
 * Reference entry.
 */
export type Entry = {
  /**
   * Reference type.
   */
  type: Types;
  /**
   * Reference identifier.
   */
  identifier: string;
  /**
   * Reference identity.
   */
  identity: number;
  /**
   * Determines whether or not the entry can have a dynamic identity.
   */
  dynamic: boolean;
};

/**
 * Reference Map.
 */
export type Map = {
  [key: string]: Entry;
};

/**
 * Get a new entry with the given identity.
 * @param identity Entry identity.
 * @returns Returns the new entry.
 */
export const getNewEntry = (identity: number): Entry => {
  return {
    type: Types.Undefined,
    identifier: '?',
    identity: identity,
    dynamic: false
  };
};
