import './index.moudle.scss'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
export function A() {
	const useSelector1 = useSelector((state) => state)
	useEffect(() => {
		console.log(useSelector1)
	})
	return (
		<div className="wrapper">
			<div>mask渐变裁剪</div>
			<div className="dis">
				<ul>
					<li>文件</li>
					<li>浏览器</li>
					<li>编辑器</li>
					<li>窗口</li>
					<li>鼠标</li>
					<li>鼠标</li>
					<li>编辑器</li>
				</ul>
			</div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	)
}
