// Plugins
import vue from '@vitejs/plugin-vue';
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
// Utilities
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import { GitRevisionPlugin } from 'git-revision-webpack-plugin';
const gitRevisionPlugin = new GitRevisionPlugin();

// https://vitejs.dev/config/
export default defineConfig({
  'base': './', // for deployment purposes
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
    }),
  ],
  define: {
    'process.env': {
      //VUE_APP_VERSION: gitRevisionPlugin.version(),
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
  },
  server: {
    port: 3000,
  },
});
