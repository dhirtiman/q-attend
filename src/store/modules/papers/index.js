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

        { id: '201T', name: 'Computer System Architecture' },
        { id: '202T', name: 'Data Structures' },
        { id: '401T', name: 'Computer Networks' },
        { id: '402T', name: 'Database Management Systems' },
        { id: '601T', name: 'Artificial Intelligence' },
        { id: '602T', name: 'Software Engineering' },

        
      ]
    };
  },
  mutations,
  actions,
  getters,
};
