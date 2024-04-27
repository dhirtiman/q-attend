<template>
  <div class="mb-9 mt-5 h-14 w-60 rounded-3xl bg-violet-500 flex justify-between items-center">
    <p class="text-white ml-4">Session {{ index }}</p>
    <base-button link :to="'/teacher/session/'+index" class="w-28 px-0 border bg-violet-400 rounded-xl mr-4">OPEN</base-button>
  </div>
</template>


<script>
export default {
  props: ["index"]
};
</script>
