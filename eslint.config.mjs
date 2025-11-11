// @ts-check

import { globalIgnores, defineConfig } from "eslint/config";
import { configs as tsConfigs } from "typescript-eslint";
import perfectionist from "eslint-plugin-perfectionist";
import prettier from "eslint-config-prettier/flat";
import reactHooks from "eslint-plugin-react-hooks";
import { importX } from "eslint-plugin-import-x";
import jsxA11y from "eslint-plugin-jsx-a11y";
import next from "@next/eslint-plugin-next";
import unicorn from "eslint-plugin-unicorn";
import globals from "globals";
import js from "@eslint/js";

export default defineConfig([
  globalIgnores([".next/", "out/", "build/", ".turbo/", "next-env.d.ts"]),
  js.configs.recommended,
  tsConfigs.recommendedTypeChecked,
  {
    rules: {
      "@typescript-eslint/no-import-type-side-effects": "error",
      "@typescript-eslint/consistent-type-imports": "error",
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        projectService: true,
      },
    },
  },
  perfectionist.configs["recommended-line-length"],
  {
    plugins: {
      // @ts-expect-error ignore type incompatibility
      "import-x": importX,
    },
    extends: ["import-x/flat/recommended", "import-x/flat/typescript"],
  },
  unicorn.configs.recommended,
  reactHooks.configs.flat.recommended,
  jsxA11y.flatConfigs.recommended,
  // eslint-disable-next-line import-x/no-named-as-default-member
  next.configs.recommended,
  // eslint-disable-next-line import-x/no-named-as-default-member
  next.configs["core-web-vitals"],
  prettier,
]);
