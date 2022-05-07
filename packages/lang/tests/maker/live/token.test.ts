import * as Assert from './utils/assert';

test('Parse a TOKEN pattern', () => {
  const { project, context } = Assert.lexer(
    '@@@',
    `
    token <100> TOKEN as '@';`
  );
  // Assert tokens.
  const token = project.symbols.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(token.data.identity).toBe(100);
  Assert.tokens(context, [token.data.identity], 3);
});

test('Parse a TOKEN pattern with zero identity', () => {
  const { project, context } = Assert.lexer(
    'aa',
    `
    token <0> TOKEN as 'a';`
  );
  // Assert tokens.
  const token = project.symbols.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(token.data.identity).toBe(0);
  Assert.tokens(context, [token.data.identity], 2);
});

test('Parse a TOKEN pattern with a pre-declared token reference', () => {
  const { project, context } = Assert.lexer(
    'barfoo',
    `
    token <100> TOKEN_1 as 'foo';
    token <101> TOKEN_2 as 'bar' & TOKEN_1;`
  );
  // Assert tokens.
  const token1 = project.symbols.get('TOKEN_1')!;
  const token2 = project.symbols.get('TOKEN_2')!;
  expect(token1).toBeDefined();
  expect(token2).toBeDefined();
  expect(token1.data.identity).toBe(100);
  expect(token2.data.identity).toBe(101);
  Assert.tokens(context, [token1.data.identity, token2.data.identity], 2);
});

test('Parse a TOKEN pattern with a post-declared token reference', () => {
  const { project, context } = Assert.lexer(
    'barfoo',
    `
    token <100> TOKEN_1 as 'bar' & TOKEN_2;
    token <101> TOKEN_2 as 'foo';`
  );
  // Assert tokens.
  const token1 = project.symbols.get('TOKEN_1')!;
  const token2 = project.symbols.get('TOKEN_2')!;
  expect(token1).toBeDefined();
  expect(token2).toBeDefined();
  expect(token1.data.identity).toBe(100);
  expect(token2.data.identity).toBe(101);
  Assert.tokens(context, [token1.data.identity, token2.data.identity], 2);
});

test('Parse a TOKEN pattern with an alias token reference', () => {
  const { project, context } = Assert.lexer(
    '@@@',
    `
    alias token ALIAS as '@';
    token <100> TOKEN as ALIAS;`
  );
  // Assert tokens.
  const token = project.symbols.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(token.data.identity).toBe(100);
  Assert.tokens(context, [token.data.identity], 3);
});

test('Parse a TOKEN pattern with a template alias token reference', () => {
  const { project, context } = Assert.lexer(
    '@@@',
    `
    alias <X, Y>
    token <X> TEMPLATE as repeat Y;

    alias token ALIAS as '@';
    token <100> TOKEN as TEMPLATE <50, ALIAS>;`
  );
  // Assert templates.
  const template = project.symbols.get('@TEMPLATE:50:ALIAS')!;
  expect(template).toBeDefined();
  expect(template.data.identity).toBe(50);
  // Assert tokens.
  const token = project.symbols.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(token.data.identity).toBe(100);
  Assert.tokens(context, [token.data.identity], 1);
});

test('Parse a TOKEN pattern with a reference to itself', () => {
  const { project, context } = Assert.lexer(
    '@@@',
    `
    token <100> TOKEN as '@' & opt TOKEN;`
  );
  // Assert tokens.
  const token = project.symbols.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(token.data.identity).toBe(100);
  Assert.tokens(context, [token.data.identity], 3);
});

test('Parse a TOKEN pattern with an alias token that has a reference to itself', () => {
  const { project, context } = Assert.lexer(
    '@@@',
    `
    alias token ALIAS as '@' & opt ALIAS;
    token <100> TOKEN as ALIAS;`
  );
  // Assert tokens.
  const token = project.symbols.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(token.data.identity).toBe(100);
  Assert.tokens(context, [token.data.identity], 1);
});

test('Parse a TOKEN pattern referencing a template alias token and passing itself as an argument', () => {
  const { project, context } = Assert.lexer(
    'foofoo',
    `
    alias <X>
    token TEMPLATE as 'foo' & opt X;

    token <100> TOKEN as TEMPLATE <TOKEN>;`
  );
  // Assert templates.
  const template = project.symbols.get('@TEMPLATE:TOKEN')!;
  expect(template).toBeDefined();
  expect(template.data.identity).toBeNaN();
  // Assert tokens.
  const token = project.symbols.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(token.data.identity).toBe(100);
  Assert.tokens(context, [token.data.identity], 2);
});

test('Parse a TOKEN pattern referencing a template alias token that has a reference to itself', () => {
  const { project, context } = Assert.lexer(
    'foofoo',
    `
    alias <X>
    token TEMPLATE as 'foo' & opt TEMPLATE <X>;

    token <100> TOKEN as TEMPLATE <200>;`
  );
  // Assert templates.
  const template = project.symbols.get('@TEMPLATE:200')!;
  expect(template).toBeDefined();
  expect(template.data.identity).toBeNaN();
  // Assert tokens.
  const token = project.symbols.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(token.data.identity).toBe(100);
  Assert.tokens(context, [token.data.identity], 1);
});

test('Parse a TOKEN pattern with a whole token map reference', () => {
  const { project, context } = Assert.lexer(
    'a!b!',
    `
    alias token ALIAS as map {
      <100> A as 'a',
      <101> B as 'b'
    };
    token <auto> TOKEN as ALIAS & '!';`
  );
  // Assert tokens.
  const aliasA = project.symbols.get('ALIAS@A')!;
  const aliasB = project.symbols.get('ALIAS@B')!;
  expect(aliasA).toBeDefined();
  expect(aliasB).toBeDefined();
  expect(aliasA.data.identity).toBe(100);
  expect(aliasB.data.identity).toBe(101);
  Assert.tokens(context, [aliasA.data.identity, aliasB.data.identity], 2);
});

test('Parse a TOKEN pattern with an imported token alias token directive', () => {
  const { project, context } = Assert.lexer(
    'token1token1',
    `
    import './module2';
    token <150> TOKEN as EXTERNAL_TOKEN1;`
  );
  // Assert tokens.
  const token = project.symbols.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(token.data.identity).toBe(150);
  Assert.tokens(context, [token.data.identity], 2);
});
