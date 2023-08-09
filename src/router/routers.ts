import React, { JSX, lazy, LazyExoticComponent } from 'react'
import { A } from '@/pages/A'
export interface routesI {
	key?: string
	path: string
	label: string
	icon?: React.ReactNode
	component: React.Component | React.FC | LazyExoticComponent<JSX.Element>
	hidden?: boolean
	meta?: Record<any, any>
	children?: routesI[]
}
const routes: routesI[] = [
	{
		path: '/background',
		key: '/background',
		label: 'Background',
		component: A,
		hidden: false,
		// children: [],
	},
	{
		path: '/b',
		key: '/b',
		label: 'B组件',
		component: lazy(() => import('@/pages/B')),
		hidden: false,
		// children: [],
	},
	{
		path: '/c',
		key: '/c',
		label: 'C组件',
		component: lazy(() => import('@/pages/C')),
		hidden: false,
		// children: [],
	},
]

export default routes
