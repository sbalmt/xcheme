import * as Path from 'path';
import * as FS from 'fs';

import * as Core from '@xcheme/core';
import * as Lexer from '@xcheme/lexer';
import * as Parser from '@xcheme/parser';
import * as Lang from '@xcheme/lang';

import * as GenericLexer from '../core/lexer';
import * as GenericParser from '../core/parser';

import * as Options from '../core/options';
import * as Logs from '../core/logs';

import { Logging } from '../core/console';

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
  Logging.printLine('Optimizing...');
  if (Lang.Optimizer.consumeNodes(project, node)) {
    if (project.logs.length === 0) {
      Logging.clearLine();
    }
    return true;
  }
  return false;
};

/**
 * Make a new project based on the specified input nodes.
 * @param project Input project.
 * @param node Input node.
 * @returns Returns true in case of success, false otherwise.
 */
const make = (project: Lang.Project.Context, node: Lang.Types.Node): boolean => {
  Logging.printLine('Making...');
  if (Lang.Maker.consumeNodes(project, node)) {
    if (project.logs.length === 0) {
      Logging.clearLine();
    }
    return true;
  }
  return false;
};

/**
 * Test the given project consuming the specified source.
 * @param project Input project.
 * @param source Input source.
 * @param state Debug state.
 * @returns Returns true when the test was successful, false otherwise.
 */
const test = (project: Lang.Project.Context, source: string, state: Options.Debug): boolean => {
  const context = new Core.Context<Lang.Types.Metadata>('runner');
  Logging.printLine('Running...');
  if (GenericLexer.consume(project.lexer as Lang.Types.Pattern, source, context, state.tokens!)) {
    if (
      GenericParser.consume(project.parser as Lang.Types.Pattern, context.tokens, context, state.symbols!, state.nodes!)
    ) {
      Logs.printList(context.logs, true);
      return true;
    }
  }
  Logs.printList(context.logs, true);
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
  Logging.printLine('Done!');
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
 * @return Returns true when the performance was successful, false otherwise.
 */
export const perform = (
  source: string | number,
  target: string | number,
  run: boolean,
  state: Options.Debug
): boolean => {
  const code = FS.readFileSync(source).toString();
  const context = new Core.Context<Lang.Types.Metadata>('maker');
  initialize(source);
  if (GenericLexer.consume(Lexer, code, context, !run && state.tokens!)) {
    if (GenericParser.consume(Parser, context.tokens, context, !run && state.symbols!, !run && state.nodes!)) {
      const path = Path.join('', source.toString());
      const node = context.node;
      if (run) {
        const project = new Lang.Project.Context(path, new Lang.LiveCoder(), globalOptions);
        const status = optimize(project, node) && make(project, node);
        Logs.printList(project.logs);
        if (status) {
          const content = FS.readFileSync(target).toString();
          if (test(project, content, state)) {
            Logging.printLine('Success!');
            return true;
          }
        }
      } else {
        const project = new Lang.Project.Context(path, new Lang.TextCoder(), globalOptions);
        const status = optimize(project, node) && make(project, node);
        Logs.printList(project.logs);
        if (status) {
          save(project, target);
          return true;
        }
      }
    }
  }
  Logs.printList(context.logs);
  Logging.printLine('Failure!');
  return false;
};
