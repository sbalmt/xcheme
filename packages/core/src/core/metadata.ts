import Exception from './exception';

/**
 * Metadata types.
 */
export type Types = {
  /**
   * Token metadata.
   */
  token: unknown;
  /**
   * Node metadata.
   */
  node: unknown;
  /**
   * Record metadata.
   */
  record: unknown;
};

/**
 * Token metadata type.
 */
export type Token<T> = T extends Types ? T['token'] : never;

/**
 * Node metadata type.
 */
export type Node<T> = T extends Types ? T['node'] : never;

/**
 * Record metadata type.
 */
export type Record<T> = T extends Types ? T['record'] : never;

/**
 * Metadata container.
 */
export class Container<T> {
  /**
   * Container data.
   */
  #data: T | undefined;

  /**
   * Get the container data.
   * @throws Throws an exception when the container data isn't assigned yet.
   */
  get data(): T {
    if (!this.#data) {
      throw new Exception(`Container data isn't assigned yet.`);
    }
    return this.#data;
  }

  /**
   * Determines whether or not the container data is assigned.
   */
  get assigned(): boolean {
    return !!this.#data;
  }

  /**
   * Assign the container data.
   * @param data Container data.
   * @throws Throws an exception when the container data is already assigned.
   */
  assign(data: T): void {
    if (this.#data) {
      throw new Exception(`Container data is already assigned.`);
    }
    this.#data = data;
  }

  /**
   * Swap the current container data by the data in the given container.
   * @param container Input container.
   */
  swap(container: Container<T>): void {
    [this.#data, container.#data] = [container.#data, this.#data];
  }
}
