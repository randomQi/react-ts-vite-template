import React, { useReducer } from 'react'
type name = {
	value: number
}
type action = { type: string; payload?: number }
type typeReducer = React.Reducer<name, action>
const reducer: typeReducer = (state, action) => {
	if (action.type === 'change') {
		const { floor, random } = Math
		return { value: floor(random() * 10) }
	}
	return { value: 6666 }
}

const Login: React.FC = () => {
	const [info, dispatch] = useReducer<typeReducer>(reducer, { value: 123 })
	const [data] = React.useState(0)
	const initAdd = () => {
		dispatch({ type: 'change', payload: 123 })
	}
	return (
		<>
			<div>{data}</div>
			<button onClick={initAdd}>触发reducer默认类型</button>
			<input value={info.value} readOnly={true} />
			<button onClick={() => dispatch({ type: 'change' })}>触发change类型的事件</button>
		</>
	)
}
export default Login
