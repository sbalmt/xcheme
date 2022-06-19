import * as Parser from '../../src/index';
import * as Assert from '../utils/assert';

/**
 * Expected expression tree.
 */
const expression = {
  type: Parser.Nodes.AppendRTL,
  right: {
    type: Parser.Nodes.Reference,
    value: 'REF'
  }
};

// APPEND LEFT

test('Consume the APPEND LEFT expression (same as RIGHT APPEND LEFT) in a SKIP pattern', () => {
  Assert.skip(`skip append left REF;`, expression);
});

test('Consume the APPEND LEFT expression (same as RIGHT APPEND LEFT) in a TOKEN pattern', () => {
  Assert.token(`token <100> TOKEN as append left REF;`, 'TOKEN', '100', expression);
});

test('Consume the APPEND LEFT expression (same as RIGHT APPEND LEFT) in a NODE pattern', () => {
  Assert.node(`node <200> NODE as append left REF;`, 'NODE', '200', expression);
});

// RIGHT APPEND LEFT

test('Consume the RIGHT APPEND LEFT expression in a SKIP pattern', () => {
  Assert.skip(`skip right append left REF;`, expression);
});

test('Consume the RIGHT APPEND LEFT expression in a TOKEN pattern', () => {
  Assert.token(`token <100> TOKEN as right append left REF;`, 'TOKEN', '100', expression);
});

test('Consume the RIGHT APPEND LEFT expression in a NODE pattern', () => {
  Assert.node(`node <200> NODE as right append left REF;`, 'NODE', '200', expression);
});
