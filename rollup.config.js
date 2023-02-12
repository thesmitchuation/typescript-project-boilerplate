import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import rimraf from "rimraf";

rimraf.sync("dist");

const plugins = [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({ tsconfig: "./tsconfig.json", declaration: true, exclude: ["**/*.spec.ts"], outDir: "dist" }),
    terser()
];

const inputs = [
    {

        input: "src/index.ts",
        output: [
            {
                file: "dist/index.cjs.js",
                format: "cjs",
                sourcemap: true,
            },
            {
                file: "dist/index.esm.js",
                format: "esm",
                sourcemap: true,
            }
        ],
        plugins: plugins
    }
]

export default inputs;
