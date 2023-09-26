import {useEffect, useState, useRef, useLayoutEffect} from 'react'
import './virtual.moudle.scss'
const totalNum = 10000
const oriData = Array.from({ length: totalNum }, (data, index) => `第${index + 1}条数据`)
let curVisNum = 10,
	itemHeight = 100
function Index() {
	const [startIndex, setStartIndex] = useState(0)
	let [endIndex, setEndIndex] = useState(0)
	const [data, setData] = useState([])
	const [top, setTop] = useState(0)
	const mutableRefObject1 = useRef<number>(0)
	const mutableRefObject = useRef<HTMLDivElement | unknown>()
	useLayoutEffect(() => {
		endIndex = Math.ceil(mutableRefObject.current.clientHeight / itemHeight)
		setEndIndex(endIndex)
		mutableRefObject1.current = curVisNum
	},[])
	useEffect(() => {
		const numbers = oriData.slice(Math.max(0, startIndex - curVisNum), Math.min(endIndex + curVisNum, oriData.length))
		setData(numbers)
	}, [startIndex])
	return (
		<div className="container">
			<div className="virtual-wrapper" ref={mutableRefObject} onScroll={handleScroll}>
				<div className="faker-height" style={{ height: totalNum * itemHeight }}></div>
				{/* top定位，此处有确定滑动过快会出白屏*/}
				<ul className="real-height" style={{ top: top }}>
					{data.map((item, index) => (
						<li key={index} style={{ height: itemHeight }}>
							{item}
						</li>
					))}
				</ul>
			</div>
		</div>
	)
	function handleScroll(e) {
		const { scrollTop } = e.currentTarget
		// 计算滚动过的数据
		const item = Math.floor(scrollTop / itemHeight)
		const startIndex = Math.max(0, item - mutableRefObject1.current)
		setStartIndex(startIndex)
		const endIndex = Math.min(startIndex + curVisNum, oriData.length)
		setEndIndex(endIndex)
		setTop(startIndex * itemHeight)
	}
}

export default Index
