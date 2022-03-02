import * as Core from '@xcheme/core';

import * as String from '../../core/string';
import * as Symbols from '../symbols';

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
  pattern: string;
};

/**
 * Can generate a project output to be saved as a JavaScript source.
 */
export class Text extends Base {
  /**
   * Get a formatted identifier based on the given input.
   * @param identifier Input identifier.
   * @returns Returns the formatted identifier.
   */
  #getIdentifier(identifier: string): string {
    return identifier.replace(/[^a-zA-Z0-9]+/g, '_');
  }

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
   * Get a new reference.
   * @param reference Reference entry.
   * @returns Returns the reference.
   */
  #getReference(reference: Reference): string {
    return `const ${this.#getIdentifier(reference.name)} = ${reference.pattern};`;
  }

  /**
   * Get a new export entry.
   * @param identifier Export entry identifier.
   * @param pattern Export entry pattern.
   * @returns Returns the export entry.
   */
  #getExportEntry(identifier: string, pattern: string): string {
    return `exports.${identifier} = ${pattern};`;
  }

  /**
   * Get a new entry pattern.
   * @param identifier Entry identifier.
   * @param references Entry references.
   * @param patterns Entry patterns.
   * @returns Returns the pattern.
   */
  getEntry(identifier: string, references: Reference[], patterns: string[]): string {
    const deps = references.map((entry) => this.#getReference(entry));
    return (
      deps.join('') +
      this.#getExportEntry(
        identifier,
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
   * @param path Route path.
   * @param value Optional route value.
   * @param pattern Optional route pattern.
   * @returns Returns the route.
   */
  getRoute(path: (string | number)[], value?: number, pattern?: string): string {
    if (value !== void 0) {
      if (pattern) {
        return this.#getPattern('SetValueRoute', value, pattern, ...this.#getUnits(path));
      }
      return this.#getPattern('SetValueRoute', value, ...this.#getUnits(path));
    }
    if (pattern) {
      return this.#getPattern('FlowRoute', pattern, ...this.#getUnits(path));
    }
    return this.#getPattern('UnitRoute', ...this.#getUnits(path));
  }

  /**
   * Get a new map pattern.
   * @param routes Map routes.
   * @returns Returns the pattern.
   */
  emitMapPattern(...routes: string[]): string {
    return this.#getPattern('MapFlowPattern', ...routes);
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
   * Get a new identity pattern for dynamic directives.
   * @param identity New identity.
   * @param patterns Expected patterns.
   * @returns Returns the pattern.
   */
  emitIdentityPattern(identity: string | number, ...patterns: string[]): string {
    return this.#getPattern('SetValuePattern', identity, ...patterns);
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
  emitHasPattern(state: number, ...patterns: string[]): string {
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
   * Get a new uncase pattern.
   * @param patterns Expected patterns.
   * @returns Returns the pattern.
   */
  emitUncasePattern(...patterns: string[]): string {
    return this.#getPattern('UncaseTransformPattern', ...patterns);
  }

  /**
   * Get a new peek pattern.
   * @param patterns Expected patterns.
   * @returns Returns the pattern.
   */
  emitPeekPattern(...patterns: string[]): string {
    return this.#getPattern('PeekFlowPattern', ...patterns);
  }

  /**
   * Get a new reference pattern.
   * @param record Referenced record.
   * @returns Returns the pattern.
   */
  emitReferencePattern(record: Core.Record): string {
    const data = record.data;
    if (!data.pattern) {
      return this.#getPattern('RunFlowPattern', `() => ${this.#getIdentifier(data.name)}`);
    } else if (Symbols.isReferencedBy(record, data.type)) {
      return this.#getIdentifier(data.name);
    } else {
      return data.pattern as string;
    }
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
}
