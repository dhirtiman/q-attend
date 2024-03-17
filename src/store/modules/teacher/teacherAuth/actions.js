
export default {
  login(context, payload) {

    const auth = context.getters.getTeacherAuth(payload.email);
    console.log(payload);
    console.log(auth);
    if (auth) {
      console.log('first if')
      if (auth.password === payload.password) {
        console.log('2nd if')
        context.commit('login')

      }

    }
  },


}