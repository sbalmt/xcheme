import * as Path from 'path';
import * as FS from 'fs';

import * as Core from '@xcheme/core';
import * as Lang from '@xcheme/lang';
import * as LangLexer from '@xcheme/lexer';

import * as Lexer from '../core/lexer';
import * as Parser from '../core/parser';

import * as Options from '../core/options';
import * as Console from '../core/console';
import * as Errors from '../core/errors';

/**
 * Global language options.
 */
const globalOptions: Lang.Project.Options = {
  identity: 0,
  loadFileHook: (file: string): string | undefined => {
    if (FS.existsSync(file)) {
      return FS.readFileSync(file, { encoding: 'utf-8' });
    }
    return void 0;
  }
};

/**
 * Generate a new optimized project based on the specified input nodes.
 * @param project Input project.
 * @param node Input node.
 * @returns Returns true in case of success, false otherwise.
 */
const optimize = (project: Lang.Project.Context, node: Lang.Types.Node): boolean => {
  Console.printLine('Optimizing...');
  if (Lang.Optimizer.consumeNodes(project, node)) {
    Console.clearLine();
    return true;
  }
  Errors.print(project.errors);
  return false;
};

/**
 * Make a new project based on the specified input nodes.
 * @param project Input project.
 * @param node Input node.
 * @returns Returns true in case of success, false otherwise.
 */
const make = (project: Lang.Project.Context, node: Lang.Types.Node): boolean => {
  Console.printLine('Making...');
  if (Lang.Maker.consumeNodes(project, node)) {
    Console.clearLine();
    return true;
  }
  Errors.print(project.errors);
  return false;
};

/**
 * Test the given project consuming the specified source.
 * @param project Input project.
 * @param source Input source.
 * @param state Debug state.
 * @returns Returns true in case of success, otherwise returns false.
 */
const test = (project: Lang.Project.Context, source: string, state: Options.Debug): boolean => {
  const context = new Core.Context<Lang.Types.Metadata>('runner');
  if (Lexer.tokenize(project.lexer as Lang.Types.Pattern, source, context, state.tokens!)) {
    if (Parser.parse(project.parser as Lang.Types.Pattern, context.tokens, context, state.symbols!, state.nodes!)) {
      Console.printLine('Done!');
      return true;
    }
  }
  Errors.print(context.errors);
  return false;
};

/**
 * Save the given project in the specified path.
 * @param project Input project.
 * @param path Output file path.
 */
const save = (project: Lang.Project.Context, path: string | number): void => {
  const lib = "const Core = require('@xcheme/core');";
  FS.writeFileSync(path, `${lib}\n${project.lexer}\n${project.parser}\n`);
  if (path !== 1) {
    Console.printLine('Done!');
  }
};

/**
 * Initializes all the options for the given source.
 * @param source Input source.
 */
const initialize = (source: string | number): void => {
  if (typeof source === 'string' && FS.existsSync(source)) {
    globalOptions.directory = Path.dirname(source);
  } else {
    globalOptions.directory = process.cwd();
  }
};

/**
 * Make a new output for the given input file.
 * @param source Source file.
 * @param target Target file.
 * @param run Determines whether or not the project should consume the target.
 * @param state Debug state options.
 * @returns Returns true in case of success, false otherwise.
 */
export const perform = (
  source: string | number,
  target: string | number,
  run: boolean,
  state: Options.Debug
): boolean => {
  const text = FS.readFileSync(source).toString();
  const context = new Core.Context<Lang.Types.Metadata>('maker');
  initialize(source);
  if (Lexer.tokenize(LangLexer, text, context, !run && state.tokens!)) {
    if (Parser.parse(Lang.Parser, context.tokens, context, !run && state.symbols!, !run && state.nodes!)) {
      const path = Path.join('', source.toString());
      if (run) {
        const project = new Lang.Project.Context(path, new Lang.LiveCoder(), globalOptions);
        if (optimize(project, context.node) && make(project, context.node)) {
          const content = FS.readFileSync(target).toString();
          test(project, content, state);
          return true;
        }
      } else {
        const project = new Lang.Project.Context(path, new Lang.TextCoder(), globalOptions);
        if (optimize(project, context.node) && make(project, context.node)) {
          save(project, target);
          return true;
        }
      }
    }
  }
  Errors.print(context.errors);
  return false;
};
