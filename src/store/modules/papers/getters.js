export default {
    getAllPapers(state) {
      return state.papers;
    },
  
    getPaperById: (state) => (paperId) => {
      return state.papers.find(paper => paper.id === paperId);
    },
    getPapersBySemesters(state) {
      return (semesters) => {
        // Extract starting number from each semester (e.g., 1 from 101T)
        const startingNumbers = semesters.map(semester => parseInt(semester.toString()[0]));
        // Filter papers based on starting number derived from semesters
        return state.papers.filter(paper => startingNumbers.includes(parseInt(paper.id.charAt(0))));
      };
    },
    getPapersBySemester(state) {
      return (semester) => {
        // Extract starting number from the semester (e.g., 1 from 101T)
        const startingNumber = parseInt(semester.toString()[0]);
        // Filter papers based on the starting number derived from the semester
        return state.papers.filter(paper => parseInt(paper.id.charAt(0)) === startingNumber);
      };
    }
    
  };  
   