
export default {
    signUp(context, payload) {
        const exists = context.getters.getStudentAuth(payload.regno) || false;

        if(exists){
            return
        }

        context.commit('addStudent', payload)

    },
    signIn(context, payload, ) {

        const auth = context.getters.getStudentAuth(payload.regno) || false;

        if (auth) {
            if(auth.password === payload.password)
            context.commit('login')
        }

    }

}