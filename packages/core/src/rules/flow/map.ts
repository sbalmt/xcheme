import type Base from '../../source/base';
import type Route from '../route';

import Pattern from '../pattern';
import Uncase from '../transform/uncase';

/**
 * Internal map node.
 */
type Node = {
  /**
   * Node value.
   */
  value: string | number;
  /**
   * Node pattern.
   */
  pattern?: Pattern | null;
  /**
   * Left child node.
   */
  left?: Node;
  /**
   * Right child node.
   */
  right?: Node;
  /**
   * Next child node.
   */
  next?: Node;
};

/**
 * Consume the first route that match in the list of routes given for this pattern.
 */
export default class Map extends Pattern {
  /**
   * Root node.
   */
  #root: Node | undefined;

  /**
   * Compare the given inputs and returns the difference between both of them.
   * @param a Input A.
   * @param b Input B.
   * @returns Returns less than zero when input A is less than input B.
   *          Returns greater than zero when input A is greater than input B.
   *          Returns zero when input A is equals to input B.
   */
  #compare(a: string | number, b: string | number): number {
    const x = typeof a === 'string' ? a.charCodeAt(0) : a;
    const y = typeof b === 'string' ? b.charCodeAt(0) : b;
    return x - y;
  }

  /**
   * Get the node that correspond to the given input units.
   * @param units Input units.
   * @returns Returns the corresponding node or undefined when it wasn't found.
   */
  #getNode(units: (string | number)[]): Node | undefined {
    let current = this.#root;
    let previous: Node | undefined = void 0;
    for (let index = 0; index < units.length; ) {
      if (!current) {
        return void 0;
      }
      const unit = Uncase.transform(units[index]);
      const diff = this.#compare(current.value, unit);
      if (diff < 0) {
        current = current.left;
      } else if (diff > 0) {
        current = current.right;
      } else {
        previous = current;
        current = current.next;
        index++;
      }
    }
    return previous;
  }

  /**
   * Set a new node based on the given input units.
   * @param units Input units.
   * @returns Returns the terminal node or undefined when the given units are empty.
   */
  #setNode(units: (string | number)[]): Node {
    let current = this.#root;
    let previous = current;
    let selected = current;
    let diff = 0;
    for (let index = 0; index < units.length; ) {
      if (current) {
        const unit = Uncase.transform(units[index]);
        diff = this.#compare(current.value, unit);
        if (diff < 0) {
          previous = current;
          current = current.left;
          continue;
        } else if (diff > 0) {
          previous = current;
          current = current.right;
          continue;
        }
      } else {
        const node = { value: units[index] };
        if (previous) {
          if (diff < 0) {
            previous.left = current = node;
          } else if (diff > 0) {
            previous.right = current = node;
          } else {
            previous.next = current = node;
          }
          diff = 0;
        } else {
          this.#root = previous = current = node;
        }
      }
      selected = current;
      previous = current;
      current = current.next;
      index++;
    }
    return selected!;
  }

  /**
   * Find a node with pattern in the given data source starting from the specified node.
   * @param source Data source.
   * @param current Current node.
   * @returns Returns the corresponding node or undefined when it wasn't found.
   */
  #findNode(source: Base, current: Node | undefined): Node | undefined {
    source.saveState();
    while (current && source.length > 0) {
      const unit = Uncase.transform(source.value);
      const diff = this.#compare(current.value, unit);
      if (diff < 0) {
        current = current.left;
      } else if (diff > 0) {
        current = current.right;
      } else {
        if (current.pattern !== void 0) {
          source.discardState();
          return current;
        }
        source.nextState();
        current = current.next;
      }
    }
    source.restoreState();
    source.discardState();
    return void 0;
  }

  /**
   * Consume the given source and get the longest consumption node.
   * @param source Data source.
   * @returns Returns the consumption node or undefined when the given source doesn't match any route.
   */
  #getLongestConsumptionNode(source: Base): Node | undefined {
    let current = this.#root;
    let longest;
    while ((current = this.#findNode(source, current))) {
      longest = current;
      current = current.next;
      source.nextState();
    }
    return longest;
  }

  /**
   * Default constructor.
   * @param routes List of routes.
   */
  constructor(...routes: Route[]) {
    super();
    for (const route of routes) {
      const node = this.#getNode(route.units) ?? this.#setNode(route.units);
      node.pattern = route.pattern;
    }
  }

  /**
   * Consume the given source.
   * @param source Data source.
   * @returns Returns true when the source was consumed, otherwise returns false.
   */
  consume(source: Base): boolean {
    const node = this.#getLongestConsumptionNode(source);
    if (node) {
      if (node.pattern) {
        return node.pattern.consume(source);
      }
      return true;
    }
    return false;
  }
}
