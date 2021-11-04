<h1>
  <img src="./resources/logo.svg" alt="XCHEME Logo" width="256"/>
</h1>

![ts](https://badgen.net/badge/-/TypeScript?icon=typescript&label&labelColor=blue&color=555555)
![license](https://badgen.net/github/license/balmanth/xcheme)

A set of tools that includes a programming language for generating lexers and parsers for other languages.

```xcm
skip ' ' | '\t' | '\r' | '\n';

alias token T_H as 'h' | 'H';
alias token T_E as 'e' | 'E';
alias token T_L as 'l' | 'L';
alias token T_O as 'o' | 'O';

token T_HELLO as T_H & T_E & T_L & T_L & T_O;
token T_EP    as repeat '!';

node HELLO as T_HELLO & opt T_EP;
```

## Documentation

Learn more about XCHEME.

- [Basics](./documents/basics.md)
- [Directives](./documents/directives.md)
- [Operators](./documents/operators.md)
- [Operands](./documents/operands.md)
- [References](./documents/references.md)

## Samples

Take a look at the samples and learn even more.

- [Hello World](./samples/hello)
- [INI](./samples/ini)
- [HTML](./samples/html)
- [JSON](./samples/json)
- [XCHEME](./samples/xcheme)

## Packages

See each package index for more information.

- [Core](./packages/core#get-started) - Where the magic happens.
- [Lang](./packages/lang#get-started) - Woah, a language for building languages.
- [CLI](./packages/cli#get-started) - Put all these amazing things together.

## License

[MIT](https://balmante.eti.br)
