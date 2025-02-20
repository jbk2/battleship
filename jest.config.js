export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.html?$": "jest-html-loader"
  },
  verbose: false
};


// moduleNameMapper: {
//   "\\.html$": "<rootDir>/src/test/__mocks__/htmlMock.js"
// }
