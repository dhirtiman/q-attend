<template>
  <button
    v-if="!link"
    class=" text-center shadow-sm shadow-black w-52 m-1 rounded-xl bg-blue-500 px-7 py-1.5 text-xs text-white"
  >
    <slot></slot>
  </button>
  <RouterLink
    v-else
    :to="to"
    class=" text-center shadow-sm shadow-black w-52 m-1 rounded-xl bg-blue-500 px-7 py-1.5 text-xs text-white"
  >
    <slot> </slot>
  </RouterLink>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: null,
    },
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: String,
      required: false,
      default: "/",
    },
  },
};
</script>

<style scoped></style>
