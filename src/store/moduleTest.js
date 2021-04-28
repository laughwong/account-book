const mTest = {
    state: () => ({
        count: 200
    }),
    mutations: {
        ADD: (state) => {
            state.count++
        }
    },
    actions: {
        addCount({ commit }) {
            commit('ADD')
        }
    }
}

export default mTest