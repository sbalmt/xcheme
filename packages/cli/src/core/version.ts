const json = require('../../package.json');

/**
 * Current version number.
 */
export const Number = json?.version ?? '0.0.0';
