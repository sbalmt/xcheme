import * as Lang from '../../../src/index';
import * as Assert from './utils/assert';

test('Cyclic IMPORT error', () => {
  Assert.error(
    `
    import './module3';`,
    [
      {
        code: Lang.Errors.IMPORT_FAILURE,
        column: [11, 22],
        line: [1, 1]
      },
      {
        code: Lang.Errors.IMPORT_CYCLIC,
        column: [7, 18],
        line: [1, 1]
      }
    ]
  );
});
