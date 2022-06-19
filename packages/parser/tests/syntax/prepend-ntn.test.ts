import * as Parser from '../../src/index';
import * as Assert from '../utils/assert';

/**
 * Expected expression tree.
 */
const expression = {
  type: Parser.Nodes.PrependNTN,
  right: {
    type: Parser.Nodes.Reference,
    value: 'REF'
  }
};

// NEXT PREPEND NEXT

test('Consume the NEXT PREPEND NEXT expression in a SKIP pattern', () => {
  Assert.skip(`skip next prepend next REF;`, expression);
});

test('Consume the NEXT PREPEND NEXT expression in a TOKEN pattern', () => {
  Assert.token(`token <100> TOKEN as next prepend next REF;`, 'TOKEN', '100', expression);
});

test('Consume the NEXT PREPEND NEXT expression in a NODE pattern', () => {
  Assert.node(`node <200> NODE as next prepend next REF;`, 'NODE', '200', expression);
});
