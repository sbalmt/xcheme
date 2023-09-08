import * as VSCode from 'vscode';
import * as Path from 'path';
import * as Core from '@xcheme/core';

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

/**
 * Get a new range for the given location.
 * @param location Location.
 * @returns Return the generated range.
 */
export const getRange = (location: Core.Location): VSCode.Range => {
  const begin = new VSCode.Position(location.line.begin, location.column.begin);
  const end = new VSCode.Position(location.line.end, location.column.end);

  return new VSCode.Range(begin, end);
};
