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
      left: {
        type: Parser.Nodes.Arguments,
        left: {
          type: Parser.Nodes.Identity,
          value: '1'
        }
      },
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
        left: {
          type: Parser.Nodes.Arguments,
          left: {
            type: Parser.Nodes.Identity,
            value: 'auto'
          }
        },
        right: {
          type: Parser.Nodes.Reference,
          value: 'REF'
        }
      }
    }
  }
};

test('Consume the MAP expression with directive in a SKIP pattern', () => {
  Assert.skip(
    `skip map {
      <1>    A as 'a',
      <auto> B as REF
    };`,
    expression
  );
});

test('Consume the MAP expression with directive in a TOKEN pattern', () => {
  Assert.token(
    `token <100> TOKEN as map {
      <1>    A as 'a',
      <auto> B as REF
    };`,
    'TOKEN',
    '100',
    expression
  );
});

test('Consume the MAP expression with directive in a NODE pattern', () => {
  Assert.node(
    `node <200> NODE as map {
      <1>    A as 'a',
      <auto> B as REF
    };`,
    'NODE',
    '200',
    expression
  );
});
