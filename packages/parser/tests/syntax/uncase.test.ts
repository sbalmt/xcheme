import * as Parser from '../../src/index';
import * as Assert from '../utils/assert';

/**
 * Expected expression tree.
 */
const expression = {
  type: Parser.Nodes.Uncase,
  right: {
    type: Parser.Nodes.Reference,
    value: 'REF'
  }
};

test('Consume the UNCASE expression in a SKIP pattern', () => {
  Assert.skip(`skip uncase REF;`, expression);
});

test('Consume the UNCASE expression in a TOKEN pattern', () => {
  Assert.token(`token <100> TOKEN as uncase REF;`, 'TOKEN', '100', expression);
});

test('Consume the UNCASE expression in a NODE pattern', () => {
  Assert.node(`node <200> NODE as uncase REF;`, 'NODE', '200', expression);
});
