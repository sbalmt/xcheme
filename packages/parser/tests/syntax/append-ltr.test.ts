import * as Parser from '../../src/index';
import * as Assert from '../utils/assert';

/**
 * Expected expression tree.
 */
const expression = {
  type: Parser.Nodes.AppendLTR,
  right: {
    type: Parser.Nodes.Reference,
    value: 'REF'
  }
};

// LEFT APPEND

test('Consume the LEFT APPEND expression (same as LEFT APPEND RIGHT) in a SKIP pattern', () => {
  Assert.skip(`skip left append REF;`, expression);
});

test('Consume the LEFT APPEND expression (same as LEFT APPEND RIGHT) in a TOKEN pattern', () => {
  Assert.token(`token <100> TOKEN as left append REF;`, 'TOKEN', '100', expression);
});

test('Consume the LEFT APPEND expression (same as LEFT APPEND RIGHT) in a NODE pattern', () => {
  Assert.node(`node <200> NODE as left append REF;`, 'NODE', '200', expression);
});

// LEFT APPEND RIGHT

test('Consume the LEFT APPEND RIGHT expression in a SKIP pattern', () => {
  Assert.skip(`skip left append right REF;`, expression);
});

test('Consume the LEFT APPEND RIGHT expression in a TOKEN pattern', () => {
  Assert.token(`token <100> TOKEN as left append right REF;`, 'TOKEN', '100', expression);
});

test('Consume the LEFT APPEND RIGHT expression in a NODE pattern', () => {
  Assert.node(`node <200> NODE as left append right REF;`, 'NODE', '200', expression);
});
