import * as Core from '@xcheme/core';

import * as Assert from './utils/assert';

test('Output a PREPEND pattern with an identity', () => {
  Assert.output(
    `
    skip prepend <50> 'foo';`,
    {
      '@SKIP0': `new Core.PrependNodePattern(50, 1, 1, new Core.ExpectUnitPattern('f', 'o', 'o'))`
    }
  );
});

test('Output a PREPEND pattern with an auto identity', () => {
  Assert.output(
    `
    alias token <50> ALIAS as 'foo';
    skip prepend <auto> ALIAS;`,
    {
      '@SKIP0':
        `new Core.PrependNodePattern(${Core.Source.Output}, 1, 1, ` +
        /**/ `new Core.UseValuePattern(50, new Core.ExpectUnitPattern('f', 'o', 'o'))` +
        `)`
    }
  );
});

test('Output a PREPEND pattern without a self identity', () => {
  Assert.output(
    `
    token <50> TOKEN as prepend 'foo';`,
    {
      TOKEN:
        `new Core.EmitTokenPattern(50, ` +
        /**/ `new Core.PrependNodePattern(50, 1, 1, new Core.ExpectUnitPattern('f', 'o', 'o'))` +
        `)`
    }
  );
});

test('Output a PREPEND without a self identity in a MAP operand', () => {
  Assert.output(
    `
    alias token <auto> ALIAS as map {
      ENTRY as 'foo' & prepend 'bar'
    };`,
    {
      ALIAS:
        `new Core.MapFlowPattern(` +
        /**/ `new Core.SetValueRoute(0, ` +
        /******/ `new Core.PrependNodePattern(0, 1, 1, new Core.ExpectUnitPattern('b', 'a', 'r')), 'f', 'o', 'o'` +
        /**/ `)` +
        `)`
    }
  );
});

test('Output a PREPEND pattern with an expression', () => {
  Assert.output(
    `
    skip prepend <50> ('f' | 'o');`,
    {
      '@SKIP0': `new Core.PrependNodePattern(50, 1, 1, new Core.ChooseUnitPattern('f', 'o'))`
    }
  );
});

test('Output a PREPEND pattern with chained expressions', () => {
  Assert.output(
    `
    skip prepend <50> ('f' & 'o' & 'o' & opt '!');`,
    {
      '@SKIP0':
        `new Core.PrependNodePattern(50, 1, 1, ` +
        /**/ `new Core.ExpectUnitPattern('f'), ` +
        /**/ `new Core.ExpectUnitPattern('o', 'o'), ` +
        /**/ `new Core.OptFlowPattern(` +
        /******/ `new Core.ExpectUnitPattern('!')` +
        /**/ `)` +
        `)`
    }
  );
});

test('Output a LEFT PREPEND LEFT pattern', () => {
  Assert.output(
    `
    skip left prepend <50> left 'foo';`,
    {
      '@SKIP0': `new Core.PrependNodePattern(50, 0, 0, new Core.ExpectUnitPattern('f', 'o', 'o'))`
    }
  );
});

test('Output a RIGHT PREPEND LEFT pattern', () => {
  Assert.output(
    `
    skip right prepend <51> left 'foo';`,
    {
      '@SKIP0': `new Core.PrependNodePattern(51, 1, 0, new Core.ExpectUnitPattern('f', 'o', 'o'))`
    }
  );
});

test('Output a PREPEND LEFT pattern (same as RIGHT PREPEND LEFT)', () => {
  Assert.output(
    `
    skip prepend <52> left 'foo';`,
    {
      '@SKIP0': `new Core.PrependNodePattern(52, 1, 0, new Core.ExpectUnitPattern('f', 'o', 'o'))`
    }
  );
});

test('Output a NEXT PREPEND LEFT pattern', () => {
  Assert.output(
    `
    skip next prepend <53> left 'foo';`,
    {
      '@SKIP0': `new Core.PrependNodePattern(53, 2, 0, new Core.ExpectUnitPattern('f', 'o', 'o'))`
    }
  );
});

test('Output a LEFT PREPEND RIGHT pattern', () => {
  Assert.output(
    `
    skip left prepend <60> right 'foo';`,
    {
      '@SKIP0': `new Core.PrependNodePattern(60, 0, 1, new Core.ExpectUnitPattern('f', 'o', 'o'))`
    }
  );
});

test('Output a RIGHT PREPEND RIGHT pattern', () => {
  Assert.output(
    `
    skip right prepend <61> right 'foo';`,
    {
      '@SKIP0': `new Core.PrependNodePattern(61, 1, 1, new Core.ExpectUnitPattern('f', 'o', 'o'))`
    }
  );
});

test('Output a PREPEND RIGHT pattern (same as RIGHT PREPEND RIGHT)', () => {
  Assert.output(
    `
    skip prepend <62> right 'foo';`,
    {
      '@SKIP0': `new Core.PrependNodePattern(62, 1, 1, new Core.ExpectUnitPattern('f', 'o', 'o'))`
    }
  );
});

test('Output a NEXT PREPEND RIGHT pattern', () => {
  Assert.output(
    `
    skip next prepend <63> right 'foo';`,
    {
      '@SKIP0': `new Core.PrependNodePattern(63, 2, 1, new Core.ExpectUnitPattern('f', 'o', 'o'))`
    }
  );
});

test('Output a LEFT PREPEND NEXT pattern', () => {
  Assert.output(
    `
    skip left prepend <70> next 'foo';`,
    {
      '@SKIP0': `new Core.PrependNodePattern(70, 0, 2, new Core.ExpectUnitPattern('f', 'o', 'o'))`
    }
  );
});

test('Output a RIGHT PREPEND NEXT pattern', () => {
  Assert.output(
    `
    skip right prepend <71> next 'foo';`,
    {
      '@SKIP0': `new Core.PrependNodePattern(71, 1, 2, new Core.ExpectUnitPattern('f', 'o', 'o'))`
    }
  );
});

test('Output a PREPEND NEXT pattern (same as RIGHT PREPEND NEXT)', () => {
  Assert.output(
    `
    skip prepend <72> next 'foo';`,
    {
      '@SKIP0': `new Core.PrependNodePattern(72, 1, 2, new Core.ExpectUnitPattern('f', 'o', 'o'))`
    }
  );
});

test('Output a NEXT PREPEND NEXT pattern', () => {
  Assert.output(
    `
    skip next prepend <73> next 'foo';`,
    {
      '@SKIP0': `new Core.PrependNodePattern(73, 2, 2, new Core.ExpectUnitPattern('f', 'o', 'o'))`
    }
  );
});
