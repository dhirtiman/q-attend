export default {
       isLoggedIn(state) {
              return state.isLoggedIn;
       },
       getStudentAuth: (state) => (regn) => {

              const auth = state.students.find(student => student.regn === regn)

              console.log(auth);
              return auth ?
                     {
                            regn: auth.regn,
                            password: auth.password
                     } 
                     : null
       },



       getStudents(state) { //debug purposes
              return state.students;
       }
}