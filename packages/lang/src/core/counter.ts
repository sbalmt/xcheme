/**
 * Counter context class.
 */
export class Context {
  /**
   * Counter cache.
   */
  #cache = new WeakMap<object, number>();

  /**
   * Get the current counter value for the specified key object.
   * @param object Key object.
   * @param initial Initial value.
   * @returns Returns the counter value.
   */
  count<T extends object>(object: T, initial: number = 0): number {
    return this.#cache.get(object) ?? initial;
  }

  /**
   * Increment the counter value for the specified key object.
   * @param object Key object.
   * @param initial Initial value.
   * @returns Returns the previous counter value.
   */
  increment<T extends object>(object: T, initial: number = 0): number {
    const value = this.count(object, initial);
    this.#cache.set(object, value + 1);
    return value;
  }
}
