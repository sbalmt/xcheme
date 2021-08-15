# XCHEME Lang - Basics

XCHEME Lang is a programming language designed for developing lexers and parsers for other languages, which can be a brand new language or some from the current market. This article will help you to get started with XCHEME Lang and furthers your understanding of what can be achieved in a short period of time.

## What is XCHEME Lang?

XCHEME Lang (Or just "XCHEME") is a set of common directives for validating portions of strings, each directive is an atomic pattern (a small action, e.g: `repeat`, `expect`, `choose`) that must be valid for making the analysis process to keep going ahead up to the end of the string. By using atomic patterns, it's possible to join a variety of components and create complex validation rules which will produce _Tokens_ and _Nodes_ (AST) for post-processing.

## A _Hello world!_ example

1. Install the [CLI](../packages/cli).

```sh
npm i @xcheme/cli -g
```

2. Create or [download](../samples/hello/parser.xcm) a new file called parser.xcm and save it with the following contents.

```xcm
skip ' ' | '\r' | '\n';

token T_HELLO       as 'Hello';
token T_WORLD       as 'world';
token T_EXCL_POINT  as '!';
token T_PERIOD      as '.';

node HELLO_WORLD    as T_HELLO & T_WORLD & opt (T_EXCL_POINT | T_PERIOD);
```

3. Create or [download](../samples/hello/input.txt) a new file called input.txt and save it with the following contents.

```
Hello world!
Hello world.
Hello world
```

4. Test your parser by feeding it the input file.

```sh
xcm -s parser.xcm -t input.txt --run --tokens --nodes
```

5. Check the output after the consumption process.

```
Tokens:
    0:0    0001 "Hello"
    0:6    0002 "world"
    0:11   0003 "!"
    1:0    0001 "Hello"
    1:6    0002 "world"
    1:11   0004 "."
    2:0    0001 "Hello"
    2:6    0002 "world"

Nodes:

    0:0    N 5 "Hello world!"
    1:0    N 5 "Hello world."
    2:0    N 5 "Hello world"
```

## What happened?

We just used the XCHEME to make a new parser that's able to consume combinations for _Hello world_ sentences and print which tokens and nodes were produced in the analysis process.

## License

[MIT](https://balmante.eti.br)
