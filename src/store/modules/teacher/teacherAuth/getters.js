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
    }
}