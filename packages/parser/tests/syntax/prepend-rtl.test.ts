import * as Parser from '../../src/index';
import * as Assert from '../utils/assert';

/**
 * Expected expression tree.
 */
const expression = {
  type: Parser.Nodes.PrependRTL,
  right: {
    type: Parser.Nodes.Reference,
    value: 'REF'
  }
};

// PREPEND LEFT

test('Consume the PREPEND LEFT expression (same as RIGHT PREPEND LEFT) in a SKIP pattern', () => {
  Assert.skip(`skip prepend left REF;`, expression);
});

test('Consume the PREPEND LEFT expression (same as RIGHT PREPEND LEFT) in a TOKEN pattern', () => {
  Assert.token(`token <100> TOKEN as prepend left REF;`, 'TOKEN', '100', expression);
});

test('Consume the PREPEND LEFT expression (same as RIGHT PREPEND LEFT) in a NODE pattern', () => {
  Assert.node(`node <200> NODE as prepend left REF;`, 'NODE', '200', expression);
});

// RIGHT PREPEND LEFT

test('Consume the RIGHT PREPEND LEFT expression in a SKIP pattern', () => {
  Assert.skip(`skip right prepend left REF;`, expression);
});

test('Consume the RIGHT PREPEND LEFT expression in a TOKEN pattern', () => {
  Assert.token(`token <100> TOKEN as right prepend left REF;`, 'TOKEN', '100', expression);
});

test('Consume the RIGHT PREPEND LEFT expression in a NODE pattern', () => {
  Assert.node(`node <200> NODE as right prepend left REF;`, 'NODE', '200', expression);
});
