module.exports = {
    env: {
        browser: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'airbnb',
        'airbnb-typescript',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:jsx-a11y/recommended',
        'plugin:react-hooks/recommended',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2022,
        sourceType: 'module',
        tsconfigRootDir: __dirname,
        project: './tsconfig.eslint.json',
    },
    plugins: ['react', '@typescript-eslint'],
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.ts', '.tsx'],
            },
            typescript: {
                project: 'packages/client/tsconfig.json',
            },
        },
    },
    rules: {
        '@typescript-eslint/no-var-requires': 0,
        'react/react-in-jsx-scope': 0,
        'import/prefer-default-export': 0,
        'import/no-extraneous-dependencies': 0,
        'react/require-default-props': 0,
        'no-restricted-syntax': 0,
        'react/jsx-props-no-spreading': 0,
        'no-param-reassign': [2, { props: false }],
    },
};
