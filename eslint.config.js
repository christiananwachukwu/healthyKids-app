import globals from "globals";
import js from "@eslint/js";

export default [
  // 1. Standard Recommended Rules
  js.configs.recommended,

  // 2. Configuration for Frontend (Browser) Files
  {
    files: ["**/*.js"],
    languageOptions: {
      // Allows browser-specific globals like 'document', 'window', and 'fetch'
      globals: {
        ...globals.browser,
      },
      // Set the JS version to ES2022 (modern)
      ecmaVersion: 2022,
      sourceType: "module",
    },
    rules: {
      // Add custom rules here if needed
      "no-unused-vars": "warn",
      "no-undef": "error",
    },
  },

  // 3. Configuration for Serverless Functions (Node.js)
  {
    files: ["netlify/functions/**/*.js"], // Specifically target your functions folder
    languageOptions: {
      // Allows Node.js-specific globals like 'process', 'require', 'module'
      globals: {
        ...globals.node,
      },
      ecmaVersion: 2022,
      sourceType: "commonjs",
    },
    rules: {
      "no-console": "off", // Allow console.log in serverless functions for debugging
    },
  },
];
