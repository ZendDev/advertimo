import axios from '@/http/axios/index.js'
import store from '@/store/store'
const headers = {
    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
}
export class Progress {
    constructor(type){
        this.type = type
        this.total = null
        this.complete = null
        this.visible = false
    }

    recursive(guids, count){
        axios.get(process.env.VUE_APP_API_ROOT + '/task/guids',
            { 
                headers,   
                params: {
                    guids: guids.join(',')
                }
            })
        .then(response => {
            this.progress(response, guids, count)
        });       
    }

    progress(response, guids, count){
        var data = response.data.data
        var waiting =  data.filter(item => item.status == "Waiting")
        var complete = data.filter(item => item.status == "Completed")

        if(Object.keys(waiting).length > 0){
            setTimeout(() => this.recursive(guids, count), 1000)
            store.commit('acc/UPDATE_PROCESS', [Object.keys(complete).length, Object.keys(data).length, true, count ])
            store.dispatch('accounts')
        } else {
            store.commit('acc/UPDATE_PROCESS', [Object.keys(data).length, Object.keys(data).length, true, count])
            setTimeout(() => store.commit('acc/UPDATE_PROCESS', [Object.keys(data).length, Object.keys(data).length, false, count]), 500)
            store.dispatch('accounts')
        }
    }
}