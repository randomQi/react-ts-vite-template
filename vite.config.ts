import { defineConfig } from 'vite'
import autoprefixer from 'autoprefixer'
import react from '@vitejs/plugin-react'
import path from 'path'
import cesium from 'vite-plugin-cesium';
import { myVitePlugin } from './plugin'
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), cesium(), myVitePlugin()],
	server: {
		host: '0.0.0.0',
		port: 10010,
	},
	css: {
		postcss: {
			plugins: [autoprefixer],
		},
	},
	build: {
		rollupOptions: {
			output: {
				chunkFileNames: 'static/js/[name]-[hash].js',
				entryFileNames: 'static/js/[name]-[hash].js',
				assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
			},
		},
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
})
