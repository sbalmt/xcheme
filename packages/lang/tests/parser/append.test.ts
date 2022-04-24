import * as Lang from '../../src';

import * as Helper from './utils/helper';
import * as Assert from './utils/assert';

test('Consume an APPEND pattern (same as RIGHT APPEND RIGHT)', () => {
  Assert.tree(
    `
    skip append REF;`,
    Helper.basic(Lang.Parser.Nodes.AppendRTR, 'REF')
  );
});

test('Consume an APPEND pattern with an identity', () => {
  Assert.tree(
    `
    skip append <1> REF;`,
    Helper.identity(Lang.Parser.Nodes.AppendRTR, 'REF', '1')
  );
});

test('Consume an APPEND pattern with an auto identity', () => {
  Assert.tree(
    `
    skip append <auto> REF;`,
    Helper.identity(Lang.Parser.Nodes.AppendRTR, 'REF', 'auto')
  );
});

test('Consume an APPEND LEFT pattern (same as RIGHT APPEND LEFT)', () => {
  Assert.tree(
    `
    skip append left REF_LEFT;`,
    Helper.basic(Lang.Parser.Nodes.AppendRTL, 'REF_LEFT')
  );
});

test('Consume an APPEND LEFT pattern with an identity', () => {
  Assert.tree(
    `
    skip append <1> left REF_LEFT;`,
    Helper.identity(Lang.Parser.Nodes.AppendRTL, 'REF_LEFT', '1')
  );
});

test('Consume an APPEND RIGHT pattern (same as RIGHT APPEND RIGHT)', () => {
  Assert.tree(
    `
    skip append right REF_RIGHT;`,
    Helper.basic(Lang.Parser.Nodes.AppendRTR, 'REF_RIGHT')
  );
});

test('Consume an APPEND RIGHT pattern with an identity', () => {
  Assert.tree(
    `
    skip append <1> right REF_RIGHT;`,
    Helper.identity(Lang.Parser.Nodes.AppendRTR, 'REF_RIGHT', '1')
  );
});

test('Consume an APPEND NEXT pattern (same as RIGHT APPEND NEXT)', () => {
  Assert.tree(
    `
    skip append next REF_NEXT;`,
    Helper.basic(Lang.Parser.Nodes.AppendRTN, 'REF_NEXT')
  );
});

test('Consume an APPEND NEXT pattern with an identity', () => {
  Assert.tree(
    `
    skip append <1> next REF_NEXT;`,
    Helper.identity(Lang.Parser.Nodes.AppendRTN, 'REF_NEXT', '1')
  );
});
