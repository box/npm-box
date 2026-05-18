import type { Config } from 'jest';

const config: Config = {
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
};

export default config;
