/**
 * All parser nodes.
 */
export const enum Nodes {
  Identifier = 200,
  Skip,
  Node,
  Token,
  AliasNode,
  AliasToken,
  Then,
  Else,
  Or,
  And,
  Not,
  Opt,
  Rep,
  Place,
  Pivot,
  Append,
  Prepend,
  PlaceNext,
  AppendNext,
  PrependNext,
  PlaceLeft,
  AppendLeft,
  PrependLeft,
  PlaceRight,
  AppendRight,
  PrependRight,
  Symbol,
  Scope,
  Reference,
  Any,
  Range,
  Alphabet
}
