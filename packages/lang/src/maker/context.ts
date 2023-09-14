import * as Types from '../core/types';
import * as Nodes from '../core/nodes';

export class Context {
  /**
   * All directive states on this context.
   */
  #states = new WeakMap<Types.Node>();

  /**
   * Get the corresponding directive state.
   * @param directive Directive node.
   * @returns Returns the directive state.
   */
  getState(directive: Types.Node): State {
    let state = this.#states.get(directive);

    if (!state) {
      state = new State(this, directive);
      this.#states.set(directive, state);
    }

    return state;
  }

  /**
   * Check whether or not the given directive has a state.
   * @param directive Directive node.
   * @returns Returns true when the directive node has a state, otherwise returns false.
   */
  hasState(directive: Types.Node): boolean {
    return this.#states.has(directive);
  }
}

export class State {
  /**
   * Context instance.
   */
  #context: Context;

  /**
   * Current directive.
   */
  #directive: Types.Node;

  /**
   * Determines whether or not the current expression is dynamic.
   */
  dynamic: boolean;

  /**
   * Default constructor.
   * @param directive Current directive.
   */
  constructor(context: Context, directive: Types.Node) {
    this.#context = context;
    this.#directive = directive;

    this.dynamic = Nodes.isDynamic(directive);
  }

  /**
   * Context instance.
   */
  get context(): Context {
    return this.#context;
  }

  /**
   * Current directive.
   */
  get directive(): Types.Node {
    return this.#directive;
  }
}
