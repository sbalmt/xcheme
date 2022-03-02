import * as Core from '@xcheme/core';

import * as Parser from '../parser';
import * as Coder from './coder/base';
import * as Counter from './counter';
import * as Symbols from './symbols';

import { Errors } from './errors';

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
   * Project errors.
   */
  #errors: Core.Error[] = [];

  /**
   * Get an array of records that corresponds to the specified record type.
   * @param types Record types.
   * @returns Returns an array containing all the corresponding records.
   */
  #getRecordsByType(...types: Parser.Symbols[]): Core.Record[] {
    const list = [];
    for (const current of this.#symbols) {
      const { pattern } = current.data;
      if (pattern && types.includes(current.value as Parser.Symbols)) {
        list.push(current);
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
  #getFlattenRecordsByType(records: Core.Record[], ...types: Parser.Symbols[]): Core.Record[] {
    const list: Core.Record[] = [];
    const cache = new WeakSet<Core.Record>();
    const action = (records: Core.Record[]): void => {
      for (const current of records) {
        if (!cache.has(current)) {
          cache.add(current);
          const { pattern, dependencies } = current.data;
          if (pattern && types.includes(current.value as Parser.Symbols)) {
            list.push(current);
          }
          action(dependencies);
        }
      }
    };
    action(records);
    return list;
  }

  /**
   * Get an array of references from the specified records.
   * @param records Record list.
   * @returns Returns an array containing all the references.
   */
  #getReferences(records: Core.Record[]): Coder.Reference[] {
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
  #getPatterns(records: Core.Record[], ...types: Symbols.Types[]): Coder.Pattern[] {
    return records.map((current) => {
      if (Symbols.isReferencedBy(current, ...types)) {
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
   * Get the project errors.
   */
  get errors(): Core.Error[] {
    return this.#errors;
  }

  /**
   * Get the resulting lexer.
   */
  get lexer(): string | Core.Pattern {
    const records = this.#getRecordsByType(Parser.Symbols.Skip, Parser.Symbols.Token, Parser.Symbols.Node);
    const flatten = this.#getFlattenRecordsByType(records, Parser.Symbols.Token, Parser.Symbols.AliasToken);
    const references = flatten.filter((current) => Symbols.isReferencedBy(current, Symbols.Types.Token));
    const tokens = flatten.filter((current) => current.value === Parser.Symbols.Token);
    return this.#coder.getEntry('Lexer', this.#getReferences(references), [
      ...this.#getPatterns(this.#getRecordsByType(Parser.Symbols.Skip), Symbols.Types.Token),
      ...this.#getPatterns(tokens, Symbols.Types.Token)
    ]);
  }

  /**
   * Get the resulting parser.
   */
  get parser(): string | Core.Pattern {
    const records = this.#getRecordsByType(Parser.Symbols.Node);
    const flatten = this.#getFlattenRecordsByType(records, Parser.Symbols.Node, Parser.Symbols.AliasNode);
    const references = flatten.filter((current) => Symbols.isReferencedBy(current, Symbols.Types.Node));
    const nodes = flatten.filter((current) => current.value === Parser.Symbols.Node);
    return this.#coder.getEntry(
      'Parser',
      this.#getReferences(references),
      this.#getPatterns(nodes, Symbols.Types.Node)
    );
  }

  /**
   * Add a new error in the project.
   * @param fragment Error fragment.
   * @param value Error value.
   */
  addError(fragment: Core.Fragment, value: Errors): void {
    this.#errors.push(new Core.Error(fragment, value));
  }
}
