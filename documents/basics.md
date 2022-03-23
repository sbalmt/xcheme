# XCHEME - Basics

XCHEME Lang is a programming language designed for developing lexers and parsers for other languages, it can be a brand new language or some from the market. This article will help you to get started with XCHEME and furthers your understanding of what can be achieved with this technology.

## What is XCHEME?

XCHEME Lang (Or just "XCHEME") is a set of case-sensitive directives and expressions commonly used for validating portions of strings, each directive and expression is an atomic pattern (a small action, e.g: `repeat`, `expect`, `choose`, etc...) that must be valid to make the analysis process move on to the end of the string. By using atomic patterns, it's possible to combine a variety of components and create complex validation rules that will produce _Tokens_ and _Nodes_ already in an AST (Abstract Syntax Tree) for post-processing.

## A _Hello world!_ example

1. Install the [CLI](../packages/cli).

```sh
npm i @xcheme/cli -g
```

2. Create a new file `parser.xcm` (or [download](../samples/hello/parser.xcm) the sample) and save it with the following contents.

```xcm
skip ' ' | '\r' | '\n';

token <1> T_HELLO      as uncase 'hello';
token <2> T_WORLD      as uncase 'world';
token <3> T_EXCL_POINT as '!';
token <4> T_PERIOD     as '.';

node <1> HELLO_WORLD as T_HELLO & T_WORLD & opt (T_EXCL_POINT | T_PERIOD);
```

3. Create a new file `input.txt` (or [download](../samples/hello/input.txt) the sample) and save it with the following contents.

```
hello world!
Hello World.
Hello world
```

4. Test your parser by feeding it the input file.

```sh
xcm -s parser.xcm -t input.txt --run --tokens --nodes
```

5. Check the output after the consumption process.

```
Tokens:

          Code Fragment
   0:0    0001 "Hello"
   0:6    0002 "World"
   0:11   0003 "!"
   1:0    0001 "Hello"
   1:6    0002 "World"
   1:11   0004 "."
   2:0    0001 "Hello"
   2:6    0002 "World"

Nodes:

    0:0    N 1 "Hello World!"
    1:0    N 1 "Hello World."
    2:0    N 1 "Hello World"

Done!
```

## What happened?

We just used XCHEME to make a parser that's able to consume combinations of _hello world_ sentences, and we also printed all the tokens and nodes resulting of the analysis process... To get a deep understanding of what happened, why it happened that way, and start creating your own lexer and/or parser, take a time to delve into the next steps.

## Next steps

- [Directives](./directives.md)
- [References](./references.md)
- [Operators](./operators.md)

## License

[MIT](../LICENSE)
