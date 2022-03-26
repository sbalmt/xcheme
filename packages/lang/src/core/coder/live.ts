import * as Core from '@xcheme/core';

import * as Types from '../types';

import { Base } from './base';

/**
 * Reference entry type.
 */
type Reference = {
  /**
   * Reference name.
   */
  name: string;
  /**
   * Reference pattern.
   */
  pattern: Types.Pattern;
};

/**
 * Generate a project output for running in memory.
 */
export class Live extends Base {
  /**
   * Get a new entry pattern.
   * @param identifier Entry identifier.
   * @param references Entry references.
   * @param patterns Entry patterns.
   * @returns Returns the pattern.
   */
  getEntry(identifier: string, references: Reference[], patterns: Types.Pattern[]): Types.Pattern {
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
  getRoute(path: (string | number)[], value?: number, pattern?: Types.Pattern): Types.Route {
    const [test, ...remaining] = path;
    if (value) {
      if (pattern) {
        return new Core.SetValueRoute(value, pattern, ...path);
      }
      return new Core.SetValueRoute(value, test, ...remaining);
    }
    if (pattern) {
      return new Core.FlowRoute(pattern, test, ...remaining);
    }
    return new Core.UnitRoute(test, ...remaining);
  }

  /**
   * Get a new map pattern.
   * @param routes Map routes.
   * @returns Returns the pattern.
   */
  emitMapPattern(...routes: Types.Route[]): Types.Pattern {
    return new Core.MapFlowPattern(...routes);
  }

  /**
   * Get a new token pattern.
   * @param identity Token identity.
   * @param patterns Expected patterns.
   * @returns Returns the pattern.
   */
  emitTokenPattern(identity: number, ...patterns: Types.Pattern[]): Types.Pattern {
    return new Core.EmitTokenPattern(identity, ...patterns);
  }

  /**
   * Get a new node pattern.
   * @param identity Node identity.
   * @param output Output node direction.
   * @param patterns Expected patterns.
   * @returns Returns the pattern.
   */
  emitNodePattern(identity: number, output: Core.Nodes, ...patterns: Types.Pattern[]): Types.Pattern {
    return new Core.EmitNodePattern(identity, output, ...patterns);
  }

  /**
   * Get a new identity pattern for dynamic directives.
   * @param identity New identity.
   * @param patterns Expected patterns.
   * @returns Returns the pattern.
   */
  emitIdentityPattern(identity: number, ...patterns: Types.Pattern[]): Types.Pattern {
    return new Core.UseValuePattern(identity, ...patterns);
  }

  /**
   * Get a new condition pattern.
   * @param test Test pattern.
   * @param success Success pattern.
   * @param failure Failure pattern.
   * @returns Returns the pattern.
   */
  emitConditionPattern(test: Types.Pattern, success: Types.Pattern, failure?: Types.Pattern): Types.Pattern {
    return new Core.ConditionFlowPattern(test, success, failure);
  }

  /**
   * Get a new choose pattern.
   * @param patterns Possible patterns.
   * @returns Returns the pattern.
   */
  emitChoosePattern(...patterns: Types.Pattern[]): Types.Pattern {
    return new Core.ChooseFlowPattern(...patterns);
  }

  /**
   * Get a new choose units pattern.
   * @param units Possible units.
   * @returns Returns the pattern.
   */
  emitChooseUnitsPattern(units: (string | number)[]): Types.Pattern {
    return new Core.ChooseUnitPattern(...units);
  }

  /**
   * Get a new expect pattern.
   * @param patterns Expected patterns.
   * @returns Returns the pattern.
   */
  emitExpectPattern(...patterns: Types.Pattern[]): Types.Pattern {
    return new Core.ExpectFlowPattern(...patterns);
  }

  /**
   * Get a new expect units pattern.
   * @param units Expected units.
   * @returns Returns the pattern.
   */
  emitExpectUnitsPattern(units: (string | number)[]): Types.Pattern {
    return new Core.ExpectUnitPattern(...units);
  }

  /**
   * Get a new not pattern.
   * @param patterns Expected patterns.
   * @returns Returns the pattern.
   */
  emitNotPattern(...patterns: Types.Pattern[]): Types.Pattern {
    return new Core.NotFlowPattern(...patterns);
  }

  /**
   * get a new opt pattern.
   * @param patterns Optional patterns.
   * @returns Returns the pattern.
   */
  emitOptPattern(...patterns: Types.Pattern[]): Types.Pattern {
    return new Core.OptFlowPattern(...patterns);
  }

  /**
   * Get a new repeat pattern.
   * @param patterns Expected patterns.
   * @returns Returns the pattern.
   */
  emitRepeatPattern(...patterns: Types.Pattern[]): Types.Pattern {
    return new Core.RepeatFlowPattern(...patterns);
  }

  /**
   * Get a new place node pattern.
   * @param current Current node destination.
   * @param patterns Expected patterns.
   * @returns Returns the pattern.
   */
  emitPlacePattern(current: Core.Nodes, ...patterns: Types.Pattern[]): Types.Pattern {
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
  emitAppendPattern(
    identity: number,
    current: Core.Nodes,
    head: Types.Pattern,
    ...patterns: Types.Pattern[]
  ): Types.Pattern {
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
  emitPrependPattern(
    identity: number,
    current: Core.Nodes,
    head: Types.Pattern,
    ...patterns: Types.Pattern[]
  ): Types.Pattern {
    return new Core.PrependNodePattern(identity, Core.Nodes.Right, current, head, ...patterns);
  }

  /**
   * Get a new pivot node pattern.
   * @param identity Node identity.
   * @param pivot Pivot pattern.
   * @param patterns Expected patterns.
   * @returns Returns the pattern.
   */
  emitPivotPattern(identity: number, pivot: Types.Pattern, ...patterns: Types.Pattern[]): Types.Pattern {
    return new Core.PivotNodePattern(identity, Core.Nodes.Right, Core.Nodes.Left, pivot, ...patterns);
  }

  /**
   * Get a new symbol pattern.
   * @param identity Symbol identity.
   * @param symbol Symbol pattern.
   * @param patterns Expected patterns.
   * @returns Returns the pattern.
   */
  emitSymbolPattern(identity: number, symbol: Types.Pattern, ...patterns: Types.Pattern[]): Types.Pattern {
    return new Core.EmitSymbolPattern(identity, symbol, ...patterns);
  }

  /**
   * Get a new symbol scope pattern.
   * @param patterns Expected patterns.
   * @returns Returns the pattern.
   */
  emitScopePattern(...patterns: Types.Pattern[]): Types.Pattern {
    return new Core.ScopeSymbolPattern(...patterns);
  }

  /**
   * Get a new error pattern.
   * @param value Error value.
   * @param patterns Expected patterns.
   * @returns Returns the pattern.
   */
  emitErrorPattern(value: number, ...patterns: Types.Pattern[]): Types.Pattern {
    return new Core.EmitErrorPattern(value, ...patterns);
  }

  /**
   * Get a new has pattern.
   * @param state Expected state value.
   * @param patterns Expected patterns.
   * @returns Returns the pattern.
   */
  emitHasPattern(state: number, ...patterns: Types.Pattern[]): Types.Pattern {
    return new Core.HasStatePattern(state, ...patterns);
  }

  /**
   * Get a new set pattern.
   * @param state New state value.
   * @param patterns Expected patterns.
   * @returns Returns the pattern.
   */
  emitSetPattern(state: number, ...patterns: Types.Pattern[]): Types.Pattern {
    return new Core.SetStatePattern(state, ...patterns);
  }

  /**
   * Get a new uncase pattern.
   * @param patterns Expected patterns.
   * @returns Returns the pattern.
   */
  emitUncasePattern(...patterns: Types.Pattern[]): Types.Pattern {
    return new Core.UncaseTransformPattern(...patterns);
  }

  /**
   * Get a new peek pattern.
   * @param patterns Expected patterns.
   * @returns Returns the pattern.
   */
  emitPeekPattern(...patterns: Types.Pattern[]): Types.Pattern {
    return new Core.PeekFlowPattern(...patterns);
  }

  /**
   * Get a new reference pattern.
   * @param record Referenced record.
   * @returns Returns the pattern.
   */
  emitReferencePattern(record: Types.Record): Types.Pattern {
    const data = record.data;
    if (!data.pattern) {
      return new Core.RunFlowPattern(() => data.pattern as Types.Pattern);
    }
    return data.pattern as Types.Pattern;
  }

  /**
   * Get a new any pattern.
   * @returns Returns the pattern.
   */
  emitAnyPattern(): Types.Pattern {
    return new Core.AnyUnitPattern();
  }

  /**
   * Get a new range pattern.
   * @param from From unit value.
   * @param to To unit value.
   * @returns Returns the pattern.
   */
  emitRangePattern(from: string | number, to: string | number): Types.Pattern {
    return new Core.RangeUnitPattern(from, to);
  }
}
