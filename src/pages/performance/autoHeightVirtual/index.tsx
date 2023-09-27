import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import './autoHeightVirtual.moudle.scss'
import mock from 'mockjs'
function genernateData() {
	return mock.Random.paragraph(1, 5)
}
const estimateHeight = 100
const randomData = Array.from({ length: 1000 }, (n, id) => ({
	name: Math.random().toString(32).slice(2),
	id,
	content: genernateData(),
	itemStartHeight: id * estimateHeight,
	itemEndHeight: id * estimateHeight + estimateHeight,
	height: estimateHeight,
}))
const totalEstimateHeight = randomData.length * estimateHeight
function AutoHeightVirtual() {
	const scrollDom = useRef<HTMLDivElement | null>(null)
	const mutableRefObject = useRef<HTMLUListElement | null>(null)
	const [appData, setAppData] = useState([])
	const [startIndex, setStartIndex] = useState(0)
	const [top, setTop] = useState(0)
	const effectHandler = () => {
		const current = mutableRefObject.current as HTMLElement
		for (const currentElement of current.children) {
			const randomIndex = currentElement.dataset['index'] * 1
			const randomDatum = randomData[randomIndex]
			const { height } = currentElement.getBoundingClientRect()
			const diff = randomDatum.height - height
			randomDatum.height -= diff
			randomDatum.itemEndHeight -= diff
			for (let i = randomIndex + 1; i < randomData.length; i++) {
				const jPosDataItem = randomData[i]
				// j位置的上一个位置的元素
				const jPrevPosDataItem = randomData[i - 1]
				jPosDataItem.itemStartHeight = jPrevPosDataItem.itemEndHeight
				jPosDataItem.itemEndHeight = jPosDataItem.itemStartHeight + jPosDataItem.height
			}
		}
	}
	useLayoutEffect(() => {
		const { clientHeight } = scrollDom.current
		// 计算当前视口中渲染元素的个数
		let tempHeight = 0,
			index = startIndex
		while (tempHeight <= clientHeight) {
			tempHeight += randomData[index++].height
		}
		setAppData(randomData.slice(startIndex, ++index))
	}, [startIndex])
	useEffect(effectHandler, [startIndex])
	return (
		<div className="container">
			<div className="scroll-container" ref={scrollDom} onScroll={scrollHandler}>
				<div className="empty-box" style={{ height: totalEstimateHeight }}></div>
				<ul className="real-container" ref={mutableRefObject} style={{ top }}>
					{appData.map((item, index) => {
						return (
							<li key={index} data-index={item.id}>
								{item.content}
							</li>
						)
					})}
				</ul>
			</div>
		</div>
	)

	function scrollHandler(e) {
		const { scrollTop } = e.currentTarget
		let idx = 0
		let dataItem = randomData[idx]
		while (dataItem.itemEndHeight <= scrollTop) {
			idx++
			dataItem = randomData[idx]
		}
		setStartIndex(idx)
		setTop(randomData[idx].itemStartHeight)
	}
}

export default AutoHeightVirtual

// 元数据
const measuredData = {
	measuredDataMap: {},
	LastMeasuredItemIndex: -1,
}

const estimatedHeight = (defaultEstimatedItemSize = 50, itemCount) => {
	let measuredHeight = 0
	const { measuredDataMap, LastMeasuredItemIndex } = measuredData
	// 计算已经获取过真实高度的项的高度之和
	if (LastMeasuredItemIndex >= 0) {
		const lastMeasuredItem = measuredDataMap[LastMeasuredItemIndex]
		measuredHeight = lastMeasuredItem.offset + lastMeasuredItem.size
	}
	// 未计算过真实高度的项数
	const unMeasuredItemsCount = itemCount - measuredData.LastMeasuredItemIndex - 1
	// 预测总高度
	const totalEstimatedHeight = measuredHeight + unMeasuredItemsCount * defaultEstimatedItemSize
	return totalEstimatedHeight
}

const getItemMetaData = (props, index) => {
	const { itemSize } = props
	const { measuredDataMap, LastMeasuredItemIndex } = measuredData
	// 如果当前索引比已记录的索引要大，说明要计算当前索引的项的size和offset
	if (index > LastMeasuredItemIndex) {
		let offset = 0
		// 计算当前能计算出来的最大offset值
		if (LastMeasuredItemIndex >= 0) {
			const lastMeasuredItem = measuredDataMap[LastMeasuredItemIndex]
			offset += lastMeasuredItem.offset + lastMeasuredItem.size
		}
		// 计算直到index为止，所有未计算过的项
		for (let i = LastMeasuredItemIndex + 1; i <= index; i++) {
			const currentItemSize = itemSize(i)
			measuredDataMap[i] = { size: currentItemSize, offset }
			offset += currentItemSize
		}
		// 更新已计算的项的索引值
		measuredData.LastMeasuredItemIndex = index
	}
	return measuredDataMap[index]
}

const getStartIndex = (props, scrollOffset) => {
	const { itemCount } = props
	let index = 0
	while (true) {
		const currentOffset = getItemMetaData(props, index).offset
		if (currentOffset >= scrollOffset) return index
		if (index >= itemCount) return itemCount
		index++
	}
}

const getEndIndex = (props, startIndex) => {
	const { height, itemCount } = props
	// 获取可视区内开始的项
	const startItem = getItemMetaData(props, startIndex)
	// 可视区内最大的offset值
	const maxOffset = startItem.offset + height
	// 开始项的下一项的offset，之后不断累加此offset，直到等于或超过最大offset，就是找到结束索引了
	let offset = startItem.offset + startItem.size
	// 结束索引
	let endIndex = startIndex
	// 累加offset
	while (offset <= maxOffset && endIndex < itemCount - 1) {
		endIndex++
		const currentItem = getItemMetaData(props, endIndex)
		offset += currentItem.size
	}
	return endIndex
}

const getRangeToRender = (props, scrollOffset) => {
	const { itemCount } = props
	const startIndex = getStartIndex(props, scrollOffset)
	const endIndex = getEndIndex(props, startIndex)
	return [Math.max(0, startIndex - 2), Math.min(itemCount - 1, endIndex + 2), startIndex, endIndex]
}

const VariableSizeList = (props) => {
	const { height, width, itemCount, itemEstimatedSize, children: Child } = props
	const [scrollOffset, setScrollOffset] = useState(0)

	const containerStyle = {
		position: 'relative',
		width,
		height,
		overflow: 'auto',
		willChange: 'transform',
	}

	const contentStyle = {
		height: estimatedHeight(itemEstimatedSize, itemCount),
		width: '100%',
	}

	const getCurrentChildren = () => {
		const [startIndex, endIndex, originStartIndex, originEndIndex] = getRangeToRender(props, scrollOffset)
		const items = []
		for (let i = startIndex; i <= endIndex; i++) {
			const item = getItemMetaData(props, i)
			const itemStyle = {
				position: 'absolute',
				height: item.size,
				width: '100%',
				top: item.offset,
			}
			items.push(<Child key={i} index={i} style={itemStyle} />)
		}
		return items
	}

	const scrollHandle = (event) => {
		const { scrollTop } = event.currentTarget
		setScrollOffset(scrollTop)
	}

	return (
		<div style={containerStyle} onScroll={scrollHandle}>
			<div style={contentStyle}>{getCurrentChildren()}</div>
		</div>
	)
}
