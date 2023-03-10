export default {
    namespaced: true,
    state() {
      return {
        dataSizes: ''
      }
    },
    mutations: {
      setSizes (state, data) {
        state.dataSizes = data
        console.log()
      }
    },
    actions: {
      async createTable({commit}, dataSizes) {
            commit('setSizes', dataSizes)
      },
    },
    getters: {
    }
  }
