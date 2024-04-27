import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  namespaced: true,
  state() {
    return {
      session: {
        id: '1', 
        date: '20-03-2024',
        time: '10:30',
        semester: '1',  // 3 or 5 
        paper: '101T',
        students: [{
          regno: 1, //used for id
          fullName: 'Dhirtiman Khati',
          uniRolln: 1,
          classRolln: 1,
        },
        {
          regno: 2, //used for id
          fullName: 'Student Man',
          uniRolln: 2,
          classRolln: 2,
        },],
      }
    };
  },
  mutations,
  actions,
  getters,
};
