import * as VSCode from 'vscode';

/**
 * Completion item options.
 */
type ItemOptions = {
  kind: VSCode.CompletionItemKind;
  text?: string;
  commit?: string[];
};

/**
 * Reusable trigger command.
 */
const retriggerCommand = {
  command: 'editor.action.triggerSuggest',
  title: 'Re-trigger completions...'
};

/**
 * Get a new completion item based on the given label, documentation and options.
 * @param label Completion item label.
 * @param documentation Completion item documentation.
 * @param options Completion item options.
 * @returns Returns the new completion item.
 */
export const getItem = (label: string, documentation: string, options: ItemOptions): VSCode.CompletionItem => {
  const text = options?.text ?? label;
  const item = new VSCode.CompletionItem(label, options.kind);
  item.insertText = new VSCode.SnippetString(options.kind === VSCode.CompletionItemKind.Text ? text : `${text} `);
  item.commitCharacters = options?.commit;
  item.documentation = documentation;
  item.command = retriggerCommand;
  return item;
};

/**
 * Completion item for a 'SKIP' directive.
 */
export const skipItem = getItem('skip', 'Create a skip directive.', {
  kind: VSCode.CompletionItemKind.Keyword
});

/**
 * Completion item for an 'ALIAS' directive.
 */
export const aliasItem = getItem('alias', 'Create an alias directive for a token or node.', {
  kind: VSCode.CompletionItemKind.Keyword
});

/**
 * Completion item for a 'TOKEN' directive.
 */
export const tokenItem = getItem('token', 'Create a token directive.', {
  kind: VSCode.CompletionItemKind.Keyword
});

/**
 * Completion item for a 'NODE' directive.
 */
export const nodeItem = getItem('node', 'Create a node directive.', {
  kind: VSCode.CompletionItemKind.Keyword
});

/**
 * Completion item for an identity.
 */
export const identityItem = getItem('IDENTITY', 'Set an identity for the current directive.', {
  text: '<${1}>',
  commit: ['>'],
  kind: VSCode.CompletionItemKind.Text
});

/**
 * Completion item for an identifier.
 */
export const identifierItem = getItem('IDENTIFIER', 'Set an identifier for the current directive.', {
  text: '${1}',
  commit: [' ', '\n'],
  kind: VSCode.CompletionItemKind.Text
});

/**
 * Completion item for an 'AS' operator.
 */
export const asItem = getItem('as', 'Set an expression for the current directive.', {
  kind: VSCode.CompletionItemKind.Keyword
});

/**
 * Completion item for a 'THEN' operator.
 */
export const thenItem = getItem('then', 'Set a condition based on the last consumption state.', {
  kind: VSCode.CompletionItemKind.Keyword
});

/**
 * Completion item for a 'THEN/ELSE' operator.
 */
export const thenElseItem = getItem('then else', 'Set a condition based on the last consumption state.', {
  kind: VSCode.CompletionItemKind.Keyword,
  text: 'then ${1} else ${2}',
  commit: [' ', '\n']
});

/**
 * Completion item for an 'OR' operator.
 */
export const orItem = getItem('or', 'Set another consumption option.', {
  kind: VSCode.CompletionItemKind.Keyword,
  text: '|'
});

/**
 * Completion item for an 'AND' operator.
 */
export const andItem = getItem('and', 'Set another expected consumption.', {
  kind: VSCode.CompletionItemKind.Keyword,
  text: '&'
});

/**
 * Completion item for a 'NOT' operator.
 */
export const notItem = getItem('not', 'Invert the next consumption result (true to false and vice versa).', {
  kind: VSCode.CompletionItemKind.Keyword
});

/**
 * Completion item for an 'OPT' operator.
 */
export const optItem = getItem('opt', 'Set as optional the next consumption.', {
  kind: VSCode.CompletionItemKind.Keyword
});

/**
 * Completion item for a 'REPEAT' operator.
 */
export const repeatItem = getItem('repeat', 'Repeat the next consumption in case of success in the first try.', {
  kind: VSCode.CompletionItemKind.Keyword
});

/**
 * Completion item for a 'PLACE' operator.
 */
export const placeItem = getItem('place', 'Place any resulting node from the next consumption in another direction.', {
  kind: VSCode.CompletionItemKind.Keyword
});

/**
 * Completion item for an 'APPEND' operator.
 */
export const appendItem = getItem('append', 'Create and append a new node if the next consumption is successful.', {
  kind: VSCode.CompletionItemKind.Keyword
});

/**
 * Completion item for a 'PREPEND' operator.
 */
export const prependItem = getItem('prepend', 'Create and prepend a new node if the next consumption is successful.', {
  kind: VSCode.CompletionItemKind.Keyword
});

/**
 * Completion item for a 'LEFT' modifier.
 */
export const leftItem = getItem('left', 'Modify the current node direction to left.', {
  kind: VSCode.CompletionItemKind.Keyword
});

/**
 * Completion item for a 'RIGHT' modifier.
 */
export const rightItem = getItem('right', 'Modify the current node direction to right.', {
  kind: VSCode.CompletionItemKind.Keyword
});

/**
 * Completion item for a 'NEXT' modifier.
 */
export const nextItem = getItem('next', 'Modify the current node direction to next.', {
  kind: VSCode.CompletionItemKind.Keyword
});

/**
 * Completion item for a 'PIVOT' operator.
 */
export const pivotItem = getItem('pivot', 'Create a new node and pivot the current ones if the next consumption is successful.', {
  kind: VSCode.CompletionItemKind.Keyword
});

/**
 * Completion item for a 'SYMBOL' operator.
 */
export const symbolItem = getItem('symbol', 'Create a new symbol if the next consumption is successful.', {
  kind: VSCode.CompletionItemKind.Keyword
});

/**
 * Completion item for a 'SCOPE' operator.
 */
export const scopeItem = getItem('scope', 'Create a new symbol scope for the next consumption.', {
  kind: VSCode.CompletionItemKind.Keyword
});

/**
 * Completion item for an 'ERROR' operator.
 */
export const errorItem = getItem('error', 'Create a new error if the next consumption is successful.', {
  kind: VSCode.CompletionItemKind.Keyword,
  text: 'error <${1}>',
  commit: ['>']
});

/**
 * Completion item for a 'HAS' operator.
 */
export const hasItem = getItem('has', 'Set a state condition for the next consumption.', {
  kind: VSCode.CompletionItemKind.Keyword,
  text: 'has <${1}>',
  commit: ['>']
});

/**
 * Completion item for a 'SET' operator.
 */
export const setItem = getItem('set', 'Set the state if the next consumption is successful.', {
  kind: VSCode.CompletionItemKind.Keyword,
  text: 'set <${1}>',
  commit: ['>']
});

/**
 * Completion item for a word.
 */
export const wordItem = getItem('WORD', 'Accept a sequence of units.', {
  kind: VSCode.CompletionItemKind.Keyword,
  text: "'${1}'",
  commit: ["'"]
});

/**
 * Completion item for an 'ANY' operand.
 */
export const anyItem = getItem('any', 'Accept any unit.', {
  kind: VSCode.CompletionItemKind.Keyword,
  text: '*'
});

/**
 * Completion item for a 'FROM/TO' operand.
 */
export const rangeItem = getItem('from to', 'Accept an unit range.', {
  kind: VSCode.CompletionItemKind.Keyword,
  text: "from '${1}' to '${2}'",
  commit: ["'"]
});

/**
 * Completion list containing all binary operators.
 */
export const binaryOperatorList = [thenItem, thenElseItem, orItem, andItem];

/**
 * Completion list containing all unary operators.
 */
export const unaryOperatorList = [
  notItem,
  optItem,
  repeatItem,
  placeItem,
  appendItem,
  prependItem,
  pivotItem,
  symbolItem,
  scopeItem,
  errorItem,
  hasItem,
  setItem
];

/**
 * Completion list direction modifiers.
 */
export const directionList = [leftItem, rightItem, nextItem];

/**
 * Completion list containing all operands.
 */
export const operandList = [wordItem, anyItem, rangeItem];
