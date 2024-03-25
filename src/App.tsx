import React, { Suspense } from 'react'
import './App.css'
import { Layout, Spin } from 'antd'
// const { Header, Sider, Content } = Layout
import { Slider } from '@/layout/sider/slider'
// import RouterView, { createRoute } from '@/router'
import Login from '@/pages/Login'
import { Navigate, Outlet, Route, Routes, RouterProvider, HashRouter } from 'react-router-dom'
import LayoutLQ from '@/layout'
import { FabllbackProvider } from '@/context/performance'
import { createRoute, remixRouter } from '@/router'
import routes from '@/router/routers.ts'
import { Content, Header } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
function App() {
	const siderStyle: React.CSSProperties = {
		height: '100%',
		width: '200px',
		color: '#fff',
	}
	const headerStyle: React.CSSProperties = { color: '#fff' }
	const contentStyle: React.CSSProperties = {
		padding: '10px',
	}
	const isLogin = sessionStorage.getItem('isLogin')
	if (isLogin) {
		return (
			<>
				<Layout style={{ height: '100%' }}>
					<Header style={headerStyle}>Header</Header>
					<Layout>
						<Sider style={siderStyle}>
							<Slider />
						</Sider>
						<Content style={contentStyle}>
							<Suspense fallback={<Spin />}>
								<Routes>
									<Route path="/" element={<Navigate to="/a" />} />
									{createRoute(routes)}
								</Routes>
							</Suspense>
						</Content>
					</Layout>
				</Layout>
			</>
		)
	} else {
		return <Login></Login>
	}
	// return (
	// 	<FabllbackProvider>
	// 		<Suspense loading={<>loading</>}>
	// 			<Routes>
	// 				<Route path="/*" element={<LayoutLQ />}>
	// 					{/*多级路由配置*/}
	// 					{/*<Route path="/*" element={<LayoutLQ />}>*/}
	// 					{/*此方案生成的动态路由并不完美，组件异步加载，路由切换时，存在闪屏的问题*/}
	// 					{createRoute(routes)}
	// 				</Route>
	// 				<Route path="/login" element={<Login />} />
	// 			</Routes>
	// 		</Suspense>
	// 	</FabllbackProvider>
	// )
}
export default App
