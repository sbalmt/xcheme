/**
 * Cache context class.
 */
export class Context<V> {
  /**
   * Cache map.
   */
  #cache = new WeakMap<object, Set<V>>();

  /**
   * Determines whether or not the specified value exists in the cache.
   * @param object Key object.
   * @param value Input value.
   * @returns Returns true when the value exists, false otherwise.
   */
  has<K extends object>(object: K, value: V): boolean {
    return !!this.#cache.get(object)?.has(value);
  }

  /**
   * Add the specified value in the cache.
   * @param object Key object.
   * @param value Input value.
   */
  add<K extends object>(object: K, value: V): void {
    (this.#cache.has(object) ? this.#cache : this.#cache.set(object, new Set<V>())).get(object)!.add(value);
  }
}
