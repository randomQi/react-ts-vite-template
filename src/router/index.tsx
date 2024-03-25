import {
	Route,
	Routes,
	useLocation,
	useParams,
	useSearchParams,
	useNavigate,
	RouteObject,
	createHashRouter,
} from 'react-router-dom'
const { Header, Sider, Content } = Layout
import { routesI } from '@/router/routers'
import routes from '@/router/routers'
import React, { FunctionComponent, lazy, Suspense } from 'react'
import { Layout, Spin } from 'antd'
import path from 'path'
import { Slider } from '@/layout/sider/slider'

const moudle = import.meta.glob('../pages/**/*.tsx')
export const routeConfig = Object.keys(moudle).map<RouteObject>((key) => {
	const result = key.split('/')
	return { path: '/' + result[result.length - 2], element: LazyLoad(lazy(moudle[key])) }
})
export const remixRouter = createHashRouter(routeConfig)
export function createRoute(routes: routesI[] | undefined) {
	return (
		<>
			{routes?.map((item, index) => {
				return index === 0 ? (
					<Route path={item.path} key={index} index element={<Element {...item} />} />
				) : (
					<Route path={item.path} key={index} element={<Element {...item} />} />
				)
			})}
		</>
	)
}

function Element(props: routesI) {
	const pathAParams = useParams()
	const location = useLocation()
	const searchParams = useSearchParams()
	const navigate = useNavigate()
	const { component: Component } = props
	return <Component pathAParams={pathAParams} location={location} searchParams={searchParams} navigate={navigate} />
}

export function LazyLoad(Component: React.LazyExoticComponent<() => JSX.Element>): React.ReactNode {
	return (
		<Suspense fallback={<Spin />}>
			<Component />
		</Suspense>
	)
}

export default function RouterView() {
	return (
		<Suspense fallback={<>loading</>}>
			<Routes>{createRoute(routes)}</Routes>
		</Suspense>
	)
}
