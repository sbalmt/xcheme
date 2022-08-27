import * as Core from '@xcheme/core';
import * as Parser from '@xcheme/parser';

import * as Coder from './coder/base';
import * as Records from './records';
import * as Counter from './counter';
import * as Symbols from './symbols';
import * as Types from './types';

/**
 * Project options.
 */
export type Options = {
  /**
   * Initial number for implicit identities.
   */
  identity?: number;
  /**
   * Determines the project's root directory.
   */
  directory?: string;
  /**
   * Callback for loading the imported file contents.
   */
  loadFileHook?: (file: string) => string | undefined;
};

/**
 * Project context.
 */
export class Context {
  /**
   * Global project counter.
   */
  static #project = new Counter.Context();

  /**
   * Global identity counter.
   */
  static #identity = new Counter.Context();

  /**
   * Project Id.
   */
  #id: number;

  /**
   * Project name.
   */
  #name: string;

  /**
   * Project coder.
   */
  #coder: Coder.Base;

  /**
   * Project options.
   */
  #options: Options;

  /**
   * Project symbols.
   */
  #symbols = new Symbols.Aggregator();

  /**
   * Project logs.
   */
  #logs = new Core.LogList();

  /**
   * Get an array of records that corresponds to the specified record type.
   * @param types Record types.
   * @returns Returns an array containing all the corresponding records.
   */
  #getRecordsByType(...types: Parser.Symbols[]): Types.SymbolRecord[] {
    const list = [];
    for (const record of this.#symbols) {
      if (types.includes(record.value as Parser.Symbols)) {
        list.push(record);
      }
    }
    return list;
  }

  /**
   * Get an array of records (including all sub record) that corresponds to the specified record type.
   * @param records Record list.
   * @param types Record types.
   * @returns Returns an array containing all the corresponding records.
   */
  #getFlattenRecordsByType(records: Types.SymbolRecord[], ...types: Parser.Symbols[]): Types.SymbolRecord[] {
    const list: Types.SymbolRecord[] = [];
    const cache = new Set<string>();
    const action = (records: Types.SymbolRecord[]): void => {
      for (const record of records) {
        const { identifier, location } = record.data;
        const address = `${location}:${identifier}`;
        if (!cache.has(address)) {
          cache.add(address);
          action(record.data.dependencies);
          if (types.includes(record.value as Parser.Symbols)) {
            list.push(record);
          }
        }
      }
    };
    action(records);
    return list;
  }

  /**
   * Get an array of sorted records based on its respecting order.
   * @param record Record list.
   * @returns Returns an array containing the sorted records.
   */
  #getSortedRecords(record: Types.SymbolRecord[]): Types.SymbolRecord[] {
    return record.sort((a, b) => {
      return a.data.order <= b.data.order ? -1 : 1;
    });
  }

  /**
   * Get an array of references from the specified records.
   * @param records Record list.
   * @returns Returns an array containing all the references.
   */
  #getReferences(records: Types.SymbolRecord[]): Coder.Reference[] {
    return records.map((record) => {
      return {
        name: record.data.name,
        pattern: record.data.pattern!
      };
    });
  }

  /**
   * Get an array of patterns from the the specified records.
   * @param records Record list.
   * @param types Symbol types.
   * @returns Returns an array containing all the patterns.
   */
  #getPatterns(records: Types.SymbolRecord[], ...types: Types.Directives[]): Coder.Pattern[] {
    return records.map((current) => {
      if (Records.isReferenced(current, ...types)) {
        return this.#coder.emitReferencePattern(current);
      }
      return current.data.pattern!;
    });
  }

  /**
   * Default constructor.
   * @param name Project name.
   * @param coder Project coder.
   * @param options Project options.
   */
  constructor(name: string, coder: Coder.Base, options: Options = {}) {
    this.#id = Context.#project.increment(coder);
    this.#name = name;
    this.#coder = coder;
    this.#options = options;
  }

  /**
   * Get the global identity counter.
   */
  static get identity(): Counter.Context {
    return Context.#identity;
  }

  /**
   * Get the project Id.
   */
  get id(): number {
    return this.#id;
  }

  /**
   * Get the project name.
   */
  get name(): string {
    return this.#name;
  }

  /**
   * Get the project coder.
   */
  get coder(): Coder.Base {
    return this.#coder;
  }

  /**
   * Get the project options.
   */
  get options(): Options {
    return this.#options;
  }

  /**
   * Get the project symbols.
   */
  get symbols(): Symbols.Aggregator {
    return this.#symbols;
  }

  /**
   * Get the project logs.
   */
  get logs(): Core.LogList {
    return this.#logs;
  }

  /**
   * Get the resulting lexer.
   */
  get lexer(): string | Types.Pattern {
    const records = this.#getRecordsByType(Parser.Symbols.Skip, Parser.Symbols.Token, Parser.Symbols.Node);
    const flatten = this.#getFlattenRecordsByType(records, Parser.Symbols.Token, Parser.Symbols.AliasToken);
    const sorted = this.#getSortedRecords(flatten);
    const references = sorted.filter((record) => Records.isReferenced(record, Types.Directives.Token));
    const tokens = sorted.filter((record) => record.value === Parser.Symbols.Token);
    return this.#coder.getEntry('Lexer', this.#getReferences(references), [
      ...this.#getPatterns(this.#getRecordsByType(Parser.Symbols.Skip), Types.Directives.Token),
      ...this.#getPatterns(tokens, Types.Directives.Token)
    ]);
  }

  /**
   * Get the resulting parser.
   */
  get parser(): string | Types.Pattern {
    const records = this.#getRecordsByType(Parser.Symbols.Node);
    const flatten = this.#getFlattenRecordsByType(records, Parser.Symbols.Node, Parser.Symbols.AliasNode);
    const sorted = this.#getSortedRecords(flatten);
    const references = sorted.filter((record) => Records.isReferenced(record, Types.Directives.Node));
    const nodes = sorted.filter((record) => record.value === Parser.Symbols.Node);
    return this.#coder.getEntry(
      'Parser',
      this.#getReferences(references),
      this.#getPatterns(nodes, Types.Directives.Node)
    );
  }
}
