import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

import tsconfig from './tsconfig.json';

// https://vite.dev/config/

const SRC_PATH = path.resolve(__dirname, 'src');

const parseTsConfigPaths = (paths: Record<string, string[]>): Record<string, string> => {
  const aliasMap: Record<string, string> = {};

  Object.entries(paths).forEach(([aliasKey, [pathValue]]) => {
    const prefix = aliasKey.replace(/\/\*$/, '');
    const dir = pathValue.replace(/[^a-zA-Z]/g, '');
    aliasMap[prefix] = path.join(SRC_PATH, dir);
  });

  return aliasMap;
};
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: parseTsConfigPaths(tsconfig.compilerOptions.paths),
  },
})