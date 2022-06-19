import * as Parser from '../../src/index';
import * as Assert from '../utils/assert';

/**
 * Expected expression tree.
 */
const expression = {
  type: Parser.Nodes.AppendRTR,
  right: {
    type: Parser.Nodes.Reference,
    value: 'REF'
  }
};

// APPEND

test('Consume the APPEND expression (same as RIGHT APPEND RIGHT) in a SKIP pattern', () => {
  Assert.skip(`skip append REF;`, expression);
});

test('Consume the APPEND expression (same as RIGHT APPEND RIGHT) in a TOKEN pattern', () => {
  Assert.token(`token <100> TOKEN as append REF;`, 'TOKEN', '100', expression);
});

test('Consume the APPEND expression (same as RIGHT APPEND RIGHT) in a NODE pattern', () => {
  Assert.node(`node <200> NODE as append REF;`, 'NODE', '200', expression);
});

// APPEND RIGHT

test('Consume the APPEND RIGHT expression (same as RIGHT APPEND RIGHT) in a SKIP pattern', () => {
  Assert.skip(`skip append right REF;`, expression);
});

test('Consume the APPEND RIGHT expression (same as RIGHT APPEND RIGHT) in a TOKEN pattern', () => {
  Assert.token(`token <100> TOKEN as append right REF;`, 'TOKEN', '100', expression);
});

test('Consume the APPEND RIGHT expression (same as RIGHT APPEND RIGHT) in a NODE pattern', () => {
  Assert.node(`node <200> NODE as append right REF;`, 'NODE', '200', expression);
});

// RIGHT APPEND RIGHT

test('Consume the RIGHT APPEND RIGHT expression in a SKIP pattern', () => {
  Assert.skip(`skip right append right REF;`, expression);
});

test('Consume the RIGHT APPEND RIGHT expression in a TOKEN pattern', () => {
  Assert.token(`token <100> TOKEN as right append right REF;`, 'TOKEN', '100', expression);
});

test('Consume the RIGHT APPEND RIGHT expression in a NODE pattern', () => {
  Assert.node(`node <200> NODE as right append right REF;`, 'NODE', '200', expression);
});
