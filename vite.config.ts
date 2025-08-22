import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { type UserConfig, defineConfig, loadEnv } from 'vite';
import type { UserConfig as ViteUserConfig } from 'vite';

type Config = UserConfig & { test?: ViteUserConfig };

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Carrega apenas variáveis que começam com VITE_
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    build: {
      outDir: 'dist',
      rollupOptions: {
        input: '/index.html',
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './vitest.setup.ts',
      include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    },
    define: {
      __VITE_API__: JSON.stringify(env.VITE_SPOTIFY_API),
    },
  } as Config;
});
