export default {
  login(state){
    state.isLoggedIn = true;
  },
  setStudent(state,payload){
    state.student = payload;
  },
}