# HTML Sample

This is an example of a parser written in XCHEME Lang for parsing HTML sources.

## Usage

For generating the parser in JavaScript:

```sh
xcm -s ./samples/html/parser.xcm -t ./parser.js
```

> Make sure you have the package `@xcheme/core` installed.

For running the parser instantly:

```sh
xcm -s ./samples/html/parser.xcm -t ./samples/html/input.html --run
```

> Change the option `-t` with another location for parsing another HTML source.
