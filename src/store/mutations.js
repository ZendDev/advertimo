/*=========================================================================================
  File Name: mutations.js
  Description: Vuex Store - mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


const mutations = {


  UPDATE_ACCOUNTS (state, res){
    state.accounts = res.data.data.items
    console.log(res)
  },
  UPDATE_ADACCOUNTS (state, res){
    state.adaccounts = res.data.data.items
  },
  UPDATE_CAMPAIGNS(state, res){
    state.campaigns = res.data.data.items
  },
  UPDATE_ADSETS(state, res){
    state.adsets = res.data.data.items
  },
  UPDATE_PROXY(state, res){
    state.proxy = res.data.data.items
  },
  SET_VOCABULARIES(state, res){
    state.vocabularies = res.data.data.items
  },
  ADD_VOCABULARIES(state, res){
    state.vocabularies = res
  },
  DELETE_VOCABULARY(state, id){
    let index = state.vocabularies.find(item => item.id == id)
    state.vocabularies.splice(index, 1)
  },
  // Vertical NavMenu

  TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE (state, value) {
    state.isVerticalNavMenuActive = value
  },
  TOGGLE_MODE (state) {
    state.mode = !state.mode
    state.theme = state.mode ? 'dark' : 'light'
  },
  SUBMENU_CHANGE(state, menu){
    state.submenu = menu
  },
  TOGGLE_REDUCE_BUTTON (state, val) {
    state.reduceButton = val
  },
  UPDATE_MAIN_LAYOUT_TYPE (state, val) {
    state.mainLayoutType = val
  },
  UPDATE_VERTICAL_NAV_MENU_ITEMS_MIN (state, val) {
    state.verticalNavMenuItemsMin = val
  },
  UPDATE_VERTICAL_NAV_MENU_WIDTH (state, width) {
    state.verticalNavMenuWidth = width
  },


  // VxAutoSuggest

  UPDATE_STARRED_PAGE (state, payload) {

    // find item index in search list state
    const index = state.navbarSearchAndPinList['pages'].data.findIndex((item) => item.url === payload.url)

    // update the main list
    state.navbarSearchAndPinList['pages'].data[index].is_bookmarked = payload.val

    // if val is true add it to starred else remove
    if (payload.val) {
      state.starredPages.push(state.navbarSearchAndPinList['pages'].data[index])
    } else {
      // find item index from starred pages
      const index = state.starredPages.findIndex((item) => item.url === payload.url)

      // remove item using index
      state.starredPages.splice(index, 1)
    }
  },

  // Navbar-Vertical

  ARRANGE_STARRED_PAGES_LIMITED (state, list) {
    const starredPagesMore = state.starredPages.slice(10)
    state.starredPages     = list.concat(starredPagesMore)
  },
  ARRANGE_STARRED_PAGES_MORE (state, list) {
    let downToUp                   = false
    const lastItemInStarredLimited = state.starredPages[10]
    const starredPagesLimited      = state.starredPages.slice(0, 10)
    state.starredPages             = starredPagesLimited.concat(list)

    state.starredPages.slice(0, 10).map((i) => {
      if (list.indexOf(i) > -1) downToUp = true
    })

    if (!downToUp) {
      state.starredPages.splice(10, 0, lastItemInStarredLimited)
    }
  },


  // ////////////////////////////////////////////
  // UI
  // ////////////////////////////////////////////

  TOGGLE_CONTENT_OVERLAY (state, val) { state.bodyOverlay       = val   },
  UPDATE_PRIMARY_COLOR (state, val)   { state.themePrimaryColor = val   },
  UPDATE_THEME (state, val)           { state.theme             = val   },
  UPDATE_WINDOW_WIDTH (state, width)  { state.windowWidth       = width },
  UPDATE_WINDOW_SCROLL_Y (state, val) { state.scrollY           = val   },


  // /////////////////////////////////////////////
  // User/Account
  // /////////////////////////////////////////////

  // Updates user info in state and localstorage
  UPDATE_USER_INFO (state, payload) {

    // Get Data localStorage
    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || state.AppActiveUser

    for (const property of Object.keys(payload)) {

      if (payload[property] !== null) {
        // If some of user property is null - user default property defined in state.AppActiveUser
        state.AppActiveUser[property] = payload[property]

        // Update key in localStorage
        userInfo[property] = payload[property]
      }


    }
    // Store data in localStorage
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
  }
}

export default mutations

