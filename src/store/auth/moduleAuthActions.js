/*=========================================================================================
  File Name: moduleAuthActions.js
  Description: Auth Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import jwt from '../../http/requests/auth/jwt/index.js'


import router from '@/router'

export default {

  loginJWT ({ commit }, payload) {

    return new Promise((resolve, reject) => {
      jwt.login(payload.username, payload.password)
        .then(response => {
          // If there's user data in response
          if (response.data.data) {

            // Set accessToken
            localStorage.setItem('accessToken', response.data.data.jwtToken)
 
            // Update user details
            commit('UPDATE_USER_INFO', response.data.data, {root: true})

            // Set bearer token in axios
            commit('SET_BEARER', response.data.data.jwtToken)

            // Navigate User to homepage
            router.push(router.currentRoute.query.to || '/')

            resolve(response)
          } else {
            reject({message: 'Wrong Email or Password'})
          }

        })
        .catch(error => { reject(error) })
    })
  },
  registerUserJWT ({ commit }, payload) {

    const { username, password, confirmPassword } = payload.userDetails

    return new Promise((resolve, reject) => {

      // Check confirm password
      if (password !== confirmPassword) {
        reject({message: 'Password doesn\'t match. Please try again.'})
      }

      jwt.registerUser(username, password, confirmPassword)
        .then(response => {

          // // Redirect User
          router.push('/login')

          // // Update data in localStorage
          // localStorage.setItem('accessToken', response.data.accessToken)
          // commit('UPDATE_USER_INFO', response.data.userData, {root: true})

          resolve(response)
        })
        .catch(error => { reject(error) })
    })
  },
  fetchAccessToken () {
    return new Promise((resolve) => {
      jwt.refreshToken().then(response => { resolve(response) })
    })
  }
}
