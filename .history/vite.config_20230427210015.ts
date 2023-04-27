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
      // 只要项目中，在components目录下的文件，会自动导入到components.d.ts中，这样，页面或者组件中就不用再次引入了，也无需在`main.js`通过app.component全局注册了
      dirs: ['src/components', 'src/**/components'],
      extensions: ['vue', 'jsx', 'tsx', 'ts', 'js'],
      resolvers: [ElementPlusResolver()],
      dts: './types/components.d.ts' // 组件类型文件生成位置，默认是根目录 /components.d.ts
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
