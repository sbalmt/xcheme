import * as Parser from '../../src/index';
import * as Assert from '../utils/assert';

/**
 * Expected expression tree.
 */
const expression = {
  type: Parser.Nodes.PrependRTR,
  right: {
    type: Parser.Nodes.Reference,
    value: 'REF'
  }
};

// PREPEND

test('Consume the PREPEND expression (same as RIGHT PREPEND RIGHT) in a SKIP pattern', () => {
  Assert.skip(`skip prepend REF;`, expression);
});

test('Consume the PREPEND expression (same as RIGHT PREPEND RIGHT) in a TOKEN pattern', () => {
  Assert.token(`token <100> TOKEN as prepend REF;`, 'TOKEN', '100', expression);
});

test('Consume the PREPEND expression (same as RIGHT PREPEND RIGHT) in a NODE pattern', () => {
  Assert.node(`node <200> NODE as prepend REF;`, 'NODE', '200', expression);
});

// PREPEND RIGHT

test('Consume the PREPEND RIGHT expression (same as RIGHT PREPEND RIGHT) in a SKIP pattern', () => {
  Assert.skip(`skip prepend right REF;`, expression);
});

test('Consume the PREPEND RIGHT expression (same as RIGHT PREPEND RIGHT) in a TOKEN pattern', () => {
  Assert.token(`token <100> TOKEN as prepend right REF;`, 'TOKEN', '100', expression);
});

test('Consume the PREPEND RIGHT expression (same as RIGHT PREPEND RIGHT) in a NODE pattern', () => {
  Assert.node(`node <200> NODE as prepend right REF;`, 'NODE', '200', expression);
});

// RIGHT PREPEND RIGHT

test('Consume the RIGHT PREPEND RIGHT expression in a SKIP pattern', () => {
  Assert.skip(`skip right prepend right REF;`, expression);
});

test('Consume the RIGHT PREPEND RIGHT expression in a TOKEN pattern', () => {
  Assert.token(`token <100> TOKEN as right prepend right REF;`, 'TOKEN', '100', expression);
});

test('Consume the RIGHT PREPEND RIGHT expression in a NODE pattern', () => {
  Assert.node(`node <200> NODE as right prepend right REF;`, 'NODE', '200', expression);
});
