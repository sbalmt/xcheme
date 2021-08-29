# INI Sample

This is an example of a parser written in XCHEME Lang for parsing INI sources.

## Usage

For generating the parser in JavaScript:

```sh
xcm -s ./samples/ini/parser.xcm -t ./parser.js
```

> Make sure you have the package `@xcheme/core` installed.

For running the parser instantly:

```sh
xcm -s ./samples/ini/parser.xcm -t ./samples/ini/input.ini --run
```

> Change the option `-t` with another location for parsing another JSON source.

## License

[MIT](https://balmante.eti.br)
