#! /usr/bin/env node
import * as Options from './core/options';

import * as Help from './actions/help';
import * as Version from './actions/version';
import * as Make from './actions/make';

try {
  const flags = Options.getFlags(process.argv.slice(2));
  if (flags.help) {
    Help.print();
  } else if (flags.version) {
    Version.print();
  } else {
    const run = !!flags.run;
    if (run && !flags.source) {
      throw new Error(`Option '--run' must have a xcheme source file.`);
    }
    const source = flags.source ?? 0;
    const target = flags.target ?? run ? 0 : 1;
    Make.perform(source, target, run, flags.debug);
  }
} catch (ex: any) {
  console.log(ex.message ?? ex);
}
