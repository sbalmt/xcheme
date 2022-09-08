import type { Types } from '../core/types';

import { SymbolTable, SymbolRecord } from '../core/symbols';
import { Exception } from '../core/exception';
import { Stack } from '../core/collections';

/**
 * Symbol table scope class.
 */
export class Scope<T extends Types> {
  /**
   * Internal symbol tables stack.
   */
  #stack = new Stack<SymbolTable<T>>();

  /**
   * Available symbol table to be linked.
   */
  link: SymbolTable<T> | undefined;

  /**
   * Default constructor.
   * @param table First symbol table.
   */
  constructor(table: SymbolTable<T>) {
    this.#stack.push(table);
  }

  /**
   * Get the current symbol table.
   */
  get table(): SymbolTable<T> {
    return this.#stack.current!;
  }

  /**
   * Appends a new symbol table into scope.
   */
  push(): void {
    const table = new SymbolTable<T>(this.#stack.current!);
    if (this.link) {
      table.assign(this.link);
      this.link = void 0;
    }
    this.#stack.push(table);
  }

  /**
   * Insert a new symbol record into the current symbol table.
   * @param record New symbol record.
   */
  emit(record: SymbolRecord<T>): void {
    this.#stack.current!.insert(record);
  }

  /**
   * Removes the last symbol table from scope.
   */
  pop(): void {
    if (this.#stack.size === 1) {
      throw new Exception("There's no scope to remove.");
    }
    const table = this.#stack.pop();
    if (table.length > 0) {
      this.link = table;
    }
  }
}
