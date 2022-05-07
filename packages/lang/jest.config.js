module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageDirectory: './coverage',
  collectCoverage: true,
  rootDir: './tests',
  moduleNameMapper: {
    "/^@xcheme\/core$/": "./core/src"
  }
};
