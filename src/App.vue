
<template>
    <header v-if="!inHome" class="fixed top-0 left-0 right-0 bg-black bg-opacity-25 text-white py-2 px-6 z-10">
      <div class="flex justify-between items-center">
        <button @click="goBack" class="text-xl font-bold">⬅</button>
      </div>
    </header>
  <div class="">
    <RouterView ></RouterView>    
  </div>
</template>

<script>

export default {
  computed: {
    inHome(){
      return  true ? this.$route.fullPath === '/home' : false;
    }
  },
  methods: {
    goBack(){
      this.$router.go(-1);
    },
  },
}
</script>

<style scoped></style>
