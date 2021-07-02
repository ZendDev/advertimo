/*=========================================================================================
  File Name: actions.js
  Description: Vuex Store - actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
import axios from '@/http/axios/index.js'
const actions = {

  accounts ({commit}){
      axios.get(process.env.VUE_APP_API_ROOT + '/accounts', {  
          headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
          } 
      }).then(response => (
        commit('UPDATE_ACCOUNTS', response) 
      ));
  },
  adAccounts({commit}){
    axios.get(process.env.VUE_APP_API_ROOT + '/cabinets', { 'headers': {Authorization: localStorage.accessToken } })
    .then((response) => {
      commit('UPDATE_ADACCOUNTS', response)
    })  
  },
  campaigns({commit}){
    axios.get(process.env.VUE_APP_API_ROOT + '/campaigns', { 'headers': { Authorization: localStorage.accessToken } })
    .then((response) => {
      commit('UPDATE_CAMPAIGNS', response)
    }) 
  },
  adsets({commit}){
    axios.get(process.env.VUE_APP_API_ROOT + '/adsets', { 'headers': { Authorization: localStorage.accessToken } })
    .then((response) => {
      commit('UPDATE_ADSETS', response)
    })  
  },
  proxies({commit}){
    axios.get(process.env.VUE_APP_API_ROOT + '/proxies', { 'headers': { Authorization: localStorage.accessToken } })
    .then((response) => {
      commit('UPDATE_PROXY', response)
    }) 
  },

  // Vertical NavMenu
  updateVerticalNavMenuWidth ({ commit }, width) {
    commit('UPDATE_VERTICAL_NAV_MENU_WIDTH', width)
  },

  // VxAutoSuggest
  updateStarredPage ({ commit }, payload) {
    commit('UPDATE_STARRED_PAGE', payload)
  },

  // The Navbar
  arrangeStarredPagesLimited ({ commit }, list) {
    commit('ARRANGE_STARRED_PAGES_LIMITED', list)
  },
  arrangeStarredPagesMore ({ commit }, list) {
    commit('ARRANGE_STARRED_PAGES_MORE', list)
  },

  // /////////////////////////////////////////////
  // UI
  // /////////////////////////////////////////////

  toggleContentOverlay ({ commit }) {
    commit('TOGGLE_CONTENT_OVERLAY')
  },
  updateTheme ({ commit }, val) {
    commit('UPDATE_THEME', val)
  },

  // /////////////////////////////////////////////
  // User/Account
  // /////////////////////////////////////////////

  updateUserInfo ({ commit }, payload) {
    commit('UPDATE_USER_INFO', payload)
  },
  updateUserRole ({ dispatch }, payload) {
    // Change client side
    payload.aclChangeRole(payload.userRole)

    // Make API call to server for changing role

    // Change userInfo in localStorage and store
    dispatch('updateUserInfo', {userRole: payload.userRole})
  }
}

export default actions
