import * as Parser from '../../src/index';
import * as Assert from '../utils/assert';

/**
 * Expected expression tree.
 */
const expression = {
  type: Parser.Nodes.Repeat,
  right: {
    type: Parser.Nodes.Reference,
    value: 'REF'
  }
};

test('Consume the REPEAT expression in a SKIP pattern', () => {
  Assert.skip(`skip repeat REF;`, expression);
});

test('Consume the REPEAT expression in a TOKEN pattern', () => {
  Assert.token(`token <100> TOKEN as repeat REF;`, 'TOKEN', '100', expression);
});

test('Consume the REPEAT expression in a NODE pattern', () => {
  Assert.node(`node <200> NODE as repeat REF;`, 'NODE', '200', expression);
});
