/**
 * 节流函数
 * @param fn 执行函数
 * @param time 时间间隔
 * @param immediately 是否需要立即执行
 */
export function thor(fn: (...arg: any) => any, time, immediately = false) {
	let current = Date.now()
	return function (...arg) {
		immediately && fn()
		immediately = false
		if (Date.now() - current > time) {
			current = Date.now()
			fn.apply(null, arg)
		}
	}
}

/**
 * 防抖函数
 * @param fn 执行函数
 * @param time 间隔时间
 * @param immediately 是否需要立即执行
 * @param result 是否需要返回执行结果
 */
export function debounce(fn: (...arg) => any, { time, immediately = false, result = false }) {
	let sid = null
	return function (...arg) {
		let res = ''
		sid && clearTimeout(sid)
		if (immediately) {
			res = fn(...arg)
			immediately = false
			return res
		}
		if (result) {
			return new Promise((reslove, reject) => {
				sid = setTimeout(() => {
					try {
						res = fn.apply(null, arg)
						sid = ''
						reslove(res)
					} catch (error) {
						reject(error)
					}
				}, time)
			})
		} else {
			sid = setTimeout(() => {
				res = fn.apply(null, arg)
				sid = ''
			}, time)
		}
	}
}
