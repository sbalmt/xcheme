import * as Assert from './utils/assert';

test("Parse a 'TOKEN' pattern", () => {
  const { project, context } = Assert.lexer(
    '@@@',
    `
    token TOKEN as '@';`
  );
  // Assert tokens.
  const token = project.symbols.get('TOKEN')!;
  expect(token).toBeDefined();
  Assert.tokens(context, [token.data.identity], 3);
});

test("Parse a 'TOKEN' pattern with an alias token reference", () => {
  const { project, context } = Assert.lexer(
    '@@@',
    `
    alias token ALIAS as '@';
          token TOKEN as ALIAS;`
  );
  // Assert tokens.
  const token = project.symbols.get('TOKEN')!;
  expect(token).toBeDefined();
  Assert.tokens(context, [token.data.identity], 3);
});

test("Parse a 'TOKEN' pattern with a reference to itself", () => {
  const { project, context } = Assert.lexer(
    '@@@',
    `
    token TOKEN as '@' & opt TOKEN;`
  );
  // Assert tokens.
  const token = project.symbols.get('TOKEN')!;
  expect(token).toBeDefined();
  Assert.tokens(context, [token.data.identity], 3);
});

test("Parse a 'TOKEN' pattern with an alias token that has a reference to itself", () => {
  const { project, context } = Assert.lexer(
    '@@@',
    `
    alias token ALIAS as '@' & opt ALIAS;
          token TOKEN as ALIAS;`
  );
  // Assert tokens.
  const token = project.symbols.get('TOKEN')!;
  expect(token).toBeDefined();
  Assert.tokens(context, [token.data.identity], 1);
});

test("Parse a 'TOKEN' pattern with a whole token map reference", () => {
  const { project, context } = Assert.lexer(
    'a!b!',
    `
    alias token TOKEN1 as map {
      <100> A as 'a',
      <101> B as 'b'
    };
    token <auto> TOKEN2 as TOKEN1 & '!';`
  );
  // Assert tokens.
  const tokenA = project.symbols.get('TOKEN1@A')!;
  const tokenB = project.symbols.get('TOKEN1@B')!;
  expect(tokenA).toBeDefined();
  expect(tokenB).toBeDefined();
  Assert.tokens(context, [tokenA.data.identity, tokenB.data.identity], 2);
});

test("Parse a 'TOKEN' pattern with an imported alias token pattern", () => {
  const { project, context } = Assert.lexer(
    'token1token1',
    `
    import './module2';
    token TOKEN as EXTERNAL_TOKEN1;`
  );
  // Assert tokens.
  const token = project.symbols.get('TOKEN')!;
  expect(token).toBeDefined();
  Assert.tokens(context, [token.data.identity], 2);
});
