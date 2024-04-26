import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "src/main.js";

export default {
  logout(context) {
    console.log('logout teacher block...');
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
  },

  async getTeacherData(context, payload) {
    context.commit("setTeacher", payload);
    const teacher = JSON.parse(localStorage.getItem("teacher"));

    if (teacher) {
      return;
    }
    localStorage.setItem("teacher", JSON.stringify(payload));

  },

  addTeachingSession(context, payload) {
    context.commit("addTeachingSession", payload);
  },
};
