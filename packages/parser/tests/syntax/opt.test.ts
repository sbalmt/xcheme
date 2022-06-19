import * as Parser from '../../src/index';
import * as Assert from '../utils/assert';

/**
 * Expected expression tree.
 */
const expression = {
  type: Parser.Nodes.Opt,
  right: {
    type: Parser.Nodes.Reference,
    value: 'REF'
  }
};

test('Consume the OPT expression in a SKIP pattern', () => {
  Assert.skip(`skip opt REF;`, expression);
});

test('Consume the OPT expression in a TOKEN pattern', () => {
  Assert.token(`token <100> TOKEN as opt REF;`, 'TOKEN', '100', expression);
});

test('Consume the OPT expression in a NODE pattern', () => {
  Assert.node(`node <200> NODE as opt REF;`, 'NODE', '200', expression);
});
