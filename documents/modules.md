# XCHEME - Modules

#### Export directive

By using the `export` statement is possible to share a _token_, _node_, _alias token_ and/or _alias node_ directive with other modules making easier to split the source code and reusing it together with an `import` statement.

Syntax:

```xcm
export DIRECTIVE;
```

Examples:

```xcm
export token <100> T_FOO as 'foo';
```

> Export the `T_FOO` token directive.

```xcm
token <100> T_FOO as 'foo';

export T_FOO;
```

> Export the `T_FOO` token directive previously declared.

#### Import directive

By using the `import` statement is possible to copy all exported directives from another module into the current one sharing the same context.

Syntax:

```xcm
import PATH;
```

Example:

```xcm
import './path/to';
```

> Copy all exported directives from `./path/to.xcm` into the current context.

## Next steps

- [Directives](./directives.md)
- [Operators](./operators.md)
- [Operands](./operands.md)
- [References](./references.md)

## License

[MIT](../LICENSE)
