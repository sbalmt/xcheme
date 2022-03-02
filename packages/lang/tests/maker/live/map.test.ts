import * as Core from '@xcheme/core';

import * as Lang from '../../../src/index';
import * as Helper from '../helper';

test("Parse a 'MAP' pattern", () => {
  const input = "skip map { 'a', 'b', 'c' };";
  const project = Helper.makeParser(new Lang.LiveCoder(), input);
  const context = new Core.Context('test');

  Helper.testLexer(project, context, 'abc');
});

test("Parse a 'MAP' pattern with a nested map pattern", () => {
  const input = "skip map { 'a' & map { '1', '2' }, 'b', 'c' };";
  const project = Helper.makeParser(new Lang.LiveCoder(), input);
  const context = new Core.Context('test');

  Helper.testLexer(project, context, 'a1ba2c');
});

test("Parse a 'MAP' pattern with compound patterns", () => {
  const input = "skip map { 'a' & opt 'b' & repeat 'c' };";
  const project = Helper.makeParser(new Lang.LiveCoder(), input);
  const context = new Core.Context('test');

  Helper.testLexer(project, context, 'abcacc');
});

test("Parse a 'MAP' pattern in a token directive", () => {
  const input = "token TOKEN as map { <100> A as 'a', 'b', 'c' };";
  const project = Helper.makeParser(new Lang.LiveCoder(), input);
  const context = new Core.Context('test');

  Helper.testLexer(project, context, 'abc');
});

test("Parse a 'MAP' pattern in a node directive", () => {
  const input = "node NODE as map { <100> A as 'a', 'b', 'c' };";
  const project = Helper.makeParser(new Lang.LiveCoder(), input);
  const context = new Core.Context('test');

  Helper.testLexer(project, context, 'abc');
});
