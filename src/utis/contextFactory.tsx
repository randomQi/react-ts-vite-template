import type { IChildRrops } from '@/types'

import React, { createContext, useMemo, useState } from 'react'

interface IStore<T> {
	key: string
	store: T
	setStore: (playload: Partial<T>) => void
}

function getContextProvider<T>(key: string, defaultValue: T, AppContext: React.Context<IStore<T>>) {
	return ({ child }: IChildRrops) => {
		const [store, setStore] = useState(defaultValue)
		const value = useMemo(() => {
			return {
				key,
				store,
				setStore: (playload) => {
					setStore((store) => ({ ...store, ...playload }))
				},
			}
		}, [store])
		return <AppContext.Provider value={value}>{child}</AppContext.Provider>
	}
}
const catchContext: Record<string, Ctx> = {}
class Ctx<T = any> {
	defaultStore!: IStore<T>
	AppContext!: React.Context<IStore<T>>

	Provider!: ({ child }: IChildRrops) => JSX.Element
	constructor(key: string, defaultValue: T) {
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		this.defaultStore = { key, store: defaultValue, setStore: () => {} }
		this.AppContext = createContext(this.defaultStore)
		this.Provider = getContextProvider(key, defaultValue, this.AppContext)
		catchContext[key] = this
	}
}

export default function connectFactory<T>(key: string, defaultValue: T) {
	const appContext = catchContext[key]
	let curContext: Ctx<T>
	if (appContext) {
		curContext = appContext
	} else {
		curContext = new Ctx<T>(key, defaultValue)
	}

	return (Child: React.FunctionComponent<any>) => (props: any) =>
		(
			<curContext.Provider>
				<Child {...props} />
			</curContext.Provider>
		)
}
