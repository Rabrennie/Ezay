import babel from 'rollup-plugin-babel';
import { uglify } from "rollup-plugin-uglify";

export default {
    entry: 'src/index.js',
    dest: 'dist/ezay.min.js',
    format: 'iife',
    sourceMap: 'inline',
    plugins: [
        babel({
            exclude: 'node_modules/**',
        }),
        uglify(),
    ]
};