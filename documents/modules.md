# XCHEME - Modules

As part of the modularization feature, XCHEME has two statements for exporting and importing directives from .xcm files, it will help you to split the source code into modules and better organize the project. See down below how to work with them.

#### Export directive

Using the export statement is possible to share a _token_, _node_, _alias token_ and/or _alias node_ directive with other module making easier to split the source code and reusing it together with an import statement.

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

> Export the previously declared `T_FOO` token directive.

#### Import directive

Using the import statement is possible to copy all exported directives from another module into the current one sharing the same context.

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
