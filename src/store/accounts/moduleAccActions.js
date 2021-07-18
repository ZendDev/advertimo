import axios from '@/http/axios/index.js'
import { Progress } from '@/helpers/helpers'
const headers = {
    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
}
export default {
    acceptRules({commit, state}, ids){
        axios.post(process.env.VUE_APP_API_ROOT + '/task', {          
            "idType": "AccountId",
            ids,
            "tasks": [
                {"type": "AcceptRules"}
            ]     
        }, { headers })
        .then(function (response) {
            commit('ADD_PROCESS', new Progress('Accept rules'))
            state.process[Object.keys(state.process).length - 1].recursive(response.data.data.ids, Object.keys(state.process).length - 1)
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}