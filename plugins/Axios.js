export default function ({ $axios, store }) {
	$axios.onRequest() 
	const { token } = store.state

	if (token) {
		Vue.prototype.$http.defaults.headers.common['Authorization'] = token
	}
}