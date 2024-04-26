export default {
  teacherIsloggedIn(state) {
    return state.teacherIsloggedIn;
  },
  getTeacherAuth: (state) => (email) => {
    const auth = state.teachers.find((teacher) => teacher.email === email);

    return auth
      ? {
          email: auth.email,
          password: auth.password,
        }
      : null;
  },
  getTeacher(state) {
    const teacher =  state.teacher;
    if(teacher){
        return teacher;
    }else {
        return JSON.parse(localStorage.getItem('teacher'));
    }
  },
  getTeachingSessions(state, _1, _2, rootGetters) {
    const email = rootGetters["getCurrentUser"].id;
    const teacher = state.teachers.find((teacher) => teacher.email === email);

    if (teacher) {
      return teacher.teachingSessions;
    }
  },

  noTeachingSessions(state) {
    return state.teachers.every(
      (teacher) => teacher.teachingSessions.length === 0,
    );
  },
};
