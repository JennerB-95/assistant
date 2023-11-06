import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // estado de la aplicación
  },
  mutations: {
    // mutaciones de la aplicación
  },
  actions: {
    restartApp({ commit }) {
      commit('resetState')
      window.location.href = '/'
    }
  }
})