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
          classesPerLine: 1, // 무조건 한 줄에 1개씩 배치
          indent: 2,
          group: "newLine",
          preferSingleLine: true,
        },
      ],
    },
  },
];
