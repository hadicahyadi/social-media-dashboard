module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  globals: {
    "API_URL": "https://jsonplaceholder.typicode.com"
  },
  setupFilesAfterEnv: ["<rootDir>src/setupTests.js"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  verbose: true
};
