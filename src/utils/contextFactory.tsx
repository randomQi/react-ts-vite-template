import React, { useContext } from 'react'
interface IProps {
	Children: React.ReactNode
}
interface IDefaultStroe<T> {
	key: string
	store: T
	setStore: (payload: Partial<T>) => void
}
const cacheContext: Record<string, InsContext> = {}
class InsContext<T = any> {
	defaultStore: IDefaultStroe<T>
	AppContext: React.Context<IDefaultStroe<T>>
	AppProvider: ({ Children }: IProps) => React.JSX.Element
	constructor(key: string, defaultValue: T) {
		this.defaultStore = { key, store: defaultValue, setStore: () => {} }
		this.AppContext = React.createContext(defaultValue)
		this.AppProvider = getAppProvider(key, defaultValue, this.AppContext)
		cacheContext[key] = this
	}
}
function getAppProvider<T>(key: string, defaultValue: T, AppContext: React.Context<IDefaultStroe<T>>) {
	return ({ children }: IProps) => {
		const [store, setStore] = React.useState(defaultValue)
		const value = { store, key, setStore: (payload: Partial<T>) => setStore((state) => ({ ...state, ...payload })) }
		return <AppContext.Provider value={value}>{children}</AppContext.Provider>
	}
}
export function useAppContext<T>(key: string) {
	const { AppContext } = cacheContext[key] as React.Context<IDefaultStroe<T>>
	const { store, setStore } = useContext(AppContext)
	return { store, setStore }
}

export default function connectFactory<T>(key: string, defaultValue: T) {
	const insContext = cacheContext[key]
	let CurContext: InsContext
	if (insContext) {
		CurContext = insContext
	} else {
		CurContext = new InsContext<T>(key, defaultValue)
	}
	return (Children: React.FunctionComponent) => (props) =>
		(
			<CurContext.AppProvider>
				<Children {...props} />
			</CurContext.AppProvider>
		)
}
