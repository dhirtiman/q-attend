export default {
  isLoggedIn(state) {
    return state.isLoggedIn;
  },

  getStudent(state) {
    const student = state.student;
    if (student) {
      return student;
    } else {
      return JSON.parse(localStorage.getItem("student"));
    }
  },
};
