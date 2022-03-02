import * as Core from '@xcheme/core';

import * as Lang from '../../../src/index';
import * as Helper from '../helper';

test("Parse an 'APPEND NEXT' pattern", () => {
  const input = "skip append next '@';";
  const project = Helper.makeParser(new Lang.LiveCoder(), input);
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '@@@');
});

test("Parse an 'APPEND LEFT' pattern", () => {
  const input = "skip append left '@';";
  const project = Helper.makeParser(new Lang.LiveCoder(), input);
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '@@@');
});

test("Parse an 'APPEND RIGHT' pattern", () => {
  const input = "skip append right '@';";
  const project = Helper.makeParser(new Lang.LiveCoder(), input);
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '@@@');
});

test("Parse an 'APPEND' pattern", () => {
  const input = "skip append '@';";
  const project = Helper.makeParser(new Lang.LiveCoder(), input);
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '@@@');
});

test("Parse an 'APPEND' pattern with multiple patterns", () => {
  const input = "skip append ('@' | '*');";
  const project = Helper.makeParser(new Lang.LiveCoder(), input);
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '@*');
});

test("Parse an 'APPEND' pattern with chained patterns", () => {
  const input = "skip append ('@' & '*' & '*' & opt '!');";
  const project = Helper.makeParser(new Lang.LiveCoder(), input);
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '@**!');
});
