import globals from 'globals';
import esLintAutoImport from './generated/eslintrc-auto-import.mjs';
import jseslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';

export default [
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
                ...esLintAutoImport.globals,
            },
        },
    },
    jseslint.configs.recommended,
    ...tseslint.configs.recommended,
    ...pluginVue.configs['flat/recommended'],
    {
        files: ['*.vue', '**/*.vue'],
        languageOptions: {
            parserOptions: { parser: tseslint.parser },
        },
        rules: {
            'vue/block-order': [
                'warn',
                {
                    order: ['template', 'script', 'style'],
                },
            ],
            'vue/attribute-hyphenation': [
                'warn',
                'never',
                {
                    ignore: [
                        'uno-xs',
                        'uno-sm',
                        'uno-md',
                        'uno-lg',
                        'uno-disabled',
                        'uno-hover',
                        'uno-checked',
                        'uno-focus-within',
                        'uno-focus',
                        'uno-active',
                    ],
                },
            ],
        },
    },
    {
        ...eslintPluginPrettier,
        rules: {
            ...eslintPluginPrettier.rules,
            'prettier/prettier': [
                'warn',
                {
                    tabWidth: 4,
                    semi: true,
                    trailingComma: 'es5',
                    arrowParens: 'always',
                    printWidth: 100,
                    singleQuote: true,
                    htmlWhitespaceSensitivity: 'ignore',
                    plugins: ['prettier-plugin-tailwindcss'],
                    tailwindStylesheet: './src/styles/main.css',
                },
            ],
        },
    },
    {
        rules: {
            'no-undef': 'warn',
            'no-unused-vars': 'off',
            'no-use-before-define': 'off',
            'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
            'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',

            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    args: 'after-used',
                    argsIgnorePattern: '^_',
                    caughtErrors: 'all',
                    caughtErrorsIgnorePattern: '^_',
                    destructuredArrayIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    ignoreRestSiblings: true,
                },
            ],

            'vue/html-self-closing': [
                'warn',
                {
                    html: {
                        void: 'always',
                        normal: 'always',
                        component: 'always',
                    },
                    svg: 'always',
                    math: 'always',
                },
            ],
        },
    },
];
