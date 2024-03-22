import { useState, MouseEventHandler } from 'react'
import './calendar.moudle.scss'

interface Props {
	select: MouseEventHandler<HTMLDivElement>
}
export default function calendar(): React.ReactNode {
	const [currentDate, setCurrentDate] = useState(new Date())
	// 获取本月的天数
	const daysOfMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate()
	// 获取本月第一天星期几
	const firstDatOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay()
	const renderDays = () => {
		const days: JSX.Element[] = []
		const dayscount = daysOfMonth(currentDate.getFullYear(), currentDate.getMonth())
		const firstDay = firstDatOfMonth(currentDate.getFullYear(), currentDate.getMonth())
		// 填充上一个月的日期
		for (let i = firstDay - 1; i >= 0; i--) {
			days.push(
				<div key={`empty-${i}`} className="empty day">
					{new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate() - i}
				</div>
			)
		}
		for (let i = 1; i <= dayscount; i++) {
			if (i === currentDate.getDate()) {
				days.push(
					<div key={i} className="day selected">
						{i}
					</div>
				)
			} else {
				days.push(
					<div key={i} className="day">
						{i}
					</div>
				)
			}
		}
		const len = 42 - days.length
		for (let i = 1; i <= len; i++) {
			days.push(
				<div key={`empty-next-${i}`} className="empty day">
					{i}
				</div>
			)
		}
		return days
	}
	const handlePreMonth = () => {
		setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
	}
	const handleNextMonth = () => {
		setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
	}
	return (
		<div className="wrapper-calendar">
			<div className="header">
				<button onClick={handlePreMonth}>&lt;</button>
				<div>
					{currentDate.getFullYear()}年{currentDate.getMonth() + 1}月
				</div>
				<button onClick={handleNextMonth}>&gt;</button>
			</div>
			<div className="days">
				<div className="day">日</div>
				<div className="day">一</div>
				<div className="day">二</div>
				<div className="day">三</div>
				<div className="day">四</div>
				<div className="day">五</div>
				<div className="day">六</div>
				{renderDays()}
			</div>
		</div>
	)
}
