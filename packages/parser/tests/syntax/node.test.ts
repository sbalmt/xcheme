import * as Parser from '../../src/index';
import * as Assert from '../utils/assert';

/**
 * Expected expression tree.
 */
const expression = {
  type: Parser.Nodes.Reference,
  value: 'REF'
};

// NODE

test('Consume the NODE directive pattern', () => {
  Assert.node(`node <200> NODE as REF;`, 'NODE', '200', expression);
});

test('Consume the NODE directive pattern with an auto identity', () => {
  Assert.node(`node <auto> NODE as REF;`, 'NODE', 'auto', expression);
});

test('Consume the NODE directive pattern without an identity', () => {
  Assert.node(`node NODE as REF;`, 'NODE', void 0, expression);
});

// ALIAS NODE

test('Consume the ALIAS NODE directive pattern', () => {
  Assert.aliasNode(`alias node <250> ALIAS_NODE as REF;`, 'ALIAS_NODE', '250', expression);
});

test('Consume the ALIAS NODE directive pattern with an auto identity', () => {
  Assert.aliasNode(`alias node <auto> ALIAS_NODE as REF;`, 'ALIAS_NODE', 'auto', expression);
});

test('Consume the ALIAS NODE directive pattern without an identity', () => {
  Assert.aliasNode(`alias node ALIAS_NODE as REF;`, 'ALIAS_NODE', void 0, expression);
});
