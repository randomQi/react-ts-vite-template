import http from '@/apis/http'

export function getRandomImageList() {
	return http.get('http://127.0.0.1:4523/m1/2408032-0-179fd00a/img')
}
