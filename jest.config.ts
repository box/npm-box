import type { Config } from 'jest';

const config: Config = {
  testMatch: ['<rootDir>/tests/**/*.test.ts'],
  transform: {
    '\\.[jt]sx?$': [
      'babel-jest',
      {
        presets: [
          ['@babel/preset-env', { targets: { node: 'current' } }],
          '@babel/preset-typescript',
        ],
      },
    ],
  },
  transformIgnorePatterns: ['/node_modules/(?!box-node-sdk)'],
  moduleNameMapper: {
    '^box/sdk/(.+)$': '<rootDir>/src/sdk/$1',
    '^box/sdk$': '<rootDir>/src/sdk/index.ts',
    '^box$': '<rootDir>/src/index.ts',
    '^(\\..*)\\.js$': '$1',
  },
};

export default config;
