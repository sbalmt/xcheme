import * as Assert from './utils/assert';

test("Output an 'ANY' pattern from the operator", () => {
  Assert.output(
    `
    skip *;`,
    {
      '@SKIP0': `new Core.AnyUnitPattern()`
    }
  );
});

test("Output an 'ANY' pattern from the keyword", () => {
  Assert.output(
    `
    skip any;`,
    {
      '@SKIP0': `new Core.AnyUnitPattern()`
    }
  );
});
