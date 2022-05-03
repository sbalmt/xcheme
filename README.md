<h1>
  <img src="./assets/logo.svg" alt="XCHEME Logo" width="256"/>
</h1>

![ts](https://badgen.net/badge/-/TypeScript?icon=typescript&label&labelColor=blue&color=555555)
![license](https://badgen.net/github/license/balmanth/xcheme)

A set of tools that includes a programming language for generating lexers and parsers for other languages.

## Get started

1. Install the CLI:

```sh
npm i @xcheme/cli
```

2. Create the _Hello World_ parser.

```xcm
skip ' ' | '\t' | '\r' | '\n';

token <auto> T_KWD as uncase map {
  <10> HELLO as 'hello',
  <11> WORLD as 'world'
};

token <auto> T_SBL as map {
  <12> EXC as '!',
  <13> PRD as '.'
};

node <auto> N_KWD as map {
  <20> HELLO_WORLD as T_KWD.HELLO & T_KWD.WORLD & opt (T_SBL.EXC | T_SBL.PRD)
};
```

3. Create the input file.

```txt
Hello World!
heLo WoRlD.
```

4. Run the parser by using the CLI:

```sh
xcm -s ./example.xcm -t ./input.txt --run --tokens --nodes
```

## Documentation

Learn more about XCHEME.

- [Basics](./documents/basics.md)
- [Directives](./documents/directives.md)
- [Operators](./documents/operators.md)
- [Operands](./documents/operands.md)
- [References](./documents/references.md)
- [Modules](./documents/modules.md)

## Samples

Take a look at the samples and learn even more.

- [Hello World](./samples/hello)
- [INI](./samples/ini)
- [HTML](./samples/html)
- [JSON](./samples/json)
- [XCHEME](./samples/xcheme)

## Packages

See each package for more information.

- [Core](./packages/core#get-started) - Where the magic happens.
- [Lang](./packages/lang#get-started) - Woah, a language for building languages.
- [CLI](./packages/cli#get-started) - Put all these amazing things together.

## License

All the packages and extensions in this project are covered by their respective licenses.

All other files are covered by the MIT license, see [LICENSE](./LICENSE).
