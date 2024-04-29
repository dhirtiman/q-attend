import {
  doc,
  addDoc,
  deleteDoc,
  getDoc,
  getDocs,
  updateDoc,
  arrayUnion,
  collection,
  getCountFromServer,
} from "firebase/firestore";

import { db } from "src/main.js";

export default {
  async initSession(context, payload) {
    // keep the session details in a session instance in the store  
    const uid = context.rootGetters["teacher/getTeacher"].uid;

    payload = {
      completed: false,
      date: getCurrentDate(),
      ...payload,
      students: [],
    };
    const attendanceDocRef = await addDoc(
      collection(db, "attendanceSessions", uid, "aSessions"),
      {
        ...payload,
      },
    );

    payload = {
      id: attendanceDocRef.id,
      ...payload,
    };

    context.commit("setSession", payload);
    localStorage.setItem("aSession", JSON.stringify(payload));

    // send the state to backend too done
  },
  async pushAttendance(context, payload) {
    // {student and teacher uid and documentid}
    // push the student to backend session.students

    const attendanceSessionRef = doc(
      db,
      "attendanceSessions",
      payload.teacherUid,
      "aSessions",
      payload.id,
    );

    const docSnap = await getDoc(attendanceSessionRef);

    if (docSnap.data().completed) {
      const error = new Error("Attendance Session is already completed");
      throw error;
    }
    await updateDoc(attendanceSessionRef, {
      students: arrayUnion(payload.studentUid),
    }).catch((error) => {
      throw error;
    });
  },

  async endSession(context, payload) {
    /// tell the backend the session ended
    const attendanceSessionRef = doc(
      db,
      "attendanceSessions",
      payload.uid,
      "aSessions",
      payload.id,
    );

    await updateDoc(attendanceSessionRef, {
      completed: true,
    }).catch((error) => {
      console.log(error);
    });

    const docSnap = await getDoc(attendanceSessionRef);

    if (docSnap.exists()) {
      console.log("Finalized attendance session retreived 1");
       payload = docSnap.data();


      context.commit("setSession", payload);
      localStorage.setItem("aSession", JSON.stringify(payload));
    }
  },

  async retrieveAllSessions(context, payload) {
    // CONTINUE HERE
    /// YOU HAVE TO add a counter of total attendanceSessions for a teaching session for the teacher
    // then using that determine whether to retreive from localstorage or not

    const attendanceSessionTeacherColRef = doc(
      db,
      "attendanceSessions",
      payload.uid,
      "aSessions",
    );
    const snapshot = (await getCountFromServer(attendanceSessionTeacherColRef)) || null;

    if (snapshot) {
      const aSessionCount = snapshot.data().count;
    } else {
      throw new Error("aSessionCount for this teacher doesn't exist");
    }

    const aSessionCountLocalStorage =
      JSON.parse(localStorage.getItem("aSessionCount")) || null;
    if (aSessionCountLocalStorage != null) {
      if (aSessionCount == aSessionCountLocalStorage) {
        console.log("No new Attendance Sessions were present so no retrieval");
        return;
      }
    }

    localStorage.setItem("aSessionCount", JSON.stringify(aSessionCount));

    const allSessionsRef = collection(
      db,
      "attendanceSessions",
      payload.Uid,
      "aSessions",
    );
    payload = [];
    const allSessionsSnap = await getDocs(allSessionsRef);

    allSessionsSnap.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      payload.push({
        id: doc.id,
        ...doc.Data(),
      });
    });

    //store in state and localStorage

    context.commit("storeASessions", payload);
    localStorage.setItem("sessions", JSON.stringify(payload));
  },
  

  async retrieveAttendanceWithStudents(context, payload) { //payload  is students array 

    console.log('start student retrieval');
    

    let newPayload = context.getters['getSession']
    
    newPayload.students = [];
    
    const studentsRef = collection(db, "students");
    const studentsSnap = await getDocs(studentsRef);

    

    studentsSnap.forEach((doc) => {
    payload.forEach((uid,index) => {
        if (doc.id === uid) {
          newPayload.students.push(doc.data());
          payload.splice(index,1);
        }
      });
    });



    context.commit('setSession',newPayload)
    localStorage.setItem("aSession", JSON.stringify(newPayload));


    
  },
  async removeASession(context,payload){ // payload is the aSession id
  const uid = context.rootGetters['teacher/getTeacher'].uid
    const aSessionRef = doc(db,'attendanceSessions',uid,'aSessions',payload) 
     await deleteDoc(aSessionRef)
      .then(()=>{
        console.log('Successfully deleted the attendance list');
        context.commit('removeASession');
        localStorage.removeItem('aSession');

      })
      .catch((error)=>{
        console.log(error);
      })


  }
 
};

function getCurrentDate() {
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();

  return `${day}-${month}-${year}`;
}
