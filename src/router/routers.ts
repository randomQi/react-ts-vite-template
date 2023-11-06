import React, { JSX, lazy, LazyExoticComponent } from 'react'
import { A } from '@/pages/A'
import LayoutLQ from '@/layout'
import B from '@/pages/B'
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
// const routes: routesI[] = [
// 	{
// 		path: '/*',
// 		key: '/',
// 		label: 'Background',
// 		component: <LayoutLQ/>,
// 		hidden: false,
// 		children: [],
// 	},
// ]
const routes: routesI[] = [
	{
		path: '/a',
		key: '/a',
		label: 'A组件',
		component: A,
		hidden: false,
		// children: [],
	},
	{
		path: 'b',
		key: '/b',
		label: 'B组件',
		component: B,
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
	{
		path: '/lazyImage',
		key: '/lazyImage',
		label: 'lazyImage',
		component: lazy(() => import('@/pages/lazyImage')),
		hidden: false,
		// children: [],
	},
	{
		path: '/performance',
		key: '/performance',
		label: '性能优化',
		component: lazy(() => import('@/pages/performance/virtualList')),
		hidden: false,
		// children: [],
	},
	{
		path: '/autoHeight',
		key: '/autoHeight',
		label: '不定高度',
		component: lazy(() => import('@/pages/performance/autoHeightVirtual')),
		hidden: false,
		// children: [],
	},
]

export default routes
