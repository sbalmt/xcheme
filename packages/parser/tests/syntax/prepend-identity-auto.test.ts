import * as Parser from '../../src/index';
import * as Assert from '../utils/assert';

/**
 * Expected expression tree.
 */
const expression = {
  type: Parser.Nodes.PrependRTR,
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

test('Consume the PREPEND expression with an identity in a SKIP pattern', () => {
  Assert.skip(`skip prepend <auto> REF;`, expression);
});

test('Consume the PREPEND expression with an identity in a TOKEN pattern', () => {
  Assert.token(`token <100> TOKEN as prepend <auto> REF;`, 'TOKEN', '100', expression);
});

test('Consume the PREPEND expression with an identity in a NODE pattern', () => {
  Assert.node(`node <200> NODE as prepend <auto> REF;`, 'NODE', '200', expression);
});
