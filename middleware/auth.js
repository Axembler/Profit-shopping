export default function ({ store, redirect }) {
	if (process.client && store.getters["getUser"]) return redirect("/");
}