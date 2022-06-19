import * as Parser from '../../src/index';
import * as Assert from '../utils/assert';

/**
 * Expected expression tree.
 */
const expression = {
  type: Parser.Nodes.AppendLTN,
  right: {
    type: Parser.Nodes.Reference,
    value: 'REF'
  }
};

// LEFT APPEND NEXT

test('Consume the LEFT APPEND NEXT expression in a SKIP pattern', () => {
  Assert.skip(`skip left append next REF;`, expression);
});

test('Consume the LEFT APPEND NEXT expression in a TOKEN pattern', () => {
  Assert.token(`token <100> TOKEN as left append next REF;`, 'TOKEN', '100', expression);
});

test('Consume the LEFT APPEND NEXT expression in a NODE pattern', () => {
  Assert.node(`node <200> NODE as left append next REF;`, 'NODE', '200', expression);
});
