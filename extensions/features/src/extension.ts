import * as VSCode from 'vscode';

import * as Completion from './completion';
import * as Diagnostics from './diagnostics';
import * as Tokens from './tokens';

/**
 * Extension language Id.
 */
const LanguageId = 'xcheme';

/**
 * Global diagnostic cache.
 */
const DiagnosticCache: Diagnostics.Cache = {};

/**
 * Updates the global diagnostic cache.
 * @param document Current document.
 * @param collection Diagnostic collection.
 */
const updateDiagnostics = (document: VSCode.TextDocument, collection: VSCode.DiagnosticCollection): void => {
  if (document.languageId === LanguageId) {
    DiagnosticCache.last = Diagnostics.update(document, collection);
  }
};

/**
 * Returns a new disposable for an auto completion provider.
 * @returns Returns the disposable.
 */
const registerAutoCompletion = (): VSCode.Disposable => {
  return VSCode.languages.registerCompletionItemProvider(LanguageId, new Completion.Provider(DiagnosticCache), '.');
};

/**
 * Returns a new disposable for an semantic tokens provider.
 * @returns Return the disposable.
 */
const registerSemanticTokens = (): VSCode.Disposable => {
  const selector = { language: LanguageId };
  const provider = new Tokens.Provider(DiagnosticCache);
  return VSCode.languages.registerDocumentSemanticTokensProvider(selector, provider, Tokens.Legend);
};

/**
 * Returns a new disposable for detecting editor changes and update the given diagnostics collection.
 * @param collection Diagnostic collection.
 * @returns Returns the disposable.
 */
const detectEditorChanges = (collection: VSCode.DiagnosticCollection): VSCode.Disposable => {
  return VSCode.window.onDidChangeActiveTextEditor((editor) => {
    if (editor && editor.document) {
      updateDiagnostics(editor.document, collection);
    }
  });
};

/**
 * Returns a new disposable for detecting text changes and update the given diagnostics collection.
 * @param collection Diagnostic collection.
 * @returns Returns the disposable.
 */
const detectTextChanges = (collection: VSCode.DiagnosticCollection): VSCode.Disposable => {
  return VSCode.workspace.onDidChangeTextDocument((event) => {
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
  const collection = VSCode.languages.createDiagnosticCollection(LanguageId);
  context.subscriptions.push(detectTextChanges(collection), detectEditorChanges(collection));
  context.subscriptions.push(registerAutoCompletion());
  context.subscriptions.push(registerSemanticTokens());
  const editor = VSCode.window.activeTextEditor;
  if (editor && editor.document) {
    updateDiagnostics(editor.document, collection);
  }
}

/**
 * Called when the extension is deactivated.
 */
export function deactivate() {}
