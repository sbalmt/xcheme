import * as Lang from '../../src/index';
import * as Helper from './helper';

/**
 * Assert the specified source code can generate a parser.
 * @param code Source code.
 * @returns Returns the project context.
 */
export const parser = (code: string): Lang.Project.Context => {
  return Helper.makeParser(new Lang.LiveCoder(), code);
};
