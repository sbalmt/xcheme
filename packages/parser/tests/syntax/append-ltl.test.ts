import * as Parser from '../../src/index';
import * as Assert from '../utils/assert';

/**
 * Expected expression tree.
 */
const expression = {
  type: Parser.Nodes.AppendLTL,
  right: {
    type: Parser.Nodes.Reference,
    value: 'REF'
  }
};

// LEFT APPEND LEFT

test('Consume the LEFT APPEND LEFT expression in a SKIP pattern', () => {
  Assert.skip(`skip left append left REF;`, expression);
});

test('Consume the LEFT APPEND LEFT expression in a TOKEN pattern', () => {
  Assert.token(`token <100> TOKEN as left append left REF;`, 'TOKEN', '100', expression);
});

test('Consume the LEFT APPEND LEFT expression in a NODE pattern', () => {
  Assert.node(`node <200> NODE as left append left REF;`, 'NODE', '200', expression);
});
