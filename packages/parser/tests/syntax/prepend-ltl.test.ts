import * as Parser from '../../src/index';
import * as Assert from '../utils/assert';

/**
 * Expected expression tree.
 */
const expression = {
  type: Parser.Nodes.PrependLTL,
  right: {
    type: Parser.Nodes.Reference,
    value: 'REF'
  }
};

// LEFT PREPEND LEFT

test('Consume the LEFT PREPEND LEFT expression in a SKIP pattern', () => {
  Assert.skip(`skip left prepend left REF;`, expression);
});

test('Consume the LEFT PREPEND LEFT expression in a TOKEN pattern', () => {
  Assert.token(`token <100> TOKEN as left prepend left REF;`, 'TOKEN', '100', expression);
});

test('Consume the LEFT PREPEND LEFT expression in a NODE pattern', () => {
  Assert.node(`node <200> NODE as left prepend left REF;`, 'NODE', '200', expression);
});
