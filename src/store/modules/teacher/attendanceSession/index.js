import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  namespaced: true,
  state() {
    return {
      session: {
        completed: false,
        id: 'rqKkuyO5agsNva9mNOmm', 
        date: '20-03-2024',
        time: '10:30',
        semester: '1',  // 3 or 5 
        paper: '101T',
        students: ['DdvnJdsnXPh5PHgxb2pkht7GSpp2','aNhRdd3SRiTcpcc8IAC2mRZMXs02'],
      },
      sessions: null,
    };
  },
  mutations,
  actions,
  getters,
};
