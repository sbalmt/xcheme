import * as Parser from '../../src/index';
import * as Assert from '../utils/assert';

/**
 * Expected expression tree.
 */
const expression = {
  type: Parser.Nodes.Then,
  left: {
    type: Parser.Nodes.Reference,
    value: 'REF'
  },
  right: {
    type: Parser.Nodes.Else,
    left: {
      type: Parser.Nodes.Reference,
      value: 'TRUE'
    },
    right: {
      type: Parser.Nodes.Reference,
      value: 'FALSE'
    }
  }
};

test('Consume the THEN/ELSE expression in a SKIP pattern', () => {
  Assert.skip(`skip REF then TRUE else FALSE;`, expression);
});

test('Consume the THEN/ELSE expression in a TOKEN pattern', () => {
  Assert.token(`token <100> TOKEN as REF then TRUE else FALSE;`, 'TOKEN', '100', expression);
});

test('Consume the THEN/ELSE expression in a NODE pattern', () => {
  Assert.node(`node <200> NODE as REF then TRUE else FALSE;`, 'NODE', '200', expression);
});
