import * as Parser from '../../src/index';
import * as Assert from '../utils/assert';

/**
 * Expected expression tree.
 */
const expression = {
  type: Parser.Nodes.Peek,
  right: {
    type: Parser.Nodes.Reference,
    value: 'REF'
  }
};

test('Consume the PEEK expression in a SKIP pattern', () => {
  Assert.skip(`skip peek REF;`, expression);
});

test('Consume the PEEK expression in a TOKEN pattern', () => {
  Assert.token(`token <100> TOKEN as peek REF;`, 'TOKEN', '100', expression);
});

test('Consume the PEEK expression in a NODE pattern', () => {
  Assert.node(`node <200> NODE as peek REF;`, 'NODE', '200', expression);
});
