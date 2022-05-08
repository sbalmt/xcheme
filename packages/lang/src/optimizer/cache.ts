/**
 * Cache context class.
 */
export class Context<K, V = void> {
  /**
   * Cache map.
   */
  #cache = new WeakMap<object, Map<K, V | undefined>>();

  /**
   * Determines whether or not the specified key exists in the cache.
   * @param context Context object.
   * @param key Input key.
   * @returns Returns true when the key exists, false otherwise.
   */
  has<X extends object>(context: X, key: K): boolean {
    return !!this.#cache.get(context)?.has(key);
  }

  /**
   * Add the specified value in the cache.
   * @param context Context object.
   * @param key Input key.
   * @param value Input value.
   */
  add<X extends object>(context: X, key: K, value?: V): void {
    const cache = this.#cache.get(context);
    if (!cache) {
      this.#cache.set(context, new Map<K, V | undefined>([[key, value]]));
    } else {
      cache.set(key, value);
    }
  }

  /**
   * Get the specified key from in the cache.
   * @param context Context object.
   * @param key Input key.
   * @returns Returns corresponding key value.
   */
  get<X extends object>(context: X, key: K): V | undefined {
    return this.#cache.get(context)?.get(key);
  }

  /**
   * Delete the specified value from the cache.
   * @param context Context object.
   * @param key Input key.
   */
  delete<X extends object>(context: X, key: K): void {
    const cache = this.#cache.get(context);
    if (cache) {
      cache.delete(key);
    }
  }
}
