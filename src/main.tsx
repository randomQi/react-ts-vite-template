import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import 'reset.css'
import './index.css'
import { BrowserRouter} from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<ConfigProvider locale={zhCN}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</ConfigProvider>
)
