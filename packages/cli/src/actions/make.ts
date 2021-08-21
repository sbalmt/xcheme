import * as FS from 'fs';

import * as Core from '@xcheme/core';
import * as Lang from '@xcheme/lang';

import * as Lexer from '../core/lexer';
import * as Parser from '../core/parser';

import * as Options from '../core/options';
import * as Console from '../core/console';
import * as Errors from '../core/errors';

/**
 * Global language options.
 */
const globalOptions: Lang.Options = {
  initialIdentity: 0
};

/**
 * Make a new project based on the specified input nodes.
 * @param project Input project.
 * @param node Input node.
 * @returns Returns true in case of success, false otherwise.
 */
const make = (project: Lang.Project, node: Core.Node): boolean => {
  Console.printLine('Making...');
  if (Lang.Maker.consumeNodes(node, project)) {
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
const test = (project: Lang.Project, source: string, state: Options.Debug): boolean => {
  const context = new Core.Context('runner');
  if (Lexer.tokenize(project.lexer as Core.Pattern, source, context, state.tokens!)) {
    if (Parser.parse(project.parser as Core.Pattern, context.tokens, context, state.symbols!, state.nodes!)) {
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
const save = (project: Lang.Project, path: string | number): void => {
  const lib = "const Core = require('@xcheme/core');";
  FS.writeFileSync(path, `${lib}\n${project.lexer}\n${project.parser}\n`);
  if (path !== 1) {
    Console.printLine('Done!');
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
export const perform = (source: string | number, target: string | number, run: boolean, state: Options.Debug): boolean => {
  const text = FS.readFileSync(source).toString();
  const context = new Core.Context('maker');
  if (Lexer.tokenize(Lang.Lexer, text, context, !run && state.tokens!)) {
    if (Parser.parse(Lang.Parser, context.tokens, context, !run && state.symbols!, !run && state.nodes!)) {
      if (run) {
        const project = new Lang.Project(new Lang.LiveCoder(), globalOptions);
        if (make(project, context.node)) {
          const content = FS.readFileSync(target).toString();
          test(project, content, state);
          return true;
        }
      }
      const project = new Lang.Project(new Lang.TextCoder(), globalOptions);
      if (make(project, context.node)) {
        save(project, target);
        return true;
      }
    }
  }
  Errors.print(context.errors);
  return false;
};
