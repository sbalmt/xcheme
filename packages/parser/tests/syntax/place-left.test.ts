import * as Parser from '../../src/index';
import * as Assert from '../utils/assert';

/**
 * Expected expression tree.
 */
const expression = {
  type: Parser.Nodes.PlaceLeft,
  right: {
    type: Parser.Nodes.Reference,
    value: 'REF'
  }
};

test('Consume the PLACE LEFT expression in a SKIP pattern', () => {
  Assert.skip(`skip place left REF;`, expression);
});

test('Consume the PLACE LEFT expression in a TOKEN pattern', () => {
  Assert.token(`token <100> TOKEN as place left REF;`, 'TOKEN', '100', expression);
});

test('Consume the PLACE LEFT expression in a NODE pattern', () => {
  Assert.node(`node <200> NODE as place left REF;`, 'NODE', '200', expression);
});
