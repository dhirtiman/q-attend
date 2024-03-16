import { createStore } from "vuex";

import studentAuthModule from './modules/student/studentAuth/index.js'
import teacherAuthModule from "./modules/teacher/teacherAuth/index.js";


const store = createStore({
    modules: {
        student: studentAuthModule,
        teacher: teacherAuthModule,
    },
});



export default store;