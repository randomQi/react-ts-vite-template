import {useEffect, useState} from 'react'
import { getRandomPic } from '@/apis/pexels'
export default function B() {
	const [img, setImg] = useState()
	useEffect(() => {
		async function asinit() {
			const {
				src: { landscape },
			} = await getRandomPic()
			setImg(landscape)
		}
		asinit()
	}, [])
	return <div style={{ backgroundImage: `url(${img})`, height: '100%',backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>B组件</div>
}
