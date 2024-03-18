<template>
  <div
    class="flex h-svh w-full flex-col items-center justify-normal bg-black bg-gradient-to-b from-cyan-900 from-10% via-black text-white"
  >
    <h1 class="mb-56 mr-32 mt-20 text-center text-4xl font-bold">
      WELCOME <br />
      STUDENT!
    </h1>
    <div>
      <form @submit.prevent="login" class="flex flex-col items-center">
        <p class="text-xl font-bold">Login to your account</p>
        <input
          type="number"
          name="regno"
          id="regno"
          v-model.trim="regno"
          placeholder="Registration No."
          class="m-2 w-72 rounded-xl border-2 border-solid border-blue-600 bg-black bg-opacity-20 py-1.5 text-center placeholder:text-white"
        />
        <input
          type="password"
          name="password"
          id="password"
          v-model.trim="password"
          placeholder="Password"
          class="m-2 w-72 rounded-xl border-2 border-solid border-blue-600 bg-black bg-opacity-20 py-1.5 text-center placeholder:text-white"
        />
        <p class="text-xs">Forgot Password? No help for you lol</p>
        <base-button class="mb-1">Login</base-button>
      </form>
    </div>
    <div class="flex flex-row">
      <p class="mx-1">Don't have an account?</p>
      <RouterLink class="font-bold text-blue-600" to="/student/register"
        >Register</RouterLink
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      regno: null,
      password: null,
    };
  },
  methods: {
    login() {
      const userDetails = {
        regno: this.regno,
        password: this.password,
      };
      this.$store.dispatch('student/signIn',userDetails);

      if(this.$store.getters['student/isLoggedIn']){
        this.$store.dispatch('setUser',{
          who: 'student',
          id: this.regno,
        });
        this.$router.push('/student/home');
      }
    },
  },
};
</script>
