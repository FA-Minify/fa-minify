import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';

const inputFile = 'src/index.ts';

const outputFile = 'dist/index.js';
const outputDts = 'dist/index.d.ts';

export default [
  {
    input: inputFile,
    plugins: [
      esbuild()
    ],
    output: {
      file: outputFile,
      name: 'faMinify',
      format: 'umd',
      sourcemap: true,
    }
  },
  {
    input: inputFile,
    plugins: [
      dts()
    ],
    output: {
      file: outputDts,
      format: 'es',
    }
  }
];