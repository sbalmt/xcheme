import * as Assert from './utils/assert';

test("Output a 'PREPEND NEXT' pattern", () => {
  Assert.output(
    `
    skip prepend next '@';`,
    {
      '@SKIP0': `new Core.PrependNodePattern(0, 1, 2, new Core.ExpectUnitPattern('@'))`
    }
  );
});

test("Output a 'PREPEND LEFT' pattern", () => {
  Assert.output(
    `
    skip prepend left '@';`,
    {
      '@SKIP0': `new Core.PrependNodePattern(0, 1, 0, new Core.ExpectUnitPattern('@'))`
    }
  );
});

test("Output a 'PREPEND RIGHT' pattern", () => {
  Assert.output(
    `
    skip prepend right '@';`,
    {
      '@SKIP0': `new Core.PrependNodePattern(0, 1, 1, new Core.ExpectUnitPattern('@'))`
    }
  );
});

test("Output a 'PREPEND' pattern", () => {
  Assert.output(
    `
    skip prepend right '@';`,
    {
      '@SKIP0': `new Core.PrependNodePattern(0, 1, 1, new Core.ExpectUnitPattern('@'))`
    }
  );
});

test("Output a 'PREPEND' pattern with multiple patterns", () => {
  Assert.output(
    `
    skip prepend ('@' | '*');`,
    {
      '@SKIP0': `new Core.PrependNodePattern(0, 1, 1, new Core.ChooseUnitPattern('@', '*'))`
    }
  );
});

test("Output a 'PREPEND' pattern with chained patterns", () => {
  Assert.output(
    `
    skip prepend ('@' & '*' & '*' & opt '!');`,
    {
      '@SKIP0':
        `new Core.PrependNodePattern(0, 1, 1, ` +
        /**/ `new Core.ExpectUnitPattern('@'), ` +
        /**/ `new Core.ExpectUnitPattern('*', '*'), ` +
        /**/ `new Core.OptFlowPattern(` +
        /******/ `new Core.ExpectUnitPattern('!')` +
        /**/ `)` +
        `)`
    }
  );
});
