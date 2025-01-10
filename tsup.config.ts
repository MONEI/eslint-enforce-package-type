import {defineConfig} from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  treeshake: true,
  outDir: 'dist',
  target: 'node18',
  splitting: false,
  bundle: true,
  minify: false,
  shims: true
});
