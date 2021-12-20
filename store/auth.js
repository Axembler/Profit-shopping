export const state = () => ({
    currentUser: null
})

export const mutations = {
    setUser (state, newUser) {
        state.currentUser = newUser
    }
}

export const getters = {
    getUser (state) {
        return state.currentUser
    }
}