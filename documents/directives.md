# XCHEME - Directives

By using directives, you tell XCHEME how to tokenize an input string in the generated lexer, how to parse a token list in the generated parser and, in some cases, your want to tell as well how to ignore some characters, like whitespaces, tabs, etc... There are three main directives you should know, and both of them are written almost in the same form.

## Directives

Let's take a look at all the directives types and how write them.

#### Token directives

The _token_ directive is used to consume an input string and produce an output token as the directive result. The output token will compound a token list that will be input to the parser in the parsing step. There are two ways to declare _token_ directives.

Syntax with an explicit identity:

```xcm
token <IDENTITY> IDENTIFIER as EXPRESSION;
```

For example:

```xcm
token<100> T_FOO as 'foo';
```

> Expect a `foo` string to produce a `T_FOO` token with the identity `100`.

Syntax without an identity.

```xcm
token IDENTIFIER as EXPRESSION;
```

For example:

```xcm
token T_BAR as 'bar';
```

> Expect a `bar` string to produce a `T_BAR` token with an identity generated automatically.

#### Node directives

The _node_ directive is used to consume an input token and produce an output node as the directive result. The output node will be attached in the main AST. There are also two ways to declare _node_ directives.

Syntax with an explicit identity:

```xcm
node <IDENTITY> IDENTIFIER as EXPRESSION;
```

For example:

```xcm
node<200> FOO as T_FOO;
```

> Expect a `T_FOO` token to produce a `FOO` node with the identity `200`.

Syntax without an identity:

```xcm
node IDENTIFIER as EXPRESSION;
```

For example:

```xcm
node BAR as T_BAR;
```

> Expect a `T_BAR` token to produce a `BAR` node with an identity generated automatically.

#### Skip directives

The _skip_ directive is used to consume an input string without producing any directive output. All the _skip_ directives have no identities or identifiers and therefore cannot be referenced.

Syntax:

```xcm
skip EXPRESSION;
```

For example:

```xcm
skip '\r' | '\n';
```

> Expect a CR or LF character and go ahead without producing any output.

## Aliases

In some cases you want to reuse a _token_ or _node_ directive to avoid duplicating your code, but if you declare a _token_ or _node_ as in the examples above, it will output the directive result and may become unexpected behavior. That's why you should combine the `alias` modifier.

#### Alias token

The _alias token_ directive is used to consume an input string without producing an output token.

```xcm
alias token <IDENTITY> IDENTIFIER as EXPRESSION;
```

> Try the syntax without an identity as well.

#### Alias node

The _alias node_ directive is used to consume an input token without producing an output node.

```xcm
alias node <IDENTITY> IDENTIFIER as EXPRESSION;
```

> Try the syntax form without an identity as well.

Unlike the common _token_ or _node_ directive, an _alias_ directive should be referenced by a common directive to take effect. And by talking about references, let's see how to manage references in the next steps.

## Notes

Something you must consider when writing your parser is the order of the declarations, for example, no matter where a _skip_ directive is placed, _skip_ directives always performs first. See below the expected behavior for each directive type.

#### Skip directives

Perform in the lexer step and before everything. For multiple _skip_ directives, the second one performs after the first one and so on.

#### Token directives

Performs in the lexer step, after all the _skip_ directives and before all the _node_ directives. For multiple _token_ directives, the second one performs after the first one and so on.

#### Node directives

Performs in the parsing step, after all the _skip_ and _token_ directives. For multiple _node_ directives, the second one performs after the first one and so on.

#### Alias directives

Follow the _token_ or _node_ considerations and performs according to the reference order.

## Next steps

- [Operators](./operators.md)
- [Operands](./operands.md)
- [References](./references.md)

## License

[MIT](https://balmante.eti.br)
