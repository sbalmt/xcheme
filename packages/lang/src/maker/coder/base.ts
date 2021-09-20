import * as Core from '@xcheme/core';

import * as Entries from '../../core/entries';

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
   * @param path Route path.
   * @param value Optional route value.
   * @param pattern Optional route pattern.
   * @returns Should return the route.
   */
  getRoute(path: (string | number)[], value?: number, pattern?: PatternEntry): RouteEntry {
    throw "Method doesn't implemented.";
  }

  /**
   * Should be implemented to return a map pattern.
   * @param routes Map routes.
   * @returns Should return the pattern.
   */
  emitMapPattern(...routes: RouteEntry[]): PatternEntry {
    throw "Method doesn't implemented.";
  }

  /**
   * Should be implemented to return a token pattern.
   * @param identity Token identity.
   * @param patterns Expected patterns.
   * @returns Should return the pattern.
   */
  emitTokenPattern(identity: string | number, ...patterns: PatternEntry[]): PatternEntry {
    throw "Method doesn't implemented.";
  }

  /**
   * Should be implemented to return a node pattern.
   * @param identity Node identity.
   * @param output Output node direction.
   * @param patterns Expected patterns.
   * @returns Should return the pattern.
   */
  emitNodePattern(identity: string | number, output: Core.Nodes, ...patterns: PatternEntry[]): PatternEntry {
    throw "Method doesn't implemented.";
  }

  /**
   * Should be implemented to return a condition pattern.
   * @param test Test pattern.
   * @param success Success pattern.
   * @param failure Failure pattern.
   * @returns Should return the pattern.
   */
  emitConditionPattern(test: PatternEntry, success: PatternEntry, failure?: PatternEntry): PatternEntry {
    throw "Method doesn't implemented.";
  }

  /**
   * Should be implemented to return a choose pattern.
   * @param patterns Possible patterns.
   * @returns Should return the pattern.
   */
  emitChoosePattern(...patterns: PatternEntry[]): PatternEntry {
    throw "Method doesn't implemented.";
  }

  /**
   * Should be implemented to return a choose units pattern.
   * @param units Possible units.
   * @returns Should return the pattern.
   */
  emitChooseUnitsPattern(units: (string | number)[]): PatternEntry {
    throw "Method doesn't implemented.";
  }

  /**
   * Should be implemented to return an expect pattern.
   * @param patterns Expected patterns.
   * @returns Should return the pattern.
   */
  emitExpectPattern(...patterns: PatternEntry[]): PatternEntry {
    throw "Method doesn't implemented.";
  }

  /**
   * Should be implemented to return an expect units pattern.
   * @param units Expected units.
   * @returns Should return the pattern.
   */
  emitExpectUnitsPattern(units: (string | number)[]): PatternEntry {
    throw "Method doesn't implemented.";
  }

  /**
   * Should be implemented to return a not pattern.
   * @param patterns Expected patterns.
   * @returns Should return the pattern.
   */
  emitNotPattern(...patterns: PatternEntry[]): PatternEntry {
    throw "Method doesn't implemented.";
  }

  /**
   * Should be implemented to return an opt pattern.
   * @param patterns Optional patterns.
   * @returns Should return the pattern.
   */
  emitOptPattern(...patterns: PatternEntry[]): PatternEntry {
    throw "Method doesn't implemented.";
  }

  /**
   * Should be implemented to return a repeat pattern.
   * @param patterns Expected patterns.
   * @returns Should return the pattern.
   */
  emitRepeatPattern(...patterns: PatternEntry[]): PatternEntry {
    throw "Method doesn't implemented.";
  }

  /**
   * Should be implemented to return a place node pattern.
   * @param current Current node destination.
   * @param patterns Expected patterns.
   * @returns Should return the pattern.
   */
  emitPlacePattern(current: Core.Nodes, ...patterns: PatternEntry[]): PatternEntry {
    throw "Method doesn't implemented.";
  }

  /**
   * Should be implemented to return an append node pattern.
   * @param identity Node identity.
   * @param current Current node destination.
   * @param head Head pattern.
   * @param patterns Optional patterns.
   * @returns Should return the pattern.
   */
  emitAppendPattern(identity: string | number, current: Core.Nodes, head: PatternEntry, ...patterns: PatternEntry[]): PatternEntry {
    throw "Method doesn't implemented.";
  }

  /**
   * Should be implemented to return a prepend node pattern.
   * @param identity Node identity.
   * @param current Current node destination.
   * @param head Head pattern.
   * @param patterns Optional patterns.
   * @returns Should return the pattern.
   */
  emitPrependPattern(identity: string | number, current: Core.Nodes, head: PatternEntry, ...patterns: PatternEntry[]): PatternEntry {
    throw "Method doesn't implemented.";
  }

  /**
   * Should be implemented to return a pivot node pattern.
   * @param identity Node identity.
   * @param head Head pattern.
   * @param patterns Optional patterns.
   * @returns Should return the pattern.
   */
  emitPivotPattern(identity: string | number, pivot: PatternEntry, ...patterns: PatternEntry[]): PatternEntry {
    throw "Method doesn't implemented.";
  }

  /**
   * Should be implemented to return a symbol pattern.
   * @param value Symbol value.
   * @param patterns Expected patterns.
   * @returns Should return the pattern.
   */
  emitSymbolPattern(value: string | number, symbol: PatternEntry, ...patterns: PatternEntry[]): PatternEntry {
    throw "Method doesn't implemented.";
  }

  /**
   * Should be implemented to return a symbol scope pattern.
   * @param patterns Expected patterns.
   * @returns Should return the pattern.
   */
  emitScopePattern(...patterns: PatternEntry[]): PatternEntry {
    throw "Method doesn't implemented.";
  }

  /**
   * Should be implemented to return an error pattern.
   * @param value Error value.
   * @param patterns Expected patterns.
   * @returns Should return the pattern.
   */
  emitErrorPattern(value: number, ...patterns: PatternEntry[]): PatternEntry {
    throw "Method doesn't implemented.";
  }

  /**
   * Should be implemented to return a has pattern.
   * @param state Expected state value.
   * @param patterns Expected patterns.
   * @returns Should return the pattern.
   */
  emiHasPattern(state: number, ...patterns: PatternEntry[]): PatternEntry {
    throw "Method doesn't implemented.";
  }

  /**
   * Should be implemented to return a set pattern.
   * @param state New state value.
   * @param patterns Expected patterns.
   * @returns Should return the pattern.
   */
  emitSetPattern(state: number, ...patterns: PatternEntry[]): PatternEntry {
    throw "Method doesn't implemented.";
  }

  /**
   * Should be implemented to return a reference pattern.
   * @param entries Pointer entries.
   * @param name Reference name.
   * @returns Should return the pattern.
   */
  emitReferencePattern(entries: Entries.Aggregator, name: string): PatternEntry {
    throw "Method doesn't implemented.";
  }

  /**
   * Should be implemented to return an any pattern.
   * @returns Should return the pattern.
   */
  emitAnyPattern(): PatternEntry {
    throw "Method doesn't implemented.";
  }

  /**
   * Should be implemented to return a range pattern.
   * @param from From unit value.
   * @param to To unit value.
   * @returns Should return the pattern.
   */
  emitRangePattern(from: string | number, to: string | number): PatternEntry {
    throw "Method doesn't implemented.";
  }
}
