import type { IChildRrops } from '@/types'

import React from 'react'

interface IStore<T> {
	key: string
	store: T
	setStore: (playload: Partial<T>) => void
}

class Ctx<T = any> {
	defaultStore!: IStore<T>
	AppContext!: React.Context<IStore<T>>

	Provider!: ({ child }: IChildRrops) => JSX.Element
}

export default class connectFactory<T> {
	key!: string
	appcontext!: React.Context<T>
	constructor() {}
}
