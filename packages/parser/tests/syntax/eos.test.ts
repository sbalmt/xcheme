import * as Parser from '../../src/index';
import * as Assert from '../utils/assert';

/**
 * Expected expression tree.
 */
const expression = {
  type: Parser.Nodes.EoS
};

test('Consume the EOS expression in a SKIP pattern', () => {
  Assert.skip(`skip eos;`, expression);
});

test('Consume the EOS expression in a TOKEN pattern', () => {
  Assert.token(`token <100> TOKEN as eos;`, 'TOKEN', '100', expression);
});

test('Consume the EOS expression in a NODE pattern', () => {
  Assert.node(`node <200> NODE as eos;`, 'NODE', '200', expression);
});
