export default {
    getProcess: state => {
        return state.process.filter( item => item.visible === true)
    }
}