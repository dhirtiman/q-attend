<template>
  <div
    class="flex h-svh w-full flex-col items-center justify-normal bg-black bg-gradient-to-b from-purple-950 from-25% via-black text-white"
  >
    <h1 class="mb-48 mr-32 mt-20 text-left text-4xl font-bold">
      WELCOME <br />
      Teacher!
    </h1>
    <div class="relative py-5">
      <p
        class="absolute left-0 right-0 top-0 animate-pulse text-center text-red-600"
        v-if="isEmpty"
      >
        Enter something first..
      </p>

      <form @submit.prevent="login" class="flex flex-col items-center">
        <p class="text-xl font-bold">Login to your account</p>
        <input
          type="email"
          name="email"
          id="email"
          v-model.trim="creds.email"
          placeholder="enter email"
          class="m-2 w-72 rounded-xl border-2 border-solid border-blue-600 bg-black bg-opacity-20 py-1.5 text-center placeholder:text-white"
        />
        <input
          type="password"
          name="password"
          id="password"
          v-model.trim="creds.password"
          placeholder="Password"
          class="m-2 w-72 rounded-xl border-2 border-solid border-blue-600 bg-black bg-opacity-20 py-1.5 text-center placeholder:text-white"
        />
        <p class="text-xs">Forgot Password? plez contact AdminMan</p>
        <base-button class="mb-1">Login</base-button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      creds: {
        email: null,
        password: null,
      },
      isEmpty: false,
      loggedIn: "nothin",
    };
  },
  methods: {
    login() {
      if (!this.creds.email && !this.creds.password) {
        this.isEmpty = true;
        setTimeout(() => {
          this.isEmpty = false;
        }, 3000);
        return;
      }

      this.$store.dispatch("teacher/login", { ...this.creds });
      this.loggedIn = this.$store.getters["teacher/teacherIsloggedIn"];


      if (this.$store.getters["teacher/teacherIsloggedIn"]) {
        this.$store.dispatch('setUser',{
          who: 'teacher',
          id: this.creds.email,
        });
        this.$router.push("/teacher/home");
      }
    },
  },
};
</script>
