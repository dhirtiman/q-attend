export default {
    login(state){
        state.teacherIsloggedIn = true;
    },
    addTeachingSession(state, payload) {
        // Find the teacher object in the state
        const teacher = state.teachers.find(teacher => teacher.email === payload.email);
        // If the teacher is found, add the teachingSessions
        if (teacher) {
          teacher.teachingSessions.push(payload.teachingSessions);
        }
      }
}