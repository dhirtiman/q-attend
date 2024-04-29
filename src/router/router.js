import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../pages/HomeView.vue";

import StudentSignIn from "../pages/student/StudentSignIn.vue";
import StudentRegister from "../pages/student/StudentRegister.vue";

import TeacherSignIn from "../pages/teacher/TeacherSignIn.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const routes = [
  { path: "/", redirect: "/home" },
  { path: "/home", component: HomeView },






  { path: "/student/signin", component: StudentSignIn, meta: {isAuthPage: true} },
  { path: "/student/register", component: StudentRegister , meta: {isAuthPage: true} },
  {
    path: "/student/home",
    component: () => import("../pages/student/StudentHomeView.vue" ),
  },
  {
    path: "/student/qrscan",
    component: () => import("../pages/student/StudentQRScanner.vue"),

  },





  { path: "/teacher/signin", component: TeacherSignIn, meta: {isAuthPage: true} },
  {
    path: "/teacher/home",
    component: () => import("../pages/teacher/TeacherHomeView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/teacher/session/:id",
    component: () => import("../pages/teacher/TeacherTeachingSession.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/teacher/setupclass/:id",
    component: () => import("../pages/teacher/TeacherSetUpClass.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/teacher/qrpage/:paper(.*)",
    props: true,
    component: () => import("../pages/teacher/TeacherQRPage.vue"),
    meta: { requiresAuth: true },
  },

  {
    path: '/teacher/ahistory',
    component: ()=> import('../pages/teacher/TeacherAttendanceHistory.vue'),
    meta: { requiresAuth: true },

  },
  {
    path: '/teacher/attendance',
    name:'attendance',
    component: ()=> import('../pages/teacher/TeacherAttendanceView.vue'),
    meta: {requiresAuth: true}
  },

  { path: "/:notFound(.*)", redirect: "/home" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject,
    );
  });
};

router.beforeEach(async (to, _, next) => {
  if (to.meta.requiresAuth) {
    if (await getCurrentUser()) {
      next();
    } else {
      alert("You Don't have access!");
      next("/");
    }
  } else {
    next();
  }
});



export default router;
