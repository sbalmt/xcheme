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

The following table lists the precedence and associativity of all operators from top to bottom, in descending precedence. Click on the description to know about.

| Precedence | Description                              | Associativity | Operator        |
| ---------- | ---------------------------------------- | ------------- | --------------- |
| 1️⃣         | [Grouping](#grouping-operator)           | N/A           | (…)             |
| 2️⃣         | [Member access](#member-access-operator) | Left to Right | … . …           |
| 3️⃣         | [State has](#state-has)                  | Right to Left | has<…> …        |
| 3️⃣         | [State set](#state-set)                  | Right to Left | set<…> …        |
| 3️⃣         | [Error](#error-operator)                 | Right to Left | error<…> …      |
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
| 6️⃣         | [Conditional](#conditional-operators)    | Right to Left | … then … else … |
| 7️⃣         | [Assignment](#assignment-operators)      | Right to Left | … as …          |

## Assignment operators

The assignment operator is a binary operator that assigns to its left operand, an expression in its right operand.

Syntax:

```xcm
operand as operand
```

For example:

```xcm
token<100> T_X as 'x';
```

> Expect an occurrence of `'x'` during the directive evaluation.

## Conditional operators

The conditional operator is the only ternary operator (that can take three operands) available, when the first one is `true`, the second one is evaluated, otherwise, if a third operand exists, it will be evaluated instead.

Syntax:

```xcm
operand then operand else operand
```

The `else` part of the syntax can be omitted when it's not necessary, although in this case is better to use an `and` operation.

Syntax:

```xcm
operand then operand
```

For example:

```xcm
token<100> T_X as 'x' then * else 'y';
```

> After an occurrence of `'x'`, any character is accepted, otherwise, only an occurrence of `'y'` will be accepted during the expression evaluation.

## Logical operators

There are three types of logical operators, as we will see below.

#### Logical or

The logical `or` operator is a binary operator used when we want to try to evaluate a set of expressions and expect at least one to be `true`.

Syntax:

```xcm
operand or operand
```

> Note: `or` and `|` are interchangeable.

For example:

```xcm
token<100> T_XY as 'x' | 'y';
```

> Accept an occurrence of `'x'` or `'y'` during the expression evaluation.

#### Logical and

The logical `and` operator is a binary operator used when we want to evaluate a set of expressions and expect all of them to be `true`.

Syntax:

```xcm
operand and operand
```

> Note: `and` and `&` are interchangeable.

For example:

```xcm
token<100> T_XY as 'x' & 'y';
```

> Accept an occurrence of `'xy'` during the expression evaluation.

#### Logical not

The logical `not` operator is a unary operator used when we want to evaluate an expression and invert the operation result, from `true` to `false` and vice versa.

Syntax:

```xcm
not operand
```

For example:

```xcm
token<100> T_X as not 'x';
```

> Accept anything but `'x'` during the expression evaluation.

## Control operators

There are two types of control operators, as we will see below.

#### Control repeat

The control `repeat` operator is a unary operator used when we want to evaluate an expression and, in case of success, try to evaluate once more whenever the last evaluation is `true`.

Syntax:

```xcm
repeat operand
```

For example:

```xcm
token<100> T_X as repeat 'x';
```

> Accept one or more occurrences of `'x'` during the expression evaluation.

#### Control option

The control option (`opt`) operator is a unary operator used when we want to make an expression to be not required during the current expression evaluation.

Syntax:

```xcm
opt operand
```

For example:

```xcm
token<100> T_XY as 'x' & opt 'y';
```

> Accept an occurrence of `'x'` or `'xy'` during the expression evaluation.

## AST operators

There are some operators to manage how the generated nodes must be inserted into the AST, let's take a look at those operators.

#### Append operator

The `append` operator is a unary operator used when we want to append a new node into the AST after evaluating its operand as `true`.

Syntax:

```xcm
append operand
```

> Use `left`, `right` or `next` when you want to be more specific, the default direction is `right`.

For example:

```xcm
token<100> T_X as 'x';

node<200> N_X as append right T_X;
```

> Append a new node as the right child of the active AST node when the `T_X` token is found during the expression evaluation.

#### Prepend operator

The `prepend` operator is a unary operator used when we want to prepend a new node into the AST after evaluating its operand as `true`.

Syntax:

```xcm
prepend operand
```

> Use `left`, `right` or `next` when you want to be more specific, the default direction is `right`.

For example:

```xcm
token<100> T_X as 'x';

node<200> N_X as prepend next T_X;
```

> Prepend a new node as the next child of the active AST node when the `T_X` token is found during the expression evaluation.

#### Place operator

The `place` operator is a unary operator used when we want to isolate an expression that generates a new node and insert the resulting node into the AST replacing its original direction.

Syntax:

```xcm
place operand
```

> Use `left`, `right` or `next` when you want to be more specific, the default direction is `right`.

For example:

```xcm
token<100> T_X as 'x';

alias node<200> N_X as append right T_X;

node<201> N as place next N_X;
```

> Place the generated node (that was expected to be an AST child on the right) as the next child of the active AST node, overwriting the `right` modifier in the `append` expression during the evaluation.

#### Pivot operator

The `pivot` operator is a binary operator used when we want to pivot a new node into the AST after evaluating its both operands as `true`. The pivoted node is a subtree where the generated node before the operator is placed on the left and the generated node after the operator (if there's one) is placed on the right.

Syntax:

```xcm
pivot operand
```

For example:

```xcm
token<100> T_X as 'x';
token<101> T_Y as 'y';
token<102> T_Z as 'z';

alias node<200> N_X as append T_X;
alias node<201> N_Z as append T_Z;

node<202> N_XYZ as N_X & pivot (T_Y & N_Z);
```

> After evaluating `N_X`, `N_Z` and generating the nodes to append into the ATS, the generated node on the `left` of the operator and the generated node on the `right` of the operator will be attached (preserving its respective directions) into the pivot node when the evaluation of `T_Y` is `true`.

## Symbol tables

There are some operators to manage how the generated symbols must be inserted into the symbol table, let's take a look at those operators.

#### Symbol record

The `symbol` record operator is a unary operator used when we want to put a new symbol into the symbol table after evaluating its operand as `true`.

Syntax:

```xcm
symbol operand
```

For example:

```xcm
token<100> T_X as 'x';

node<200> N_X as symbol T_X;
```

> Put the `N_X` symbol into the symbol table when `T_X` is found during the expression evaluation.

#### Symbol scope

The symbol `scope` operator is a unary operator used when we want to generate a new scope in the symbol table for putting all the next symbols that could be generated during its evaluation, after the evaluation if the scope remains empty it will be discarded and won't be linked to the active symbol record.

Syntax:

```xcm
scope operand
```

For example:

```xcm
token<100> T_X as 'x';
token<101> T_Y as 'y';

alias node<200> N_X as symbol T_X;
alias node<201> N_Y as symbol T_Y;

node<202> N_XY as N_X & scope N_Y;
```

> Put the `N_X` symbol into the symbol table using the current scope, and the `N_Y` symbol into a new scope during the expression evaluation.

## Error operator

The `error` operator is a unary operator used when we want to emit an error after evaluating its operand as `true` and not stopping the current analysis step.

Syntax:

```xcm
error<code> operand
```

> Note: `code` must be a number.

For example:

```xcm
token<100> T_X as 'x';

node<200> N_X as error<1000> T_X;
```

> Emit an error with the code `1000` when the token `T_X` is found during the expression evaluation.

## State operators

There are two types of state operators, as we will see below.

#### State set

The `set` state operator is a unary operator used when we want to set a new state in the current analysis step.

Syntax:

```xcm
set<state> operand
```

> Note: `state` must be a number.

For example:

```xcm
token<100> T_X as set<1> 'x';
```

> Set the state `1` when `'x'` is found during the expression evaluation.

#### State has

The `has` state operator is a unary operator used when we want to check if there's a specific state in the analysis process.

Syntax:

```xcm
has<state> operand
```

> Note: `state` must be a number.

For example:

```xcm
token<100> T_X as set<1> 'x';
token<101> T_Y as has<1> 'y';
```

> Look for `'y'` only when the state `1` is defined, and the state `1` is set only after finding `x` during the expression evaluation.

## Member access operator

The member access operator is a binary operator used when we want to access a `map` entries during the expression evaluation.

Syntax:

```xcm
operand . operand
```

For example:

```xcm
token<auto> T as map {
  <100> X as 'x',
  <101> Y as 'y'
};

node<200> N_XY as T.X & repeat T.Y;
```

> Accept an occurrence of `T.X` and one or more occurrences of `T.Y` during the expression evaluation.

## Grouping operator

The grouping operator controls the evaluation precedence in expressions.

Syntax:

```xcm
( expression )
```

For example:

```xcm
token<100> T_XYZ as 'x' & (repeat 'y' & 'z');
```

> Accept an occurrence of `'x'` combined with one or more occurrences of `'yz'` during the expression evaluation.

## Next steps

- [Directives](./directives.md)
- [Operands](./operands.md)
- [References](./references.md)

## License

[MIT](https://balmante.eti.br)
