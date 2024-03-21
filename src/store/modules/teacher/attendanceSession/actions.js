
export default {
 initSession(context,payload){
    // keep the session details in a session instance in the store
    //

    payload = {
        id: new Date().toISOString()+'69420',
        date: getCurrentDate(),
        ...payload,
        students: [],
    }
    context.commit('createSession',payload);
    
    // send the state to backend too

 },
 pushAttendance(context,payload){
    // accessed by the student client 

    context.commit('pushStudent',payload); // for now  student    actually not even for now cuz ther is no backend

    // push the student to backend session.students  
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
  
  