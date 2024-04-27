import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

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
    const teacher = JSON.parse(localStorage.getItem("teacher"));
    if (teacher) {
      return;
    }
    localStorage.setItem("teacher", JSON.stringify(payload));
  },

  async retrieveTeachingSessions(context, payload) {
    const teachingSessions = JSON.parse(
      localStorage.getItem("teachingSessions"),
    );
    const recentlyAdded = JSON.parse(localStorage.getItem("recentlyAdded"));
    if (!recentlyAdded && teachingSessions) {
      console.log("teachingSessions already exist in the local storage");
      context.commit("setTeachingSessions", teachingSessions);
      return;
    }

    const docRef = doc(db, "teachingSessions", payload.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      context.commit("setRecentlyAdded", false);
      console.log();
      payload = docSnap.data().teachingSessions.slice(1);
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
      }),
    }).catch((error) => {
      console.log(error);
    });
  },
};
