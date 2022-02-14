import * as VSCode from 'vscode';
import * as FS from 'fs';

import * as Lang from '@xcheme/lang';

import * as Analysis from '../common/analysis';
import * as Errors from './errors';

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
 * Update the specified diagnostics collection based on the given document.
 * @param document Input document.
 * @param collection Diagnostics collection.
 */
export const update = (document: VSCode.TextDocument, collection: VSCode.DiagnosticCollection): void => {
  collection.clear();
  if (document && document.languageId === 'xcheme') {
    const context = Analysis.consumeDocument(document);
    if (context.errors.length > 0) {
      const errors = Errors.getDiagnostics(context.errors);
      collection.set(document.uri, errors);
    } else {
      const workspaces = VSCode.workspace.workspaceFolders;
      const folder = workspaces ? workspaces[0].uri.path.substring(1) : void 0;
      const project = new Lang.Project.Context('editor', new Lang.TextCoder(), {
        loadFileHook: folder ? loadFile : void 0,
        rootPath: folder
      });
      Lang.Optimizer.consumeNodes(context.node, project) && Lang.Maker.consumeNodes(context.node, project);
      if (project.errors.length > 0) {
        const errors = Errors.getDiagnostics(project.errors);
        collection.set(document.uri, errors);
      }
    }
  }
};
