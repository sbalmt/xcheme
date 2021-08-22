import * as VSCode from 'vscode';

import * as Diagnostics from './core/diagnostics';
import * as Completion from './core/completion';

/**
 * Returns a new disposable with an auto completion prover.
 * @returns Returns the disposable.
 */
const registerAutoCompletion = (): VSCode.Disposable => {
  return VSCode.languages.registerCompletionItemProvider('xcheme', new Completion.Provider());
};

/**
 * Returns a new disposable for detecting editor changes and update the given diagnostics collection.
 * @param collection Diagnostics collection.
 * @returns Returns the disposable.
 */
const detectEditorChanges = (collection: VSCode.DiagnosticCollection): VSCode.Disposable => {
  return VSCode.window.onDidChangeActiveTextEditor((editor: VSCode.TextEditor | undefined) => {
    if (editor) {
      Diagnostics.update(editor.document, collection);
    }
  });
};

/**
 * Returns a new disposable for detecting text changes and update the given diagnostics collection.
 * @param collection Diagnostics collection.
 * @returns Returns the disposable.
 */
const detectTextChanges = (collection: VSCode.DiagnosticCollection): VSCode.Disposable => {
  return VSCode.workspace.onDidChangeTextDocument((event: VSCode.TextDocumentChangeEvent) => {
    Diagnostics.update(event.document, collection);
  });
};

/**
 * Called when the extension is activated.
 * @param context VSCode context.
 */
export function activate(context: VSCode.ExtensionContext) {
  const collection = VSCode.languages.createDiagnosticCollection('xcheme');
  context.subscriptions.push(registerAutoCompletion());
  context.subscriptions.push(detectTextChanges(collection), detectEditorChanges(collection));
  if (VSCode.window.activeTextEditor) {
    Diagnostics.update(VSCode.window.activeTextEditor.document, collection);
  }
}

/**
 * Called when the extension is deactivated.
 */
export function deactivate() {}
