import * as Core from '@xcheme/core';

import * as Entries from '../../core/entries';

import { Base } from './base';

/**
 * Reference entry type.
 */
type ReferenceEntry = {
  /**
   * Reference name.
   */
  name: string;
  /**
   * Reference pattern.
   */
  pattern: Core.Pattern;
};

/**
 * Generate a project output for running in memory.
 */
export class Live extends Base {
  /**
   * Get a new entry pattern.
   * @param name Entry name.
   * @param references Entry references.
   * @param patterns Entry patterns.
   * @returns Returns the pattern.
   */
  getEntry(name: string, references: ReferenceEntry[], patterns: Core.Pattern[]): Core.Pattern {
    return new Core.ExpectFlowPattern(
      new Core.OptFlowPattern(new Core.RepeatFlowPattern(new Core.ChooseFlowPattern(...patterns))),
      new Core.EndFlowPattern()
    );
  }

  /**
   * Get a new route.
   * @param path Route path.
   * @param value Optional route value.
   * @param pattern Optional route pattern.
   * @returns Returns the route.
   */
  getRoute(path: (string | number)[], value?: number, pattern?: Core.Pattern): Core.Route {
    if (value !== void 0) {
      if (pattern !== void 0) {
        return new Core.SetValueRoute(value, pattern, ...path);
      }
      return new Core.SetValueRoute(value, path[0], ...path.slice(1));
    }
    if (pattern !== void 0) {
      return new Core.FlowRoute(pattern, path[0], ...path.slice(1));
    }
    return new Core.UnitRoute(path[0], ...path.slice(1));
  }

  /**
   * Get a new map pattern.
   * @param routes Map routes.
   * @returns Returns the pattern.
   */
  emitMapPattern(...routes: Core.Route[]): Core.Pattern {
    return new Core.MapFlowPattern(...routes);
  }

  /**
   * Get a new token pattern.
   * @param identity Token identity.
   * @param patterns Expected patterns.
   * @returns Returns the pattern.
   */
  emitTokenPattern(identity: string | number, ...patterns: Core.Pattern[]): Core.Pattern {
    return new Core.EmitTokenPattern(identity, ...patterns);
  }

  /**
   * Get a new node pattern.
   * @param identity Node identity.
   * @param output Output node direction.
   * @param patterns Expected patterns.
   * @returns Returns the pattern.
   */
  emitNodePattern(identity: string | number, output: Core.Nodes, ...patterns: Core.Pattern[]): Core.Pattern {
    return new Core.EmitNodePattern(identity, output, ...patterns);
  }

  /**
   * Get a new identity pattern for dynamic directives.
   * @param identity New identity.
   * @param patterns Expected patterns.
   * @returns Returns the pattern.
   */
  emitIdentityPattern(identity: string | number, ...patterns: Core.Pattern[]): Core.Pattern {
    return new Core.SetValuePattern(identity, ...patterns);
  }

  /**
   * Get a new condition pattern.
   * @param test Test pattern.
   * @param success Success pattern.
   * @param failure Failure pattern.
   * @returns Returns the pattern.
   */
  emitConditionPattern(test: Core.Pattern, success: Core.Pattern, failure?: Core.Pattern): Core.Pattern {
    return new Core.ConditionFlowPattern(test, success, failure);
  }

  /**
   * Get a new choose pattern.
   * @param patterns Possible patterns.
   * @returns Returns the pattern.
   */
  emitChoosePattern(...patterns: Core.Pattern[]): Core.Pattern {
    return new Core.ChooseFlowPattern(...patterns);
  }

  /**
   * Get a new choose units pattern.
   * @param units Possible units.
   * @returns Returns the pattern.
   */
  emitChooseUnitsPattern(units: (string | number)[]): Core.Pattern {
    return new Core.ChooseUnitPattern(...units);
  }

  /**
   * Get a new expect pattern.
   * @param patterns Expected patterns.
   * @returns Returns the pattern.
   */
  emitExpectPattern(...patterns: Core.Pattern[]): Core.Pattern {
    return new Core.ExpectFlowPattern(...patterns);
  }

  /**
   * Get a new expect units pattern.
   * @param units Expected units.
   * @returns Returns the pattern.
   */
  emitExpectUnitsPattern(units: (string | number)[]): Core.Pattern {
    return new Core.ExpectUnitPattern(...units);
  }

  /**
   * Get a new not pattern.
   * @param patterns Expected patterns.
   * @returns Returns the pattern.
   */
  emitNotPattern(...patterns: Core.Pattern[]): Core.Pattern {
    return new Core.NotFlowPattern(...patterns);
  }

  /**
   * get a new opt pattern.
   * @param patterns Optional patterns.
   * @returns Returns the pattern.
   */
  emitOptPattern(...patterns: Core.Pattern[]): Core.Pattern {
    return new Core.OptFlowPattern(...patterns);
  }

  /**
   * Get a new repeat pattern.
   * @param patterns Expected patterns.
   * @returns Returns the pattern.
   */
  emitRepeatPattern(...patterns: Core.Pattern[]): Core.Pattern {
    return new Core.RepeatFlowPattern(...patterns);
  }

  /**
   * Get a new place node pattern.
   * @param current Current node destination.
   * @param patterns Expected patterns.
   * @returns Returns the pattern.
   */
  emitPlacePattern(current: Core.Nodes, ...patterns: Core.Pattern[]): Core.Pattern {
    return new Core.PlaceNodePattern(current, ...patterns);
  }

  /**
   * Get a new append node pattern.
   * @param identity Node identity.
   * @param current Current node destination.
   * @param head Head pattern.
   * @param patterns Optional patterns.
   * @returns Returns the pattern.
   */
  emitAppendPattern(identity: string | number, current: Core.Nodes, head: Core.Pattern, ...patterns: Core.Pattern[]): Core.Pattern {
    return new Core.AppendNodePattern(identity, Core.Nodes.Right, current, head, ...patterns);
  }

  /**
   * Get a new prepend node pattern.
   * @param identity Node identity.
   * @param current Current node destination.
   * @param head Head pattern.
   * @param patterns Optional patterns.
   * @returns Returns the pattern.
   */
  emitPrependPattern(identity: string | number, current: Core.Nodes, head: Core.Pattern, ...patterns: Core.Pattern[]): Core.Pattern {
    return new Core.PrependNodePattern(identity, Core.Nodes.Right, current, head, ...patterns);
  }

  /**
   * Get a new pivot node pattern.
   * @param identity Node identity.
   * @param pivot Pivot pattern.
   * @param patterns Expected patterns.
   * @returns Returns the pattern.
   */
  emitPivotPattern(identity: string | number, pivot: Core.Pattern, ...patterns: Core.Pattern[]): Core.Pattern {
    return new Core.PivotNodePattern(identity, Core.Nodes.Right, Core.Nodes.Left, pivot, ...patterns);
  }

  /**
   * Get a new symbol pattern.
   * @param identity Symbol identity.
   * @param symbol Symbol pattern.
   * @param patterns Expected patterns.
   * @returns Returns the pattern.
   */
  emitSymbolPattern(identity: string | number, symbol: Core.Pattern, ...patterns: Core.Pattern[]): Core.Pattern {
    return new Core.EmitSymbolPattern(identity, symbol, ...patterns);
  }

  /**
   * Get a new symbol scope pattern.
   * @param patterns Expected patterns.
   * @returns Returns the pattern.
   */
  emitScopePattern(...patterns: Core.Pattern[]): Core.Pattern {
    return new Core.ScopeSymbolPattern(...patterns);
  }

  /**
   * Get a new error pattern.
   * @param value Error value.
   * @param patterns Expected patterns.
   * @returns Returns the pattern.
   */
  emitErrorPattern(value: number, ...patterns: Core.Pattern[]): Core.Pattern {
    return new Core.EmitErrorPattern(value, ...patterns);
  }

  /**
   * Get a new has pattern.
   * @param state Expected state value.
   * @param patterns Expected patterns.
   * @returns Returns the pattern.
   */
  emiHasPattern(state: number, ...patterns: Core.Pattern[]): Core.Pattern {
    return new Core.HasStatePattern(state, ...patterns);
  }

  /**
   * Get a new set pattern.
   * @param state New state value.
   * @param patterns Expected patterns.
   * @returns Returns the pattern.
   */
  emitSetPattern(state: number, ...patterns: Core.Pattern[]): Core.Pattern {
    return new Core.SetStatePattern(state, ...patterns);
  }

  /**
   * Get a new reference pattern.
   * @param entries Pointer entries.
   * @param identifier Reference identifier.
   * @returns Returns the pattern.
   */
  emitReferencePattern(entries: Entries.Aggregator, identifier: string): Core.Pattern {
    const entry = entries.get(identifier)!;
    if (!entry.pattern) {
      return new Core.RunFlowPattern(() => entries.get(identifier)!.pattern as Core.Pattern);
    }
    return entry.pattern as Core.Pattern;
  }

  /**
   * Get a new any pattern.
   * @returns Returns the pattern.
   */
  emitAnyPattern(): Core.Pattern {
    return new Core.AnyUnitPattern();
  }

  /**
   * Get a new range pattern.
   * @param from From unit value.
   * @param to To unit value.
   * @returns Returns the pattern.
   */
  emitRangePattern(from: string | number, to: string | number): Core.Pattern {
    return new Core.RangeUnitPattern(from, to);
  }
}
