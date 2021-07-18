export default {
    ADD_PROCESS(state, value){
        state.process.push(value)
    },
    UPDATE_PROCESS(state, obj){
        state.process[obj[3]].complete = obj[0]
        state.process[obj[3]].total = obj[1]
        state.process[obj[3]].visible = obj[2]
    }
}