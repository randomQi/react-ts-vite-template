import { stringify } from 'querystring'
import React from 'react'

interface IRoute {
	path: string
	name: string
	key: string
	icon: React.ReactNode
	component: React.ReactNode
}
export const routes_config: Record<string, Partial<IRoute>> = {
	home: { path: '/', name: '首页', key: 'home' },
	home: { path: '/', name: '首页', key: 'home' },
}
