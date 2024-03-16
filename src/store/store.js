import { createStore } from "vuex";

import studentAuthModule from './modules/student/studentAuth/index.js'

const store = createStore({
    modules: {
        student: studentAuthModule,
    },
});



export default store;