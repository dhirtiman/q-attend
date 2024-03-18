export default {
       isLoggedIn(state) {
              return state.isLoggedIn;
       },
       getStudentAuth: (state) => (regno) => {

              const auth = state.students.find(student => student.regno === regno)

              console.log(auth);
              return auth ?
                     {
                            regno: auth.regno,
                            password: auth.password
                     } 
                     : null
       },
       getStudent: (state) => (regno) => {

              const student = state.students.find(student => student.regno === regno)

              return student;
       },



       getStudents(state) { //debug purposes
              return state.students;
       }
}