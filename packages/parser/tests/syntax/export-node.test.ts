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

test('Consume the EXPORT NODE directive pattern', () => {
  Assert.exportNode(`export node <200> NODE as REF;`, 'NODE', '200', expression);
});

test('Consume the EXPORT NODE directive pattern with an auto identity', () => {
  Assert.exportNode(`export node <auto> NODE as REF;`, 'NODE', 'auto', expression);
});

test('Consume the EXPORT NODE directive pattern without an identity', () => {
  Assert.exportNode(`export node NODE as REF;`, 'NODE', void 0, expression);
});

// ALIAS NODE

test('Consume the EXPORT ALIAS NODE directive pattern', () => {
  Assert.exportAliasNode(`export alias node <250> ALIAS_NODE as REF;`, 'ALIAS_NODE', '250', expression);
});

test('Consume the EXPORT ALIAS NODE directive pattern with an auto identity', () => {
  Assert.exportAliasNode(`export alias node <auto> ALIAS_NODE as REF;`, 'ALIAS_NODE', 'auto', expression);
});

test('Consume the EXPORT ALIAS NODE directive pattern without an identity', () => {
  Assert.exportAliasNode(`export alias node ALIAS_NODE as REF;`, 'ALIAS_NODE', void 0, expression);
});
