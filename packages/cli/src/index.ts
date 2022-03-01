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
    const source = flags.source ?? 0;
    const target = flags.target ?? 1;
    Make.perform(source, target, !!flags.run, flags.debug);
  }
} catch (ex: any) {
  console.log(ex.message ?? ex);
}
