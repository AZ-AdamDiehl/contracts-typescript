/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: "./",
  moduleDirectories: ["node_modules", "src"], // fix import error on smt.test.ts
};