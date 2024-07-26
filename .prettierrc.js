/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
	singleQuote: true,
	useTabs: true,
	semi: true,
	trailingComma: 'all',
	bracketSpacing: true,
	printWidth: 100,
	endOfLine: 'auto',
	sortingMethod: 'alphabetical',
	plugins: ['./node_modules/prettier-plugin-sort-imports/dist/index.js'],
};

module.exports = config;
