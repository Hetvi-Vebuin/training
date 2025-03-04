import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',  // Use ts-jest to handle TypeScript files
  testEnvironment: 'node',  // Set test environment to Node.js
  moduleFileExtensions: ['ts', 'js'],  // Allow Jest to recognize .ts and .js files
  transform: {
    '^.+\\.ts$': 'ts-jest',  // Convert TypeScript files to JavaScript using ts-jest
  },
  // testMatch: ['**/__tests__/**/*.test.ts',],  // Find test files ending with .test.ts
  // testMatch: [""], // Make sure this pattern is correct

};

export default config;
