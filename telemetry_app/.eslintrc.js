module.exports = {
	'env': {
    'browser': true,
    'es6': true,
  	'node': true,
  	},
	extends: [
		// add more generic rulesets here, such as:
		//"eslint:recommended",
		"plugin:vue/vue3-recommended",
		"eslint:recommended",
		"@vue/prettier",
		"prettier",
	],
	rules: {
		// override/add rules settings here, such as:
		// 'vue/no-unused-vars': 'error'
		'prettier/prettier': [
		'error',
		{
			'endOfLine': 'auto',
		}
		],
		indent: ["error", 2],

	},
};
