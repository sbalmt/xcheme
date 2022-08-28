import * as VSCode from 'vscode';

/**
 * Completion item options.
 */
type ItemOptions = {
  /**
   * Item kind.
   */
  kind: VSCode.CompletionItemKind;
  /**
   * Text inserted in the completion.
   */
  text?: string;
  /**
   * Commit characters during the completion.
   */
  commit?: string[];
  /**
   * Determines whether or not a whitespace should be included automatically.
   */
  space?: boolean;
  /**
   * Determines whether or not the auto completion should auto retrigger.
   */
  retry?: boolean;
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
  item.insertText = new VSCode.SnippetString(options.space ? `${text} ` : text);
  item.command = options.retry ? retriggerCommand : void 0;
  item.commitCharacters = options.commit;
  item.documentation = documentation;
  return item;
};

/**
 * Completion item for an 'IMPORT' keyword directive.
 */
export const importItem = getItem('import', 'Import a file.', {
  kind: VSCode.CompletionItemKind.Keyword,
  text: "import '${1}'",
  commit: ["'"],
  retry: true
});

/**
 * Completion item for an 'EXPORT' keyword directive.
 */
export const exportItem = getItem('export', 'Export a directive.', {
  kind: VSCode.CompletionItemKind.Keyword,
  space: true,
  retry: true
});

/**
 * Completion item for a 'SKIP' keyword directive.
 */
export const skipItem = getItem('skip', 'Create a skip directive.', {
  kind: VSCode.CompletionItemKind.Keyword,
  space: true,
  retry: true
});

/**
 * Completion item for an 'ALIAS' keyword directive.
 */
export const aliasItem = getItem('alias', 'Create an alias directive for a token or node.', {
  kind: VSCode.CompletionItemKind.Keyword,
  space: true,
  retry: true
});

/**
 * Completion item for a 'TOKEN' keyword directive.
 */
export const tokenItem = getItem('token', 'Create a token directive.', {
  kind: VSCode.CompletionItemKind.Keyword,
  space: true,
  retry: true
});

/**
 * Completion item for a 'NODE' directive.
 */
export const nodeItem = getItem('node', 'Create a node directive.', {
  kind: VSCode.CompletionItemKind.Keyword,
  space: true,
  retry: true
});

/**
 * Completion item for an identity.
 */
export const identityItem = getItem('IDENTITY', 'Set an identity for the current directive.', {
  kind: VSCode.CompletionItemKind.Text,
  text: '<${1}>',
  commit: ['>']
});

/**
 * Completion item for an identifier.
 */
export const identifierItem = getItem('IDENTIFIER', 'Set an identifier for the current directive.', {
  kind: VSCode.CompletionItemKind.Text,
  text: '${1}',
  commit: [' ', '\n']
});

/**
 * Completion item for an 'AS' keyword operator.
 */
export const asItem = getItem('as', 'Set an expression for the current directive.', {
  kind: VSCode.CompletionItemKind.Keyword,
  space: true
});

/**
 * Completion item for a 'THEN' keyword operator.
 */
export const thenItem = getItem('then', 'Set a partial condition based on the last consumption state.', {
  kind: VSCode.CompletionItemKind.Keyword,
  space: true
});

/**
 * Completion item for a 'THEN/ELSE' keyword operator.
 */
export const thenElseItem = getItem('then else', 'Set a full condition based on the last consumption state.', {
  kind: VSCode.CompletionItemKind.Keyword,
  text: 'then ${1} else ${2}',
  commit: [' ', '\n']
});

/**
 * Completion item for an 'OR' keyword operator.
 */
export const orItem = getItem('or', 'Set another optional consumption.', {
  kind: VSCode.CompletionItemKind.Keyword,
  text: '|'
});

/**
 * Completion item for an 'AND' keyword operator.
 */
export const andItem = getItem('and', 'Set another expected consumption.', {
  kind: VSCode.CompletionItemKind.Keyword,
  text: '&'
});

/**
 * Completion item for a 'NOT' keyword operator.
 */
export const notItem = getItem('not', 'Invert the next consumption state (true to false and vice versa).', {
  kind: VSCode.CompletionItemKind.Keyword,
  space: true
});

/**
 * Completion item for an 'OPT' keyword operator.
 */
export const optItem = getItem('opt', 'Set the next consumption as optional.', {
  kind: VSCode.CompletionItemKind.Keyword,
  space: true
});

/**
 * Completion item for a 'REPEAT' keyword operator.
 */
export const repeatItem = getItem('repeat', 'Repeat the next consumption in case of success after the first try.', {
  kind: VSCode.CompletionItemKind.Keyword,
  space: true
});

/**
 * Completion item for a 'PLACE' keyword operator.
 */
export const placeItem = getItem('place', 'Place the resulting node from the next consumption in another direction.', {
  kind: VSCode.CompletionItemKind.Keyword,
  space: true,
  retry: true
});

/**
 * Completion item for an 'APPEND' keyword operator.
 */
export const appendItem = getItem('append', 'Append a new node when the next consumption is successful.', {
  kind: VSCode.CompletionItemKind.Keyword,
  space: true,
  retry: true
});

/**
 * Completion item for a 'PREPEND' keyword operator.
 */
export const prependItem = getItem('prepend', 'Prepend a new node when the next consumption is successful.', {
  kind: VSCode.CompletionItemKind.Keyword,
  space: true,
  retry: true
});

/**
 * Completion item for a 'LEFT' keyword operator modifier.
 */
export const leftItem = getItem('left', 'Modify the current node direction to left.', {
  kind: VSCode.CompletionItemKind.Keyword,
  space: true
});

/**
 * Completion item for a 'RIGHT' keyword operator modifier.
 */
export const rightItem = getItem('right', 'Modify the current node direction to right.', {
  kind: VSCode.CompletionItemKind.Keyword,
  space: true
});

/**
 * Completion item for a 'NEXT' keyword operator modifier.
 */
export const nextItem = getItem('next', 'Modify the current node direction to next.', {
  kind: VSCode.CompletionItemKind.Keyword,
  space: true
});

/**
 * Completion item for a 'PIVOT' keyword operator.
 */
export const pivotItem = getItem('pivot', 'Create a new pivot node when the next consumption is successful.', {
  kind: VSCode.CompletionItemKind.Keyword,
  space: true
});

/**
 * Completion item for a 'SYMBOL' keyword operator.
 */
export const symbolItem = getItem('symbol', 'Create a new symbol when the next consumption is successful.', {
  kind: VSCode.CompletionItemKind.Keyword,
  space: true
});

/**
 * Completion item for a 'SCOPE' keyword operator.
 */
export const scopeItem = getItem('scope', 'Create a new symbol scope for the next consumption.', {
  kind: VSCode.CompletionItemKind.Keyword,
  space: true
});

/**
 * Completion item for an 'ERROR' keyword operator.
 */
export const errorItem = getItem('error', 'Create a new error when the next consumption is successful.', {
  kind: VSCode.CompletionItemKind.Keyword,
  text: 'error <${1}>',
  commit: ['>'],
  space: true
});

/**
 * Completion item for a 'WARN' keyword operator.
 */
export const warnItem = getItem('warn', 'Create a new warning when the next consumption is successful.', {
  kind: VSCode.CompletionItemKind.Keyword,
  text: 'warn <${1}>',
  commit: ['>'],
  space: true
});

/**
 * Completion item for a 'HAS' keyword operator.
 */
export const hasItem = getItem('has', 'Perform the next consumption when the expected state matches.', {
  kind: VSCode.CompletionItemKind.Keyword,
  text: 'has <${1}>',
  commit: ['>'],
  space: true
});

/**
 * Completion item for a 'SET' keyword operator.
 */
export const setItem = getItem('set', 'Set the state when the next consumption is successful.', {
  kind: VSCode.CompletionItemKind.Keyword,
  text: 'set <${1}>',
  commit: ['>'],
  space: true
});

/**
 * Completion item for an 'UNCASE' keyword operator.
 */
export const uncaseItem = getItem('uncase', 'Consume the next expression without case-sensitivity.', {
  kind: VSCode.CompletionItemKind.Keyword,
  space: true
});

/**
 * Completion item for an 'ACCESS' operator.
 */
export const accessItem = getItem('access', 'Access a map member.', {
  kind: VSCode.CompletionItemKind.Operator,
  text: '.'
});

/**
 * Completion item for a 'MAP' keyword operator.
 */
export const mapItem = getItem('map', 'Perform the next consumption in a prefix tree.', {
  kind: VSCode.CompletionItemKind.Keyword,
  text: 'map {${1}}',
  commit: [',', '}']
});

/**
 * Completion item for a word operand.
 */
export const wordItem = getItem('WORD', 'Accept a sequence of units.', {
  kind: VSCode.CompletionItemKind.Constant,
  text: "'${1}'",
  commit: ["'"]
});

/**
 * Completion item for an 'ANY' operand.
 */
export const anyItem = getItem('any', 'Accept any unit.', {
  kind: VSCode.CompletionItemKind.Constant,
  text: '*'
});

/**
 * Completion item for an 'End of Source' operand.
 */
export const eosItem = getItem('eos', 'Accept only the end of source.', {
  kind: VSCode.CompletionItemKind.Constant,
  text: 'eos'
});

/**
 * Completion item for a 'FROM/TO' operand.
 */
export const rangeItem = getItem('from to', 'Accept an unit range.', {
  kind: VSCode.CompletionItemKind.Constant,
  text: "from '${1}' to '${2}'",
  commit: ["'"]
});

/**
 * Completion list containing all binary operators.
 */
export const binaryOperatorList = [thenItem, thenElseItem, orItem, andItem, accessItem];

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
  warnItem,
  hasItem,
  setItem,
  uncaseItem,
  mapItem
];

/**
 * Completion list containing all direction modifiers.
 */
export const directionList = [leftItem, rightItem, nextItem];

/**
 * Completion list containing all operands.
 */
export const operandList = [wordItem, anyItem, rangeItem, eosItem];
