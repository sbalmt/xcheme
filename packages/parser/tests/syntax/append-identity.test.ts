import * as Parser from '../../src/index';
import * as Assert from '../utils/assert';

/**
 * Expected expression tree.
 */
const expression = {
  type: Parser.Nodes.AppendRTR,
  right: {
    type: Parser.Nodes.Arguments,
    left: {
      type: Parser.Nodes.Identity,
      value: '1'
    },
    right: {
      type: Parser.Nodes.Reference,
      value: 'REF'
    }
  }
};

test('Consume the APPEND expression with an identity in a SKIP pattern', () => {
  Assert.skip(`skip append <1> REF;`, expression);
});

test('Consume the APPEND expression with an identity in a TOKEN pattern', () => {
  Assert.token(`token <100> TOKEN as append <1> REF;`, 'TOKEN', '100', expression);
});

test('Consume the APPEND expression with an identity in a NODE pattern', () => {
  Assert.node(`node <200> NODE as append <1> REF;`, 'NODE', '200', expression);
});
