module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    moduleFileExtensions: ['mjs', 'cjs', 'jsx', 'ts', 'tsx', 'js', 'jsx', 'json', 'node' ],
  };
  