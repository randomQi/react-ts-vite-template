import React from 'react'
import './App.css'
import { Layout } from 'antd'
const { Header, Sider, Content } = Layout
import { Slider } from '@/layout/sider/slider'
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
			<Sider style={siderStyle}>
				<Slider />
			</Sider>
			<Layout>
				<Header style={headerStyle}>Header</Header>
				<Content style={contentStyle}>Content</Content>
			</Layout>
		</Layout>
	)
}
export default App
