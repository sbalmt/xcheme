import * as Assert from './utils/assert';

test('Output an OPT pattern', () => {
  Assert.output(
    `
    skip '.' & opt '@';`,
    {
      '@SKIP0':
        `new Core.ExpectFlowPattern(` +
        /**/ `new Core.ExpectUnitPattern('.'), ` +
        /**/ `new Core.OptFlowPattern(` +
        /******/ `new Core.ExpectUnitPattern('@')` +
        /**/ `)` +
        `)`
    }
  );
});
