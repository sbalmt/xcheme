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
      type: Parser.Nodes.Identifier,
      value: 'A',
      right: {
        type: Parser.Nodes.String,
        value: "'a'"
      }
    },
    next: {
      type: Parser.Nodes.MapMember,
      right: {
        type: Parser.Nodes.Identifier,
        value: 'B',
        right: {
          type: Parser.Nodes.Reference,
          value: 'REF'
        }
      }
    }
  }
};

test('Consume the MAP expression with an identifier in a SKIP pattern', () => {
  Assert.skip(
    `skip map {
      A as 'a',
      B as REF
    };`,
    expression
  );
});

test('Consume the MAP expression with an identifier in a TOKEN pattern', () => {
  Assert.token(
    `token <100> TOKEN as map {
      A as 'a',
      B as REF
    };`,
    'TOKEN',
    '100',
    expression
  );
});

test('Consume the MAP expression with an identifier in a NODE pattern', () => {
  Assert.node(
    `node <200> NODE as map {
      A as 'a',
      B as REF
    };`,
    'NODE',
    '200',
    expression
  );
});
