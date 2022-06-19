import * as Parser from '../../src/index';
import * as Assert from '../utils/assert';

/**
 * Expected expression tree.
 */
const expression = {
  type: Parser.Nodes.AppendNTR,
  right: {
    type: Parser.Nodes.Reference,
    value: 'REF'
  }
};

// NEXT APPEND

test('Consume the NEXT APPEND expression (same as NEXT APPEND RIGHT) in a SKIP pattern', () => {
  Assert.skip(`skip next append REF;`, expression);
});

test('Consume the NEXT APPEND expression (same as NEXT APPEND RIGHT) in a TOKEN pattern', () => {
  Assert.token(`token <100> TOKEN as next append REF;`, 'TOKEN', '100', expression);
});

test('Consume the NEXT APPEND expression (same as NEXT APPEND RIGHT) in a NODE pattern', () => {
  Assert.node(`node <200> NODE as next append REF;`, 'NODE', '200', expression);
});

// NEXT APPEND RIGHT

test('Consume the NEXT APPEND RIGHT expression in a SKIP pattern', () => {
  Assert.skip(`skip next append right REF;`, expression);
});

test('Consume the NEXT APPEND RIGHT expression in a TOKEN pattern', () => {
  Assert.token(`token <100> TOKEN as next append right REF;`, 'TOKEN', '100', expression);
});

test('Consume the NEXT APPEND RIGHT expression in a NODE pattern', () => {
  Assert.node(`node <200> NODE as next append right REF;`, 'NODE', '200', expression);
});
