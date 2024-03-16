import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
    namespaced:  true,
    state(){
        return {
            teachers: [
                {
                    id: 1,
                    fullName: 'Teacher Man',
                    email: 'teacherman@gmail.com',


                    password: 'teacher',
                }
            ]
        };
    },
    mutations,
    actions,
    getters,
}