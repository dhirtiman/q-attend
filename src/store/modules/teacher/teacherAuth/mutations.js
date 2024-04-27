export default {
  login(state) {
    state.teacherIsloggedIn = true;
  },

  setTeachingSessions(state,payload){
    state.teachingSessions = payload;
  },

  setTeacher(state, payload) {
    state.teacher = payload;
  },

  setRecentlyAdded(state,payload){
    state.recentlyAdded = payload;
    localStorage.setItem('recentlyAdded',JSON.stringify(payload));
  }
};
