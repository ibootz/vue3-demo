/// <reference types="vite/client" />
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const vueComponent: DefineComponent<{}, {}, any>
  export default vueComponent
}

declare module 'element-plus/es/locale/*' {
  import { Locale } from 'element-plus/es/components/config-provider'
  const locale: Locale & ReadonlyRecordable
  export default locale as Locale & ReadonlyRecordable
}
