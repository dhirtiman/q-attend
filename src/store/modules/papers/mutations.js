export default {
    addPaper(state, newPaper) {
      state.papers.push(newPaper);
    },
    storePapers(state,payload){
      state.papers = payload;
      localStorage.setItem("papers", JSON.stringify(payload));

    },
  };
  