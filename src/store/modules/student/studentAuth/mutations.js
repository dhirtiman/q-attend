export default {
  addStudent(state,payload){
    state.students.push(payload)
  },
  login(state){
    state.isLoggedIn = true;
  }
}