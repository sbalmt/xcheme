# XCHEME - Directives

Using directives we tell XCHEME how to tokenize an input string in the lexer, how to parse a token in the parser and, in some cases, we want to tell how to ignore some characters like white-spaces, tabs, and so on... Something you must consider when writing your parser is the order of the directives, for example, no matter where a _skip_ directive is placed in the code, _skip_ directives always performs first... There are three main directives you should know about, and both of them are written almost in the same way, let's see how to write them and what's the expected behavior for each one.

## Token directives

The _token_ directive is used to consume an input string and produce an output token (as the directive evaluation result). The output token will compose a token list that will be passed as input to the parser (in the parsing step). It performs in the lexer step, after all the _skip_ directives and before all the _node_ directives, for multiple _token_ directives, the second one performs after the first one and so on.

Syntax:

```xcm
token <IDENTITY> IDENTIFIER as EXPRESSION;
```

Example:

```xcm
token <100> T_FOO as 'foo';
```

> Expect a `'foo'` string to produce a `T_FOO` token identified by `100`.

## Node directives

The _node_ directive is used to consume an input token and produce an output node (as the directive evaluation result). The output node will be attached into the main AST during the parsing step. It performs after all _skip_ and _token_ directives, for multiple _node_ directives, the second one performs after the first one and so on.

Syntax:

```xcm
node <IDENTITY> IDENTIFIER as EXPRESSION;
```

Example:

```xcm
node <200> BAR as T_FOO;
```

> Expect a `T_FOO` token to produce a `BAR` node identified by `200`.

## Skip directives

The _skip_ directive is used to consume an input string without producing any output result. All _skip_ directives have no identities or identifiers and therefore cannot be referenced. It performs in the lexer step and before everything, for multiple _skip_ directives, the second one performs after the first one and so on.

Syntax:

```xcm
skip EXPRESSION;
```

Example:

```xcm
skip '\r' | '\n';
```

> Expect a CR or LF character and go ahead without producing any output.

## Alias directives

In some cases we want to reuse a _token_ or a _node_ expression to avoid duplicating the source code, but if we declare it as in the examples above, it will produce the directive result (which can be a _token_ or _node_ output) and may become unexpected behavior... So, to achieve the expected behavior without producing any output, you must prefix the directive with the `alias` modifier, then no _token_ or _node_ output will be produced during the respective directive evaluation. An _alias_ directive performs in its respective _token_ or _node_ step and respecting the reference order.

#### Alias token

The _alias token_ directive is used to consume an input string without producing any output token and can be referenced by another _token_ or _alias token_ directive.

```xcm
alias token ALIAS as EXPRESSION;

token <100> TOKEN as ALIAS;
```

> Identities are optional for _alias token_ directives.

To make an _alias token_ directive more flexible, is possible to set any number of template parameters in the alias statement and further pass the same number of arguments when referencing the respective alias in another directive.

```xcm
alias <ID, EXPRESSION>
token <ID> ALIAS as opt EXPRESSION;

token <100> TOKEN as ALIAS <10, TOKEN>;
```

> The arguments `10` and `TOKEN` are being passed to the `ALIAS` reference.

#### Alias node

The _alias node_ directive is used to consume an input token without producing any output node and can be referenced by another _node_ or _alias node_ directive.

```xcm
alias node ALIAS as EXPRESSION;

node <200> TOKEN as ALIAS;
```

> An identity is optional for _alias node_ directives.

Such as an _alias token_, to make an _alias node_ directive more flexible, any number of template parameters can be specified in the alias statement to be able to receive the same number of arguments when referencing it in a directive.

```xcm
alias <ID, EXPRESSION>
node <ID> ALIAS as opt EXPRESSION;

node <200> NODE as ALIAS <20, NODE>;
```

> Template arguments `20` and `NODE` are being passed to the `ALIAS` reference.

Unlike the normal _token_ or _node_ directive, an _alias_ directive must be referenced by a non aliased directive to take effect, and if that reference need some template parameter, the only acceptable parameter types are identities and references.

## Next steps

- [References](./references.md)
- [Operators](./operators.md)
- [Operands](./operands.md)
- [Modules](./modules.md)

## License

[MIT](../LICENSE)
