import { Menu } from 'antd'
import routes from '@/router/routers'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
export function Slider() {
	const nav = useNavigate()
	const [current, setCurrent] = useState('/background')
	const menuItemClick = ({ key }) => {
		setCurrent(key)
		nav(key)
	}
	return <Menu items={routes} theme="dark" selectedKeys={[current]} onClick={menuItemClick}></Menu>
}
