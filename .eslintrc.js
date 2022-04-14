module.exports = {
    root: true,
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
        "plugin:prettier/recommended",
        "plugin:jest/recommended",
    ],
    plugins: ["react-hooks", "@typescript-eslint"],
    env: {
        es6: true,
        browser: true,
        jest: true,
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2018,
        ecmaFeatures: {
            jsx: true,
        },
        project: "./tsconfig.json",
        sourceType: "module",
    },
    ignorePatterns: ["node_modules", "*.d.ts", "*.js"],
    rules: {
        "@typescript-eslint/array-type": ["error", { "array-simple": true }],
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-empty-interface": ["error", { allowSingleExtends: true }],
        "@typescript-eslint/no-require-imports": "error",
        "@typescript-eslint/no-throw-literal": "error",
        "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
        "@typescript-eslint/no-explicit-any": "off",
        "jest/expect-expect": "off",
        "prettier/prettier": ["error", { endOfLine: "auto" }],
        "react/prop-types": "off",
        "react/display-name": "off",
        "react/jsx-curly-brace-presence": "error",
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "error",
        "react/react-in-jsx-scope": "off",
        "no-restricted-imports": [
            "error",
            {
                paths: [
                    {
                        name: "lodash",
                        message: "only import from subfolders, ie import get from 'lodash/get' instead of import {get} from 'lodash'",
                    },
                    {
                        name: "react",
                        importNames: ["defaults"],
                        message: "don't import the React global",
                    },
                ],
            },
        ],
        "@typescript-eslint/no-require-imports": "off",
        "@typescript-eslint/no-var-requires": "off",
    },
    settings: {
        react: {
            version: "detect",
        },
    },
};
