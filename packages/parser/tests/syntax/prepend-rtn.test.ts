import * as Parser from '../../src/index';
import * as Assert from '../utils/assert';

/**
 * Expected expression tree.
 */
const expression = {
  type: Parser.Nodes.PrependRTN,
  right: {
    type: Parser.Nodes.Reference,
    value: 'REF'
  }
};

// PREPEND NEXT

test('Consume the PREPEND NEXT expression (same as RIGHT PREPEND NEXT) in a SKIP pattern', () => {
  Assert.skip(`skip prepend next REF;`, expression);
});

test('Consume the PREPEND NEXT expression (same as RIGHT PREPEND NEXT) in a TOKEN pattern', () => {
  Assert.token(`token <100> TOKEN as prepend next REF;`, 'TOKEN', '100', expression);
});

test('Consume the PREPEND NEXT expression (same as RIGHT PREPEND NEXT) in a NODE pattern', () => {
  Assert.node(`node <200> NODE as prepend next REF;`, 'NODE', '200', expression);
});

// RIGHT PREPEND NEXT

test('Consume the RIGHT PREPEND NEXT expression in a SKIP pattern', () => {
  Assert.skip(`skip right prepend next REF;`, expression);
});

test('Consume the RIGHT PREPEND NEXT expression in a TOKEN pattern', () => {
  Assert.token(`token <100> TOKEN as right prepend next REF;`, 'TOKEN', '100', expression);
});

test('Consume the RIGHT PREPEND NEXT expression in a NODE pattern', () => {
  Assert.node(`node <200> NODE as right prepend next REF;`, 'NODE', '200', expression);
});
