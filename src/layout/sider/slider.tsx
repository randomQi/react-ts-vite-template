import { Menu } from 'antd'
import routes from '@/router/routers'
import {useEffect, useState} from 'react'
import { useNavigate,useLocation } from 'react-router-dom'
export function Slider() {
	const nav = useNavigate()
	const { pathname } = useLocation()
	const menuItemClick = ({ key }) => {
		nav(key)
	}
	return <Menu items={routes} theme="dark" selectedKeys={[pathname]} onClick={menuItemClick}></Menu>
}
