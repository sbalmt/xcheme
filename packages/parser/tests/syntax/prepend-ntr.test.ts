import * as Parser from '../../src/index';
import * as Assert from '../utils/assert';

/**
 * Expected expression tree.
 */
const expression = {
  type: Parser.Nodes.PrependNTR,
  right: {
    type: Parser.Nodes.Reference,
    value: 'REF'
  }
};

// NEXT PREPEND

test('Consume the NEXT PREPEND expression (same as NEXT PREPEND RIGHT) in a SKIP pattern', () => {
  Assert.skip(`skip next prepend REF;`, expression);
});

test('Consume the NEXT PREPEND expression (same as NEXT PREPEND RIGHT) in a TOKEN pattern', () => {
  Assert.token(`token <100> TOKEN as next prepend REF;`, 'TOKEN', '100', expression);
});

test('Consume the NEXT PREPEND expression (same as NEXT PREPEND RIGHT) in a NODE pattern', () => {
  Assert.node(`node <200> NODE as next prepend REF;`, 'NODE', '200', expression);
});

// NEXT PREPEND RIGHT

test('Consume the NEXT PREPEND RIGHT expression in a SKIP pattern', () => {
  Assert.skip(`skip next prepend right REF;`, expression);
});

test('Consume the NEXT PREPEND RIGHT expression in a TOKEN pattern', () => {
  Assert.token(`token <100> TOKEN as next prepend right REF;`, 'TOKEN', '100', expression);
});

test('Consume the NEXT PREPEND RIGHT expression in a NODE pattern', () => {
  Assert.node(`node <200> NODE as next prepend right REF;`, 'NODE', '200', expression);
});
