import * as Lang from '../../src/index';
import * as Helper from './helper';

test('Map with duplicate entry identifier', () => {
  const input = `token TOKEN as map { <0> A as 'a', <0> A as 'b'};`;
  Helper.makeError(new Lang.LiveCoder(), input, [Lang.Errors.DUPLICATE_IDENTIFIER]);
});
