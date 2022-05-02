# XCHEME - References

References can be very useful to avoid duplicating your code, in other words, instead of writing everything a lot of times, you should use references. XCHEME has are some rules for referencing directives and map entries, let's see down below how to manage them.

## Directive references

As seen in the [directives](./directives.md) section, there are some notes to consider when writing your parser, the directive order implies in the parsing behavior, and for that reason a _token_ directive can't reference a _node_ directive for example... So, for avoiding any mistake let's take a look at the directive reference rules.

#### Token directives

The _token_ directive can only have references to another _token_ or _alias token_ directive, as the _token_ directive performs in the lexer step, there's no way to reference _node_ directives here.

| Directive | Reference   | Behavior  | Example                       |
| --------- | ----------- | --------- | ----------------------------- |
| token     | token       | ✔ Allowed | `token <0> T as TOKEN;`       |
| token     | alias token | ✔ Allowed | `token <0> T as ALIAS_TOKEN;` |
| token     | node        | ❌ Denied | `token <0> T as NODE;`        |
| token     | alias node  | ❌ Denied | `token <0> T as ALIAS_NODE;`  |

#### Node directives

The _node_ directive can only have references to another _node_, _alias node_ or _token_ directive, as the _node_ directive performs in the parsing step, there's no way to reference _alias token_ directives here.

| Directive | Reference   | Behavior  | Example                      |
| --------- | ----------- | --------- | ---------------------------- |
| node      | token       | ✔ Allowed | `node <0> N as TOKEN;`       |
| node      | alias token | ❌ Denied | `node <0> N as ALIAS_TOKEN;` |
| node      | node        | ✔ Allowed | `node <0> N as NODE;`        |
| node      | alias node  | ✔ Allowed | `node <0> N as ALIAS_NODE;`  |

#### Skip directives

The _skip_ directive can only have references to an _alias token_ directive, as the _skip_ directive shouldn't output any result, there's no way to reference _token_ or _node_ directives here.

| Directive | Reference   |           | Example             |
| --------- | ----------- | --------- | ------------------- |
| skip      | token       | ❌ Denied | `skip TOKEN;`       |
| skip      | alias token | ✔ Allowed | `skip ALIAS_TOKEN;` |
| skip      | node        | ❌ Denied | `skip NODE;`        |
| skip      | alias node  | ❌ Denied | `skip ALIAS_NODE;`  |

## Map entry references

When referencing map entries, all the rules above must be considered, but only _alias node_ or _node_ directives can have map entry references, and these references must comes from a _token_ directive.

| Directive | Reference             | Behavior  | Example                             |
| --------- | --------------------- | --------- | ----------------------------------- |
| skip      | token map entry       | ❌ Denied | `skip TOKEN.ENTRY;`                 |
| skip      | alias token map entry | ❌ Denied | `skip ALIAS_TOKEN.ENTRY;`           |
| skip      | node map entry        | ❌ Denied | `skip NODE.ENTRY;`                  |
| skip      | alias node map entry  | ❌ Denied | `skip ALIAS_NODE.ENTRY;`            |
| token     | token map entry       | ❌ Denied | `token <0> T as TOKEN.ENTRY;`       |
| token     | alias token map entry | ❌ Denied | `token <0> T as ALIAS_TOKEN.ENTRY;` |
| token     | node map entry        | ❌ Denied | `token <0> T as NODE.ENTRY;`        |
| token     | alias node map entry  | ❌ Denied | `token <0> T as ALIAS_NODE.ENTRY;`  |
| node      | token map entry       | ✔ Allowed | `node <0> N as TOKEN.ENTRY;`        |
| node      | alias token map entry | ❌ Denied | `node <0> N as ALIAS_TOKEN.ENTRY;`  |
| node      | node map entry        | ❌ Denied | `node <0> N as NODE.ENTRY;`         |
| node      | alias node map entry  | ❌ Denied | `node <0> N as ALIAS_NODE.ENTRY;`   |

> Same behavior for alias directives.

## Next steps

- [Directives](./directives.md)
- [Operators](./operators.md)
- [Operands](./operands.md)
- [Modules](./modules.md)

## License

[MIT](../LICENSE)
