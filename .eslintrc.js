module.exports = {
  parser: "babel-eslint",
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'plugin:react/recommended',
    'google',
  ],

  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 2017,
    'sourceType': 'module',
  },
  'plugins': [
    'react',
    'eslint-plugin-jsdoc',
  ],
  'rules': {
    "max-len": ["error", 80, 2, {
    ignoreUrls: true,
    ignoreComments: false,
    ignoreRegExpLiterals: true,
    ignoreStrings: false,
    ignoreTemplateLiterals: false,
    }],
  },
};
