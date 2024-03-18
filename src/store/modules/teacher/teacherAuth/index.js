import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
    namespaced: true,
    state() {
      return {
        noTeachingSessions: false,
        teacherIsloggedIn: false,
        teachers: [
          {
            fullName: 'Teacher Man',
            email: 'teacherman@gmail.com', // use as id
            password: 'teacher',


            teachingSessions: [
              // {
              //   id: 1,
              //   sessionYear: '2024-25',
              //   term: 'odd',
              //   semesters: [1, 3, 5],
              //   paperCodes: ['101T', '102T', '301T', '302T', '501T', '502T']
              // },
            ],


          }
        ]
      };
    },
    mutations,
    actions,
    getters,
  };
  