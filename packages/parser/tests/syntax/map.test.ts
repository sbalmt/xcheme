import * as Parser from '../../src/index';
import * as Assert from '../utils/assert';

/**
 * Expected expression tree.
 */
const expression = {
  type: Parser.Nodes.Map,
  right: {
    type: Parser.Nodes.MapMember,
    right: {
      type: Parser.Nodes.String,
      value: "'a'"
    },
    next: {
      type: Parser.Nodes.MapMember,
      right: {
        type: Parser.Nodes.Reference,
        value: 'REF'
      }
    }
  }
};

test('Consume the MAP expression in a SKIP pattern', () => {
  Assert.skip(
    `skip map {
      'a',
      REF
    };`,
    expression
  );
});

test('Consume the MAP expression in a TOKEN pattern', () => {
  Assert.token(
    `token <100> TOKEN as map {
      'a',
      REF
    };`,
    'TOKEN',
    '100',
    expression
  );
});

test('Consume the MAP expression in a NODE pattern', () => {
  Assert.node(
    `node <200> NODE as map {
      'a',
      REF
    };`,
    'NODE',
    '200',
    expression
  );
});
