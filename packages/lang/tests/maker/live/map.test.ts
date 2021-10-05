import * as Core from '@xcheme/core';
import * as Helper from '../helper';
import * as Lang from '../../../src/index';

test("Parse a skip 'MAP' rule", () => {
  const project = Helper.makeParser(new Lang.LiveCoder(), "skip map { 'a', 'b', 'c' };");
  const context = new Core.Context('test');

  Helper.testLexer(project, context, 'abc');
});

test("Parse a nested skip 'MAP' rule", () => {
  const project = Helper.makeParser(new Lang.LiveCoder(), "skip map { 'a' & map { '1', '2' }, 'b', 'c' };");
  const context = new Core.Context('test');

  Helper.testLexer(project, context, 'a1ba2c');
});

test("Parse a compound skip 'MAP' rule", () => {
  const project = Helper.makeParser(new Lang.LiveCoder(), "skip map { 'a' & opt 'b' & repeat 'c' };");
  const context = new Core.Context('test');

  Helper.testLexer(project, context, 'abcacc');
});

test("Parse a token 'MAP' rule", () => {
  const project = Helper.makeParser(new Lang.LiveCoder(), "token TOKEN as map { <100> A as 'a', 'b', 'c' };");
  const context = new Core.Context('test');

  Helper.testLexer(project, context, 'abc');
});

test("Parse a node 'MAP' rule", () => {
  const project = Helper.makeParser(new Lang.LiveCoder(), "node NODE as map { <100> A as 'a', 'b', 'c' };");
  const context = new Core.Context('test');

  Helper.testLexer(project, context, 'abc');
});
