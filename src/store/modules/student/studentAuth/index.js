import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';



export default {
    namespaced: true,
    state() {
        return {
            students: [
                {
                    fullName: null,
                    regn: null, //used for id
                    uniRolln: null,
                    classRolln: null,
                    password: null,
                },
            ],
            isLoggedIn: false,
        };
    },
    mutations,
    actions,
    getters,
}