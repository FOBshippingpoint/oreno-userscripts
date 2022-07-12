module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'google', 'prettier'
  ],
  'parserOptions': {
    'ecmaVersion': 12,
  },
  'rules': {
    'prettier/prettier': 'error',
  },
  plugins: ['prettier'],
};
