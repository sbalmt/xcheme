import * as Core from '@xcheme/core';

import * as Assert from './utils/assert';

test('Output an APPEND pattern with an identity', () => {
  Assert.output(
    `
    skip append <50> 'foo';`,
    {
      '@SKIP0': `new Core.AppendNodePattern(50, 1, 1, new Core.ExpectUnitPattern('f', 'o', 'o'))`
    }
  );
});

test('Output an APPEND pattern with an auto identity', () => {
  Assert.output(
    `
    alias token <50> ALIAS as 'foo';
    skip append <auto> ALIAS;`,
    {
      '@SKIP0':
        `new Core.AppendNodePattern(${Core.Source.Output}, 1, 1, ` +
        /**/ `new Core.UseValuePattern(50, new Core.ExpectUnitPattern('f', 'o', 'o'))` +
        `)`
    }
  );
});

test('Output an APPEND pattern without a self identity', () => {
  Assert.output(
    `
    token <50> TOKEN as append 'foo';`,
    {
      TOKEN:
        `new Core.EmitTokenPattern(50, ` +
        /**/ `new Core.AppendNodePattern(50, 1, 1, new Core.ExpectUnitPattern('f', 'o', 'o'))` +
        `)`
    }
  );
});

test('Output an APPEND pattern with an expression', () => {
  Assert.output(
    `
    skip append <50> ('f' | 'o');`,
    {
      '@SKIP0': `new Core.AppendNodePattern(50, 1, 1, new Core.ChooseUnitPattern('f', 'o'))`
    }
  );
});

test('Output an APPEND pattern with chained expressions', () => {
  Assert.output(
    `
    skip append <50> ('f' & 'o' & 'o' & opt '!');`,
    {
      '@SKIP0':
        `new Core.AppendNodePattern(50, 1, 1, ` +
        /**/ `new Core.ExpectUnitPattern('f'), ` +
        /**/ `new Core.ExpectUnitPattern('o', 'o'), ` +
        /**/ `new Core.OptFlowPattern(` +
        /******/ `new Core.ExpectUnitPattern('!')` +
        /**/ `)` +
        `)`
    }
  );
});

test('Output a LEFT APPEND LEFT pattern', () => {
  Assert.output(
    `
    skip left append <50> left 'foo';`,
    {
      '@SKIP0': `new Core.AppendNodePattern(50, 0, 0, new Core.ExpectUnitPattern('f', 'o', 'o'))`
    }
  );
});

test('Output a RIGHT APPEND LEFT pattern', () => {
  Assert.output(
    `
    skip right append <51> left 'foo';`,
    {
      '@SKIP0': `new Core.AppendNodePattern(51, 1, 0, new Core.ExpectUnitPattern('f', 'o', 'o'))`
    }
  );
});

test('Output an APPEND LEFT pattern (same as RIGHT APPEND LEFT)', () => {
  Assert.output(
    `
    skip append <52> left 'foo';`,
    {
      '@SKIP0': `new Core.AppendNodePattern(52, 1, 0, new Core.ExpectUnitPattern('f', 'o', 'o'))`
    }
  );
});

test('Output a NEXT APPEND LEFT pattern', () => {
  Assert.output(
    `
    skip next append <53> left 'foo';`,
    {
      '@SKIP0': `new Core.AppendNodePattern(53, 2, 0, new Core.ExpectUnitPattern('f', 'o', 'o'))`
    }
  );
});

test('Output a LEFT APPEND RIGHT pattern', () => {
  Assert.output(
    `
    skip left append <60> right 'foo';`,
    {
      '@SKIP0': `new Core.AppendNodePattern(60, 0, 1, new Core.ExpectUnitPattern('f', 'o', 'o'))`
    }
  );
});

test('Output a RIGHT APPEND RIGHT pattern', () => {
  Assert.output(
    `
    skip right append <61> right 'foo';`,
    {
      '@SKIP0': `new Core.AppendNodePattern(61, 1, 1, new Core.ExpectUnitPattern('f', 'o', 'o'))`
    }
  );
});

test('Output an APPEND RIGHT pattern (same as RIGHT APPEND RIGHT)', () => {
  Assert.output(
    `
    skip append <62> right 'foo';`,
    {
      '@SKIP0': `new Core.AppendNodePattern(62, 1, 1, new Core.ExpectUnitPattern('f', 'o', 'o'))`
    }
  );
});

test('Output a NEXT APPEND RIGHT pattern', () => {
  Assert.output(
    `
    skip next append <63> right 'foo';`,
    {
      '@SKIP0': `new Core.AppendNodePattern(63, 2, 1, new Core.ExpectUnitPattern('f', 'o', 'o'))`
    }
  );
});

test('Output a LEFT APPEND NEXT pattern', () => {
  Assert.output(
    `
    skip left append <70> next 'foo';`,
    {
      '@SKIP0': `new Core.AppendNodePattern(70, 0, 2, new Core.ExpectUnitPattern('f', 'o', 'o'))`
    }
  );
});

test('Output a RIGHT APPEND NEXT pattern', () => {
  Assert.output(
    `
    skip right append <71> next 'foo';`,
    {
      '@SKIP0': `new Core.AppendNodePattern(71, 1, 2, new Core.ExpectUnitPattern('f', 'o', 'o'))`
    }
  );
});

test('Output an APPEND NEXT pattern (same as RIGHT APPEND NEXT)', () => {
  Assert.output(
    `
    skip append <72> next 'foo';`,
    {
      '@SKIP0': `new Core.AppendNodePattern(72, 1, 2, new Core.ExpectUnitPattern('f', 'o', 'o'))`
    }
  );
});

test('Output a NEXT APPEND NEXT pattern', () => {
  Assert.output(
    `
    skip next append <73> next 'foo';`,
    {
      '@SKIP0': `new Core.AppendNodePattern(73, 2, 2, new Core.ExpectUnitPattern('f', 'o', 'o'))`
    }
  );
});
