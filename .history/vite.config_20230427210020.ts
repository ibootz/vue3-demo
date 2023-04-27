import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router', 'vue-i18n'],
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
      resolvers: [ElementPlusResolver()],
      vueTemplate: true,
      dts: './types/auto-imports.d.ts'
    }),
    Components({
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
      dirs: ['src/components', 'src/**/components'],
      extensions: ['vue', 'jsx', 'tsx', 'ts', 'js'],
      resolvers: [ElementPlusResolver()],
      dts: './types/components.d.ts'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
