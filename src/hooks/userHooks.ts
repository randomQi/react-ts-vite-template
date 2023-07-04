import connectFactory, { useAppContext } from '@/utils/contextFactory'
const key = 'USER_INFo'
const defaultValue = {}
export const useUserHooks = () => useAppContext(key)
export const userConnect = connectFactory(key, defaultValue)
