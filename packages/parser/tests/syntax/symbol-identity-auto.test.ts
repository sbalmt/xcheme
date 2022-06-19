import * as Parser from '../../src/index';
import * as Assert from '../utils/assert';

/**
 * Expected expression tree.
 */
const expression = {
  type: Parser.Nodes.Symbol,
  right: {
    type: Parser.Nodes.Arguments,
    left: {
      type: Parser.Nodes.Identity,
      value: 'auto'
    },
    right: {
      type: Parser.Nodes.Reference,
      value: 'REF'
    }
  }
};

test('Consume the SYMBOL expression with an auto identity in a SKIP pattern', () => {
  Assert.skip(`skip symbol <auto> REF;`, expression);
});

test('Consume the SYMBOL expression with an auto identity in a TOKEN pattern', () => {
  Assert.token(`token <100> TOKEN as symbol <auto> REF;`, 'TOKEN', '100', expression);
});

test('Consume the SYMBOL expression with an auto identity in a NODE pattern', () => {
  Assert.node(`node <200> NODE as symbol <auto> REF;`, 'NODE', '200', expression);
});
