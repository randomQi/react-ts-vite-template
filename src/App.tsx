import React from 'react'
import './App.css'
import { Layout } from 'antd'
const { Header, Sider, Content } = Layout
import { Slider } from '@/layout/sider/slider'
import RouterView from '@/router'
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
	return (
		<Layout style={{ height: '100%' }}>
			<Header style={headerStyle}>Header</Header>
			<Layout>
				<Sider style={siderStyle}>
					<Slider />
				</Sider>
				<Content style={contentStyle}>
					<RouterView></RouterView>
				</Content>
			</Layout>
		</Layout>
	)
}
export default App
