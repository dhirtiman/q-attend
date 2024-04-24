<template>
  <header
    v-if="!inHome"
    class="fixed left-0 right-0 top-0 z-10 bg-black bg-opacity-25 px-6 py-2 text-white"
  >
    <div class="flex items-center justify-between">
      <button @click="goBack" class="text-xl font-bold">⬅</button>
      <button v-if="isLoggedIn" class="bg-violet-600 rounded-xl  p-2" @click="logout">logout</button>
    </div>
  </header>

  <RouterView></RouterView>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

let auth;

export default {
  mounted() {
    auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      let value;
      if (user) {
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
    isLoggedIn(){
      return this.$store.getters['getLoginState'];
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    logout(){
      console.log('logging out...');
      signOut(auth).then(()=>{
        this.$router.push('/');
      })
    }
  },
};
</script>

<style scoped></style>
