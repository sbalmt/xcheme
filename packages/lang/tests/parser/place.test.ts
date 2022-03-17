import * as Lang from '../../src';

import * as Helper from './utils/helper';
import * as Assert from './utils/assert';

test("Consume an expected 'PLACE' pattern", () => {
  Assert.tree(
    `
    skip place REF;`,
    Helper.basic(Lang.Parser.Nodes.Place, 'REF')
  );
});

test("Consume an expected 'PLACE LEFT' pattern", () => {
  Assert.tree(
    `
    skip place left REF_LEFT;`,
    Helper.basic(Lang.Parser.Nodes.PlaceLeft, 'REF_LEFT')
  );
});

test("Consume an expected 'PLACE RIGHT' pattern", () => {
  Assert.tree(
    `
    skip place right REF_RIGHT;`,
    Helper.basic(Lang.Parser.Nodes.PlaceRight, 'REF_RIGHT')
  );
});

test("Consume an expected 'PLACE NEXT' pattern", () => {
  Assert.tree(
    `
    skip place next REF_NEXT;`,
    Helper.basic(Lang.Parser.Nodes.PlaceNext, 'REF_NEXT')
  );
});
