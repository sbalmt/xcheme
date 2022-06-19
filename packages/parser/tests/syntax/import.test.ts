import * as Parser from '../../src/index';
import * as Assert from '../utils/assert';

/**
 * Expected expression tree.
 */
const expression = {
  type: Parser.Nodes.Import,
  right: {
    type: Parser.Nodes.String,
    value: "'module'"
  }
};

test('Consume the IMPORT directive pattern', () => {
  Assert.tree(`import 'module';`, expression);
});
