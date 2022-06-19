import * as Parser from '../../src/index';
import * as Assert from '../utils/assert';

/**
 * Expected expression tree.
 */
const expression = {
  type: Parser.Nodes.Range,
  left: {
    type: Parser.Nodes.String,
    value: "'0'"
  },
  right: {
    type: Parser.Nodes.String,
    value: "'9'"
  }
};

test('Consume the RANGE expression in a SKIP pattern', () => {
  Assert.skip(`skip from '0' to '9';`, expression);
});

test('Consume the RANGE expression in a TOKEN pattern', () => {
  Assert.token(`token <100> TOKEN as from '0' to '9';`, 'TOKEN', '100', expression);
});

test('Consume the RANGE expression in a NODE pattern', () => {
  Assert.node(`node <200> NODE as from '0' to '9';`, 'NODE', '200', expression);
});
