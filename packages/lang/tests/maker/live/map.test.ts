import * as Core from '@xcheme/core';
import * as Helper from '../helper';
import * as Lang from '../../../src/index';

test("Parse a 'MAP' rule", () => {
  const project = Helper.makeParser(new Lang.LiveCoder(), "skip map { 'a', 'b', 'c' };");
  const context = new Core.Context('test');

  Helper.testLexer(project, context, 'abc');
});

test("Parse a 'MAP' rule with a nested map pattern", () => {
  const project = Helper.makeParser(new Lang.LiveCoder(), "skip map { 'a' & map { '1', '2' }, 'b', 'c' };");
  const context = new Core.Context('test');

  Helper.testLexer(project, context, 'a1ba2c');
});

test("Parse a 'MAP' rule with compound patterns", () => {
  const project = Helper.makeParser(new Lang.LiveCoder(), "skip map { 'a' & opt 'b' & repeat 'c' };");
  const context = new Core.Context('test');

  Helper.testLexer(project, context, 'abcacc');
});

test("Parse a 'MAP' rule with a token pattern", () => {
  const project = Helper.makeParser(new Lang.LiveCoder(), "token TOKEN as map { <100> A as 'a', 'b', 'c' };");
  const context = new Core.Context('test');

  Helper.testLexer(project, context, 'abc');
});

test("Parse a 'MAP' rule with a node pattern", () => {
  const project = Helper.makeParser(new Lang.LiveCoder(), "node NODE as map { <100> A as 'a', 'b', 'c' };");
  const context = new Core.Context('test');

  Helper.testLexer(project, context, 'abc');
});
