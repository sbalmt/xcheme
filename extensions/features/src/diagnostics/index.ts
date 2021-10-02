import * as VSCode from 'vscode';

import * as Lang from '@xcheme/lang';

import * as Analysis from '../common/analysis';
import * as Errors from './errors';

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
      const project = new Lang.Project.Context(new Lang.TextCoder());
      Lang.Optimizer.consumeNodes(context.node, project) && Lang.Maker.consumeNodes(context.node, project);
      if (project.errors.length > 0) {
        const errors = Errors.getDiagnostics(project.errors);
        collection.set(document.uri, errors);
      }
    }
  }
};
