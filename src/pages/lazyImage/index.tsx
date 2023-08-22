import './index.moudle.scss'
import { useEffect, useRef, useState } from 'react'
import { getRandomImageList } from '@/apis/lazyImages'
import svg from '@/assets/react.svg'
import { flushSync } from 'react-dom'
import { thor } from '@/utils'
export default function LazyImage() {
	const [image, setImgState] = useState([])
	const imgListDom = useRef([])
	const imgCon = useRef<HTMLDivElement | null>(null)
	useEffect(() => {
		getRandomImageList().then(({ data }) => {
			flushSync(() => {
				setImgState(data)
			})
			computeDis()
		})
		imgCon.current?.addEventListener('scroll', computeDis)
		return () => {
			imgCon.current?.removeEventListener('scroll', computeDis)
		}
	}, [])
	const computeDis = thor(
		() => {
			const { clientHeight } = imgCon.current
			console.log(imgListDom.current)
			for (let i = 0; i < imgListDom.current.length; i++) {
				const dom = imgListDom.current[i]
				const { top } = dom.getBoundingClientRect()
				if (top - clientHeight - 60 <= 0) {
					if (dom.src === location.origin + svg) {
						dom.src = dom.dataset.src
					}
				}
			}
		},
		500,
		true
	)

	return (
		<div className="imgList-wrapper" ref={imgCon}>
			{image.map((item, index) => {
				return <img src={svg} key={index} ref={(e) => (imgListDom.current[index] = e)} data-src={item} alt="" />
			})}
		</div>
	)
}
