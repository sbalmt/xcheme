import * as Core from '@xcheme/core';

import * as Entries from '../common/entries';

/**
 * Pattern entry.
 */
export type PatternEntry = string | Core.Pattern;

/**
 * Route entry.
 */
export type RouteEntry = string | Core.Route;

/**
 * Pointer entry.
 */
export type PointerEntry = {
  /**
   * Entry name.
   */
  name: string;
  /**
   * Entry pattern.
   */
  pattern: PatternEntry;
};

/**
 * Common interface for any kind of coder.
 */
export class Base {
  /**
   * Should be implemented to return an entry pattern.
   * @param name Entry name.
   * @param pointers Entry pointers.
   * @param patterns Entry patterns.
   * @returns Should return the pattern.
   */
  getEntry(name: string, pointers: PointerEntry[], ...patterns: PatternEntry[]): PatternEntry {
    throw "Method doesn't implemented.";
  }

  /**
   * Should be implemented to return a route.
   * @param value Route value.
   * @param path Route path.
   * @returns Should return the route.
   */
  getRoute(value: number, path: string[]): RouteEntry {
    throw "Method doesn't implemented.";
  }

  /**
   * Should be implemented to return a skip pattern.
   * @param patterns Skip patterns.
   * @returns Should return the pattern.
   */
  getSkip(...patterns: RouteEntry[]): PatternEntry {
    throw "Method doesn't implemented.";
  }

  /**
   * Should be implemented to return a token pattern.
   * @param value Token value.
   * @param patterns Expected patterns.
   * @returns Should return the pattern.
   */
  getToken(value: string | number, ...patterns: PatternEntry[]): PatternEntry {
    throw "Method doesn't implemented.";
  }

  /**
   * Should be implemented to return a node pattern.
   * @param value Node value.
   * @param output Output node direction.
   * @param patterns Expected patterns.
   * @returns Should return the pattern.
   */
  getNode(value: string | number, output: Core.Nodes, ...patterns: PatternEntry[]): PatternEntry {
    throw "Method doesn't implemented.";
  }

  /**
   * Should be implemented to return a condition pattern.
   * @param test Test pattern.
   * @param success Success pattern.
   * @param failure Failure pattern.
   * @returns Should return the pattern.
   */
  getCondition(test: PatternEntry, success: PatternEntry, failure?: PatternEntry): PatternEntry {
    throw "Method doesn't implemented.";
  }

  /**
   * Should be implemented to return a choose pattern.
   * @param patterns Possible patterns.
   * @returns Should return the pattern.
   */
  getChoose(...patterns: PatternEntry[]): PatternEntry {
    throw "Method doesn't implemented.";
  }

  /**
   * Should be implemented to return a choose alphabet pattern.
   * @param alphabet Possible alphabet.
   * @returns Should return the pattern.
   */
  getChooseAlphabet(alphabet: (string | number)[]): PatternEntry {
    throw "Method doesn't implemented.";
  }

  /**
   * Should be implemented to return an expect pattern.
   * @param patterns Expected patterns.
   * @returns Should return the pattern.
   */
  getExpect(...patterns: PatternEntry[]): PatternEntry {
    throw "Method doesn't implemented.";
  }

  /**
   * Should be implemented to return an expect unit pattern.
   * @param alphabet Expected alphabet.
   * @returns Should return the pattern.
   */
  getExpectAlphabet(alphabet: (string | number)[]): PatternEntry {
    throw "Method doesn't implemented.";
  }

  /**
   * Should be implemented to return a negate pattern.
   * @param patterns Expected patterns.
   * @returns Should return the pattern.
   */
  getNegate(...patterns: PatternEntry[]): PatternEntry {
    throw "Method doesn't implemented.";
  }

  /**
   * Should be implemented to return an option pattern.
   * @param patterns Optional patterns.
   * @returns Should return the pattern.
   */
  getOption(...patterns: PatternEntry[]): PatternEntry {
    throw "Method doesn't implemented.";
  }

  /**
   * Should be implemented to return a repeat pattern.
   * @param patterns Expected patterns.
   * @returns Should return the pattern.
   */
  getRepeat(...patterns: PatternEntry[]): PatternEntry {
    throw "Method doesn't implemented.";
  }

  /**
   * Should be implemented to return a place node pattern.
   * @param current Current node destination.
   * @param patterns Expected patterns.
   * @returns Should return the pattern.
   */
  getPlaceNode(current: Core.Nodes, ...patterns: PatternEntry[]): PatternEntry {
    throw "Method doesn't implemented.";
  }

  /**
   * Should be implemented to return a pivot node pattern.
   * @param value Node value.
   * @param head Head pattern.
   * @param patterns Optional patterns.
   * @returns Should return the pattern.
   */
  getPivotNode(value: string | number, pivot: PatternEntry, ...patterns: PatternEntry[]): PatternEntry {
    throw "Method doesn't implemented.";
  }

  /**
   * Should be implemented to return an append node pattern.
   * @param value Node value.
   * @param current Current node destination.
   * @param head Head pattern.
   * @param patterns Optional patterns.
   * @returns Should return the pattern.
   */
  getAppendNode(value: string | number, current: Core.Nodes, head: PatternEntry, ...patterns: PatternEntry[]): PatternEntry {
    throw "Method doesn't implemented.";
  }

  /**
   * Should be implemented to return a prepend node pattern.
   * @param value Node value.
   * @param current Current node destination.
   * @param head Head pattern.
   * @param patterns Optional patterns.
   * @returns Should return the pattern.
   */
  getPrependNode(value: string | number, current: Core.Nodes, head: PatternEntry, ...patterns: PatternEntry[]): PatternEntry {
    throw "Method doesn't implemented.";
  }

  /**
   * Should be implemented to return a symbol pattern.
   * @param value Symbol value.
   * @param patterns Expected patterns.
   * @returns Should return the pattern.
   */
  getSymbol(value: string | number, symbol: PatternEntry, ...patterns: PatternEntry[]): PatternEntry {
    throw "Method doesn't implemented.";
  }

  /**
   * Should be implemented to return a scope symbol pattern.
   * @param patterns Expected patterns.
   * @returns Should return the pattern.
   */
  getScopeSymbol(...patterns: PatternEntry[]): PatternEntry {
    throw "Method doesn't implemented.";
  }

  /**
   * Should be implemented to return a reference pattern.
   * @param entries Pointer entries.
   * @param name Reference name.
   * @returns Should return the pattern.
   */
  getReference(entries: Entries.Aggregator, name: string): PatternEntry {
    throw "Method doesn't implemented.";
  }

  /**
   * Should be implemented to return an any pattern.
   * @returns Should return the pattern.
   */
  getAny(): PatternEntry {
    throw "Method doesn't implemented.";
  }

  /**
   * Should be implemented to return a range pattern.
   * @param from From the alphabet value.
   * @param to To alphabet value.
   * @returns Should return the pattern.
   */
  getRange(from: string | number, to: string | number): PatternEntry {
    throw "Method doesn't implemented.";
  }

  /**
   * Should be implemented to return an alphabet pattern.
   * @param alphabet Input alphabet.
   * @returns Should return the pattern.
   */
  getAlphabet(alphabet: (string | number)[]): PatternEntry {
    throw "Method doesn't implemented.";
  }
}
