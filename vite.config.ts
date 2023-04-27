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
      imports: ['vue', 'vue-router', 'pinia', 'vue-i18n'],
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
      resolvers: [ElementPlusResolver()],
      vueTemplate: true,
      dts: './types/auto-imports.d.ts',
      eslintrc: {
        enabled: false, // 默认false, true启用。生成一次就可以，避免每次工程启动都生成，当需要更新配置文件的时候，再重新打开
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true
      }
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
