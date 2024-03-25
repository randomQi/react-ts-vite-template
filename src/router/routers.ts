import React, { FunctionComponent, JSX, lazy, LazyExoticComponent, SuspenseProps } from 'react'
import A from '@/pages/A'
import LayoutLQ from '@/layout'
import B from '@/pages/B'
import { LazyLoad } from './index.tsx'
export interface routesI {
	key?: string
	index?: boolean
	path: string
	label: string
	icon?: React.ReactNode
	component: React.ReactNode | LazyExoticComponent<FunctionComponent> | FunctionComponent
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
		component: lazy(() => import('@/pages/A')),
		hidden: false,
		// children: [],
	},
	{
		path: '/b',
		key: '/b',
		label: 'B组件',
		component: B,
		hidden: false,
		// children: [],
	},
	{
		component: lazy(() => import('@/pages/C')),
		hidden: false,
		key: '/c',
		label: 'C组件',
		path: '/c',
		// children: [],
	},
	{
		path: 'lazyImage',
		key: '/lazyImage',
		label: 'lazyImage',
		component: lazy(() => import('@/pages/lazyImage')),
		hidden: false,
		// children: [],
	},
	{
		path: 'performance',
		key: '/performance',
		label: '性能优化',
		component: lazy(() => import('@/pages/performance/virtualList')),
		hidden: false,
		// children: [],
	},
	{
		path: 'autoHeight',
		key: '/autoHeight',
		label: '不定高度',
		component: lazy(() => import('@/pages/performance/autoHeightVirtual')),
		hidden: false,
		// children: [],
	},
	{
		path: 'calendar',
		key: '/calendar',
		label: '日历',
		component: lazy(() => import('@/pages/calendar')),
		hidden: false,
		// children: [],
	},
]
export default routes
