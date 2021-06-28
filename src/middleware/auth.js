import store from '@/store/store'
export default function auth ({ next, store }){
    if(!localStorage.accessToken){
        return next({
           name: 'page-login'
        })
    }
    return next()
}