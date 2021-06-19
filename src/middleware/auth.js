import store from '@/store/store'
export default function auth ({ next, store }){
    if(store.state.auth.isUserLoggedIn()){
        return next({
           name: 'page-login'
        })
    }
    return next()
}