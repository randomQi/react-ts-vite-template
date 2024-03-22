import { Route, Routes, useLocation, useParams, useSearchParams, useNavigate, Navigate } from 'react-router-dom'
const { Header, Sider, Content } = Layout
import { routesI } from '@/router/routers'
import routes from '@/router/routers'
import React, { Suspense } from 'react'
import { Layout } from 'antd'
import { Slider } from '@/layout/sider/slider'

export function createRoute(routes: routesI[] | undefined) {
	return (
		<>
			{routes?.map((item, index) => {
				return index === 0 ? (
					<Route path={item.path} key={index} index element={<Element {...item} />}>
						{item?.children?.length > 0 ? createRoute(item.children) : null}
					</Route>
				) : (
					<Route path={item.path} key={index} element={<Element {...item} />}>
						{item?.children?.length > 0 ? createRoute(item.children) : null}
					</Route>
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

export default function RouterView() {
	return (
		<Suspense loading={<>loading</>}>
			<Routes>{createRoute(routes)}</Routes>
		</Suspense>
	)
}
