module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testRegex: ".spec.ts$",
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
};