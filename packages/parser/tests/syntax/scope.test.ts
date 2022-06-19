import * as Parser from '../../src/index';
import * as Assert from '../utils/assert';

/**
 * Expected expression tree.
 */
const expression = {
  type: Parser.Nodes.Scope,
  right: {
    type: Parser.Nodes.Reference,
    value: 'REF'
  }
};

test('Consume the SCOPE expression in a SKIP pattern', () => {
  Assert.skip(`skip scope REF;`, expression);
});

test('Consume the SCOPE expression in a TOKEN pattern', () => {
  Assert.token(`token <100> TOKEN as scope REF;`, 'TOKEN', '100', expression);
});

test('Consume the SCOPE expression in a NODE pattern', () => {
  Assert.node(`node <200> NODE as scope REF;`, 'NODE', '200', expression);
});
