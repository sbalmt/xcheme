import * as Parser from '../../src/index';
import * as Assert from '../utils/assert';

/**
 * Expected expression tree.
 */
const expression = {
  type: Parser.Nodes.Pivot,
  right: {
    type: Parser.Nodes.Arguments,
    left: {
      type: Parser.Nodes.Identity,
      value: '1'
    },
    right: {
      type: Parser.Nodes.Reference,
      value: 'REF'
    }
  }
};

test('Consume the PIVOT expression with an auto identity in a SKIP pattern', () => {
  Assert.skip(`skip pivot <1> REF;`, expression);
});

test('Consume the PIVOT expression with an auto identity in a TOKEN pattern', () => {
  Assert.token(`token <100> TOKEN as pivot <1> REF;`, 'TOKEN', '100', expression);
});

test('Consume the PIVOT expression with an auto identity in a NODE pattern', () => {
  Assert.node(`node <200> NODE as pivot <1> REF;`, 'NODE', '200', expression);
});
