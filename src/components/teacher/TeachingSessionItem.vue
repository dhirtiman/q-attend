<template>
  <div class="mb-9 mt-5 h-14 w-64 rounded-xl bg-blue-500 flex justify-between items-center">
    <p class="text-white ml-4">Session: {{ session.id }}</p>
    <base-button link :to="sessionLink" class="w-24 mr-4">Open</base-button>
  </div>
</template>


<script>
export default {
  props: ["session"],
  computed: {
    sessionLink(){
      return '/teacher/session/'+this.session.id;
      // return '/teacher/session/'

    },
  }
};
</script>
