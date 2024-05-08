<template>
  <div
    class="flex h-fitw-full w-full flex-col items-center justify-normal bg-black bg-gradient-to-b from-purple-950 from-25% via-black text-white"
  >
    <blob-container class="left-0 size-72"></blob-container>
    <blob-container
      class="bottom-0 left-10 size-40 rotate-180"
      smol
    ></blob-container>
    <div class="fixed h-full w-full backdrop-blur-sm"></div>

    <div class="z-10 my-1 flex h-svh flex-col items-center">
      <h1 class="mb-20 mt-20 text-center text-3xl font-bold">
        Hi! Teacher
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
            class="max-h-60 w-full overflow-y-scroll rounded-xl border bg-black bg-opacity-30 text-center"
          >
            <teaching-session-item
              class="mx-auto"
              v-for="(session,index) in teachingSessions"
              :index
            ></teaching-session-item>
            <li class="my-2"></li>
          </ul>
          <base-button
            @click="addMore"
            class="mt-10 h-12 w-40 rounded-xl bg-violet-400 py-2 text-xl"
            secondary
            >Add more</base-button
          >
          <p class="mt-5">-----or------</p>
      <base-button link secondary to="/teacher/ahistory" class="mt-2 rounded-2xl h-12 w-64 py-3 bg-violet-400"
        >View Attendance History</base-button
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
  data() {
    return {
      i: 0,
    };
  },
  mounted() {
    const teacher = this.$store.getters["teacher/getTeacher"];
    this.$store.dispatch("teacher/retrieveTeachingSessions", teacher);
    this.$store.dispatch('attendance/retrieveAllSessions',teacher);
  },
  computed: {
    noTeachingSession() {
      return this.$store.getters["teacher/noTeachingSessions"];
    },
    teachingSessions() {
      const tSessions = this.$store.getters["teacher/getTeachingSessions"];
      return tSessions;
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
