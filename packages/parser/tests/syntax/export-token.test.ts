import * as Parser from '../../src/index';
import * as Assert from '../utils/assert';

/**
 * Expected expression tree.
 */
const expression = {
  type: Parser.Nodes.Reference,
  value: 'REF'
};

// TOKEN

test('Consume the EXPORT TOKEN directive pattern', () => {
  Assert.exportToken(`export token <100> TOKEN as REF;`, 'TOKEN', '100', expression);
});

test('Consume the EXPORT TOKEN directive pattern with an auto identity', () => {
  Assert.exportToken(`export token <auto> TOKEN as REF;`, 'TOKEN', 'auto', expression);
});

test('Consume the EXPORT TOKEN directive pattern without an identity', () => {
  Assert.exportToken(`export token TOKEN as REF;`, 'TOKEN', void 0, expression);
});

// ALIAS TOKEN

test('Consume the EXPORT ALIAS TOKEN directive pattern', () => {
  Assert.exportAliasToken(`export alias token <150> ALIAS_TOKEN as REF;`, 'ALIAS_TOKEN', '150', expression);
});

test('Consume the EXPORT ALIAS TOKEN directive pattern with an auto identity', () => {
  Assert.exportAliasToken(`export alias token <auto> ALIAS_TOKEN as REF;`, 'ALIAS_TOKEN', 'auto', expression);
});

test('Consume the EXPORT ALIAS TOKEN directive pattern without an identity', () => {
  Assert.exportAliasToken(`export alias token ALIAS_TOKEN as REF;`, 'ALIAS_TOKEN', void 0, expression);
});
