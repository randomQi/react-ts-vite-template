import { useEffect, useState } from 'react'
import './virtual.moudle.scss'
const totalNum = 10000
const oriData = Array.from({ length: totalNum }, (data, index) => index)
const curVisNum = 10,
	itemHeight = 100
function Index() {
	const [startIndex, setStartIndex] = useState(0)
	const [endIndex, setEndIndex] = useState(curVisNum)
	const [data, setData] = useState([])
	const [top, setTop] = useState(0)
	useEffect(() => {
		const numbers = oriData.slice(startIndex, endIndex)
		setData(numbers)
	}, [startIndex])
	return (
		<div className="container">
			<div className="virtual-wrapper" onScroll={handleScroll}>
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
		const startIndex = Math.floor(scrollTop / itemHeight)
		setStartIndex(startIndex)
		setEndIndex(startIndex + curVisNum)
		setTop(startIndex * itemHeight)
	}
}

export default Index
