import * as VSCode from 'vscode';
import * as Path from 'path';

/**
 * Get the document directory.
 * @param document Current document.
 * @returns Returns the document directory.
 */
export const getDirectory = (document: VSCode.TextDocument): string => {
  const path = Path.dirname(document.uri.fsPath);
  if (path === '.' && VSCode.workspace.workspaceFolders) {
    return VSCode.workspace.workspaceFolders[0].uri.fsPath;
  }
  return path;
};
