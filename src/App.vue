<template>
  <header
    v-if="!inHome"
    class="fixed left-0 right-0 top-0 z-20 bg-black bg-opacity-25 px-6 py-2 text-white"
  >
    <div class="flex items-center justify-between">
      <button @click="goBack" class="text-xl font-bold">back</button>
      <button
        v-if="isLoggedIn"
        class="rounded-xl bg-violet-600 p-2"
        @click="logout"
      >
        logout
      </button>
    </div>
  </header>

  <RouterView></RouterView>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut  } from "firebase/auth";

let auth;

export default {
  mounted() {
    auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      let value;
      if (user) {
        console.log(user);
        value = true;
      } else {
        value = false;
      }
      console.log(value);
      this.$store.commit("setLogin", value);
    });
  },
  computed: {
    inHome() {
      return true ? this.$route.fullPath === "/home" : false;
    },
    isLoggedIn() {
      if (!this.$route.meta.isAuthPage && this.$store.getters["getLoginState"]) {
        return true;
      }return false
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    logout() {
      if (this.$store.getters['student/getStudent']) {
        this.$store.dispatch('student/logout');
      }
      console.log("logging out...");
      signOut(auth).then(() => {
        this.$router.push("/");
      });
    },
  },
};
</script>

<style scoped></style>
