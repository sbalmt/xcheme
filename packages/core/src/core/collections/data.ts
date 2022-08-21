import Exception from '../exception';

/**
 * Data collection class.
 */
export class Data<T> {
  /**
   * Data object.
   */
  #object: T | undefined;

  /**
   * Get the data object.
   * @throws Throws an exception when the data object isn't assigned.
   */
  get data(): T {
    if (!this.#object) {
      throw new Exception(`Data object isn't assigned yet.`);
    }
    return this.#object;
  }

  /**
   * Determines whether or not the data object is assigned.
   */
  get assigned(): boolean {
    return this.#object !== void 0;
  }

  /**
   * Assign the data object.
   * @param data Data object.
   * @throws Throws an exception when the data object is already assigned.
   */
  assign(data: T): void {
    if (this.#object) {
      throw new Exception(`Data object is already assigned.`);
    }
    this.#object = data;
  }

  /**
   * Swap all contents of the given data.
   * @param data Data object instance.
   */
  swap(data: Data<T>): void {
    [this.#object, data.#object] = [data.#object, this.#object];
  }
}
