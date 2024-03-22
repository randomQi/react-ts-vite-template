import { Layout } from 'antd'
const { Header, Sider, Content } = Layout
import { Slider } from '@/layout/sider/slider'
import Login from '@/pages/Login'
import { Outlet, Route, Routes } from 'react-router-dom'
import { createRoute } from '@/router'
import routes from '@/router/routers'
import React from 'react'
function LayoutLQ() {
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
							<Outlet></Outlet>
							{/*多级路由配置*/}
							{/*{createRoute(routes)}*/}
							{/*<Routes>{createRoute(routes)}</Routes>*/}
						</Content>
					</Layout>
				</Layout>
			</>
		)
	} else {
		return <Login></Login>
	}
}
export default LayoutLQ
