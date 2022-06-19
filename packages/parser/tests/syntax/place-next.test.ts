import * as Parser from '../../src/index';
import * as Assert from '../utils/assert';

/**
 * Expected expression tree.
 */
const expression = {
  type: Parser.Nodes.PlaceNext,
  right: {
    type: Parser.Nodes.Reference,
    value: 'REF'
  }
};

test('Consume the PLACE NEXT expression in a SKIP pattern', () => {
  Assert.skip(`skip place next REF;`, expression);
});

test('Consume the PLACE NEXT expression in a TOKEN pattern', () => {
  Assert.token(`token <100> TOKEN as place next REF;`, 'TOKEN', '100', expression);
});

test('Consume the PLACE NEXT expression in a NODE pattern', () => {
  Assert.node(`node <200> NODE as place next REF;`, 'NODE', '200', expression);
});
