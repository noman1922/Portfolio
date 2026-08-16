import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = [
  {
    ignores: ["animations.js", "inspect.js", "structure.js", "node_modules/**", ".next/**"]
  },
  ...nextVitals,
  ...nextTs
];

export default eslintConfig;
