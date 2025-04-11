import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: process.env.BACKEND_URL,
                changeOrigin: true,
            },
        },
        watch: { usePolling: true },
    },
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './testSetup.js',
    },
})
