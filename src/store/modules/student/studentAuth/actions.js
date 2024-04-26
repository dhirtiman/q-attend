import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "src/main.js";

export default {
  async signUp(context, payload) {
    console.log("trying signgup");
    await createUserWithEmailAndPassword(
      getAuth(),
      payload.email,
      payload.password,
    )
      .then((data) => {
        payload = {
          ...payload,
          uid: data.user.uid,
        };
        context.dispatch("uploadStudentData", payload);
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  },
  async signIn(context, payload) {
    await signInWithEmailAndPassword(getAuth(), payload.email, payload.password)
      .then((data) => {
        console.log("Sucessfully logged in");
        payload = {
          email: payload.email,
          uid: data.user.uid,
        }
        context.dispatch('getStudentData',payload)
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  },

  async uploadStudentData(context, payload) {
    await setDoc(doc(db, "students", `${payload.uid}`), {
      classRolln: payload.classRolln,
      fullName: payload.fullName,
      regno: payload.regno,
      uniRolln: payload.uniRolln,
    })
      .then(() => {
        console.log("Successfully saved data");
        localStorage.setItem('student',JSON.stringify(payload));


      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  },

  logout(context){
    localStorage.removeItem('student')
    context.commit('setStudent',null)
  },

  async getStudentData(context, payload) {
    const student = JSON.parse(localStorage.getItem('student'))

    console.log();
    if(student){
      console.log('Student data already in localstorage...');
      context.commit('setStudent',student)
      return;

    }

    const docRef = doc(db, "students", payload.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      payload = {
        ...payload,
        ...docSnap.data(),
      }
      context.commit('setStudent',payload)
      localStorage.setItem('student',JSON.stringify(payload));


    } else {
      console.log("No such document!");
    }
  },
};
