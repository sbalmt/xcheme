import * as Parser from '../../src/index';
import * as Assert from '../utils/assert';

/**
 * Expected expression tree.
 */
const expression = {
  type: Parser.Nodes.PrependLTN,
  right: {
    type: Parser.Nodes.Reference,
    value: 'REF'
  }
};

// LEFT PREPEND NEXT

test('Consume the LEFT PREPEND NEXT expression in a SKIP pattern', () => {
  Assert.skip(`skip left prepend next REF;`, expression);
});

test('Consume the LEFT PREPEND NEXT expression in a TOKEN pattern', () => {
  Assert.token(`token <100> TOKEN as left prepend next REF;`, 'TOKEN', '100', expression);
});

test('Consume the LEFT PREPEND NEXT expression in a NODE pattern', () => {
  Assert.node(`node <200> NODE as left prepend next REF;`, 'NODE', '200', expression);
});
