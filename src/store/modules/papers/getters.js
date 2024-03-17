export default {
    getAllPapers(state) {
      return state.papers;
    },
  
    getPaperById: (state) => (paperId) => {
      return state.papers.find(paper => paper.id === paperId);
    }
  };
  