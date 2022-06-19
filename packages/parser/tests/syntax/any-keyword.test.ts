import * as Parser from '../../src/index';
import * as Assert from '../utils/assert';

/**
 * Expected expression tree.
 */
const expression = {
  type: Parser.Nodes.Any
};

test('Consume the ANY (keyword) expression in a SKIP pattern', () => {
  Assert.skip(`skip any;`, expression);
});

test('Consume the ANY (keyword) expression in a TOKEN pattern', () => {
  Assert.token(`token <100> TOKEN as any;`, 'TOKEN', '100', expression);
});

test('Consume the ANY (keyword) expression in a NODE pattern', () => {
  Assert.node(`node <200> NODE as any;`, 'NODE', '200', expression);
});
