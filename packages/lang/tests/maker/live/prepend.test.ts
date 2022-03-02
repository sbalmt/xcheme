import * as Core from '@xcheme/core';

import * as Lang from '../../../src/index';
import * as Helper from '../helper';

test("Parse a 'PREPEND NEXT' pattern", () => {
  const input = "skip prepend next '@';";
  const project = Helper.makeParser(new Lang.LiveCoder(), input);
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '@@@');
});

test("Parse a 'PREPEND LEFT' pattern", () => {
  const input = "skip prepend left '@';";
  const project = Helper.makeParser(new Lang.LiveCoder(), input);
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '@@@');
});

test("Parse a 'PREPEND RIGHT' pattern", () => {
  const input = "skip prepend right '@';";
  const project = Helper.makeParser(new Lang.LiveCoder(), input);
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '@@@');
});

test("Parse a 'PREPEND' pattern", () => {
  const input = "skip prepend '@';";
  const project = Helper.makeParser(new Lang.LiveCoder(), input);
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '@@@');
});

test("Parse a 'PREPEND' pattern with multiple patterns", () => {
  const input = "skip prepend ('@' | '*');";
  const project = Helper.makeParser(new Lang.LiveCoder(), input);
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '@*');
});

test("Parse a 'PREPEND' pattern with chained patterns", () => {
  const input = "skip prepend ('@' & '*' & '*' & opt '!');";
  const project = Helper.makeParser(new Lang.LiveCoder(), input);
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '@**!');
});
