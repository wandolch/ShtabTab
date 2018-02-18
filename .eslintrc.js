module.exports = {
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "es6": true,
    "jquery": false
  },
  "extends": "airbnb",
  "parserOptions": {
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "comma-dangle": [
      "warn",
      "never"
    ],
    "indent": [
      "warn",
      2
    ],
    "linebreak-style": [
      "warn",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "react/jsx-filename-extension": [1, {"extensions": [".js", ".jsx"]}],
    "react/forbid-prop-types": 0,
    "no-unused-expressions": "warn",
    "no-useless-concat": "warn",
    "block-scoped-var": "error",
    "no-debugger": 0,
    "import/no-extraneous-dependencies": 0,
    "react/jsx-tag-spacing": 0,
    "react/prefer-stateless-function": [1, { "ignorePureComponents": true }],
    "react/jsx-closing-bracket-location": [1, 'after-props'],
    "import/no-dynamic-require": 0,
    "import/no-unresolved": 0,
    "global-require": 0,
    "no-param-reassign": 0,
    "max-len": ["error", { "code": 150 }],
    "import/prefer-default-export": 0,
    "consistent-return": 0,
    "react/require-default-props": 0,
    "prefer-destructuring": 0,
    "default-case": 0,
    "no-extra-boolean-cast": 0
  }
};