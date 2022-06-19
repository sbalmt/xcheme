import * as Parser from '../../src/index';
import * as Assert from '../utils/assert';

/**
 * Expected expression tree.
 */
const expression = {
  type: Parser.Nodes.PlaceRight,
  right: {
    type: Parser.Nodes.Reference,
    value: 'REF'
  }
};

// PLACE

test('Consume the PLACE (Same as PLACE RIGHT) expression in a SKIP pattern', () => {
  Assert.skip(`skip place REF;`, expression);
});

test('Consume the PLACE (Same as PLACE RIGHT) expression in a TOKEN pattern', () => {
  Assert.token(`token <100> TOKEN as place REF;`, 'TOKEN', '100', expression);
});

test('Consume the PLACE (Same as PLACE RIGHT) expression in a NODE pattern', () => {
  Assert.node(`node <200> NODE as place REF;`, 'NODE', '200', expression);
});

// PLACE RIGHT

test('Consume the PLACE RIGHT expression in a SKIP pattern', () => {
  Assert.skip(`skip place right REF;`, expression);
});

test('Consume the PLACE RIGHT expression in a TOKEN pattern', () => {
  Assert.token(`token <100> TOKEN as place right REF;`, 'TOKEN', '100', expression);
});

test('Consume the PLACE RIGHT expression in a NODE pattern', () => {
  Assert.node(`node <200> NODE as place right REF;`, 'NODE', '200', expression);
});
