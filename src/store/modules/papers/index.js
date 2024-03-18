import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';


export default {
  namespaced: true,
  state() {
    return {
      papers: [
        { id: '101T', name: 'Programming Fundamentals Using C / C++' },
        { id: '102T', name: 'Discrete Structures' },
        { id: '301T', name: 'Programming in JAVA' },
        { id: '302T', name: 'Computer Graphics' },
        { id: '501T', name: 'Theory of Computation' },
        { id: '502T', name: 'Internet Technologies' },
        
      ]
    };
  },
  mutations,
  actions,
  getters,
};
