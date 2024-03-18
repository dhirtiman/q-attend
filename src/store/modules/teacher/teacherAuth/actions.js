
export default {
  login(context, payload) {
    const auth = context.getters.getTeacherAuth(payload.email);
    if (auth) {
      if (auth.password === payload.password) {
        context.commit('login')
      }
    }
  },
  addTeachingSession(context,payload){
    context.commit('addTeachingSession',payload);
  }
 
}