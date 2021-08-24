import * as Core from '@xcheme/core';
export { Tokens } from './tokens';
/**
 * Consume the specified text and produce a list of tokens for updating the given context.
 * @param text Input text.
 * @param context Input context.
 * @returns Returns true when the consumption was successful, false otherwise.
 */
export declare const consumeText: (text: string, context: Core.Context) => boolean;
/**
 * Consume the given source.
 * @param source Data source.
 * @returns Returns true when the source was consumed, otherwise returns false.
 */
export declare const consume: (source: Core.BaseSource) => boolean;
