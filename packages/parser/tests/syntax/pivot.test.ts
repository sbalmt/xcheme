import * as Parser from '../../src/index';
import * as Assert from '../utils/assert';

/**
 * Expected expression tree.
 */
const expression = {
  type: Parser.Nodes.Pivot,
  right: {
    type: Parser.Nodes.Reference,
    value: 'REF'
  }
};

test('Consume the PIVOT expression in a SKIP pattern', () => {
  Assert.skip(`skip pivot REF;`, expression);
});

test('Consume the PIVOT expression in a TOKEN pattern', () => {
  Assert.token(`token <100> TOKEN as pivot REF;`, 'TOKEN', '100', expression);
});

test('Consume the PIVOT expression in a NODE pattern', () => {
  Assert.node(`node <200> NODE as pivot REF;`, 'NODE', '200', expression);
});
