export default {
    teacherIsloggedIn(state){
        return state.teacherIsloggedIn;
    },
    getTeacherAuth: (state) => (email) => {
        const auth =  state.teachers.find(teacher => teacher.email === email)

        return auth ?
        {
            email: auth.email,
            password: auth.password,
        }
        : null
    },
    getTeacher: (state) => (email) => {
        const teacher = state.teachers.find(teacher => teacher.email === email)

        return teacher;
    },
    getTeachingSessions(state){
        return state.teachers.find
    },

    noTeachingSessions(state){
        
        return  state.teachers.every(teacher => teacher.teachingSessions.length === 0)
    },
      
}