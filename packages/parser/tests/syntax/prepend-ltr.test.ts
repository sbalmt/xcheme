import * as Parser from '../../src/index';
import * as Assert from '../utils/assert';

/**
 * Expected expression tree.
 */
const expression = {
  type: Parser.Nodes.PrependLTR,
  right: {
    type: Parser.Nodes.Reference,
    value: 'REF'
  }
};

// LEFT PREPEND

test('Consume the LEFT PREPEND expression (same as LEFT PREPEND RIGHT) in a SKIP pattern', () => {
  Assert.skip(`skip left prepend REF;`, expression);
});

test('Consume the LEFT PREPEND expression (same as LEFT PREPEND RIGHT) in a TOKEN pattern', () => {
  Assert.token(`token <100> TOKEN as left prepend REF;`, 'TOKEN', '100', expression);
});

test('Consume the LEFT PREPEND expression (same as LEFT PREPEND RIGHT) in a NODE pattern', () => {
  Assert.node(`node <200> NODE as left prepend REF;`, 'NODE', '200', expression);
});

// LEFT PREPEND RIGHT

test('Consume the LEFT PREPEND RIGHT expression in a SKIP pattern', () => {
  Assert.skip(`skip left prepend right REF;`, expression);
});

test('Consume the LEFT PREPEND RIGHT expression in a TOKEN pattern', () => {
  Assert.token(`token <100> TOKEN as left prepend right REF;`, 'TOKEN', '100', expression);
});

test('Consume the LEFT PREPEND RIGHT expression in a NODE pattern', () => {
  Assert.node(`node <200> NODE as left prepend right REF;`, 'NODE', '200', expression);
});
