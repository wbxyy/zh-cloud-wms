
const state = {
  reduce: false
}

const mutations = {

  REDUCE_TRUE: (state, status) => {
    state.reduce = true
  },
  REDUCE_FALSE: (state, status) => {
    state.reduce = false
  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
