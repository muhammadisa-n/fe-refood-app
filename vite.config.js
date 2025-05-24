import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/refood-app/',
    resolve: {
        alias: [
            {
                find: '@src',
                replacement: fileURLToPath(new URL('./src', import.meta.url)),
            },
            {
                find: '@assets',
                replacement: fileURLToPath(
                    new URL('./src/assets', import.meta.url)
                ),
            },
            {
                find: '@components',
                replacement: fileURLToPath(
                    new URL('./src/components', import.meta.url)
                ),
            },
            {
                find: '@context',
                replacement: fileURLToPath(
                    new URL('./src/context', import.meta.url)
                ),
            },
            {
                find: '@pages',
                replacement: fileURLToPath(
                    new URL('./src/pages', import.meta.url)
                ),
            },
            {
                find: '@layouts',
                replacement: fileURLToPath(
                    new URL('./src/layouts', import.meta.url)
                ),
            },
            {
                find: '@utils',
                replacement: fileURLToPath(
                    new URL('./src/utils', import.meta.url)
                ),
            },
        ],
    },
})
