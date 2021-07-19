module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ["airbnb", "prettier", "plugin:react-hooks/recommended"],
  plugins: ["react", "prettier", "react-hooks"],
  rules: {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx",".ts",".tsx"] }],
    "react/prop-types": 0,
    "no-unused-vars": 0,
    "jsx-a11y/anchor-is-valid":0,
    "linebreak-style":0,
    "react/button-has-type":0,
    "max-len":0,
    "jsx-a11y/label-has-associated-control":0,
    "comma-dangle": [1, "always-multiline"], // allow or disallow trailing commas
    "react/jsx-max-props-per-line": [1, { "maximum": 1}],
    "no-useless-catch": 0,
    "import/prefer-default-export": 0,
    "camelcase":0,
    "react/jsx-props-no-spreading":0,
    "global-require": 0,
    "no-underscore-dangle": 0,
    "react/react-in-jsx-scope": 0,
    "indent": ["error", 2],
  },
};
