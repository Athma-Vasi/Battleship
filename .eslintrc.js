module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},

	env: {
		browser: true,
		amd: true,
		node: true,
	},
	plugins: ['simple-import-sort'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:jsx-a11y/recommended',
		'plugin:prettier/recommended',
	],
	rules: {
		'prettier/prettier': ['error', {}, { usePrettierrc: true }],
		'@typescript-eslint/ban-ts-comment': 'off',
		'react/prop-types': 'off',
		'simple-import-sort/imports': 'warn',
	},
}
