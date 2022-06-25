import * as Lang from '../../../src/index';
import * as Helper from '../../helper';

/**
 * Assert output.
 */
type OutputMap = {
  [identifier: string]: string | undefined;
};

/**
 * Assert the specified source code match the given source outputs.
 * @param code Source code.
 * @param outputs Source outputs.
 * @returns Returns the project context..
 */
export const output = (code: string, outputs: OutputMap): Lang.Project.Context => {
  const project = Helper.makeParser(new Lang.TextCoder(), code);
  for (const identifier in outputs) {
    const output = outputs[identifier];
    const record = project.symbols.get(identifier)!;
    expect(record).toBeDefined();
    expect(record.data.pattern).toBe(output);
  }
  return project;
};
