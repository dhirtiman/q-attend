import { collection, getDocs } from "firebase/firestore";

import { db } from "src/main.js";

export default {
  async retrievePapers(context) {
    const papers = JSON.parse(localStorage.getItem("papers") || null );

    if (papers) {
      context.commit("storePapers", papers);
      return
    }

    const querySnapshot = await getDocs(collection(db, "papers"));
    const payload = [];

    querySnapshot.forEach((doc) => {
      console.log(doc.id);
      console.log(doc.data());

      payload.push({
        id: doc.id,
        name: doc.data().name,
      });
    });
    console.log(payload);
    context.commit("storePapers", payload);
  },
};
