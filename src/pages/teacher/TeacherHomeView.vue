<template>
  <div
    class="flex h-svh w-full flex-col items-center justify-normal bg-black bg-gradient-to-b from-purple-950 from-25% via-black text-white"
  >
    <blob-container class="left-0 size-72"></blob-container>
    <blob-container
      class="bottom-0 left-10 size-40 rotate-180"
      smol
    ></blob-container>
    <div class="fixed h-full w-full backdrop-blur-sm"></div>

    <div class="z-10 flex flex-col items-center">
      <h1 class="mb-20 mt-20 text-center text-3xl font-bold">
        Hi! , {{ teacherName }}
      </h1>
      <div class="w-full">
        <p class="text-center text-lg" v-if="noTeachingSession">
          You don't have any Teaching Sessions. <br />Create One to continue
        </p>
        <transition
          enter-from-class="opacity-0"
          leave-to-class="opacity-0"
          enter-active-class="transition duration-300"
          leave-active-class="transition duration-300"
        >
          <TeachingSessionForm
            v-if="noTeachingSession || wanaAdd"
            @close="doneAdding"
          ></TeachingSessionForm>
        </transition>
      </div>
      <transition
          enter-from-class="opacity-0"
          leave-to-class="opacity-0"
          enter-active-class="transition duration-300"
          leave-active-class="transition duration-300"
        >
        <section
        class="flex flex-col items-center"
        v-if="!noTeachingSession && !wanaAdd"
      >
        <p class="mb-5 text-center text-lg">
          Choose a Teaching session to continue
        </p>
        <ul
          class="h-96 w-full overflow-y-scroll rounded-xl border bg-black bg-opacity-30 text-center"
        >
          <teaching-session-item
            class="mx-auto"
            v-for="session in teachingSessions"
            :key="session.id"
            :session
          ></teaching-session-item>

          <li class="my-2"></li>
        </ul> 
        <base-button
          @click="addMore"
          class="mt-10 h-12 w-40 rounded-xl text-xl py-2 bg-violet-400"
          secondary
          >Add more</base-button
        >
      </section>

        </transition>
          </div>
  </div>
</template>

<script>
import TeachingSessionForm from "../../components/teacher/TeachingSessionForm.vue";
import TeachingSessionItem from "../../components/teacher/TeachingSessionItem.vue";

export default {
  mounted() {},
  computed: {
    teacherName() {
      const email = this.$store.getters["getCurrentUser"].id;
      return this.$store.getters["teacher/getTeacher"](email).fullName;
    },
    noTeachingSession() {
      return this.$store.getters["teacher/noTeachingSessions"];
    },
    teachingSessions() {
      return this.$store.getters["teacher/getTeachingSessions"];
    },
  },
  components: {
    TeachingSessionForm,
    TeachingSessionItem,
  },
  data() {
    return {
      wanaAdd: false,
    };
  },
  methods: {
    addMore() {
      this.wanaAdd = true;
    },
    doneAdding() {
      this.wanaAdd = false;
    },
  },
};
</script>
