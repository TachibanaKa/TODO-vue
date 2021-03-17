import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  /* 别名 */
  'resolve.alias': {
    // 路径映射必须以/开头和结尾
    "/comps/": path.resolve(__dirname, "src/components"),
    "/http/": path.resolve(__dirname, "http"),
  },
  proxy: {
    '/api': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
      rewrite: path => path.replace(/^\/api/, '')
    }
},
  plugins: [vue()]
})
