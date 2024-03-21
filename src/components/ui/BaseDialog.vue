<template>
    <div v-if="show" @click="tryClose" class="fixed top-0 left-0 h-screen w-screen bg-black opacity-75 z-10"></div>
    <transition name="dialog">
      <dialog :open="show" class="fixed  top-0 bottom-0 left-0  h-30  bg-white rounded-lg shadow-md z-20">
        <header class="bg-purple-800  rounded-lg text-white text-center py-4 px-6">
          <slot name="header">
            <h2>{{ title }}</h2>
          </slot>
        </header>
        <section class="p-6">
          <slot></slot>
        </section>
        <menu v-if="!fixed" class="p-6 space-x-3 flex justify-center">
          <slot name="actions">
            <button @click="tryClose" class="px-4 py-2 w-20 bg-purple-300 hover:bg-gray-400 text-gray-800 rounded">No</button>
            <button @click="end" class="px-4 py-2 w-20 bg-purple-500 hover:bg-gray-400 text-white rounded">Yes</button>

            
          </slot>
        </menu>
      </dialog>
    </transition>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    fixed: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ['close','end'],
  methods: {
    tryClose() {
      if (!this.fixed) {
        this.$emit('close');
      }
    },
    end(){
        this.$emit('end');
    }
  },
};
</script>
