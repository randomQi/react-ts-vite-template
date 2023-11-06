export function myVitePlugin(option?: Record<string, any>) {
	let index = 0
	return {
		name: 'myVitePlugin',
		// 'serve' 表示仅用于开发环境，'build表示仅用于生产环境
		/**
		 * apply 参数还可以配置成一个函数，进行更灵活的控制
		 *     apply(config,params) {},
		 */
		apply: 'serve',
		// 默认为`normal`，可取值还有`pre`和`post` vite 插件的执行顺序 Alias别名相关插件 > 带有enforce： ’pre‘ 的用户插件 > vite核心插件 > 普通插件 > vite构建生产环境的的插件 > 带有enforce： post的用户插件 > vite后置构建插件
		enforce: 'normal',
		//通用钩子
		options(options) {
			console.log('服务器启动阶段执行的钩子函数 options钩子')
			return options
		},
		//通用钩子
		buildStart() {
			console.log('服务器启动阶段执行的钩子函数 buildStart钩子')
		},
		resolveId(id) {
			console.log(++index)
			// console.log(1111111)
		},
		// Vite 独有钩子
		config(config, params) {
			console.log('-----------------1.解析用户配置文件钩子， 此处可以获取用户的配置文件信息 vite独有钩子----------')
			console.log(JSON.stringify(option))
			// console.log(config)
			// console.log(params)
		},
		// Vite 独有钩子
		configResolved(resolvedConfig) {
			console.info('------------------------配置解析完毕 包含完整的配置信息 vite独有钩子-----------------------------------')
			// console.log(resolvedConfig)
		},
		transform(code, id) {
			console.log('---------------文件转换内容---------------')
			console.log(id)
			// return code
		},
		// Vite 独有钩子
		// configureServer(server) {
		// 	console.log('configureServer')
		// 	// setTimeout(() => {
		// 	//   // 手动退出进程
		// 	//   process.kill(process.pid, 'SIGTERM')
		// 	// }, 3000)
		// 	// 姿势 1: 在 Vite 内置中间件之前执行
		// 	server.middlewares.use((req, res, next) => {
		// 		// 自定义请求处理逻辑
		// 	})
		// 	// 姿势 2: 在 Vite 内置中间件之后执行
		// 	return () => {
		// 		server.middlewares.use((req, res, next) => {
		// 			// 自定义请求处理逻辑
		// 		})
		// 	}
		// },
		// 通用钩子
		buildEnd() {
			console.log('buildEnd')
		},
		// 通用钩子
		closeBundle() {
			console.log('closeBundle')
		},
	}
}
