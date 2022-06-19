import * as Parser from '../../src/index';
import * as Assert from '../utils/assert';

/**
 * Expected expression tree.
 */
const expression = {
  type: Parser.Nodes.Set,
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

test('Consume the SET expression in a SKIP pattern', () => {
  Assert.skip(`skip set <1> REF;`, expression);
});

test('Consume the SET expression in a TOKEN pattern', () => {
  Assert.token(`token <100> TOKEN as set <1> REF;`, 'TOKEN', '100', expression);
});

test('Consume the SET expression in a NODE pattern', () => {
  Assert.node(`node <200> NODE as set <1> REF;`, 'NODE', '200', expression);
});
