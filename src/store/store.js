import { createStore } from "vuex";

import studentAuthModule from './modules/student/studentAuth/index.js'
import teacherAuthModule from "./modules/teacher/teacherAuth/index.js";
import papersModule from "./modules/papers/index.js";


const store = createStore({
    modules: {
        student: studentAuthModule,
        teacher: teacherAuthModule,
        papers: papersModule,
    },
    state(){
        return {
            currentUser: {
                who: 'teacher', // or 'student'
                id: 'teacherman@gmail.com',
            },

        }
    },
    getters: {
        getCurrentUser(state){
            return state.currentUser;
        },
    },
    actions: {
        setUser(context,payload){
            context.commit('setUser',payload);
        }
    },
    mutations: {
        setUser(state,payload){
            state.currentUser = payload;
        }
    },
});



export default store;