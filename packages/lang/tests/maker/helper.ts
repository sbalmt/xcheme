import * as Core from '@xcheme/core';

import { Lexer, Parser, Maker, Errors, Project, BaseCoder } from '../../src/index';

/**
 * Print all errors in the given list.
 * @param errors Error list.
 */
const printErrors = (errors: Core.Error[]): void => {
  for (const error of errors) {
    const fragment = error.fragment;
    const location = fragment.location;
    console.log(`ERROR: '${fragment.data}' (${error.value}) at line ${location.line + 1}, column: ${location.column + 1}`);
  }
};

/**
 * Make a new parser using the given coder and input text.
 * @param coder Project coder.
 * @param text Input text.
 * @returns Returns the generated project.
 */
export const makeParser = (coder: BaseCoder, text: string): Project => {
  const project = new Project(coder);
  const context = new Core.Context('make');
  let status;

  // Consume input text.
  if (!(status = Lexer.consumeText(text, context))) {
    printErrors(context.errors);
  }
  expect(status).toBeTruthy();

  // Consume input tokens.
  if (!(status = Parser.consumeTokens(context.tokens, context))) {
    printErrors(context.errors);
  }
  expect(status).toBeTruthy();

  // Consume input nodes.
  if (!(status = Maker.consumeNodes(context.node, project))) {
    printErrors(project.errors);
  }
  expect(status).toBeTruthy();

  return project;
};

/**
 * Make a new parser using the given coder and input text expecting errors.
 * @param coder Project coder.
 * @param text Input text.
 * @param errors Expected errors.
 * @returns Returns the generated project.
 */
export const makeError = (coder: BaseCoder, text: string, errors: Errors[]): Project => {
  const project = new Project(coder);
  const context = new Core.Context('make');
  let status;

  // Consume input text.
  if (!(status = Lexer.consumeText(text, context))) {
    printErrors(context.errors);
  }
  expect(status).toBeTruthy();

  // Consume input tokens.
  if (!(status = Parser.consumeTokens(context.tokens, context))) {
    printErrors(context.errors);
  }
  expect(status).toBeTruthy();

  // Consume input nodes and check the expected errors.
  expect(Maker.consumeNodes(context.node, project)).toBeFalsy();
  expect(project.errors).toHaveLength(errors.length);

  for (const error of project.errors) {
    expect(errors).toContain(error.value);
  }

  return project;
};

/**
 * Test the lexer from the given project using the input text and context.
 * @param project Lexer project.
 * @param context Lexer context.
 * @param text Input text.
 */
export const testLexer = (project: Project, context: Core.Context, text: string): void => {
  const source = new Core.TextSource(text, context);
  const lexer = project.lexer as Core.Pattern;

  // Parse the given input text.
  const status = lexer.consume(source);
  if (!status) {
    printErrors(context.errors);
  }

  expect(status).toBeTruthy();
  expect(source.offset).toBe(text.length);
  expect(source.length).toBe(0);
};

/**
 * Test the parser from the given project using the input tokens and context.
 * @param project Parser project.
 * @param context Parser context.
 * @param tokens Input tokens.
 */
export const testParser = (project: Project, context: Core.Context, tokens: Core.Token[]): void => {
  const source = new Core.TokenSource(tokens, context);
  const parser = project.parser as Core.Pattern;

  // Parse the given input tokens.
  const status = parser.consume(source);
  if (!status) {
    printErrors(context.errors);
  }

  expect(status).toBeTruthy();
  expect(source.offset).toBe(tokens.length);
  expect(source.length).toBe(0);
};
