# XCHEME - References

References can be very useful to avoid duplicating your code, in other words, instead of writing everything a lot of times, you should use references, but there are some rules for referencing directives and map entries.

## Directives

As seen in the [directives](./directives.md) section, there are some considerations when writing your parser, the directive order implies in the parsing behavior, and that's why a _token_ directive can't reference a _node_ directive for example... So let's take a look at the directive reference rules.

#### Token directives

The _token_ directive can only have references to another _token_ or _alias token_ directive. As the _token_ directive performs in the lexer step, there's no way to reference _node_ directives here.

| Directive | Reference   |           |
| --------- | ----------- | --------- |
| token     | token       | ✔ Allowed |
| token     | alias token | ✔ Allowed |
| token     | node        | ❌ Denied |
| token     | alias node  | ❌ Denied |

#### Node directives

The _node_ directive can only have references to another _node_, _alias node_ or _token_ directive. As the _node_ directive performs in the parsing step, there's no way to reference _alias token_ directives here.

| Directive | Reference   |           |
| --------- | ----------- | --------- |
| node      | token       | ✔ Allowed |
| node      | alias token | ❌ Denied |
| node      | node        | ✔ Allowed |
| node      | alias node  | ✔ Allowed |

#### Skip directives

The _skip_ directive can only have references to an _alias token_ directive. As the _skip_ directive shouldn't output any result, there's no way to reference _token_ or _node_ directives here.

| Directive | Reference   |           |
| --------- | ----------- | --------- |
| skip      | token       | ❌ Denied |
| skip      | alias token | ✔ Allowed |
| skip      | node        | ❌ Denied |
| skip      | alias node  | ❌ Denied |

## License

[MIT](https://balmante.eti.br)
