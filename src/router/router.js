import { createRouter,createWebHistory } from "vue-router";
import HomeView from "../pages/HomeView.vue";

import StudentSignIn from "../pages/student/StudentSignIn.vue";
import StudentRegister from "../pages/student/StudentRegister.vue";

import TeacherSignIn from "../pages/teacher/TeacherSignIn.vue";


const routes = [
    
    {path: '/', component: HomeView},
    {path: '/student/signin', component: StudentSignIn},
    {path: '/student/register', component: StudentRegister},
    {path: '/teacher/signin', component: TeacherSignIn},
    


    
]



const router = createRouter({
    history: createWebHistory(),
    routes,
})




export default router;