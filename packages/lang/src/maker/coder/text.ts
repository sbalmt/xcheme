import * as Core from '@xcheme/core';

import * as Entries from '../common/entries';
import * as String from '../common/string';

import { Base } from './base';

/**
 * Pointer entry type.
 */
type PointerEntry = {
  /**
   * Pointer entry name.
   */
  name: string;
  /**
   * Pointer entry pattern.
   */
  pattern: string;
};

/**
 * Can generate a project output to be saved as a JavaScript source.
 */
export class Text extends Base {
  /**
   * Get string units.
   * @param string Input string.
   * @returns Returns the string units.
   */
  #getUnits(string: (string | number)[]): (string | number)[] {
    return string.map((unit) => (typeof unit !== 'number' ? String.compose(unit) : unit));
  }

  /**
   * Get a new pattern.
   * @param name Pattern name.
   * @param params Pattern parameters.
   * @returns Returns the pattern.
   */
  #getPattern(name: string, ...params: (string | number)[]): string {
    return `new Core.${name}(${params.join(', ')})`;
  }

  /**
   * Get a new pointer entry.
   * @param name Pointer entry name.
   * @param pattern Pointer entry pattern.
   * @returns Returns the pointer entry.
   */
  #getPointerEntry(name: string, pattern: string): string {
    return `const ${name} = ${pattern};`;
  }

  /**
   * Get a new export entry.
   * @param name Export entry name.
   * @param pattern Export entry pattern.
   * @returns Returns the export entry.
   */
  #getExportEntry(name: string, pattern: string): string {
    return `exports.${name} = ${pattern};`;
  }

  /**
   * Get a new entry pattern.
   * @param name Entry name.
   * @param pointers Entry pointers.
   * @param patterns Entry patterns.
   * @returns Returns the pattern.
   */
  getEntry(name: string, pointers: PointerEntry[], ...patterns: string[]): string {
    const deps = pointers.map((entry) => this.#getPointerEntry(entry.name, entry.pattern)).join('');
    return (
      deps +
      this.#getExportEntry(
        name,
        this.#getPattern(
          'ExpectFlowPattern',
          this.#getPattern(
            'OptFlowPattern',
            this.#getPattern('RepeatFlowPattern', this.#getPattern('ChooseFlowPattern', ...patterns))
          ),
          this.#getPattern('EndFlowPattern')
        )
      )
    );
  }

  /**
   * Get a new route.
   * @param value Route value.
   * @param path Route path.
   * @returns Returns the route.
   */
  getRoute(value: number, path: (string | number)[]): string {
    return this.#getPattern('SetValueRoute', value, ...this.#getUnits(path));
  }

  /**
   * Get a new map pattern.
   * @param routes Map routes.
   * @returns Returns the pattern.
   */
  emitMapPattern(...routes: string[]): string {
    return this.#getPattern('EmitTokenPattern', Core.BaseSource.Output, this.#getPattern('MapFlowPattern', ...routes));
  }

  /**
   * Get a new token pattern.
   * @param identity Token identity.
   * @param patterns Token patterns.
   * @returns Returns the pattern.
   */
  emitTokenPattern(identity: string | number, ...patterns: string[]): string {
    return this.#getPattern('EmitTokenPattern', identity, ...patterns);
  }

  /**
   * Get a new node pattern.
   * @param identity Node identity.
   * @param output Output node direction.
   * @param patterns Node patterns.
   * @returns Returns the pattern.
   */
  emitNodePattern(identity: string | number, output: Core.Nodes, ...patterns: string[]): string {
    return this.#getPattern('EmitNodePattern', identity, output, ...patterns);
  }

  /**
   * Get a new condition pattern.
   * @param test Test pattern.
   * @param success Success pattern.
   * @param failure Failure pattern.
   * @returns Returns the pattern.
   */
  emitConditionPattern(test: string, success: string, failure?: string): string {
    return this.#getPattern('ConditionFlowPattern', ...(failure ? [test, success, failure] : [test, success]));
  }

  /**
   * Get a new choose pattern.
   * @param patterns Possible patterns.
   * @returns Returns the pattern.
   */
  emitChoosePattern(...patterns: string[]): string {
    return this.#getPattern('ChooseFlowPattern', ...patterns);
  }

  /**
   * Get a new choose units pattern.
   * @param units Possible units.
   * @returns Returns the pattern.
   */
  emitChooseUnitsPattern(units: (string | number)[]): string {
    return this.#getPattern('ChooseUnitPattern', ...this.#getUnits(units));
  }

  /**
   * Get a new expect pattern.
   * @param patterns Expected patterns.
   * @returns Returns the pattern.
   */
  emitExpectPattern(...patterns: string[]): string {
    return this.#getPattern('ExpectFlowPattern', ...patterns);
  }

  /**
   * Get a new expect units pattern.
   * @param units Expected units.
   * @returns Returns the pattern.
   */
  emitExpectUnitsPattern(units: (string | number)[]): string {
    return this.#getPattern('ExpectUnitPattern', ...this.#getUnits(units));
  }

  /**
   * Get a new not pattern.
   * @param patterns Expected patterns.
   * @returns Returns the pattern.
   */
  emitNotPattern(...patterns: string[]): string {
    return this.#getPattern('NotFlowPattern', ...patterns);
  }

  /**
   * get a new opt pattern.
   * @param patterns Optional patterns.
   * @returns Returns the pattern.
   */
  emitOptPattern(...patterns: string[]): string {
    return this.#getPattern('OptFlowPattern', ...patterns);
  }

  /**
   * Get a new repeat pattern.
   * @param patterns Expected patterns.
   * @returns Returns the pattern.
   */
  emitRepeatPattern(...patterns: string[]): string {
    return this.#getPattern('RepeatFlowPattern', ...patterns);
  }

  /**
   * Get a new place node pattern.
   * @param current Current node destination.
   * @param patterns Expected patterns.
   * @returns Returns the pattern.
   */
  emitPlacePattern(current: Core.Nodes, ...patterns: string[]): string {
    return this.#getPattern('PlaceNodePattern', current, ...patterns);
  }

  /**
   * Get a new append node pattern.
   * @param identity Node identity.
   * @param current Current node destination.
   * @param head Head pattern.
   * @param patterns Optional patterns.
   * @returns Returns the pattern.
   */
  emitAppendPattern(identity: string | number, current: Core.Nodes, head: string, ...patterns: string[]): string {
    return this.#getPattern('AppendNodePattern', identity, Core.Nodes.Right, current, head, ...patterns);
  }

  /**
   * Get a new prepend node pattern.
   * @param identity Node identity.
   * @param current Current node destination.
   * @param head Head pattern.
   * @param patterns Optional patterns.
   * @returns Returns the pattern.
   */
  emitPrependPattern(identity: string | number, current: Core.Nodes, head: string, ...patterns: string[]): string {
    return this.#getPattern('PrependNodePattern', identity, Core.Nodes.Right, current, head, ...patterns);
  }

  /**
   * Get a new pivot node pattern.
   * @param identity Node identity.
   * @param pivot Pivot pattern.
   * @param patterns Expected patterns.
   * @returns Returns the pattern.
   */
  emitPivotPattern(identity: string | number, pivot: string, ...patterns: string[]): string {
    return this.#getPattern('PivotNodePattern', identity, Core.Nodes.Right, Core.Nodes.Left, pivot, ...patterns);
  }

  /**
   * Get a new symbol pattern.
   * @param identity Symbol identity.
   * @param symbol Symbol pattern.
   * @param patterns Expected patterns.
   * @returns Returns the pattern.
   */
  emitSymbolPattern(identity: string | number, symbol: string, ...patterns: string[]): string {
    return this.#getPattern('EmitSymbolPattern', identity, symbol, ...patterns);
  }

  /**
   * Get a new symbol scope pattern.
   * @param patterns Expected patterns.
   * @returns Returns the pattern.
   */
  emitScopePattern(...patterns: string[]): string {
    return this.#getPattern('ScopeSymbolPattern', ...patterns);
  }

  /**
   * Get a new error pattern.
   * @param value Error value.
   * @param patterns Expected patterns.
   * @returns Returns the pattern.
   */
  emitErrorPattern(value: number, ...patterns: string[]): string {
    return this.#getPattern('EmitErrorPattern', value, ...patterns);
  }

  /**
   * Get a new has pattern.
   * @param state Expected state value.
   * @param patterns Expected patterns.
   * @returns Returns the pattern.
   */
  emiHasPattern(state: number, ...patterns: string[]): string {
    return this.#getPattern('HasStatePattern', state, ...patterns);
  }

  /**
   * Get a new set pattern.
   * @param state New state value.
   * @param patterns Expected patterns.
   * @returns Returns the pattern.
   */
  emitSetPattern(state: number, ...patterns: string[]): string {
    return this.#getPattern('SetStatePattern', state, ...patterns);
  }

  /**
   * Get a new reference pattern.
   * @param entries Pointer entries.
   * @param name Reference name.
   * @returns Returns the pattern.
   */
  emitReferencePattern(entries: Entries.Aggregator, name: string): string {
    if (!entries.has(name)) {
      return this.#getPattern('RunFlowPattern', `() => ${name}`);
    }
    return name;
  }

  /**
   * Get a new any pattern.
   * @returns Returns the pattern.
   */
  emitAnyPattern(): string {
    return this.#getPattern('AnyUnitPattern');
  }

  /**
   * Get a new range pattern.
   * @param from From unit value.
   * @param to To unit value.
   * @returns Returns the pattern.
   */
  emitRangePattern(from: string | number, to: string | number): string {
    return this.#getPattern('RangeUnitPattern', ...this.#getUnits([from, to]));
  }

  /**
   * Get a new string pattern.
   * @param units Input units.
   * @returns Returns the string pattern.
   */
  emitStringPattern(units: (string | number)[]): string {
    return this.#getPattern('ExpectUnitPattern', ...this.#getUnits(units));
  }
}
