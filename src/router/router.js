import { createRouter,createWebHistory } from "vue-router";
import HomeView from "../pages/HomeView.vue";


const routes = [
    
    {path: '/', component: HomeView},
    {path: '/teacher/auth', component: HomeView},

    
]



const router = createRouter({
    history: createWebHistory(),
    routes,
})




export default router;