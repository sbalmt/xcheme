import * as Parser from '../../src/index';
import * as Assert from '../utils/assert';

/**
 * Expected expression tree.
 */
const expression = {
  type: Parser.Nodes.String,
  value: "'text'"
};

test('Consume the STRING expression in a SKIP pattern', () => {
  Assert.skip(`skip 'text';`, expression);
});

test('Consume the STRING expression in a TOKEN pattern', () => {
  Assert.token(`token <100> TOKEN as 'text';`, 'TOKEN', '100', expression);
});

test('Consume the STRING expression in a NODE pattern', () => {
  Assert.node(`node <200> NODE as 'text';`, 'NODE', '200', expression);
});
