import * as Parser from '../../src/index';
import * as Assert from '../utils/assert';

/**
 * Expected expression tree.
 */
const expression = {
  type: Parser.Nodes.Symbol,
  right: {
    type: Parser.Nodes.Reference,
    value: 'REF'
  }
};

test('Consume the SYMBOL expression in a SKIP pattern', () => {
  Assert.skip(`skip symbol REF;`, expression);
});

test('Consume the SYMBOL expression in a TOKEN pattern', () => {
  Assert.token(`token <100> TOKEN as symbol REF;`, 'TOKEN', '100', expression);
});

test('Consume the SYMBOL expression in a NODE pattern', () => {
  Assert.node(`node <200> NODE as symbol REF;`, 'NODE', '200', expression);
});
