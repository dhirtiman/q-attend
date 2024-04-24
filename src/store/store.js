import { createStore } from "vuex";

import studentAuthModule from './modules/student/studentAuth/index.js'
import teacherAuthModule from "./modules/teacher/teacherAuth/index.js";
import papersModule from "./modules/papers/index.js";
import attendanceSessionModule from "./modules/teacher/attendanceSession/index.js";


const store = createStore({
    modules: {
        student: studentAuthModule,
        teacher: teacherAuthModule,
        attendance: attendanceSessionModule,
        papers: papersModule,
    },
    state(){
        return {
            currentUser: {
                who: 'teacher', // or 'student'
                id: 'teacherman@gmail.com', 
            },
            isLoggedIn: false,

        }
    },
    getters: {
        getCurrentUser(state){
            return state.currentUser;
        },
        getLoginState(state){
            return state.isLoggedIn;
        },
    },
    actions: {
        setUser(context,payload){
            context.commit('setUser',payload);
        },
        setLogin(context,payload){
            context.commit('setLogin',payload);
        },
    },
    mutations: {
        setUser(state,payload){
            state.currentUser = payload;
        },
        setLogin(state,payload){
            state.isLoggedIn = payload;
        }
    },
});



export default store;