import axios from '@/http/axios/index.js'
const headers = {
    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
}
export default {
    acceptRules({commit}, ids){
        axios.post(process.env.VUE_APP_API_ROOT + '/task', {          
            "idType": "AccountId",
            ids,
            "tasks": [
                {"type": "AcceptRules"}
            ]     
        }, { headers })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}