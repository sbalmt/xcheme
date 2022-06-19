import * as Parser from '../../src/index';
import * as Assert from '../utils/assert';

/**
 * Expected expression tree.
 */
const expression = {
  type: Parser.Nodes.Not,
  right: {
    type: Parser.Nodes.Reference,
    value: 'REF'
  }
};

test('Consume the NOT expression in a SKIP pattern', () => {
  Assert.skip(`skip not REF;`, expression);
});

test('Consume the NOT expression in a TOKEN pattern', () => {
  Assert.token(`token <100> TOKEN as not REF;`, 'TOKEN', '100', expression);
});

test('Consume the NOT expression in a NODE pattern', () => {
  Assert.node(`node <200> NODE as not REF;`, 'NODE', '200', expression);
});
