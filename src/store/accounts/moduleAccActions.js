import Vue           from 'vue'
import axios from '@/http/axios/index.js'
import { Progress } from '@/helpers/helpers'
const headers = {
    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
}
export default {
    task({commit, state}, task ){
        axios.post(process.env.VUE_APP_API_ROOT + '/task', {          
            "idType": task.idtype,
            'ids': task.selectedId,
            "tasks": [
                {"type": task.type}
            ]     
        }, { headers })
        .then(function (response) {
            commit('ADD_PROCESS', new Progress(task.title))
            state.process[Object.keys(state.process).length - 1].recursive(response.data.data.ids, Object.keys(state.process).length - 1)
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    taskParam({commit, state}, task ){
        axios.post(process.env.VUE_APP_API_ROOT + '/task', {          
            "idType": task.idtype,
            'ids': task.selectedId,
            "tasks": [
                {
                    "type": task.type,
                    "parameters:": task.param
                },
                
            ]     
        }, { headers })
        .then(function (response) {
            commit('ADD_PROCESS', new Progress(task.title))
            state.process[Object.keys(state.process).length - 1].recursive(response.data.data.ids, Object.keys(state.process).length - 1)
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    deleteAcc({commit, state}, ids){
        axios.delete(process.env.VUE_APP_API_ROOT + `/account/${ids}`, {
            headers
        }).then(function (response) {
            console.log(response)
        }).catch(function (error) {
            console.log(error);
        });
    },
    updateAcc({commit, state}, data){
        axios.put(process.env.VUE_APP_API_ROOT + '/account', 
            data, {headers}
        ).then(response => {
            console.log(response)
            Vue.notify({
                title: 'Authorization',
                text: 'You have been logged in!'
            })
        }).catch(function (error) {
            Vue.notify({
                title: 'Authorization',
                text: 'You have been logged in!'
            })
        });       
    }
}