import * as VSCode from 'vscode';

import * as Completion from './completion';
import * as Diagnostics from './diagnostics';

/**
 * Global diagnostic cache.
 */
const cache: Diagnostics.Cache = {};

/**
 * Updates the global diagnostic cache.
 * @param document Current document.
 * @param collection Diagnostics collection.
 */
const updateDiagnostics = (document: VSCode.TextDocument, collection: VSCode.DiagnosticCollection): void => {
  collection.clear();
  if (document && document.languageId === 'xcheme') {
    cache.last = Diagnostics.update(document, collection);
  }
};

/**
 * Returns a new disposable with an auto completion provider.
 * @returns Returns the disposable.
 */
const registerAutoCompletion = (): VSCode.Disposable => {
  return VSCode.languages.registerCompletionItemProvider('xcheme', new Completion.Provider(cache), '.');
};

/**
 * Returns a new disposable for detecting editor changes and update the given diagnostics collection.
 * @param collection Diagnostics collection.
 * @returns Returns the disposable.
 */
const detectEditorChanges = (collection: VSCode.DiagnosticCollection): VSCode.Disposable => {
  return VSCode.window.onDidChangeActiveTextEditor((editor: VSCode.TextEditor | undefined) => {
    if (editor && editor.document) {
      updateDiagnostics(editor.document, collection);
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
    if (event.document) {
      updateDiagnostics(event.document, collection);
    }
  });
};

/**
 * Called when the extension is activated.
 * @param context Extension context.
 */
export function activate(context: VSCode.ExtensionContext) {
  const collection = VSCode.languages.createDiagnosticCollection('xcheme');
  context.subscriptions.push(detectTextChanges(collection), detectEditorChanges(collection));
  context.subscriptions.push(registerAutoCompletion());
  const editor = VSCode.window.activeTextEditor;
  if (editor && editor.document) {
    updateDiagnostics(editor.document, collection);
  }
}

/**
 * Called when the extension is deactivated.
 */
export function deactivate() {}
