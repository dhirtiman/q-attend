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
    getTeachingSessions(state, _1, _2, rootGetters){
        const email = rootGetters['getCurrentUser'].id;
        const teacher =  state.teachers.find(teacher => teacher.email === email)

        if(teacher){
            return teacher.teachingSessions;
        }
    },

    noTeachingSessions(state){
        
        return  state.teachers.every(teacher => teacher.teachingSessions.length === 0)
    },
      
}