import { Exception } from '../exception';

/**
 * Stack node type.
 */
type Node<T> = {
  /**
   * Node element.
   */
  element: T;
  /**
   * Previous node.
   */
  previous?: Node<T>;
};

/**
 * Stack collection class.
 */
export class Stack<T> {
  /**
   * First stack node.
   */
  #node: Node<T> | undefined;

  /**
   * Stack size.
   */
  #size = 0;

  /**
   * Get the stack size.
   */
  get size(): number {
    return this.#size;
  }

  /**
   * Get the current element on top of stack.
   */
  get current(): T | undefined {
    return this.#node?.element;
  }

  /**
   * Appends a new element into stack.
   * @param element New element.
   */
  push(element: T): void {
    this.#node = { element, previous: this.#node };
    this.#size++;
  }

  /**
   * Remove the last element from stack.
   * @throw Throws a new exception when there's no element to pop.
   * @returns Returns the removed element.
   */
  pop(): T {
    if (!this.#node) {
      throw new Exception('Empty stack.');
    }
    const { element } = this.#node;
    this.#node = this.#node.previous;
    this.#size--;
    return element;
  }
}
