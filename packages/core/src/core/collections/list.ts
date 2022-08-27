import { Exception } from '../exception';

/**
 * List collection class.
 */
export class List<T> implements Iterable<T> {
  /**
   * List of elements.
   */
  #elements: T[];

  /**
   * Default constructor.
   * @param elements Initial list of elements.
   */
  constructor(elements?: T[]) {
    this.#elements = elements ?? [];
  }

  /**
   * Get the list length.
   */
  get length(): number {
    return this.#elements.length;
  }

  /**
   * Try to get the element in the given index.
   * @param index Element index.
   * @returns Return the corresponding element or undefined when the element doesn't exists.
   */
  at(index: number): T | undefined {
    return this.#elements[index];
  }

  /**
   * Determines whether or not there's an element for the given index.
   * @param index Element index.
   * @returns Returns true when the element exists, false otherwise.
   */
  has(index: number): boolean {
    return index > -1 && index < this.#elements.length;
  }

  /**
   * Get the element that corresponds to the given index.
   * @param index Element index.
   * @returns Return the corresponding element.
   * @throws Throws an exception when the element for the given index doesn't exists.
   */
  get(index: number): T {
    const element = this.at(index);
    if (!element) {
      throw new Exception(`Element at index ${index} not found.`);
    }
    return element;
  }

  /**
   * Insert one or mode elements into the list.
   * @param elements New elements.
   */
  insert(...elements: T[]): void {
    this.#elements.push(...elements);
  }

  /**
   * Remove the given element from the list.
   * @param element Element instance.
   * @return Returns true when the element was found and removed, false otherwise.
   */
  remove(element: T): boolean {
    const index = this.#elements.indexOf(element);
    if (index !== -1) {
      return this.#elements.splice(index, 1), true;
    }
    return false;
  }

  /**
   * Swap all contents of the given list.
   * @param list Input list.
   */
  swap(list: List<T>): void {
    [this.#elements, list.#elements] = [list.#elements, this.#elements];
  }

  /**
   * Iterable generator.
   */
  *[Symbol.iterator](): Iterator<T> {
    for (const token of this.#elements) {
      yield token;
    }
  }
}

/**
 * Read-only list collection class.
 */
export class ReadOnlyList<T> implements Iterable<T> {
  /**
   * Target element list.
   */
  #target: List<T>;

  /**
   * Default constructor.
   * @param list Original element list.
   */
  constructor(list: List<T>) {
    this.#target = list;
  }

  /**
   * Get the list length.
   */
  get length(): number {
    return this.#target.length;
  }

  /**
   * Try to get the element in the given index.
   * @param index Element index.
   * @returns Return the corresponding element or undefined when the element doesn't exists.
   */
  at(index: number): T | undefined {
    return this.#target.at(index);
  }

  /**
   * Determines whether or not there's an element for the given index.
   * @param index Element index.
   * @returns Returns true when the element exists, false otherwise.
   */
  has(index: number): boolean {
    return this.#target.has(index);
  }

  /**
   * Get the element that corresponds to the given index.
   * @param index Element index.
   * @returns Return the corresponding element.
   * @throws Throws an exception when the element for the given index doesn't exists.
   */
  get(index: number): T {
    return this.#target.get(index);
  }

  /**
   * Swap all contents of the given list.
   * @param list Input list.
   */
  swap(list: ReadOnlyList<T>): void {
    [this.#target, list.#target] = [list.#target, this.#target];
  }

  /**
   * Iterable generator.
   */
  *[Symbol.iterator](): Iterator<T> {
    for (const token of this.#target) {
      yield token;
    }
  }
}
