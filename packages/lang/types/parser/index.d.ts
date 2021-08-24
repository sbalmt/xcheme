import * as Core from '@xcheme/core';
export { Symbols } from './symbols';
export { Nodes } from './nodes';
/**
 * Consume the specified tokens and produce an AST for updating the given context.
 * @param tokens Input tokens.
 * @param context Input context.
 * @returns Returns true when the consumption was successful, false otherwise.
 */
export declare const consumeTokens: (tokens: Core.Token[], context: Core.Context) => boolean;
/**
 * Consume the given source.
 * @param source Data source.
 * @returns Returns true when the source was consumed, otherwise returns false.
 */
export declare const consume: (source: Core.BaseSource) => boolean;
