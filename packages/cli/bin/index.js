#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Options = require("./core/options");
const Help = require("./actions/help");
const Version = require("./actions/version");
const Make = require("./actions/make");
try {
    const flags = Options.getFlags(process.argv.slice(2));
    if (flags.help) {
        Help.print();
    }
    else if (flags.version) {
        Version.print();
    }
    else {
        const source = flags.source ? flags.source : 0;
        const target = flags.target ? flags.target : 1;
        Make.perform(source, target, !!flags.run, flags.debug);
    }
}
catch (ex) {
    console.log(ex.message ?? ex);
}
//# sourceMappingURL=index.js.map