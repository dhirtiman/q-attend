import { doc, addDoc, getDoc, updateDoc, arrayUnion, collection } from "firebase/firestore";

import { db } from "src/main.js";



export default {
 async initSession(context,payload){
    // keep the session details in a session instance in the store
    const uid = context.rootGetters['teacher/getTeacher'].uid;

    payload = {
      date: getCurrentDate(),
      ...payload,
      students: [],
  }
   const attendanceDocRef =  await addDoc(collection(db,'attendanceSessions',uid,'aSessions'),{
         ...payload,
    })

    payload = {
      id: attendanceDocRef.id,
      ...payload,
    }

    context.commit('createSession',payload);
    
    // send the state to backend too done

 },
 async pushAttendance(context,payload){ // {student and teacher uid and documentid} 
   // push the student to backend session.students
 
   const attendanceSessionRef = doc(db,'attendanceSessions',payload.teacherUid,'aSessions',payload.id);
   
   await updateDoc(attendanceSessionRef,{
      students: arrayUnion(payload.studentUid)
   }).catch((error)=>{
      console.log(error);
   })

 },

 endSession(context){
    /// tell the backend the session ended 


    // retrieve the final session obj from backend

    const sessionObj = {example: 'example'}

    // store the session as the sessionObj

    context.commit('endSession',sessionObj); 


 }


  
}


function getCurrentDate() {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
  
    return `${day}-${month}-${year}`;
  }
  
  