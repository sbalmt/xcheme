import * as Parser from '../../src/index';
import * as Assert from '../utils/assert';

/**
 * Expected expression tree.
 */
const expression = {
  type: Parser.Nodes.AppendRTN,
  right: {
    type: Parser.Nodes.Reference,
    value: 'REF'
  }
};

// APPEND NEXT

test('Consume the APPEND NEXT expression (same as RIGHT APPEND NEXT) in a SKIP pattern', () => {
  Assert.skip(`skip append next REF;`, expression);
});

test('Consume the APPEND NEXT expression (same as RIGHT APPEND NEXT) in a TOKEN pattern', () => {
  Assert.token(`token <100> TOKEN as append next REF;`, 'TOKEN', '100', expression);
});

test('Consume the APPEND NEXT expression (same as RIGHT APPEND NEXT) in a NODE pattern', () => {
  Assert.node(`node <200> NODE as append next REF;`, 'NODE', '200', expression);
});

// RIGHT APPEND NEXT

test('Consume the RIGHT APPEND NEXT expression in a SKIP pattern', () => {
  Assert.skip(`skip right append next REF;`, expression);
});

test('Consume the RIGHT APPEND NEXT expression in a TOKEN pattern', () => {
  Assert.token(`token <100> TOKEN as right append next REF;`, 'TOKEN', '100', expression);
});

test('Consume the RIGHT APPEND NEXT expression in a NODE pattern', () => {
  Assert.node(`node <200> NODE as right append next REF;`, 'NODE', '200', expression);
});
