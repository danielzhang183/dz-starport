import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Unocss from 'unocss/vite'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
      'dz-starport': path.resolve(__dirname, '../src/index.ts'),
    },
  },
  plugins: [
    vue({
      reactivityTransform: true,
    }),
    Pages(),
    AutoImport({
      imports: [
        'vue',
        'vue/macros',
        'vue-router',
        '@vueuse/core',
      ],
      dts: true,
      vueTemplate: true,
    }),
    Components({
      dts: true,
      types: [
        {
          from: 'vue-router',
          names: [
            'RouterView',
            'RouterLink',
          ],
        },
        {
          from: 'dz-starport',
          names: [
            'Starport',
            'StarportCarrier',
          ],
        },
      ],
    }),
    Unocss(),
  ],
})
