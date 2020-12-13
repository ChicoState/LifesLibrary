module.exports = {
  'parser': 'babel-eslint',
  'env': {
    'browser': true,
    'es2021': true,
  },
  'settings': {
    'react': {
      'version': 'detect',
    },
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
  'ignorePatterns': [
    './node_modules',
    './ios',
    '.expo/',
    'android/',
  ],
  'rules': {
    'max-len': ['error', 80, 2, {
      'ignoreUrls': true,
      'ignoreComments': false,
      'ignoreRegExpLiterals': true,
      'ignoreStrings': false,
      'ignoreTemplateLiterals': false,
    }],
    'array-callback-return': 2,
    'complexity': ['error', 5],
    'eqeqeq': 2,
    'max-statements': [2, 10],
    'max-statements-per-line': [2, {
      'max': 1,
    }],
    'max-nested-callbacks': [2, 2],
    'max-depth': [2, {
      'max': 2,
    }],
    'max-lines': [2, 300],
    'no-eval': 2,
    'no-return-assign': 2,
    'no-param-reassign': 2,
    'no-var': 2,
    'prefer-const': 2,
  },
};
