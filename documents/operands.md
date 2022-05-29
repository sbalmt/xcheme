# XCHEME - Operands

In XCHEME all expressions are composed of operands and [operators](./operators.md), in this section we will learn how to work with them.

## Operand types

The following table lists all the available operands. Click on the description to know about the respective operand.

| Description                     | Operand         |
| ------------------------------- | --------------- |
| [Any](#any-operand)             | any             |
| [Range](#range-operand)         | from '…' to '…' |
| [String](#string-operand)       | '…'             |
| [Reference](#reference-operand) | …               |
| [Map](#map-operand)             | map { … }       |

## Any operand

The `any` operand is used to accept any character in a _token_ directive or any token in a _node_ directive.

Syntax:

```xcm
any
```

> Note: `any` and `*` are interchangeable.

Token example:

```xcm
token <0> T_FOO as *;
```

> A new `T_FOO` token will be generated for any input character.

Node example:

```xcm
node <0> N_FOO as *;
```

> A new `N_FOO` node will be generated for any input token.

## Range operand

The range operand is used to accept a range of characters in a _token_ directive. When the range operand is used in a _node_ directive a new _token_ directive is generated automatically and referenced into the respective _node_ directive, this behavior is called _loose token_ generation.

Syntax:

```xcm
from FOO to BAR
```

Token example:

```xcm
token <0> T_FOO as from '0' to '9';
```

> For each digit between `'0'` and `'9'` a new `T_FOO` token will be generated.

Node example:

```xcm
node <0> N_FOO as from '0' to '9';
```

> For each _loose token_ that corresponds to a digit between `'0'` and `'9'`, a new `N_FOO` node will be generated.

## String operand

The string operand is used to accept a sequence of characters in a _token_ directive. When strings are used within _node_ directives a _loose token_ directive will be generated.

Syntax:

```xcm
'foo'
```

Token example:

```xcm
token< 0> T_FOO as 'foo';
```

> For each `'foo'` string a new `T_FOO` token will be generated.

Node example:

```xcm
node <0> N_FOO as 'foo';
```

> For each _loose token_ that corresponds to `'foo'`, a new `N_FOO` node will be generated.

## Reference operand

The reference operand is used to reuse an expression from a _token_ or _node_ directive without the need of duplicating it. There are some rules for using references, you can learn more about [here](./references.md).

Example:

```xcm
alias token T_FOO as 'foo';
alias token T_BAR as 'bar';

token <0> T_BAZ as (T_FOO & T_BAR) | (T_BAR & T_FOO);
```

> For each `T_FOO` and `T_BAR` or `T_BAT` and `T_FOO`, a new `T_BAZ` token will be generated.

## Map operand

The map operand is used to group characters or strings in a _token_ directive, or a set of tokens in a _node_ directive.

Syntax:

```xcm
map {
  FOO,
  BAR
}
```

Example:

```xcm
token <0> T_FOO_OR_BAR as map {
  'foo',
  'bar'
};
```

> For each `'foo'` or `'bar'` occurrence, a new `T_FOO_OR_BAR` token will be generated with the same identity.

Maps can perform better than sequences of _token_ directives and can be useful to combine multiple directives into a single one, but in some cases, we would like to define an individual identity for each map entry as we can do with multiple directives, let's see down below how to achieve that.

```xcm
token <auto> T_FOO_OR_BAR as map {
  <0> FOO as 'foo',
  <1> BAR as 'bar'
};
```

> For each `'foo'` or `'bar'` occurrence, a new `T_FOO_OR_BAR` token will be generated, and the `auto` identity in the _token_ directive ensures that every token generated will assume the identity provided in the respective map entry.

Now that we've added identities and identifier to each map entry, it's also possible to use an individual reference for each one, as we will see below.

```xcm
token <auto> T_FOO_OR_BAR as map {
  <0> FOO as 'foo',
  <1> BAR as 'bar'
};

node <0> N_FOOBAR as T_FOO_OR_BAR.FOO & T_FOO_OR_BAR.BAR;
```

> A new `N_FOOBAR` node will be generated for each occurrence of `T_FOO_OR_BAR.FOO` and `T_FOO_OR_BAR.BAR`.

For node directives we may also not use identifiers as we cannot reference node map entries in other directives, in this case, we can omit the identifier for the map entry as shown below.

```xcm
token <auto> T_FOO_OR_BAR as map {
  <0> FOO as 'foo',
  <1> BAR as 'bar'
};

node <auto> N_FOO_OR_BAR as map {
  <0> T_FOO_OR_BAR.FOO,
  <1> T_FOO_OR_BAR.BAR
};
```

> A new node will be generated for each occurrence of its respective token.

## Next steps

- [Directives](./directives.md)
- [Operators](./operators.md)
- [References](./references.md)
- [Modules](./modules.md)

## License

[MIT](../LICENSE)
