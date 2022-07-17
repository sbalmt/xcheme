import * as VSCode from 'vscode';

/**
 * Semantic tokens legend.
 */
export const Legend = new VSCode.SemanticTokensLegend(
  ['token', 'node', 'parameter', 'member'],
  ['alias', 'template', 'import', 'export']
);
