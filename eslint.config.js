import htmlParser from "@html-eslint/parser";
import readableTailwind from "eslint-plugin-readable-tailwind";

export default [
  { ignores: ["dist/**", "node_modules/**"] },
  {
    files: ["**/*.html"],
    languageOptions: { parser: htmlParser },
    plugins: { "readable-tailwind": readableTailwind },
    settings: {
      "readable-tailwind": { entryPoint: "./src/style.css" },
    },
    rules: {
      ...readableTailwind.configs.error.rules,
      "readable-tailwind/multiline": [
        "error",
        {
          printWidth: 80,
          classesPerLine: 1, // Place one class per line.
          indent: 2,
          group: "newLine",
          preferSingleLine: true,
        },
      ],
    },
  },
];
