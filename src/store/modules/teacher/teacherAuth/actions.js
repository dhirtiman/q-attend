import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

import { db } from "src/main.js";

export default {
  logout(context) {
    console.log("logout teacher block...");
    localStorage.removeItem("teacher");
    context.commit("setTeacher", null);
  },
  async login(context, payload) {
    await signInWithEmailAndPassword(getAuth(), payload.email, payload.password)
      .then((data) => {
        console.log("Successfully logged in");
        payload = {
          email: payload.email,
          uid: data.user.uid,
        };
        context.dispatch("getTeacherData", payload);
        context.dispatch("retrieveTeachingSessions", payload);
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  },

  async signup(context, payload) {
    await createUserWithEmailAndPassword(
      getAuth(),
      payload.email,
      payload.password,
    )
      .then((data) => {
        console.log("Successfuly Signed up");
        payload = {
          email: payload.email,
          uid: data.user.uid,
        };
        context.dispatch("saveTeacherData", payload);
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  },
  async saveTeacherData(context, payload) {
    localStorage.setItem("teacher", JSON.stringify(payload));

  

    await setDoc(doc(db, "teachingSessions", payload.uid), {
      teachingSessions: [{}],
    })
      .then(() => {
        console.log("Successfully created teaching Sessions array");
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  },

  async getTeacherData(context, payload) {
    context.commit("setTeacher", payload);
    console.log(payload);
    
    const teacher = JSON.parse(localStorage.getItem("teacher"))
    console.log(teacher);
    if (teacher != null) {
      if (teacher.uid === payload.uid) {
        return;
      }
    }
      
    localStorage.setItem("teacher", JSON.stringify(payload));
  },
  async retrieveTeachingSessions(context, payload) {
    
    const teachingSessions = JSON.parse(
      localStorage.getItem("teachingSessions"),
    );
    const recentlyAdded = JSON.parse(localStorage.getItem("recentlyAdded"));
    


    const docRef = doc(db, "teachingSessions", payload.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      context.commit("setRecentlyAdded", false);
      console.log();
      payload = docSnap.data().teachingSessions;
      console.log(payload);
      context.commit("setTeachingSessions", payload);
      localStorage.setItem("teachingSessions", JSON.stringify(payload));
    } else {
      console.log("No such document!");
    }
  },

  async addTeachingSession(context, payload) {
    const teachingSessionRef = doc(db, "teachingSessions", payload.uid);
    context.commit("setRecentlyAdded", true);
    await updateDoc(teachingSessionRef, {
      teachingSessions: arrayUnion({
        sessionYear: payload.sessionYear,
        term: payload.term,
        semesters: payload.semesters,
        paperCodes: payload.paperCodes,
      })
    }).catch((error) => {
      console.log(error);
    });
  },

  async deleteTeachingSession(context,payload){ 
    const uid = context.getters['getTeacher'].uid
    const tSessions = context.getters["getTeachingSessions"]

    const teachingSessionRef = doc(db,'teachingSessions',uid)

    context.commit('setRecentlyAdded',true);

    await updateDoc(teachingSessionRef, {
      teachingSessions: arrayRemove(payload.tSession)
    })
    .then(()=>{
      console.log('Successfully deleted the teachingSession');
      tSessions.splice(payload.id, 1);
      context.commit('setTeachingSessions',tSessions)
      localStorage.setItem("teachingSessions", JSON.stringify(tSessions));

    })
    .catch((error)=>{
      console.log(error);
      throw error
    })
  }
};
