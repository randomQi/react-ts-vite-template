import { useState } from 'react'
import { HashRouter} from "react-router-dom";
import './App.css'
import Login from '@/pages/Login'
import RouterView from "@/router";
function App() {
	const [count, setCount] = useState<number>(0)

	return (
		<>
			<HashRouter>
			<Login/>
			<RouterView/>
			<h1>Vite + React</h1>
			<div className="card">
				<button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">Click on the Vite and React logos to learn more</p>
			</HashRouter>
		</>
	)
}
export default App
