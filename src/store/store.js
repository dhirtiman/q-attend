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
});



export default store;