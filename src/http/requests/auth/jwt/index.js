import axios from '../../../axios/index.js'
import store from '../../../../store/store.js'

// Token Refresh
let isAlreadyFetchingAccessToken = false
let subscribers = []

function onAccessTokenFetched (access_token) {
  subscribers = subscribers.filter(callback => callback(access_token))
}

function addSubscriber (callback) {
  subscribers.push(callback)
}

export default {
  init () {
    axios.interceptors.response.use(function (response) {
      return response
    }, function (error) {
      // const { config, response: { status } } = error
      const { config, response } = error
      const originalRequest = config

      // if (status === 401) {
      if (response && response.status === 401) {
        if (!isAlreadyFetchingAccessToken) {
          isAlreadyFetchingAccessToken = true
          store.dispatch('auth/fetchAccessToken')
            .then((access_token) => {
              isAlreadyFetchingAccessToken = false
              onAccessTokenFetched(access_token)
            })
        }
        const retryOriginalRequest = new Promise((resolve) => {
          addSubscriber(access_token => {
            // Make sure to assign access_token according to your response.
            // Check: https://pixinvent.ticksy.com/ticket/2413870
            originalRequest.headers.Authorization = `Bearer ${access_token}`
            resolve(axios(originalRequest))
          })
        })
        return retryOriginalRequest
      }
      return Promise.reject(error)
    })
  },
  login (email, pwd) {
    return axios.post(process.env.VUE_APP_API_ROOT + '/user/login', {
      username: email,
      password: pwd
    })
  },
  registerUser (name, pwd, againpass) {
    return axios.post(process.env.VUE_APP_API_ROOT + '/user/register', {
      username: name,
      password: pwd,
      confirmPassword: againpass
    })
  },
  refreshToken () {
    return axios.post(process.env.VUE_APP_API_ROOT + '/user/refresh_token') 
  }
}
