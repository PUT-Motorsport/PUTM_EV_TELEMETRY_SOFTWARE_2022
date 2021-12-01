const path = require("path");

module.exports = {
	extends: [
		// add more generic rulesets here, such as:
		"eslint:recommended",
		"plugin:vue/vue3-recommended",
		// 'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
	],
	rules: {
		// override/add rules settings here, such as:
		// 'vue/no-unused-vars': 'error'
	},
	chainWebpack: (config) => {
		const types = ["vue-modules", "vue", "normal-modules", "normal"];
		types.forEach((type) => addStyleResource(config.module.rule("stylus").oneOf(type)));
	},
};

function addStyleResource(rule) {
	rule
		.use("style-resource")
		.loader("style-resources-loader")
		.options({
			patterns: [path.resolve(__dirname, "./src/scss/main.scss")],
		});
}
