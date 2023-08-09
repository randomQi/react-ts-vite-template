import { configureStore } from '@reduxjs/toolkit'
import userReducers from '@/store/features/userReducers'

const store = configureStore({
	reducer: {
		user: userReducers,
	},
	middleware: [],
})
export default store
