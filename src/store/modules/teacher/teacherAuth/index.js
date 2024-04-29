import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
    namespaced: true,
    state() {
      return {

        teacher: null,
        teachingSessions: [],

        noTeachingSessions: false,
        teacherIsloggedIn: false,
        recentlyAdded: false,
      };
    },
    mutations,
    actions,
    getters,
  };
  