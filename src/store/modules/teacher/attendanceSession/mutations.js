    export default {
    setSession(state,payload){
        state.session = payload;
    },
    removeASession(){
        state.session = null
    },
    storeASessions(state,payload){
        state.sessions = payload
    },
}