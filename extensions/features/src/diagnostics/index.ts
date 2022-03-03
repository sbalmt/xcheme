import * as VSCode from 'vscode';
import * as FS from 'fs';

import * as Core from '@xcheme/core';
import * as Lang from '@xcheme/lang';

import * as Errors from './errors';

/**
 * Diagnostics cache.
 */
export type Cache = {
  last?: Result | undefined;
};

/**
 * Diagnostics result.
 */
export type Result = {
  /**
   * Project context.
   */
  project: Lang.Project.Context;
  /**
   * Source context.
   */
  source: Core.Context;
};

/**
 * Load the specified file contents.
 * @param file File path.
 * @returns Returns the file contents or undefined when the file wasn't found.
 */
const loadFile = (file: string): string | undefined => {
  if (FS.existsSync(file)) {
    return FS.readFileSync(file, { encoding: 'utf-8' });
  }
  return void 0;
};

/**
 * Consume the current document and generates the source context.
 * @param document Current document
 * @returns Returns the source context.
 */
const consumeDocument = (document: VSCode.TextDocument): Core.Context => {
  const begin = document.lineAt(0).range.start;
  const end = document.lineAt(document.lineCount - 1).range.end;
  const text = document.getText(new VSCode.Range(begin, end));
  const source = new Core.Context(document.uri.path);
  Lang.Lexer.consumeText(text, source);
  Lang.Parser.consumeTokens(source.tokens, source);
  return source;
};

/**
 * Update the specified diagnostics collection based on the current document.
 * @param document Current document.
 * @param collection Diagnostics collection.
 */
export const update = (document: VSCode.TextDocument, collection: VSCode.DiagnosticCollection): Result | undefined => {
  const source = consumeDocument(document);
  const workspaces = VSCode.workspace.workspaceFolders;
  const directory = workspaces ? workspaces[0].uri.path.substring(1) : void 0;
  const project = new Lang.Project.Context('editor', new Lang.TextCoder(), {
    loadFileHook: directory ? loadFile : void 0,
    directory
  });
  Lang.Optimizer.consumeNodes(source.node, project);
  collection.set(document.uri, [...Errors.getDiagnostics(source.errors), ...Errors.getDiagnostics(project.errors)]);
  return { project, source };
};
