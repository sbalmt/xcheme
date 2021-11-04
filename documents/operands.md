# XCHEME - Operands

In XCHEME all expressions are composed of operands and [operators](./operators.md), in this section we will learn how to work with them.

## Operand types

The following table lists all the available operands Click on the description to know about.

| Description                     | Operand         |
| ------------------------------- | --------------- |
| [Any](#any-operand)             | any             |
| [Range](#range-operand)         | from '…' to '…' |
| [String](#string-operand)       | '…'             |
| [Reference](#reference-operand) | …               |
| [Map](#map-operand)             | map { … }       |

## Any operand

The `any` operand is used when we want to accept any character in a _token_ directive or any token in a _node_ directive.

Syntax:

```xcm
any
```

> Note: `any` and `*` are interchangeable.

Token example:

```xcm
token<100> T_ANY as *;
```

> A new token `T_ANY` will be generated for any input character.

Node example:

```xcm
node<200> N_ANY as *;
```

> A new node `N_ANY` will be generated for any input token.

## Range operand

The range operand is used when we want to accept a range of characters in a _token_ directive. When a range operand is used in a _node_ directive a new _token_ directive is generated automatically, that's called _loose token_ directive.

Syntax:

```xcm
from '…' to '…'
```

Token example:

```xcm
token<100> T_DIGIT as from '0' to '9';
```

> For each digit between `'0'` and `'9'` a new token `T_DIGIT` will be generated.

Node example:

```xcm
node<200> N_DIGIT as from '0' to '9';
```

> For each _loose token_ that corresponds to a digit between `'0'` and `'9'` a new node `N_DIGIT` will be generated.

## String operand

The string operand is used when we want to accept a string in a _token_ directive. When strings are used in a _node_ directive a _loose token_ directive will be generated.

Syntax:

```xcm
'…'
```

Token example:

```xcm
token<100> T_NAME as 'name';
```

> For each `'name'` occurrence a new token `T_NAME` will be generated.

Node example:

```xcm
node<200> N_NAME as 'name';
```

> For each _loose token_ that corresponds to a `'name'` occurrence a new node `N_NAME` will be generated.

## Reference operand

The reference operand is used when we want to reuse an expression from a _token_ or _node_ directive without duplicating it. There are some rules for using references, you can learn more [here](./references.md).

For example:

```xcm
alias token T_X as 'x';

token<100> T_REF as T_X;
```

> For each `'x'` occurrence a new token `T_REF` will be generated.

## Map operand

The map operand is used when we want to group characters or strings in a _token_ directive or a set of tokens in a _node_ directive.

Syntax:

```xcm
map {
  …,
  …
}
```

For example:

```xcm
token<100> T_XYZ as map {
  'x',
  'y',
  'z'
};
```

> For each `'x'`,`'y'` or `'z'` occurrence a new token `T_XYZ` will be generated.

Using maps in this way is more efficient than three _token_ directives, but in some cases we would like to define an individual identity for each map entry as we can do using one _token_ directive for each token, let's see how to do that.

```xcm
token<auto> T_XYZ as map {
  <100> X as 'x',
  <101> Y as 'y',
  <102> Z as 'z'
};
```

> For each `'x'`,`'y'` or `'z'` occurrence a new token `T_XYZ` will be generated, and the `auto` identity in the _token_ directive ensures each one with its respective identity given in the entry expression.

Now that we've added identities and identifier for each map entry, it's also possible to use an individual reference for some entries, as we will see below.

```xcm
token<auto> T_XYZ as map {
  <100> X as 'x',
  <101> Y as 'y',
  <102> Z as 'z'
};

node<200> N_XZ as T_XYZ.X & T_XYZ.Z;
```

> A new node `N_XZ` will be generated for each occurrence of `T_XYZ.X` and `T_XYZ.Z` token.

## Next steps

- [Directives](./directives.md)
- [Operators](./operators.md)
- [References](./references.md)

## License

[MIT](https://balmante.eti.br)
