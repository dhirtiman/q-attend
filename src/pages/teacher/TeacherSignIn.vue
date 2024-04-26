<template>
  <div
    class="flex h-svh w-full flex-col items-center justify-normal bg-black bg-gradient-to-b from-purple-950 from-25% via-black text-white"
  >
    <blob-container class="pointer-events-none left-0 size-72"></blob-container>
    <div class="pointer-events-none fixed h-full w-full backdrop-blur-sm"></div>

    <div class="z-10 my-1 h-svh flex flex-col items-center border">
      <h1 class="mb-32 mr-32 mt-32 text-left text-4xl font-bold">
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
        <p
          class="absolute left-0 right-0 top-0 animate-pulse text-center text-red-600"
          v-if="error"
        >
          {{ error }}
        </p>

        <form @submit.prevent class="mt-1 flex flex-col items-center">
          <p class="text-xl font-bold">sign in to your account</p>
          <input
            type="email"
            name="email"
            id="email"
            v-model.trim="creds.email"
            placeholder="enter email"
            class="m-2 w-72 rounded-xl border-2 border-solid border-violet-500 bg-black bg-opacity-20 py-1.5 text-center placeholder:text-white"
          />
          <input
            type="password"
            name="password"
            id="password"
            v-model.trim="creds.password"
            placeholder="Password"
            class="m-2 w-72 rounded-xl border-2 border-solid border-violet-500 bg-black bg-opacity-20 py-1.5 text-center placeholder:text-white"
          />
          <base-button class="mb-1 mt-5 rounded-lg bg-violet-500" @click="login"
            >Login</base-button
          >
          <p clas="text">or</p>
          <base-button @click="signup" class=" rounded-lg bg-violet-500"
            >Sign Up instead</base-button
          >
        </form>
      </div>
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
      error: null,
    };
  },
  methods: {
    resetError(){
      setTimeout(() => {
          this.error = null;
        }, 3000);
    },
    async login() {
      console.log("loging in...");
      if (!this.creds.email && !this.creds.password) {
        this.isEmpty = true;
        setTimeout(() => {
          this.isEmpty = false;
        }, 3000);
        return;
      }

      try {
        await this.$store.dispatch("teacher/login", { ...this.creds });
        this.$router.push("/teacher/home");
      } catch (error) {
        switch (error.code) {
          case "auth/invalid-email":
            this.error = "Invalid email!";
            break;
          case "auth/user-not-found":
            this.error = "No account with that email was found";
            break;
          case "auth/wrong-password":
            this.error = "Incorrect password";
            break;
          default:
            this.error = "Email or password was incorrect";
            break;
        }
        this.resetError();
      }
    },
    async signup() {
      try {
        await this.$store.dispatch("teacher/signup", { ...this.creds });
        this.login();
      } catch (error) {
        switch (error.code) {
          case "auth/email-already-in-use":
            this.error = "Email is already in use, Please login instead.";
            break;
          default:
            this.error = error.message || "Failed to signup.";
            break;
        }
      }
      this.resetError();
    },
  },
};
</script>
