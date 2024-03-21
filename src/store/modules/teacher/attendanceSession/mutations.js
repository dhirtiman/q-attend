export default {
    createSession(state,payload){
        state.session = payload;
    },
    pushStudent(state,payload){ // temporary
        state.session.students.push(payload);
    },
    endSession(state,payload){
        state.session = payload;
    }
}