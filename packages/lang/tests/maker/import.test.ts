import * as Lang from '../../src/index';
import * as Assert from './assert';

test('Cyclic import error', () => {
  Assert.error(
    [Lang.Errors.IMPORT_FAILURE, Lang.Errors.IMPORT_CYCLIC],
    `
    import './module3';`
  );
});
