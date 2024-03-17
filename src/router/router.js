import { createRouter,createWebHistory } from "vue-router";
import HomeView from "../pages/HomeView.vue";

import StudentSignIn from "../pages/student/StudentSignIn.vue";
import StudentRegister from "../pages/student/StudentRegister.vue";

import TeacherSignIn from "../pages/teacher/TeacherSignIn.vue";


const routes = [
    {path: '/', redirect: '/home'},
    {path: '/home', component: HomeView},
    
    {path: '/student/signin', component: StudentSignIn},
    {path: '/student/register', component: StudentRegister},
    {path: '/student/home', component: ()=> import('../pages/student/StudentHomeView.vue') },
    {path: '/student/qrscan', component: ()=> import('../pages/student/StudentQRScanner.vue') },



    {path: '/teacher/signin', component: TeacherSignIn},


    { path: '/:notFound(.*)', redirect: '/home' },

    


    
]



const router = createRouter({
    history: createWebHistory(),
    routes,
})




export default router;