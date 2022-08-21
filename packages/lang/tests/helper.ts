import * as Path from 'path';
import * as FS from 'fs';

import * as Core from '@xcheme/core';
import * as Lexer from '@xcheme/lexer';
import * as Parser from '@xcheme/parser';

import * as Lang from '../src/index';

/**
 * Import hook for loading the imported file contents.
 * @param file File path.
 * @returns Returns the imported file contents or undefined when the file wasn't found.
 */
export const loadFileHook = (file: string): string | undefined => {
  const path = Path.join(__dirname, file);
  if (FS.existsSync(path)) {
    return FS.readFileSync(path, { encoding: 'utf-8' });
  }
  return void 0;
};

/**
 * Print all errors in the given list.
 * @param errors Error list.
 */
const printErrors = (errors: Core.ErrorList): void => {
  for (const error of errors) {
    const fragment = error.fragment;
    const location = fragment.location;
    const line = location.line.begin + 1;
    const column = location.column.begin + 1;
    console.log(`${location.name}: '${fragment.data}' (${error.value}) at line ${line}, column ${column}`);
  }
};

/**
 * Make a new parser using the given coder and input text.
 * @param coder Project coder.
 * @param text Input text.
 * @returns Returns the generated project.
 */
export const makeParser = (coder: Lang.Coder, text: string): Lang.Project.Context => {
  const project = new Lang.Project.Context('make', coder, { loadFileHook });
  const context = new Core.Context<Lang.Types.Metadata>('make');
  let status: boolean;

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

  // Consume input nodes and optimize its tree.
  if (!(status = Lang.Optimizer.consumeNodes(project, context.node))) {
    printErrors(project.errors);
  }
  expect(status).toBeTruthy();

  // Consume input nodes and make the output.
  if (!(status = Lang.Maker.consumeNodes(project, context.node))) {
    printErrors(project.errors);
  }
  expect(status).toBeTruthy();

  return project;
};

/**
 * Test the lexer from the given project using the input text and context.
 * @param project Lexer project.
 * @param context Lexer context.
 * @param text Input text.
 */
export const testLexer = (project: Lang.Project.Context, context: Lang.Types.Context, text: string): void => {
  const source = new Core.TextSource<Lang.Types.Metadata>(text, context);
  const lexer = project.lexer as Lang.Types.Pattern;

  // Parse the given input text.
  const status = lexer.consume(source);
  if (!status) {
    context.errors.emplace(source.fragment, Lang.Errors.UNEXPECTED_TOKEN);
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
export const testParser = (
  project: Lang.Project.Context,
  context: Lang.Types.Context,
  tokens: Lang.Types.TokenList
): void => {
  const source = new Core.TokenSource<Lang.Types.Metadata>(tokens, context);
  const parser = project.parser as Lang.Types.Pattern;

  // Parse the given input tokens.
  const status = parser.consume(source);
  if (!status) {
    const fragment = tokens.at(source.longestState.offset)?.fragment ?? source.fragment;
    context.errors.emplace(fragment, Lang.Errors.UNEXPECTED_SYNTAX);
    printErrors(context.errors);
  }

  expect(status).toBeTruthy();
  expect(source.offset).toBe(tokens.length);
  expect(source.length).toBe(0);
};
