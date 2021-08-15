# XCHEME Sample

This is an example of a parser written in XCHEME Lang for parsing another XCHEME Lang source.

## Usage

For generating the parser in JavaScript:

```sh
xcm -s ./samples/xcheme/parser.xcm -t ./parser.js
```

> Make sure you have the package `@xcheme/core` installed.

For running the parser instantly:

```sh
xcm -s ./samples/xcheme/parser.xcm -t ./sampes/xcheme/parser.xcm --run
```

> Change the option `-t` with another location for parsing another XCHEME source.

## License

[MIT](https://balmante.eti.br)
