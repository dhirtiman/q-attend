
export default {
    signUp(context, payload) {
        context.commit('addStudent', payload)

    },
    signIn(context, payload, ) {

        const auth = context.getters.getStudentAuth(payload.regno) || null;

        if (auth) {
            if(auth.password === payload.password)
            context.commit('login')
        }

    }

}