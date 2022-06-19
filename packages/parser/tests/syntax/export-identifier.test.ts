import * as Parser from '../../src/index';
import * as Assert from '../utils/assert';

/**
 * Expected expression tree.
 */
const expression = {
  type: Parser.Nodes.Identifier,
  value: 'REF'
};

test('Consume the EXPORT directive pattern with a pre-defined identifier', () => {
  Assert.exportExpression(`export REF;`, expression);
});
