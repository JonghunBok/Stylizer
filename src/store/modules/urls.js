const state = {
  styleTransferServer: 'http://localhost:4000'
}

const getters = {
  urlOf: state => server => state[server]
}

const mutations = {
}

const actions = {
}

export default {
  state,
  getters,
  mutations,
  actions
}
