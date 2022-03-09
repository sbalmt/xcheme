import * as Lang from '../../src/index';
import * as Helper from './helper';

/**
 * Assert the specified source code can produce the expected errors.
 * @param errors Error list.
 * @param code Source code.
 */
export const error = (errors: Lang.Errors[], code: string): void => {
  Helper.makeError(new Lang.LiveCoder(), code, errors);
};

/**
 * Assert the specified source code can generate a parser.
 * @param code Source code.
 * @returns Returns the project context.
 */
export const parser = (code: string): Lang.Project.Context => {
  return Helper.makeParser(new Lang.LiveCoder(), code);
};
