import * as Parser from '../../src/index';
import * as Assert from '../utils/assert';

/**
 * Expected expression tree.
 */
const expression = {
  type: Parser.Nodes.Or,
  left: {
    type: Parser.Nodes.Or,
    left: {
      type: Parser.Nodes.Reference,
      value: 'REF1'
    },
    right: {
      type: Parser.Nodes.Reference,
      value: 'REF2'
    }
  },
  right: {
    type: Parser.Nodes.Reference,
    value: 'REF3'
  }
};

test('Consume the OR (keyword) expression in a SKIP pattern', () => {
  Assert.skip(`skip REF1 or REF2 or REF3;`, expression);
});

test('Consume the OR (keyword) expression in a TOKEN pattern', () => {
  Assert.token(`token <100> TOKEN as REF1 or REF2 or REF3;`, 'TOKEN', '100', expression);
});

test('Consume the OR (keyword) expression in a NODE pattern', () => {
  Assert.node(`node <200> NODE as REF1 or REF2 or REF3;`, 'NODE', '200', expression);
});
