# XCHEME - Operators

For making expressions in XCHEME you must use operators and [operands](./operands.md), and there are three operator types: _Unary_, _Binary_ and _Ternary_, let's take a look at how to work with them.

#### Unary operators

A unary operator requires a single operand after the operator.

```xcm
operator operand
```

> For example, `opt X` or `opt 'x'`.

#### Binary operators

A binary operator requires two operands, one before the operator and another one after the operator.

```xcm
operand operator operand
```

> For example, `X & Y` or `X and 'y'`.

#### Ternary operators

A ternary operator is a special operator that requires three operands, in XCHEME there's only one ternary operator that's used for conditionals.

```xcm
operand then operand else operand
```

> For example, `'x' then 'y' else 'z'`.

## Operator precedence

The following table lists the precedence and associativity of all operators from top to bottom, in descending precedence order. Click on the name to know about the respective operator.

| Precedence | Name                                     | Associativity | Operator        |
| ---------- | ---------------------------------------- | ------------- | --------------- |
| 1️⃣         | [Grouping](#grouping-operator)           | N/A           | (…)             |
| 2️⃣         | [Member access](#member-access-operator) | Left to Right | … . …           |
| 3️⃣         | [Uncase](#uncase-operator)               | Right to Left | uncase …        |
| 3️⃣         | [Peek](#peek-operator)                   | Right to Left | peek …          |
| 3️⃣         | [State has](#state-has)                  | Right to Left | has<…> …        |
| 3️⃣         | [State set](#state-set)                  | Right to Left | set<…> …        |
| 3️⃣         | [User error](#error-operator)            | Right to Left | error<…> …      |
| 3️⃣         | [Symbol scope](#symbol-scope)            | Right to Left | scope …         |
| 3️⃣         | [Symbol record](#symbol-record)          | Right to Left | symbol …        |
| 3️⃣         | [AST pivot](#pivot-operator)             | Right to Left | pivot …         |
| 3️⃣         | [AST place](#place-operator)             | Right to Left | place …         |
| 3️⃣         | [AST prepend](#prepend-operator)         | Right to Left | prepend …       |
| 3️⃣         | [AST append](#append-operator)           | Right to Left | append …        |
| 3️⃣         | [Control repeat](#control-repeat)        | Right to Left | repeat …        |
| 3️⃣         | [Control option](#control-option)        | Right to Left | opt …           |
| 3️⃣         | [Logical not](#logical-not)              | Right to Left | not …           |
| 4️⃣         | [Logical and](#logical-and)              | Left to Right | … and …         |
| 5️⃣         | [Logical or](#logical-or)                | Left to Right | … or …          |
| 6️⃣         | [Conditional](#conditional-operator)     | Right to Left | … then … else … |
| 7️⃣         | [Assignment](#assignment-operator)       | Right to Left | … as …          |

## Assignment operator

The assignment operator is a binary operator that assigns to its left operand, an expression in its right operand.

Syntax:

```xcm
operand as operand
```

Example:

```xcm
token<100> T_X as 'x';
```

> Expect an occurrence of `'x'` during the directive evaluation.

[Back to table](#operator-precedence)

## Conditional operator

The conditional operator is the only ternary operator available in the language, when the first operand is `true`, the second one is evaluated, otherwise, when a third operand exists, it will be evaluated instead.

Syntax:

```xcm
operand then operand else operand
```

Example:

```xcm
token<100> T_X as 'x' then * else 'y';
```

> After an occurrence of `'x'`, any character is accepted, otherwise, only an occurrence of `'y'` will be accepted during the expression evaluation.

The `else` part of the syntax can be omitted when a third operand it's not necessary, and in this case, the syntax is interchangeable with an `and` expression.

Syntax:

```xcm
operand then operand
```

[Back to table](#operator-precedence)

## Logical operators

There are three types of logical operators, as we will see below.

#### Logical or

The logical `or` operator is a binary operator used to evaluate a set of expressions and expect at least one to be `true`.

Syntax:

```xcm
operand or operand
```

> Note: `or` and `|` are interchangeable.

Example:

```xcm
token<100> T_XY as 'x' | 'y';
```

> Accept an occurrence of `'x'` or `'y'` during the expression evaluation.

[Back to table](#operator-precedence)

#### Logical and

The logical `and` operator is a binary operator used to evaluate a set of expressions and expect all of them to be `true`.

Syntax:

```xcm
operand and operand
```

> Note: `and` and `&` are interchangeable.

Example:

```xcm
token<100> T_XY as 'x' & 'y';
```

> Accept an occurrence of `'xy'` during the expression evaluation.

[Back to table](#operator-precedence)

#### Logical not

The logical `not` operator is a unary operator used to evaluate an expression and invert the operation result, from `true` to `false` and vice versa.

Syntax:

```xcm
not operand
```

Example:

```xcm
token<100> T_X as not 'x';
```

> Accept anything but `'x'` during the expression evaluation.

[Back to table](#operator-precedence)

## Control operators

There are two types of control operators, as we will see below.

#### Control repeat

The control `repeat` operator is a unary operator used to evaluate an expression, and in case of success, try to evaluate once more whenever the last evaluation is `true`.

Syntax:

```xcm
repeat operand
```

Example:

```xcm
token<100> T_X as repeat 'x';
```

> Accept one or more occurrences of `'x'` during the expression evaluation.

[Back to table](#operator-precedence)

#### Control option

The option (`opt`) operator is a unary operator used to create an optional expression.

Syntax:

```xcm
opt operand
```

Example:

```xcm
token<100> T_XY as 'x' & opt 'y';
```

> Accept an occurrence of `'x'` or `'xy'` during the expression evaluation.

[Back to table](#operator-precedence)

## AST operators

There are some operators for managing how the generated nodes must be inserted in the AST, let's take a look at these operators.

#### Append operator

The `append` operator is a unary operator used to append a new node in the AST after evaluating its operand as `true`.

Syntax:

```xcm
append operand
```

Use `left`, `right` or `next` when you want to be more specific, the default direction is `right`.

Syntax:

```xcm
append left operand
append right operand
append next operand
```

Example:

```xcm
token<100> T_X as 'x';

node<200> N_X as append right T_X;
```

> Append a new node as the right child of the active AST node when the `T_X` token is found.

[Back to table](#operator-precedence)

#### Prepend operator

The `prepend` operator is a unary operator used to prepend a new node in the AST after evaluating its operand as `true`.

Syntax:

```xcm
prepend operand
```

Use `left`, `right` or `next` when you want to be more specific, the default direction is `right`.

```xcm
prepend left operand
prepend right operand
prepend next operand
```

Example:

```xcm
token<100> T_X as 'x';

node<200> N_X as prepend next T_X;
```

> Prepend a new node as the next child of the active AST node when the `T_X` token is found.

[Back to table](#operator-precedence)

#### Place operator

The `place` operator is a unary operator used to wrap an expression that generates a new node and insert the resulting node in the AST replacing its original direction.

Syntax:

```xcm
place operand
```

Use `left`, `right` or `next` when you want to be more specific, the default direction is `right`.

Syntax:

```xcm
place left operand
place right operand
place next operand
```

Example:

```xcm
token<100> T_X as 'x';

alias node<200> N_X as append right T_X;

node<201> N as place next N_X;
```

> Place the generated node (that was expected to be an AST child on the right) as the next child of the active AST node, overwriting the `right` modifier in the `append` expression.

[Back to table](#operator-precedence)

#### Pivot operator

The `pivot` operator is a unary operator used to insert a new node in the AST after evaluating its operand as `true`. The pivoted node is a subtree containing the generated node before itself as the left child and the generated node after itself as the right child.

Syntax:

```xcm
pivot operand
```

Example:

```xcm
alias node<200> N_X as append 'x';
alias node<201> N_Z as append 'z';

node<202> N_XYZ as N_X & pivot ('y' & N_Z);
```

> After evaluating `N_X` and `N_Z`, both generated nodes on the `left` and `right` of the pivot operator will be attached in the new pivot node when the evaluation of `T_Y` is `true`, and then, the pivot node is inserted in the AST.

[Back to table](#operator-precedence)

## Symbol tables

There are some operators for managing how the generated symbols must be inserted in the symbol table, let's take a look at these operators.

#### Symbol record

The `symbol` operator is a unary operator used to insert a new symbol in the symbol table after evaluating its operand as `true`.

Syntax:

```xcm
symbol operand
```

Example:

```xcm
token<100> T_X as 'x';

node<200> N_X as symbol T_X;
```

> Insert the `N_X` symbol in the symbol table when the `T_X` token is found.

[Back to table](#operator-precedence)

#### Symbol scope

The `scope` operator is a unary operator used to generate a sub symbol table, after the evaluation of its operand if the new sub symbol table remains empty, it will be discarded and not linked to the active symbol record.

Syntax:

```xcm
scope operand
```

Example:

```xcm
alias node<200> N_X as symbol 'x';
alias node<201> N_Y as symbol 'y';

node<202> N_XY as N_X & scope N_Y;
```

> Insert the `N_X` symbol in the current symbol table and the `N_Y` symbol in the new sub symbol table.

[Back to table](#operator-precedence)

## Error operator

The `error` operator is a unary operator used to emit an error after evaluating its operand as `true`, it doesn't stop the parsing process.

Syntax:

```xcm
error<code> operand
```

> Note: `code` must be a number.

Example:

```xcm
token<100> T_X as 'x';

node<200> N_X as error<1000> T_X;
```

> Emit an error with the code `1000` when the token `T_X` is found.

[Back to table](#operator-precedence)

## State operators

There are two types of state operators, as we will see below.

#### State set

The `set` operator is a unary operator used to set a new state in the parser.

Syntax:

```xcm
set<state> operand
```

> Note: `state` must be a number.

Example:

```xcm
token<100> T_X as set<1> 'x';
```

> Set the state `1` when `'x'` is found.

[Back to table](#operator-precedence)

#### State has

The `has` operator is a unary operator used to check whether the parser has an expected state to enable the evaluation of its operand.

Syntax:

```xcm
has<state> operand
```

> Note: `state` must be a number.

Example:

```xcm
token<100> T_X as set<1> 'x';
token<101> T_Y as has<1> 'y';
```

> Look for `'y'` only when the state `1` is defined, and the state `1` is set only after finding `x` during the expression evaluation.

[Back to table](#operator-precedence)

#### Peek operator

The `peek` operator is a unary operator used to test the next expression without advancing the parser consumption.

Syntax:

```xcm
peek operand
```

Example:

```xcm
token<100> T_X as 'x' & peek 'y';
```

> A token `T_X` will be generated for each occurrence of `'x'` that precedes `'y'`.

[Back to table](#operator-precedence)

#### Uncase operator

The `uncase` operator is a unary operator used for case-insensitive expressions.

Syntax:

```xcm
uncase operand
```

Example:

```xcm
token<100> T_X as uncase 'x';
```

> A token `T_X` will be generated for any occurrence of `'x'` or `'X'`.

[Back to table](#operator-precedence)

## Member access operator

The member access operator is a binary operator used to access a `map` entry.

Syntax:

```xcm
operand . operand
```

Example:

```xcm
token<auto> T as map {
  <100> X as 'x',
  <101> Y as 'y'
};

node<200> N_XY as T.X & repeat T.Y;
```

> Accept an occurrence of `T.X` and one or more occurrences of `T.Y`.

[Back to table](#operator-precedence)

## Grouping operator

The grouping operator controls the evaluation precedence in expressions.

Syntax:

```xcm
( expression )
```

Example:

```xcm
token<100> T_XYZ as 'x' & (repeat 'y' & 'z');
```

> Accept an occurrence of `'x'` combined with one or more occurrences of `'yz'`.

[Back to table](#operator-precedence)

## Next steps

- [Operands](./operands.md)
- [Directives](./directives.md)
- [References](./references.md)

## License

[MIT](https://balmante.eti.br)
