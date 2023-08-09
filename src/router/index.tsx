import { Route, Routes, useLocation, useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { routesI } from '@/router/routers'
import routes from '@/router/routers'
import { Suspense } from 'react'
import { ReactNode } from 'react'

function createRoute(routes: routesI[]) {
	return (
		<>
			{routes.map((item, index) => {
				return (
					<Route path={item.path} key={index} element={<Element {...item} />}>
						{item.children?.length > 0 ? createRoute(item.children) : null}
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
		<Suspense>
			<Routes>{createRoute(routes)}</Routes>
		</Suspense>
	)
}
