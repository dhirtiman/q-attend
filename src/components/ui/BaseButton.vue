<template>
  <button
    v-if="!link"
    class="m-1 w-52  bg-blue-500 px-7 py-1.5 text-center  shadow-sm shadow-black"
    :class="{ ' bg-blue-300  text-black' : secondary }"
  >
    <slot></slot>
  </button>
  <RouterLink
    v-else
    :to="to"
    class="m-1 w-52  bg-blue-500 px-7 py-1.5 text-center  font-bold shadow-sm shadow-black"
    :class="{ ' bg-blue-300  text-black': secondary }"
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
    secondary: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped></style>
