# Hello world Sample

This is an example of a parser written in XCHEME Lang for parsing your first _Hello world!_

## Usage

For generating the parser in JavaScript:

```sh
xcm -s ./samples/hello/parser.xcm -t ./parser.js
```

> Make sure you have the package `@xcheme/core` installed.

For running the parser instantly:

```sh
xcm -s ./samples/hello/parser.xcm -t ./samples/html/input.txt --run
```

> Change the option `-t` with another location for parsing another HTML source.

## License

[MIT](https://balmante.eti.br)
