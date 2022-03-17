/**
 * All nodes for the parser.
 */
export const enum Nodes {
  Identifier = 200,
  Reference,
  Identity,
  State,
  String,
  Any,
  Range,
  Map,
  MapMember,
  Then,
  Else,
  Or,
  And,
  Not,
  Opt,
  Repeat,
  PlaceLeft,
  PlaceRight,
  PlaceNext,
  Place,
  AppendLeft,
  AppendRight,
  AppendNext,
  Append,
  PrependLeft,
  PrependRight,
  PrependNext,
  Prepend,
  Pivot,
  Symbol,
  Scope,
  Error,
  Has,
  Set,
  Uncase,
  Peek,
  Access,
  Skip,
  Token,
  Node,
  AliasToken,
  AliasNode,
  Import,
  Export
}
