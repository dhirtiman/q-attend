export default {
    getSession(state){
        const aSession =  state.session;
        if (aSession) {
            return aSession
        }
        return JSON.parse(localStorage.getItem('aSession'));
    },
    getSessions(state){
        const sessions =  state.sessions;
        if (sessions) {
            return sessions
        }
        return JSON.parse(localStorage.getItem('sessions'));
    }
      
}