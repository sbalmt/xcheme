import * as Parser from '../../src/index';
import * as Assert from '../utils/assert';

/**
 * Expected expression tree.
 */
const expression = {
  type: Parser.Nodes.Access,
  left: {
    type: Parser.Nodes.Reference,
    value: 'MAP'
  },
  right: {
    type: Parser.Nodes.Reference,
    value: 'MEMBER'
  }
};

test('Consume the ACCESS expression in a SKIP pattern', () => {
  Assert.skip(`skip MAP.MEMBER;`, expression);
});

test('Consume the ACCESS expression in a TOKEN pattern', () => {
  Assert.token(`token <100> TOKEN as MAP.MEMBER;`, 'TOKEN', '100', expression);
});

test('Consume the ACCESS expression in a NODE pattern', () => {
  Assert.node(`node <200> NODE as MAP.MEMBER;`, 'NODE', '200', expression);
});
