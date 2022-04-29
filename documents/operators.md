# XCHEME - Operators

For making expressions in XCHEME you must use operators and [operands](./operands.md), and there are three operator types: _Unary_, _Binary_ and _Ternary_, let's take a look at how to work with them.

#### Unary operators

A unary operator requires a single operand always after the operator.

```xcm
operator FOO
```

> For example, `opt FOO`.

#### Binary operators

A binary operator requires two operands, one before and another one after the operator.

```xcm
FOO operator BAR
```

> For example, `FOO & BAR` or `FOO and BAR`.

#### Ternary operators

A ternary operator is a special operator that requires three operands, in XCHEME there's only one ternary operator that's used for conditionals.

```xcm
FOO operator BAR operator BAZ
```

> For example, `FOO then BAR else BAZ`.

## Operator precedence

The following table lists the precedence and associativity of all operators from top to bottom, in descending precedence order. Click on the name to know about the respective operator.

| Precedence | Name                                 | Associativity | Operator        |
| ---------- | ------------------------------------ | ------------- | --------------- |
| 1️⃣         | [Grouping](#grouping-operator)       | N/A           | (…)             |
| 2️⃣         | [Member access](#access-operator)    | Left to Right | … . …           |
| 3️⃣         | [Uncase](#uncase-operator)           | Right to Left | uncase …        |
| 3️⃣         | [Peek](#peek-operator)               | Right to Left | peek …          |
| 3️⃣         | [Has state](#has-operator)           | Right to Left | has<…> …        |
| 3️⃣         | [Set state](#set-operator)           | Right to Left | set<…> …        |
| 3️⃣         | [User error](#error-operator)        | Right to Left | error<…> …      |
| 3️⃣         | [Symbol scope](#scope-operator)      | Right to Left | scope …         |
| 3️⃣         | [Symbol record](#symbol-operator)    | Right to Left | symbol …        |
| 3️⃣         | [AST pivot](#pivot-operator)         | Right to Left | pivot …         |
| 3️⃣         | [AST place](#place-operator)         | Right to Left | place …         |
| 3️⃣         | [AST prepend](#prepend-operator)     | Right to Left | prepend …       |
| 3️⃣         | [AST append](#append-operator)       | Right to Left | append …        |
| 3️⃣         | [Repeat control](#repeat-operator)   | Right to Left | repeat …        |
| 3️⃣         | [Option control](#opt-operator)      | Right to Left | opt …           |
| 3️⃣         | [Logical not](#logical-not)          | Right to Left | not …           |
| 4️⃣         | [Logical and](#logical-and)          | Left to Right | … and …         |
| 5️⃣         | [Logical or](#logical-or)            | Left to Right | … or …          |
| 6️⃣         | [Conditional](#conditional-operator) | Right to Left | … then … else … |
| 7️⃣         | [Assignment](#assignment-operator)   | Right to Left | … as …          |

## Assignment operator

The assignment operator is a special binary operator that depends on a directive declaration for assigning to its left operand, an expression in its right operand.

Syntax:

```xcm
token <0> FOO as BAR
node  <0> FOO as BAR
alias token <0> FOO as BAR
alias node  <0> FOO as BAR
```

Example:

```xcm
token <0> T_FOO as BAR;
```

> Assign a `BAR` expression to `T_FOO`.

[Back to table](#operator-precedence)

## Conditional operator

The conditional operator is the only ternary operator available in the language, when the first operand is `true`, the second one is evaluated, otherwise, when a third operand exists, it will be evaluated instead.

Syntax:

```xcm
FOO then BAR else BAZ
```

Example:

```xcm
token <0> T_FOO as FOO then BAR else BAZ;
```

> After an occurrence of `FOO`, `BAR` is accepted, otherwise, `BAZ` is accepted during the expression evaluation.

The `else` syntax can be omitted when a third operand is not necessary, and in this case, the syntax is interchangeable with the `and` expression.

Syntax:

```xcm
FOO then BAR
```

> Same as `FOO & BAR`.

[Back to table](#operator-precedence)

## Logical operators

There are three types of logical operators, as we will see below.

#### Logical or

The logical `or` operator is a binary operator used to evaluate a set of expressions and expect at least one of them to be `true`.

Syntax:

```xcm
FOO or BAR
```

> Note: `or` and `|` are interchangeable.

Example:

```xcm
token <0> T_FOO as FOO | BAR | BAZ;
```

> Accept an occurrence of `FOO`, `BAR` or `BAZ` during the expression evaluation.

[Back to table](#operator-precedence)

#### Logical and

The logical `and` operator is a binary operator used to evaluate a set of expressions and expect all of them to be `true`.

Syntax:

```xcm
FOO and BAR
```

> Note: `and` and `&` are interchangeable.

Example:

```xcm
token <0> T_FOO as FOO & BAR & BAZ;
```

> Accept an occurrence of `FOO`, `BAR` and `BAZ` during the expression evaluation.

[Back to table](#operator-precedence)

#### Logical not

The logical `not` operator is a unary operator used to evaluate an expression and invert the operation result, from `true` to `false` and vice versa.

Syntax:

```xcm
not FOO
```

Example:

```xcm
token <0> T_FOO as not BAR;
```

> Accept anything but `BAR` during the expression evaluation.

[Back to table](#operator-precedence)

## Control operators

There are two types of control operators, as we will see below.

#### Repeat operator

The `repeat` operator is a unary operator used to evaluate an expression, and in case of success, try to evaluate once more whenever the last evaluation is `true`.

Syntax:

```xcm
repeat FOO
```

Example:

```xcm
token <0> T_FOO as repeat BAR;
```

> Accept one or more occurrences of `BAR` during the expression evaluation.

[Back to table](#operator-precedence)

#### Opt operator

The option (`opt`) operator is a unary operator used to create an optional expression.

Syntax:

```xcm
opt FOO
```

Example:

```xcm
token <0> T_FOO as BAR & opt BAZ;
```

> Accept an occurrence of `BAR` and optionally `BAZ` during the expression evaluation.

[Back to table](#operator-precedence)

## AST operators

There are some operators for managing how the generated nodes must be inserted in the AST, let's take a look at these operators.

#### Append operator

The `append` operator is a unary operator used to attach a new node into the last AST child for the given directions when evaluating its operand as `true`.

Syntax:

```xcm
append FOO
append <IDENTITY> FOO
```

> When no identity is provided, the directive identity is used for the new node.

Use `left`, `right` or `next` when you want to be more specific, the default directions are `right` and `right`.

Syntax:

```xcm
DIRECTION append DIRECTION EXPRESSION
DIRECTION append <IDENTITY> DIRECTION EXPRESSION
```

Example:

```xcm
token <0> T_FOO as FOO;

node  <1> N_FOO1 as append left T_FOO;
node  <2> N_FOO2 as left append T_FOO;
node  <2> N_FOO3 as left append left T_FOO;
```

[Back to table](#operator-precedence)

#### Prepend operator

The `prepend` operator is a unary operator used to attach a new node in the first AST child for the given directions when evaluating its operand as `true`.

Syntax:

```xcm
prepend FOO
prepend <IDENTITY> FOO
```

> When no identity is provided, the directive identity is used for the new node.

Use `left`, `right` or `next` when you want to be more specific, the default directions are `right` and `right`.

```xcm
DIRECTION prepend DIRECTION EXPRESSION
DIRECTION prepend <IDENTITY> DIRECTION EXPRESSION
```

Example:

```xcm
token <0> T_FOO as FOO;

node  <1> N_FOO1 as prepend left T_FOO;
node  <2> N_FOO2 as left prepend T_FOO;
node  <2> N_FOO3 as left prepend left T_FOO;
```

[Back to table](#operator-precedence)

#### Place operator

The `place` operator is a unary operator used to wrap an expression that generates a new node and insert the resulting node in the AST replacing its original direction.

Syntax:

```xcm
place FOO
```

Use `left`, `right` or `next` when you want to be more specific, the default direction is `right`.

Syntax:

```xcm
place left FOO
place right FOO
place next FOO
```

Example:

```xcm
token <0> T_FOO as FOO;

alias node N_BAR as append <0> right T_FOO;
node  <1>  N_FOO as place next N_BAR;
```

> Place the generated node (that was expected to be an AST child on the right) as the next child of the active AST node, overwriting the `right` modifier in the `append` expression.

[Back to table](#operator-precedence)

#### Pivot operator

The `pivot` operator is a unary operator used to insert a new node in the AST after evaluating its operand as `true`. The pivoted node is a subtree containing the generated node before itself as the left child and the generated node after itself as the right child.

Syntax:

```xcm
pivot FOO
pivot <identity> FOO
```

> When no identity is provided, the directive identity is used for the new pivot node.

Example:

```xcm
alias node N_FOO as append <0> FOO;
alias node N_BAR as append <1> BAR;

node <3> N_FOOBAR as N_FOO & pivot <2> (T_BAZ & N_BAR);
```

> After evaluating `N_FOO` and `N_BAR`, both generated nodes on the `left` and `right` of the pivot operator will be attached in the new pivot node when the evaluation of `T_BAZ` is `true`, and then, the pivot node is inserted in the AST.

[Back to table](#operator-precedence)

## Symbol tables

There are some operators for managing how the generated symbols must be inserted in the symbol table, let's take a look at these operators.

#### Symbol operator

The `symbol` operator is a unary operator used to insert a new symbol in the symbol table after evaluating its operand as `true`.

Syntax:

```xcm
symbol FOO
symbol <identity> FOO
```

> When no identity is provided, the directive identity is used for the new symbol.

Example:

```xcm
token <0> T_FOO as FOO;
node  <0> N_FOO as symbol T_FOO;
```

> Insert the `N_FOO` symbol in the symbol table when `T_FOO` is found.

[Back to table](#operator-precedence)

#### Scope operator

The `scope` operator is a unary operator used to generate a sub symbol table, if the new sub symbol table remains empty after the evaluation of its operand, it will be discarded and not linked to the active symbol record.

Syntax:

```xcm
scope FOO
```

Example:

```xcm
alias node N_FOO as symbol <0> FOO;
alias node N_BAR as symbol <1> BAR;

node <0> N_FOOBAR as N_FOO & scope N_BAR;
```

> Insert the `N_FOO` symbol in the current symbol table and the `N_BAR` symbol in the new sub symbol table.

[Back to table](#operator-precedence)

## Error operator

The `error` operator is a unary operator used to emit an error after evaluating its operand as `true`, it doesn't stop the parsing process.

Syntax:

```xcm
error <code> FOO
```

> Note: `code` must be a number.

Example:

```xcm
token <0> T_FOO as FOO;
node  <0> N_FOO as error<1000> T_FOO;
```

> Emit an error with the code `1000` when `T_FOO` is found.

[Back to table](#operator-precedence)

## State operators

There are two types of state operators, as we will see below.

#### Set operator

The `set` operator is a unary operator used to set a new state in the parser, it's used together with the `has` operator for conditional parsing.

Syntax:

```xcm
set <state> FOO
```

> Note: `state` must be a number.

Example:

```xcm
token <0> T_FOO as set <99> FOO;
```

> Set the state `99` when `FOO` is found.

[Back to table](#operator-precedence)

#### Has operator

The `has` operator is a unary operator used to check whether the parser has an expected state before enabling the evaluation of its operand.

Syntax:

```xcm
has <state> FOO
```

> Note: `state` must be a number.

Example:

```xcm
token <0> T_FOO as set<99> FOO;
token <1> T_BAR as has<99> BAR;
```

> Look for `BAR` only when the state `99` is defined, and the state `99` is set only after finding `FOO` during the expression evaluation.

[Back to table](#operator-precedence)

#### Peek operator

The `peek` operator is a unary operator used to test the next expression without advancing the parser consumption.

Syntax:

```xcm
peek FOO
```

Example:

```xcm
token <0> T_FOO as FOO & peek BAR;
```

> A token `T_FOO` will be generated for each occurrence of `FOO` that precedes `BAR`.

[Back to table](#operator-precedence)

#### Uncase operator

The `uncase` operator is a unary operator used for case-insensitive expressions.

Syntax:

```xcm
uncase FOO
```

Example:

```xcm
token <0> T_FOO as uncase FOO;
```

> A token `T_FOO` will be generated for any occurrence of `FOO` in a case-insensitive way.

[Back to table](#operator-precedence)

## Access operator

The access operator is a binary operator used to make references for `map` member entries.

Syntax:

```xcm
FOO . BAR
```

Example:

```xcm
token <auto> T_FOOBAR as map {
  <0> FOO as FOO,
  <1> BAR as BAR
};

node <0> N_FOOBAR as T_FOOBAR.FOO & repeat T_FOOBAR.BAR;
```

> Accept an occurrence of `T_FOOBAR.FOO` and one or more occurrences of `T_FOOBAR.BAR`.

[Back to table](#operator-precedence)

## Grouping operator

The grouping operator controls the evaluation precedence in expressions.

Syntax:

```xcm
( FOOBAR )
```

Example:

```xcm
token <0> T_FOOBAR as FOO & (repeat BAR & BAZ);
```

> Accept an occurrence of `FOO` combined with one or more occurrences of `BAR` and `BAZ`.

[Back to table](#operator-precedence)

## Next steps

- [Operands](./operands.md)
- [Directives](./directives.md)
- [References](./references.md)

## License

[MIT](../LICENSE)
