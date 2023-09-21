import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import 'reset.css'
import './index.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '@/store'
import { createRoute } from '@/router'
import routes from '@/router/routers'
import Login from '@/pages/Login'
import LayoutLQ from '@/layout'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<ConfigProvider locale={zhCN}>
		<HashRouter>
			<Provider store={store}>
				<App></App>
			</Provider>
		</HashRouter>
	</ConfigProvider>
)
