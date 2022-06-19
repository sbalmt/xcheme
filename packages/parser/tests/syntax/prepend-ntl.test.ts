import * as Parser from '../../src/index';
import * as Assert from '../utils/assert';

/**
 * Expected expression tree.
 */
const expression = {
  type: Parser.Nodes.PrependNTL,
  right: {
    type: Parser.Nodes.Reference,
    value: 'REF'
  }
};

// NEXT PREPEND LEFT

test('Consume the NEXT PREPEND LEFT expression in a SKIP pattern', () => {
  Assert.skip(`skip next prepend left REF;`, expression);
});

test('Consume the NEXT PREPEND LEFT expression in a TOKEN pattern', () => {
  Assert.token(`token <100> TOKEN as next prepend left REF;`, 'TOKEN', '100', expression);
});

test('Consume the NEXT PREPEND LEFT expression in a NODE pattern', () => {
  Assert.node(`node <200> NODE as next prepend left REF;`, 'NODE', '200', expression);
});
