# XCHEME CLI

![ts](https://badgen.net/badge/-/TypeScript?icon=typescript&label&labelColor=blue&color=555555)
![npm](https://badgen.net/npm/v/@xcheme/cli)
![license](https://badgen.net/github/license/balmanth/xcheme)

This package provides the XCHEME CLI.

## Get started

Install using npm:

```sh
npm i @xcheme/cli
```

## Usage

Seeing all options available:

```sh
xcm --help
```

Generating the parser in JavaScript:

```sh
xcm -s ./path/to/source.xcm
```

Running the parser instantly:

```sh
xcm -s ./path/to/source.xcm -t ./path/to/file.ex --run
```

## License

All files in this package are covered by the MIT license, see [LICENSE](./LICENSE).
