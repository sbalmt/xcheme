import * as Parser from '../../src/index';
import * as Assert from '../utils/assert';

/**
 * Expected expression tree.
 */
const expression = {
  type: Parser.Nodes.Reference,
  value: 'REF'
};

test('Consume the SKIP directive pattern', () => {
  Assert.skip(`skip REF;`, expression);
});
