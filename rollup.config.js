// rollup.config.js
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import cleanup from "rollup-plugin-cleanup";
const { default: esbuild } = require("rollup-plugin-esbuild");
const path = require("path");

const external = ["react", "react-dom"];
const extensions = [".js", ".ts", ".tsx"];

function getEsbuild() {
  return esbuild({
    target: "es2018",
    supported: { "import-meta": true },
    tsconfig: path.resolve("./tsconfig.json"),
  });
}

const plugins = [
  peerDepsExternal(),
  resolve({ extensions }),
  terser(),
  getEsbuild(),
  cleanup(),
];
function createESMConfig(input, output) {
  return {
    input,
    output: { file: output, format: "esm" },
    external,
    plugins,
  };
}

export default [
  {
    input: ["src/index.ts"],
    output: [
      {
        dir: "dist",
        format: "es",
        // preserveModules: true,
        // preserveModulesRoot: "src",
        // exports: "named",
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs({ exclude: "node_modules", ignoreGlobal: true }),
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: false,
        exclude: ["**/__tests__", "**/*.test.ts"],
      }),
      terser(),
      cleanup(),
    ],
    external: ["react", "react-dom"],
  },
  {
    input: "src/index.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [dts.default(), cleanup()],
  },
  createESMConfig(`src/index.ts`, `dist/esm/index.mjs`),
];
