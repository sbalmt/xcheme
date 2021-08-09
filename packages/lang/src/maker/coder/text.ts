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
   * Get alphabet units.
   * @param alphabet Input alphabet.
   * @returns Returns the alphabet units.
   */
  #getUnits(alphabet: (string | number)[]): (string | number)[] {
    return alphabet.map((unit) => (typeof unit !== 'number' ? String.compose(unit) : unit));
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
            'OptionFlowPattern',
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
  getRoute(value: number, path: string[]): string {
    return this.#getPattern('SetValueRoute', value, ...this.#getUnits(path));
  }

  /**
   * Get a new skip pattern.
   * @param routes Skip routes.
   * @returns Returns the pattern.
   */
  getSkip(...patterns: string[]): string {
    return this.#getPattern('EmitTokenPattern', Core.BaseSource.Output, this.#getPattern('MapFlowPattern', ...patterns));
  }

  /**
   * Get a new token pattern.
   * @param value Token value.
   * @param patterns Token patterns.
   * @returns Returns the pattern.
   */
  getToken(value: string | number, ...patterns: string[]): string {
    return this.#getPattern('EmitTokenPattern', value, ...patterns);
  }

  /**
   * Get a new node pattern.
   * @param value Node value.
   * @param output Output node direction.
   * @param patterns Node patterns.
   * @returns Returns the pattern.
   */
  getNode(value: string | number, output: Core.Nodes, ...patterns: string[]): string {
    return this.#getPattern('EmitNodePattern', value, output, ...patterns);
  }

  /**
   * Get a new condition pattern.
   * @param test Test pattern.
   * @param success Success pattern.
   * @param failure Failure pattern.
   * @returns Returns the pattern.
   */
  getCondition(test: string, success: string, failure?: string): string {
    return this.#getPattern('ConditionFlowPattern', ...(failure ? [test, success, failure] : [test, success]));
  }

  /**
   * Get a new choose pattern.
   * @param patterns Possible patterns.
   * @returns Returns the pattern.
   */
  getChoose(...patterns: string[]): string {
    return this.#getPattern('ChooseFlowPattern', ...patterns);
  }

  /**
   * Should be implemented to return a choose alphabet pattern.
   * @param alphabet Possible alphabet.
   * @returns Should return the pattern.
   */
  getChooseAlphabet(alphabet: (string | number)[]): string {
    return this.#getPattern('ChooseUnitPattern', ...this.#getUnits(alphabet));
  }

  /**
   * Get a new expect pattern.
   * @param patterns Expected patterns.
   * @returns Returns the pattern.
   */
  getExpect(...patterns: string[]): string {
    return this.#getPattern('ExpectFlowPattern', ...patterns);
  }

  /**
   * Get a new expect alphabet pattern.
   * @param alphabet Expected alphabet.
   * @returns Returns the pattern.
   */
  getExpectAlphabet(alphabet: (string | number)[]): string {
    return this.#getPattern('ExpectUnitPattern', ...this.#getUnits(alphabet));
  }

  /**
   * Get a new negate pattern.
   * @param patterns Expected patterns.
   * @returns Returns the pattern.
   */
  getNegate(...patterns: string[]): string {
    return this.#getPattern('NegateFlowPattern', ...patterns);
  }

  /**
   * get a new option pattern.
   * @param patterns Optional patterns.
   * @returns Returns the pattern.
   */
  getOption(...patterns: string[]): string {
    return this.#getPattern('OptionFlowPattern', ...patterns);
  }

  /**
   * Get a new repeat pattern.
   * @param patterns Expected patterns.
   * @returns Returns the pattern.
   */
  getRepeat(...patterns: string[]): string {
    return this.#getPattern('RepeatFlowPattern', ...patterns);
  }

  /**
   * Get a new pivot node pattern.
   * @param value Node value.
   * @param pivot Pivot pattern.
   * @param patterns Expected patterns.
   * @returns Returns the pattern.
   */
  getPivotNode(value: string | number, pivot: string, ...patterns: string[]): string {
    return this.#getPattern('PivotNodePattern', value, Core.Nodes.Right, Core.Nodes.Left, pivot, ...patterns);
  }

  /**
   * Get a new place node pattern.
   * @param current Current node destination.
   * @param patterns Expected patterns.
   * @returns Returns the pattern.
   */
  getPlaceNode(current: Core.Nodes, ...patterns: string[]): string {
    return this.#getPattern('PlaceNodePattern', current, ...patterns);
  }

  /**
   * Get a new append node pattern.
   * @param value Node value.
   * @param current Current node destination.
   * @param head Head pattern.
   * @param patterns Optional patterns.
   * @returns Returns the pattern.
   */
  getAppendNode(value: string | number, current: Core.Nodes, head: string, ...patterns: string[]): string {
    return this.#getPattern('AppendNodePattern', value, Core.Nodes.Right, current, head, ...patterns);
  }

  /**
   * Get a new prepend node pattern.
   * @param value Node value.
   * @param current Current node destination.
   * @param head Head pattern.
   * @param patterns Optional patterns.
   * @returns Returns the pattern.
   */
  getPrependNode(value: string | number, current: Core.Nodes, head: string, ...patterns: string[]): string {
    return this.#getPattern('PrependNodePattern', value, Core.Nodes.Right, current, head, ...patterns);
  }

  /**
   * Get a new symbol pattern.
   * @param value Symbol value.
   * @param symbol Symbol pattern.
   * @param patterns Expected patterns.
   * @returns Returns the pattern.
   */
  getSymbol(value: string | number, symbol: string, ...patterns: string[]): string {
    return this.#getPattern('EmitSymbolPattern', value, symbol, ...patterns);
  }

  /**
   * Get a new scope symbol pattern.
   * @param patterns Expected patterns.
   * @returns Returns the pattern.
   */
  getScopeSymbol(...patterns: string[]): string {
    return this.#getPattern('ScopeSymbolPattern', ...patterns);
  }

  /**
   * Get a new reference pattern.
   * @param entries Pointer entries.
   * @param name Reference name.
   * @returns Returns the pattern.
   */
  getReference(entries: Entries.Aggregator, name: string): string {
    if (!entries.has(name)) {
      return this.#getPattern('RunFlowPattern', `() => ${name}`);
    }
    return name;
  }

  /**
   * Get a new any pattern.
   * @returns Returns the pattern.
   */
  getAny(): string {
    return this.#getPattern('AnyUnitPattern');
  }

  /**
   * Get a new range pattern.
   * @param from From alphabet value.
   * @param to To alphabet value.
   * @returns Returns the pattern.
   */
  getRange(from: string | number, to: string | number): string {
    return this.#getPattern('RangeUnitPattern', ...this.#getUnits([from, to]));
  }

  /**
   * Get a new alphabet pattern.
   * @param alphabet Input alphabet.
   * @returns Returns the alphabet pattern.
   */
  getAlphabet(alphabet: (string | number)[]): string {
    return this.#getPattern('ExpectUnitPattern', ...this.#getUnits(alphabet));
  }
}
