module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageDirectory: './coverage',
  collectCoverage: true,
  moduleNameMapper: {
    '/^@xcheme/core$/': './core/src'
  }
};
