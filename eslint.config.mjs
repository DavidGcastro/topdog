import globals from "globals";
import pluginJs from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: globals.node, // Use Node.js globals
    },
  },
  pluginJs.configs.recommended, // eslint:recommended configuration
  eslintPluginPrettierRecommended, // prettier:recommended configuration
];
