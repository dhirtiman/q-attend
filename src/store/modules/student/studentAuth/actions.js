import {getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,} from "firebase/auth";
import { getDatabase,} from 'firebase/database';

export default {
  async signUp(context, payload) {
    console.log('trying signgup');
    await createUserWithEmailAndPassword(
      getAuth(),
      payload.email,
      payload.password,
    ).then((data) => {
        // context.dispatch("saveStudentData", payload);
        console.log("Successfuly Signed up");
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });


  },
  async signIn(context, payload) {
   await signInWithEmailAndPassword(getAuth(),payload.email,payload.password)
   .then((data)=>{
    console.log('Sucessfully logged in');
   })
   .catch((error)=> {
    console.log(error);
    throw error;
   })
  },


  async saveStudentData(context, payload) {
    const db = getDatabase()
    const student = {
        fullName: this.fullName,
        regno: this.regno, //used for id
        uniRolln: this.uniRollno,
        classRolln: this.classRollno,
        password: this.password,
      };
  },
};
