const path = require('path');

module.exports = {
    root: true,

    env: {
        browser: true,
        es2021: true,
        jest: true,
    },

    extends: [
        'plugin:react/recommended',
        'airbnb',
        'plugin:i18next/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
    ],

    parser: '@typescript-eslint/parser',

    parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },

    plugins: [
        'react',
        '@typescript-eslint',
        'i18next',
        'react-hooks',
        'import',
    ],

    settings: {
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true,
            },
            alias: {
                map: [
                    ['entities', path.resolve(__dirname, 'src/entities')],
                    ['widgets',  path.resolve(__dirname, 'src/widgets')],
                    ['app', path.resolve(__dirname, 'src/app')],
                    // добавьте свои алиасы по необходимости
                ],
                extensions: ['.ts', '.tsx', '.js', '.jsx'],
            },
        },
    },

    rules: {
        'react/jsx-indent': [2, 4],
        'react/jsx-indent-props': [2, 4],
        indent: [2, 4],
        'react/jsx-filename-extension': [
            2,
            { extensions: ['.js', '.jsx', '.tsx'] },
        ],

        // import-related
        'import/no-unresolved': 'off',
        'import/prefer-default-export': 'off',
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': 'off',

        'no-unused-vars': 'off',
        'react/require-default-props': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-props-no-spreading': 'warn',
        'react/function-component-definition': 'off',
        'no-shadow': 'off',
        'no-underscore-dangle': 'off',
        'no-param-reassign': 'off',
        'no-undef': 'off',
        'react/no-array-index-key': 'off',
        'arrow-body-style': 'off',

        // i18next
        'i18next/no-literal-string': [
            'error',
            {
                markupOnly: true,
                ignoreAttribute: ['data-testid', 'to', 'target'],
            },
        ],

        // length & accessibility
        'max-len': ['error', { ignoreComments: true, code: 130 }],
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',

        // hooks
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',

        // TS-specific
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
    },

    globals: {
        IS_DEV: true,
        API: true,
        PROJECT: true,
    },

    overrides: [
        {
            files: ['/src/**/*.{test,stories}.{ts,tsx}'],
            rules: {
                'i18next/no-literal-string': 'off',
                'max-len': 'off',
            },
        },
    ],
};
