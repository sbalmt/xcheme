# XCHEME - Directives

By using directives, we tell XCHEME how to tokenize an input string in the generated lexer, how to parse a token list in the generated parser and, in some cases, we want to tell as well how to ignore characters like whitespaces, tabs, etc... Something you must consider when writing your parser is the order of the declarations, for example, no matter where a _skip_ directive is placed in the code, _skip_ directives always performs first. There are three main directives we should know about, and both of them are written almost in the same way, let's see how to write them and what is the expected behavior for each one.

## Token directives

The _token_ directive is used to consume an input string and produce an output token as the directive evaluation result. The output token will compose a token list that will be passed as input to the parser in the parsing step. It performs in the lexer step, after all the _skip_ directives and before all the _node_ directives, for multiple _token_ directives, the second one performs after the first one and so on. There are two ways to declare _token_ directives as shown below.

Syntax with an explicit identity:

```xcm
token <IDENTITY> IDENTIFIER as EXPRESSION;
```

For example:

```xcm
token<100> T_FOO as 'foo';
```

> Expect a `'foo'` string to produce a `T_FOO` token with the identity number `100`.

Syntax without an identity.

```xcm
token IDENTIFIER as EXPRESSION;
```

For example:

```xcm
token T_BAR as 'bar';
```

> Expect a `'bar'` string to produce a `T_BAR` token with an identity generated automatically.

## Node directives

The _node_ directive is used to consume an input token and produce an output node as the directive evaluation result. The output node will be attached into the main AST during the parsing step. There are two ways to declare _node_ directives and both of them performs in the parsing step, after all the _skip_ and _token_ directives, for multiple _node_ directives, the second one performs after the first one and so on.

Syntax with an explicit identity:

```xcm
node <IDENTITY> IDENTIFIER as EXPRESSION;
```

For example:

```xcm
node<200> FOO as T_FOO;
```

> Expect a `T_FOO` token to produce a `FOO` node with the identity number `200`.

Syntax without an identity:

```xcm
node IDENTIFIER as EXPRESSION;
```

For example:

```xcm
node BAR as T_BAR;
```

> Expect a `T_BAR` token to produce a `BAR` node with an identity generated automatically.

## Skip directives

The _skip_ directive is used to consume an input string without producing any output result. All the _skip_ directives have no identities or identifiers and therefore cannot be referenced. It performs in the lexer step and before everything, for multiple _skip_ directives, the second one performs after the first one and so on.

Syntax:

```xcm
skip EXPRESSION;
```

For example:

```xcm
skip '\r' | '\n';
```

> Expect a CR or LF character and go ahead without producing any output.

## Alias directives

In some cases we want to reuse a _token_ or a _node_ directive to avoid duplicating the code, but if we declare it as in the examples above, it will output the directive result and may become unexpected behavior. That's why we must prefix the `alias` modifier in the directive declaration. An _alias_ directive performs in its respective _token_ step or _node_ step respecting the reference order.

#### Alias token

The _alias token_ directive is used to consume an input string without producing an output token.

```xcm
alias token <IDENTITY> IDENTIFIER as EXPRESSION;
```

> The syntax without an identity also works.

#### Alias node

The _alias node_ directive is used to consume an input token without producing an output node.

```xcm
alias node <IDENTITY> IDENTIFIER as EXPRESSION;
```

> Try as well the syntax without an identity.

Unlike the common _token_ or _node_ directive, an _alias_ directive must be referenced by a non aliased directive to take effect. And talking about references, let's see how to manage references in the next steps.

## Next steps

- [Operators](./operators.md)
- [Operands](./operands.md)
- [References](./references.md)

## License

[MIT](https://balmante.eti.br)
