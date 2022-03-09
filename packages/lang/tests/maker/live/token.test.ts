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
  expect(token.data.identity).toBe(0);
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
  expect(token.data.identity).toBe(1);
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
  expect(token.data.identity).toBe(0);
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
  expect(token.data.identity).toBe(1);
  Assert.tokens(context, [token.data.identity], 1);
});

test("Parse a 'TOKEN' pattern with a whole token map reference", () => {
  const { project, context } = Assert.lexer(
    'a!b!',
    `
    alias token <auto> ALIAS as map {
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

test("Parse a 'TOKEN' pattern with an imported token alias token directive", () => {
  const { project, context } = Assert.lexer(
    'token1token1',
    `
    import './module2';
    token <3030> TOKEN as EXTERNAL_TOKEN1;`
  );
  // Assert tokens.
  const token = project.symbols.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(token.data.identity).toBe(3030);
  Assert.tokens(context, [token.data.identity], 2);
});
