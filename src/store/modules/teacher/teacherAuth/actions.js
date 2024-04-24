import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";


export default {
  async login(context, payload) {
    await signInWithEmailAndPassword(getAuth(), payload.email, payload.password)
      .then((data) => {
        console.log("Successfully logged in");
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  },

  async signup(context, payload) {
    await createUserWithEmailAndPassword(getAuth(), payload.email, payload.password)
      .then((data) => {
        console.log("Successfuly Signed up");
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  },
  addTeachingSession(context, payload) {
    context.commit("addTeachingSession", payload);
  },
};
