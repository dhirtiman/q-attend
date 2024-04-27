export default {
  teacherIsloggedIn(state) {
    return state.teacherIsloggedIn;
  },
  getTeacher(state) {
    const teacher = state.teacher;
    if (teacher) {
      return teacher;
    } else {
      return JSON.parse(localStorage.getItem("teacher"));
    }
  },
  getTeachingSessions(state) {
    const teachingSessions =  state.teachingSessions;

    if(teachingSessions){
      return teachingSessions;
    }else{
      return JSON.parse(localStorage.getItem("teachingSessions"));

    }
  },


  noTeachingSessions(state) {
    if (!state.teachingSessions) {
      return true;
    }
    return false;
  },

  getRecentlyAdded(state) {
    return state.recentlyAdded;
  },
};
