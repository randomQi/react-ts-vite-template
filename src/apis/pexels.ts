import { createClient } from 'pexels'
const client = createClient('3PRqReKSg9RPgR6wtdlJeTvubBmDIxne16W9uCOEPd3PR9hstReo8iUS')
export function getRandomPic() {
	return client.photos.random()
}
