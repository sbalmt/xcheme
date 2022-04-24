import * as Lang from '../../src';

import * as Helper from './utils/helper';
import * as Assert from './utils/assert';

test('Consume a PREPEND pattern (same as RIGHT PREPEND RIGHT)', () => {
  Assert.tree(
    `
    skip prepend REF;`,
    Helper.basic(Lang.Parser.Nodes.PrependRTR, 'REF')
  );
});

test('Consume a PREPEND pattern with an identity', () => {
  Assert.tree(
    `
    skip prepend <1> REF;`,
    Helper.identity(Lang.Parser.Nodes.PrependRTR, 'REF', '1')
  );
});

test('Consume a PREPEND pattern with an auto identity', () => {
  Assert.tree(
    `
    skip prepend <auto> REF;`,
    Helper.identity(Lang.Parser.Nodes.PrependRTR, 'REF', 'auto')
  );
});

test('Consume a PREPEND LEFT pattern (same as RIGHT PREPEND LEFT)', () => {
  Assert.tree(
    `
    skip prepend left REF_LEFT;`,
    Helper.basic(Lang.Parser.Nodes.PrependRTL, 'REF_LEFT')
  );
});

test('Consume a PREPEND LEFT pattern ith an identity', () => {
  Assert.tree(
    `
    skip prepend <1> left REF_LEFT;`,
    Helper.identity(Lang.Parser.Nodes.PrependRTL, 'REF_LEFT', '1')
  );
});

test('Consume a PREPEND RIGHT pattern (same as RIGHT PREPEND RIGHT)', () => {
  Assert.tree(
    `
    skip prepend right REF_RIGHT;`,
    Helper.basic(Lang.Parser.Nodes.PrependRTR, 'REF_RIGHT')
  );
});

test('Consume a PREPEND RIGHT pattern with an identity', () => {
  Assert.tree(
    `
    skip prepend <1> right REF_RIGHT;`,
    Helper.identity(Lang.Parser.Nodes.PrependRTR, 'REF_RIGHT', '1')
  );
});

test('Consume a PREPEND NEXT pattern (same as RIGHT PREPEND NEXT)', () => {
  Assert.tree(
    `
    skip prepend next REF_NEXT;`,
    Helper.basic(Lang.Parser.Nodes.PrependRTN, 'REF_NEXT')
  );
});

test('Consume a PREPEND NEXT pattern with an identity', () => {
  Assert.tree(
    `
    skip prepend <1> next REF_NEXT;`,
    Helper.identity(Lang.Parser.Nodes.PrependRTN, 'REF_NEXT', '1')
  );
});
