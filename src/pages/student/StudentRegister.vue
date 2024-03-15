<template>
  <div
    class="flex h-svh w-full flex-col items-center justify-normal bg-black bg-gradient-to-b from-cyan-900 from-10% via-black text-white"
  >
    <h1 class="mb-10 mt-20 text-center text-4xl font-bold">REGISTER</h1>
    <p>{{ students }}</p>        
    <div>
      <form @submit.prevent="" class="flex flex-col items-center">
        <input
          type="text"
          name="fullName"
          id="fullName"
          v-model.trim="fullName"
          placeholder=" Full Name"
          class="m-2 w-72 rounded-xl border-2 border-solid border-blue-600 bg-black bg-opacity-20 py-1.5 text-center placeholder:text-white"
        />
        <input
          type="number"
          name="regno"
          id="regno"
          v-model.trim="regno"
          placeholder=" Registration No."
          class="m-2 w-72 rounded-xl border-2 border-solid border-blue-600 bg-black bg-opacity-20 py-1.5 text-center placeholder:text-white"
        />
        <input
          type="number"
          name="uniRollno"
          id="uniRollno"
          v-model.trim="uniRollno"
          placeholder=" University Roll No."
          class="m-2 w-72 rounded-xl border-2 border-solid border-blue-600 bg-black bg-opacity-20 py-1.5 text-center placeholder:text-white"
        />
        <input
          type="number"
          name="classRollno"
          id="classRollno"
          v-model.trim="classRollno"
          placeholder="  Class Roll No."
          class="m-2 w-72 rounded-xl border-2 border-solid border-blue-600 bg-black bg-opacity-20 py-1.5 text-center placeholder:text-white"
        />
        <input
          type="password"
          name="password"
          id="password"
          v-model.trim="password"
          placeholder=" Password"
          class="m-2 w-72 rounded-xl border-2 border-solid border-blue-600 bg-black bg-opacity-20 py-1.5 text-center placeholder:text-white"
        />
        <input
          type="password"
          name="password2"
          id="password2"
          v-model.trim="password2"
          placeholder=" Verify Password"
          class="m-2 w-72 rounded-xl border-2 border-solid border-blue-600 bg-black bg-opacity-20 py-1.5 text-center placeholder:text-white"
        />
        <p class="text-red-600" v-if="!formIsvalid">
          Please Check if password matches
        </p>
        <base-button @click="signUp" class="mt-24 py-2">Sign Up</base-button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  mounted(){

    // this.students = this.$store.getters['student/getStudents'];   // debug purposes
  },
  data() {
    return {
      fullName: null,
      regno: null,
      uniRollno: null,
      classRollno: null,
      password: null,
      password2: null,

      formIsvalid: true,


      students: null, //debug purposes
    };
  },
  methods: {
    signUp() {
      console.log(this.password, this.password2);

      if (this.password !== this.password2) {
        this.formIsvalid = false;
        return;
      }
      this.formIsvalid = true;
      const student = {
        fullName: this.fullName,
        regn: this.regno, //used for id
        uniRolln: this.uniRollno,
        classRolln: this.classRollno,
        password: this.password,
      };
      this.$store.dispatch('student/signUp',student);
    },
  },
};
</script>
